# Operations Runbook — Chargeback Evidence Pack Builder
**Version:** 1.0
**Last Updated:** 2026-03-30
**Owner:** Matt McAllister
**Status:** Shell (to be expanded during and after build)

---

## 1. Service Overview

| Component | Provider | Environment | Notes |
|-----------|----------|-------------|-------|
| App hosting | Render | Free tier → paid on traction | Spins down after 15min inactivity on free |
| Database | Supabase | Managed Postgres | Includes Auth and Storage |
| File storage | Supabase Storage | Same project as DB | Per-user RLS enforced |
| Payments | Stripe | Test → Production | Use test mode until launch |
| AI generation | OpenAI API | GPT-4o | Monitor cost per pack |
| Domain | TBD | TBD | Configure before launch |

---

## 2. Environment Variables

**Required for all environments:**

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=         # Server-side only, never expose client-side

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=  # Client-safe
STRIPE_SECRET_KEY=                   # Server-side only
STRIPE_WEBHOOK_SECRET=               # Server-side only, for webhook verification
STRIPE_PRICE_ID_SINGLE_PACK=         # $39 pack price ID
STRIPE_PRICE_ID_BUNDLE_3=            # $99 bundle price ID

# OpenAI
OPENAI_API_KEY=                      # Server-side only

# App
NEXT_PUBLIC_APP_URL=                 # e.g., https://app.chargebackpack.com
NODE_ENV=                            # development / staging / production
```

**Security rules:**
- SUPABASE_SERVICE_ROLE_KEY: never in client bundle, never logged, never committed
- STRIPE_SECRET_KEY: never in client bundle, never logged, never committed
- STRIPE_WEBHOOK_SECRET: never in client bundle, must match Stripe dashboard endpoint secret
- OPENAI_API_KEY: never in client bundle, monitor usage daily at launch
- Scan all commits with git-secrets or equivalent before any push

---

## 3. Deployment Process

### 3.1 Staging Deploy
1. Push to `main` branch (Render auto-deploys from main)
2. Verify deploy completes in Render dashboard
3. Run smoke test: create account → create pack → reach payment gate
4. Verify Stripe test webhook is firing (check Stripe dashboard → Webhooks → Recent deliveries)

### 3.2 Production Launch Checklist
- [ ] All pre-launch test checklist items pass (see quality/testplan.md)
- [ ] Stripe switched from test mode to live mode
- [ ] STRIPE_WEBHOOK_SECRET updated to live webhook secret
- [ ] STRIPE_PRICE_IDs updated to live price IDs
- [ ] Render upgraded to paid plan if free tier is insufficient
- [ ] Custom domain configured and SSL active
- [ ] Error monitoring configured (Sentry or equivalent)
- [ ] Uptime monitoring configured (Better Uptime or equivalent)
- [ ] OpenAI rate limits reviewed for expected launch volume
- [ ] Supabase plan reviewed for expected storage and query volume
- [ ] Privacy policy and Terms of Service published
- [ ] Retention policy disclosure live in app UI

### 3.3 Rollback Process
1. In Render dashboard → select previous successful deploy → click Redeploy
2. If database migration caused issue: restore from Supabase point-in-time backup
3. Notify users via status page if downtime exceeds 10 minutes

---

## 4. Stripe Webhook Operations

### 4.1 Webhook Endpoint
- URL: `[APP_URL]/api/webhooks/stripe`
- Events listened: `checkout.session.completed`
- Signature verification: required (raw body + STRIPE_WEBHOOK_SECRET)

### 4.2 Testing Webhooks Locally
```bash
# Install Stripe CLI
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Trigger test event
stripe trigger checkout.session.completed
```

### 4.3 If a Webhook Fails
1. Check Stripe dashboard → Developers → Webhooks → Recent deliveries
2. Stripe retries failed webhooks automatically for up to 3 days
3. If user's credit was not provisioned: manually add credit via Supabase dashboard (admin)
4. Log as bug in quality/buglog.md with BUG- prefix
5. Investigate root cause before next deploy

### 4.4 Idempotency
- Webhook handler stores processed `stripe_event_id` in DB
- Duplicate delivery returns 200 without re-processing
- Test idempotency by replaying a webhook event from Stripe dashboard

---

## 5. File Retention Operations

### 5.1 Retention Policy
- Evidence files and generated PDFs: deleted 72 hours after generation
- Intake answers: deleted 90 days after creation
- All user data: deleted within 30 days of account deletion request

### 5.2 Retention Cron Job
- Job runs every 1 hour
- Queries packs where `expires_at < now()` and `status != 'expired'`
- Deletes files from Supabase Storage
- Updates pack status to `expired`
- Logs deletion count

### 5.3 If Retention Job Fails
1. Check job logs in Render (or wherever cron is hosted)
2. Files not deleted are NOT a security incident — they are a compliance delay
3. Re-run job manually via admin endpoint
4. Log as bug if recurring

---

## 6. Incident Response

### Severity Levels
| Level | Definition | Response |
|-------|-----------|----------|
| P0 | Payment charged but no credit provisioned; data breach; complete outage | Immediate response, all hands |
| P1 | PDF generation failing; auth broken; webhook delivery failing | Fix within 2 hours |
| P2 | Feature degraded but workaround exists; slow generation | Fix within 24 hours |
| P3 | Minor UX issue, cosmetic bug | Fix in next sprint |

### P0 Response Steps
1. Identify scope: how many users affected?
2. If payment issue: check Stripe dashboard for checkout.session.completed events
3. If data concern: check Supabase logs immediately, do not delete anything
4. Communicate: post status update to any public status page
5. Fix forward (do not rollback unless fix is impossible)
6. Document in quality/buglog.md within 24 hours of resolution

---

## 7. Monitoring Checklist (Post-Launch)

**Daily (first 30 days):**
- [ ] Check Render logs for errors
- [ ] Check Stripe webhook delivery success rate
- [ ] Check OpenAI API cost (should be <$5/day at v1 volume)
- [ ] Check Supabase storage growth

**Weekly:**
- [ ] Review buglog.md for new entries
- [ ] Review failed pack generation rate (target: <5%)
- [ ] Review Stripe dispute data (ironic, but relevant)

---

## 8. Key Admin Operations

### Add pack credit manually (for support cases)
```sql
-- In Supabase SQL editor
UPDATE user_credits
SET credits = credits + 1
WHERE user_id = '[USER_ID]';
```

### Force expire a pack (for testing)
```sql
UPDATE packs
SET expires_at = now() - interval '1 hour'
WHERE id = '[PACK_ID]';
```

### Check a user's current credit balance
```sql
SELECT user_id, credits, updated_at
FROM user_credits
WHERE user_id = '[USER_ID]';
```

---

## 9. Contact and Escalation

| Role | Contact | Scope |
|------|---------|-------|
| Founder / Solo Operator | mattmcallistermarketing@gmail.com | All decisions |
| Stripe Support | dashboard.stripe.com/support | Payment issues |
| Supabase Support | supabase.com/dashboard/support | DB/Storage issues |
| OpenAI Support | platform.openai.com/support | API issues |
| Render Support | render.com/support | Hosting issues |


## 8. Security

_Last Updated:_ 2026-03-30

### 8.1 Pre-Launch Security Checklist

Run this checklist before every production deployment. Each item maps to a known high-risk mistake documented in `security/THREAT-MODEL.md` § 5.

| # | Check | Verification Method | Pass Criteria |
|---|-------|---------------------|---------------|
| 1 | Stripe restricted key in Render env | Render → Environment → STRIPE_SECRET_KEY | Value starts with `rk_live_`, not `sk_live_` |
| 2 | STRIPE_WEBHOOK_SECRET is set | Send tampered event to `/api/webhooks/stripe` | Returns 400 Webhook signature invalid |
| 3 | SUPABASE_SERVICE_ROLE_KEY not client-accessible | grep for NEXT_PUBLIC_ in .env.production | No result containing SERVICE_ROLE |
| 4 | RLS enabled on all public tables | SQL: SELECT tablename FROM pg_tables WHERE rowsecurity=false | Returns 0 rows |
| 5 | Magic bytes validation active | Upload a .txt file renamed to .pdf | Returns 422 Invalid file type |
| 6 | Verbose errors suppressed | Trigger an intentional 500 in staging | Body is `{"error":"internal_error"}` only |
| 7 | Webhook route uses request.text() | Code review /app/api/webhooks/stripe/route.ts | No `request.json()` call present |
| 8 | CRON_SECRET is set | POST /api/cron/expire with no auth header | Returns 401 |
| 9 | Ownership check on all [packId] routes | Auth as User A; request User B's pack via API | Returns 404 not 403 |
| 10 | Tokens in HttpOnly cookies, not localStorage | DevTools → Application → Local Storage | No `sb-` prefixed keys |

### 8.2 Environment Variable Security

| Variable | Where Set | Risk if Leaked | Mitigation |
|----------|-----------|----------------|------------|
| `STRIPE_SECRET_KEY` | Render env (server only) | Full Stripe account takeover | Use restricted key; rotate immediately if leaked |
| `STRIPE_WEBHOOK_SECRET` | Render env (server only) | Forged webhooks, free credit grants | Stripe dashboard → Developers → Webhooks → Roll secret |
| `SUPABASE_SERVICE_ROLE_KEY` | Render env (server only) | Bypasses all RLS — full DB access | Never use NEXT_PUBLIC_ prefix; rotate in Supabase → Settings → API |
| `SUPABASE_ANON_KEY` | .env.local + NEXT_PUBLIC_ | Anon-tier access only | Acceptable client-side; RLS enforces isolation |
| `OPENAI_API_KEY` | Render env (server only) | Unlimited API spend | Set spend limits in OpenAI dashboard; rotate monthly |
| `CRON_SECRET` | Render env (server only) | Unauthorized cron triggers | Rotate Render env + cron job header simultaneously |

**Rules:**
- Never log env var values, even in debug output
- Never commit .env.production or .env.local containing real secrets
- Rotate any key that appears in logs, error messages, or public git history within 1 hour

### 8.3 Security Incident Response

#### Auth Breach (Unauthorized Account Access)

**Indicators:** Login from unexpected geography; user reports access they did not initiate.

1. Disable account: Supabase Auth dashboard → Users → select user → Disable
2. Invalidate all sessions: `supabaseAdmin.auth.admin.signOut(userId, 'others')`
3. Review `audit_logs` for `auth.login` events for the affected user in the past 24h
4. If service role key was involved, rotate `SUPABASE_SERVICE_ROLE_KEY` (§ 8.4)
5. Notify affected user within 72h (GDPR breach notification requirement)
6. Document in ops/incidents/YYYY-MM-DD-auth-breach.md

#### Webhook Compromise (Forged or Replayed Events)

**Indicators:** Credits granted without matching Stripe payment; duplicates in `webhook_events` table.

1. Rotate `STRIPE_WEBHOOK_SECRET`: Stripe → Developers → Webhooks → endpoint → Roll secret
2. Update in Render env → trigger redeploy immediately
3. Query suspicious events: `SELECT * FROM webhook_events WHERE created_at > now() - interval '24 hours' ORDER BY created_at DESC;`
4. Reverse fraudulent grants via `update_credits_secure` (negative delta); log as `admin.credit.manual_adjustment`
5. File Stripe support ticket if forged events originated externally

#### RLS Gap (Data Exposure via Misconfigured Policy)

**Indicators:** User reports seeing another user's data; cross-user query visible in Supabase logs.

1. Run immediately: `SELECT tablename FROM pg_tables WHERE schemaname='public' AND rowsecurity=false;`
2. For each returned table: `ALTER TABLE <tablename> ENABLE ROW LEVEL SECURITY;`
3. Verify policies exist: `SELECT tablename, policyname FROM pg_policies WHERE schemaname='public';`
4. Audit via Supabase → Logs → API logs filtered by affected table name
5. Assess exposure window: which user IDs could have read which rows, and for how long
6. Notify affected users within 72h if personal data was accessible

### 8.4 Key Rotation Procedures

#### Rotating STRIPE_WEBHOOK_SECRET

1. Stripe dashboard → Developers → Webhooks → endpoint → Roll secret
2. Copy new value → Render → Environment → update `STRIPE_WEBHOOK_SECRET` → redeploy
3. Verify: send test event from Stripe → confirm 200 in delivery log

#### Rotating SUPABASE_SERVICE_ROLE_KEY

1. Supabase → Project Settings → API → Service Role Key → Rotate
2. Copy new key → Render → Environment → update `SUPABASE_SERVICE_ROLE_KEY` → redeploy
3. Verify: trigger a pack generation (requires service role for storage write) → confirm success

#### Rotating OPENAI_API_KEY

1. OpenAI → API Keys → Create new secret key
2. Copy new key → Render → Environment → update `OPENAI_API_KEY` → redeploy
3. Delete old key in OpenAI dashboard
4. Verify: trigger a pack generation → confirm AI analysis step completes


---

## Billing Operations

### Stripe Dashboard Setup (Required Before Launch)

1. **Enable receipt emails**: Stripe Dashboard > Settings > Emails > Enable "Successful payments"
2. **Enable failed payment emails**: Same page > Enable "Failed payments"
3. **Enable renewal reminders**: Stripe Dashboard > Settings > Billing > Customer emails > Enable "Upcoming renewals"
4. **Create restricted API key**: Stripe Dashboard > Developers > API keys > Create restricted key with: Checkout Sessions (Write), Customers (Write), Billing Portal Sessions (Write), Subscriptions (Write), Prices (Read), Events (Read)
5. **Register webhook endpoint**: Stripe Dashboard > Developers > Webhooks > Add endpoint: `https://chargebackkit.app/api/webhooks/stripe`
   - Events to listen for: `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_succeeded`, `invoice.payment_failed`
6. **Configure Customer Portal**: Stripe Dashboard > Settings > Billing > Customer portal
   - Enable: Payment method management, Invoice history, Subscription cancellation
   - Disable: Subscription plan switching (V1 has one plan)
7. **Create Prices**: Create three Price objects in Stripe:
   - Single Pack: $39 one-time (set ID as STRIPE_PRICE_ID_SINGLE_PACK)
   - 3-Pack Bundle: $99 one-time (set ID as STRIPE_PRICE_ID_BUNDLE_3)
   - Monthly Pro: $29/month recurring (set ID as STRIPE_PRICE_ID_SUBSCRIPTION)

### Billing Environment Variables

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=rk_live_...          # Use restricted key, not full secret
STRIPE_WEBHOOK_SECRET=whsec_...        # From webhook endpoint registration
STRIPE_PRICE_ID_SINGLE_PACK=price_...  # $39 single pack
STRIPE_PRICE_ID_BUNDLE_3=price_...     # $99 3-pack bundle
STRIPE_PRICE_ID_SUBSCRIPTION=price_... # $29/month subscription
```

### Billing Email Boundary

**Stripe sends**: Payment receipts, invoice PDFs, failed payment alerts, renewal reminders, cancellation confirmations, refund confirmations.

**ChargebackKit sends (via Resend)**: Purchase confirmation with next steps (first purchase only).

**Neither sends**: The other's emails. No duplication. See docs/billing-email-boundary.md for full spec.

### Common Billing Operations

#### Grant manual credits (emergency only)
```sql
-- Run via Supabase SQL editor. Log in audit system.
SELECT add_credits('USER_UUID_HERE', 1);
```

#### Check a user's billing status
```sql
SELECT
  p.email,
  uc.credits,
  us.status as sub_status,
  us.current_period_end,
  us.cancel_at_period_end
FROM profiles p
LEFT JOIN user_credits uc ON uc.user_id = p.id
LEFT JOIN user_subscriptions us ON us.user_id = p.id
WHERE p.email = 'customer@example.com';
```

#### Verify webhook is processing
Check Render logs for:
```
{"event":"webhook.processed","webhook_event_id":"evt_..."}
```
If seeing `webhook.duplicate`, that's normal — Stripe retries are being correctly deduplicated.

#### Handle a failed webhook
1. Check Stripe Dashboard > Developers > Webhooks > select endpoint > Event deliveries
2. Find the failed event, note the event ID
3. Check webhook_events table: `SELECT * FROM webhook_events WHERE event_id = 'evt_...'`
4. If event is NOT in the table, click "Resend" in Stripe Dashboard
5. If event IS in the table but credits weren't granted, manually grant credits and log it

#### Handle a refund
1. Issue refund in Stripe Dashboard (never via API in V1)
2. Stripe sends refund confirmation email automatically
3. Decide whether to revoke credits:
   - If pack was not generated: leave credits (user may rebuy)
   - If pack was generated: no action needed (pack already delivered)
   - If abuse suspected: revoke credits manually via SQL

### Monitoring Checklist (Weekly)

- [ ] Check Stripe Dashboard > Developers > Webhooks for failed deliveries
- [ ] Check Render logs for `webhook.processing_failed` events
- [ ] Check Stripe Dashboard > Payments for any disputes
- [ ] Verify Stripe email settings are still enabled (receipts, failed payments, renewals)
- [ ] Check user_subscriptions table for any stuck `past_due` subscriptions > 7 days


================================================================
PHASE 13 — RENDER LAUNCH PLAYBOOK (founder-operable)
================================================================
Owner: Matt (solo founder)  Date: 2026-04-06
Repo: mattmcallister-create/chargeback-evidence-pack  Branch: main
Brand: ChargebackKit  Domain: chargebackkit.app
Stack: Next.js 14 (App Router) + Supabase + Stripe + Resend + PostHog
Hosting: Render Web Service (Node)
Email forwarding: ImprovMX  Registrar: GoDaddy

RULE: Nothing live flips without explicit founder confirmation in chat.
Render dashboard actions (create service, deploy, attach domain) are
documented here for the founder to execute. Code-side changes are
committed to main and verified before any cutover.

----------------------------------------------------------------
1. RENDER WEB SERVICE — CREATION PLAN
----------------------------------------------------------------
Service type:        Web Service (not Static Site, not Background Worker)
Source:              GitHub mattmcallister-create/chargeback-evidence-pack
Branch:              main  Auto-deploy: ON
Region:              Oregon (us-west) — closest to Stripe + Supabase US
Instance:            Starter ($7/mo) for launch; bump to Standard if p95>1s
Runtime:             Node 20 (set via .nvmrc or package.json engines)
Build command:       npm ci && npm run build
Start command:       npm run start -- -p $PORT -H 0.0.0.0
Health check path:   /api/health  (returns 200 JSON {ok:true})
Initial URL pattern: https://chargeback-evidence-pack-XXXX.onrender.com
                     (XXXX is the random suffix Render assigns)
Storage:             None on disk. PDFs are streamed in-memory and
                     written to Supabase Storage (bucket: packs).
                     Render filesystem is ephemeral — DO NOT persist.
Retention:           Supabase Storage lifecycle rule deletes packs
                     >90 days old (configure in Supabase dashboard).
Port binding:        Next.js binds 0.0.0.0:$PORT via the start cmd above.
Puppeteer:           If PDF gen uses Puppeteer, set
                     PUPPETEER_SKIP_DOWNLOAD=true and use
                     @sparticuz/chromium-min OR switch to @react-pdf/renderer.
                     Render Starter has limited memory; prefer @react-pdf.

----------------------------------------------------------------
2. ENVIRONMENT VARIABLES (Render dashboard -> Environment)
----------------------------------------------------------------
Legend: [R1]=required before first deploy  [R2]=required before cutover
        [O]=optional  See .env.example in repo root for canonical list.

# Public site config
NEXT_PUBLIC_SITE_URL          [R2] https://chargebackkit.app
                              [R1] https://chargeback-evidence-pack-XXXX.onrender.com
NEXT_PUBLIC_APP_URL           [R2] https://chargebackkit.app
                              [R1] same as initial onrender URL

# Supabase
NEXT_PUBLIC_SUPABASE_URL      [R1] https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY [R1] eyJ...
SUPABASE_SERVICE_ROLE_KEY     [R1] eyJ...  (server only — never NEXT_PUBLIC)

# Stripe
STRIPE_SECRET_KEY             [R1] sk_test_... (R1) -> sk_live_... (R2)
STRIPE_WEBHOOK_SECRET         [R1] whsec_... (rotate at cutover with live key)
STRIPE_PRICE_ID               [R1] price_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY [R1] pk_test_... -> pk_live_... at cutover

# Resend
RESEND_API_KEY                [R1] re_...
RESEND_FROM_EMAIL             [R1] ChargebackKit <noreply@chargebackkit.app>

# OpenAI (if narrative generator uses it)
OPENAI_API_KEY                [R1] sk-proj-...
OPENAI_MODEL                  [O]  gpt-4o-mini (default)

# PDF generation
PDF_ENGINE                    [O]  react-pdf (recommended) | puppeteer
PUPPETEER_SKIP_DOWNLOAD       [O]  true (only if puppeteer engine)

# PostHog analytics
NEXT_PUBLIC_POSTHOG_KEY       [R1] phc_...
NEXT_PUBLIC_POSTHOG_HOST      [R1] https://us.i.posthog.com

# Optional observability
SENTRY_DSN                    [O]

----------------------------------------------------------------
3. DEPLOYMENT SEQUENCE (do these IN ORDER)
----------------------------------------------------------------
STEP 1: Create Render Web Service
  - dashboard.render.com -> New + -> Web Service
  - Connect GitHub repo chargeback-evidence-pack
  - Set name: chargeback-evidence-pack (or chargebackkit)
  - Apply build/start commands from section 1
  - Save & deploy. Note the assigned onrender.com URL.

STEP 2: Add [R1] env vars
  - Set NEXT_PUBLIC_SITE_URL + NEXT_PUBLIC_APP_URL to the
    onrender URL temporarily.
  - Add Supabase, Stripe TEST keys, Resend, OpenAI, PostHog.
  - Trigger Manual Deploy -> Clear build cache & deploy.

STEP 3: Verify boot on onrender URL
  - GET /api/health -> 200 ok:true
  - GET / -> renders marketing landing
  - GET /pricing/ -> renders
  - GET /robots.txt -> Disallow includes /app/ /api/
  - GET /sitemap.xml -> contains chargebackkit.app URLs (or onrender host
    until you flip NEXT_PUBLIC_SITE_URL — that is intentional).

STEP 4: Wire integrations to onrender URL (TEMPORARY)
  - Stripe Dashboard (TEST mode):
      Developers -> Webhooks -> Add endpoint
      URL: https://<onrender>/api/webhooks/stripe
      Events: checkout.session.completed,
              customer.subscription.updated,
              customer.subscription.deleted,
              invoice.payment_failed
      Copy whsec_... -> set STRIPE_WEBHOOK_SECRET in Render -> redeploy.
  - Supabase Dashboard:
      Auth -> URL Configuration
      Site URL: https://<onrender>
      Redirect URLs: add https://<onrender>/auth/callback
                     and (later) https://chargebackkit.app/auth/callback

STEP 5: End-to-end smoke test ON onrender (use Stripe TEST card 4242 4242 4242 4242)
  - Visit /pricing/ -> click checkout CTA
  - Complete Stripe test checkout
  - Land on /checkout/success -> click Go to App -> /app loads
  - Verify webhook fired (Stripe dash -> webhook attempts -> 200)
  - Verify Supabase row inserted (subscription/customer)
  - Create a pack -> trigger PDF gen -> download PDF
  - Verify Resend email arrived at mattmcallistermarketing@gmail.com
  - Open billing portal -> verify return URL -> /app/settings

STEP 6: Attach custom domain chargebackkit.app
  - Render: Settings -> Custom Domains -> Add
    Add both: chargebackkit.app  AND  www.chargebackkit.app
  - Render gives you a CNAME target (e.g. <svc>.onrender.com)
    and an ALIAS/A record for the apex.
  - Configure GoDaddy DNS (see section 4).
  - Wait for Render to verify (usually <5 min, can take 1h).
  - Confirm Render shows TLS certificate Issued (Lets Encrypt auto).

STEP 7: Flip canonical to chargebackkit.app
  - Render env vars:
      NEXT_PUBLIC_SITE_URL = https://chargebackkit.app
      NEXT_PUBLIC_APP_URL  = https://chargebackkit.app
  - Manual Deploy.
  - Stripe webhook: ADD new endpoint pointed at
      https://chargebackkit.app/api/webhooks/stripe
    Update STRIPE_WEBHOOK_SECRET to the new whsec_.
    Keep the onrender webhook for 24h then DELETE.
  - Supabase Auth: change Site URL to https://chargebackkit.app.
    Keep both redirect URLs in the allowlist for 24h.
  - Resmoke-test the full flow on the canonical domain.

STEP 8: Cut Stripe over to LIVE mode
  - Swap STRIPE_SECRET_KEY, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    STRIPE_PRICE_ID, STRIPE_WEBHOOK_SECRET to live values.
  - Re-register the LIVE webhook at the canonical URL.
  - Run one $1 live transaction with a real card; refund immediately.

----------------------------------------------------------------
4. DNS — GoDaddy + Render + Resend + ImprovMX
----------------------------------------------------------------
Apex/www decision: SERVE ON APEX. www -> 301 redirect to apex.
Render handles the redirect automatically when both are added.

GoDaddy DNS records (chargebackkit.app):
  Type    Name    Value                                  TTL
  A       @       <Render apex IP from dashboard>        600
  CNAME   www     <svc>.onrender.com                     600

Resend (transactional sending from noreply@chargebackkit.app):
  In Resend dashboard -> Domains -> Add chargebackkit.app.
  Resend will give you 3-4 records to add in GoDaddy:
    TXT   send._domainkey   <DKIM key>                  3600
    TXT   @                 v=spf1 include:resend.com ~all  3600
    TXT   _dmarc            v=DMARC1; p=none; rua=mailto:mattmcallistermarketing@gmail.com
    MX    send              feedback-smtp.us-east-1.amazonses.com  10  3600
  Wait for Resend dashboard to mark domain Verified.

ImprovMX (inbound forwarding for hello@, support@, etc.):
  improvmx.com -> Add domain chargebackkit.app.
  Add MX records in GoDaddy at the APEX (not 'send'):
    MX   @   mx1.improvmx.com   10   3600
    MX   @   mx2.improvmx.com   20   3600
  In ImprovMX, create aliases all forwarding to mattmcallistermarketing@gmail.com:
    hello@chargebackkit.app    -> mattmcallistermarketing@gmail.com
    support@chargebackkit.app  -> mattmcallistermarketing@gmail.com
    *@chargebackkit.app        -> mattmcallistermarketing@gmail.com (catch-all)
  IMPORTANT: ImprovMX MX is on the apex; Resend MX is on 'send' subdomain.
  They DO NOT conflict because they are at different hostnames.

Public-facing addresses on the website (keep minimal):
  - support@chargebackkit.app  (footer + contact + legal pages)
  - hello@chargebackkit.app    (optional; only if used in marketing copy)
  All forward to mattmcallistermarketing@gmail.com via ImprovMX.

----------------------------------------------------------------
5. PRODUCTION READINESS CHECKLIST
----------------------------------------------------------------
[ ] Stripe TEST and LIVE clearly separated; LIVE keys only set at step 8
[ ] Stripe webhook registered on canonical domain; secret rotated
[ ] Stripe Customer Portal configured: cancel + update payment + invoices on,
    return URL = https://chargebackkit.app/app/settings
[ ] Resend domain verified (DKIM/SPF/DMARC green)
[ ] ImprovMX forwarding live for support@ and hello@
[ ] Supabase redirect URLs include both onrender and chargebackkit.app
    during cutover; onrender entry removed 24h after cutover
[ ] All secrets in Render env only — never committed to git
[ ] No /api/debug or /test routes shipped (grep app/api for 'debug')
[ ] No 'Coming soon' or placeholder copy on production pages
[ ] /privacy /terms /refund-policy pages match Stripe + Resend reality
[ ] Refund policy consistent across pricing, checkout copy, and legal
[ ] Single support contact: support@chargebackkit.app

----------------------------------------------------------------
6. SEARCH/CANONICAL READINESS
----------------------------------------------------------------
[ ] sitemap.xml served from chargebackkit.app contains only chargebackkit.app URLs
[ ] robots.txt Disallows /app/ and /api/, allows /
[ ] All <link rel=canonical> resolve to chargebackkit.app (no onrender leakage)
[ ] Open Graph + Twitter card image URLs use chargebackkit.app
[ ] /checkout/success and /checkout/cancel are noindex (already via app router config)
[ ] After cutover: submit sitemap to Google Search Console for chargebackkit.app
[ ] Verify chargebackkit.app in GSC via DNS TXT record (add to GoDaddy)
[ ] Set onrender.com URL as 'change of address' source if it ever got indexed
    (it should not — robots on onrender is fine since same code)

----------------------------------------------------------------
7. ANALYTICS INSTRUMENTATION (PostHog)
----------------------------------------------------------------
Why PostHog: free tier covers 1M events/mo, autocapture+pageviews out of the box,
session replays, funnels, retention, and feature flags from one tool.

Install (already covered in code via lib/analytics/posthog.ts):
  npm i posthog-js posthog-node
  Wrap app/layout.tsx <body> with <PostHogProvider> from lib/analytics.
  Autocapture is ON; pageviews are captured on route change.

Required custom events (call posthog.capture(name, props) at the call site):
  pageview                          (autocaptured)
  cta_click                         {location, label, href}
  pricing_view                      {plan_visible}
  checkout_start                    {plan, price_id}
  checkout_complete                 {plan, amount, currency}  (from /checkout/success)
  signup_start                      {method}
  signup_complete                   {user_id}
  pack_create_start                 {reason_code}
  pack_create_complete              {pack_id, reason_code, duration_ms}
  pdf_generate_start                {pack_id}
  pdf_generate_complete             {pack_id, pages, bytes, duration_ms}
  pdf_download                      {pack_id}
  pack_email_sent                   {pack_id}
  billing_portal_open               {}
  error                             {scope, message}

Funnels to build in PostHog (Insights -> Funnels):
  Acquisition: pageview(/) -> pricing_view -> checkout_start -> checkout_complete
  Activation:  signup_complete -> pack_create_start -> pdf_generate_complete -> pdf_download
  Revenue:     checkout_complete -> 7d retention pack_create_complete

Drop-off detection: PostHog Insights -> Funnel -> step-by-step conversion;
any step <20% conversion is flagged as a 'biggest drop-off' in the weekly report.

----------------------------------------------------------------
8. WEEKLY FOUNDER REPORT
----------------------------------------------------------------
Cadence: every Monday 09:00 PT.
Recipient: mattmcallistermarketing@gmail.com
Mechanism (simplest first):
  Option A (RECOMMENDED): PostHog 'Subscriptions' on a saved Dashboard.
    1. Build a Dashboard named 'ChargebackKit Weekly'.
    2. Add tiles: Total pageviews 7d, Top referrers, Top landing pages,
       cta_click count, pricing_view count, checkout_start count,
       checkout_complete count, Acquisition funnel, Activation funnel,
       Revenue tile (checkout_complete sum amount).
    3. Click Subscribe -> email -> mattmcallistermarketing@gmail.com,
       weekly Monday 09:00 PT.
  Option B (fallback): Render Cron Job hits /api/reports/weekly which queries
    PostHog HogQL via /api/projects/.../query and ships the digest via Resend.
    Implement only if PostHog Subscriptions is insufficient.

Required content:
  - total traffic (pageviews + unique visitors, 7d)
  - top 5 traffic sources (referrer host)
  - top 5 landing pages
  - on-site behavior (cta_click count, scroll depth via autocapture)
  - conversion-action clicks (pricing_view, checkout_start)
  - purchase actions (checkout_complete count + revenue $)
  - biggest drop-off (largest single-step % drop in either funnel)
  - week-over-week deltas on the above
  - top opportunities/anomalies (auto-flag any metric >2 sigma above 4-week mean)

----------------------------------------------------------------
9. RAPID POST-LAUNCH ITERATION TRIGGERS (first 72h)
----------------------------------------------------------------
IMMEDIATE FIX (act within 1h of signal):
  - error event count > 10/hr OR any 5xx > 1% of requests
  - checkout_start fired but checkout_complete = 0 over 6h with traffic >50
  - PDF generation failure rate > 5%
  - Supabase auth callback errors > 5
  - Stripe webhook failure rate > 1% (check Stripe dashboard)
  - Domain returns non-200 on /, /pricing/, /app, or /api/health

PRICING CHANGE TRIGGER:
  - pricing_view -> checkout_start conversion < 3% over 200+ pricing views
  - checkout_start -> checkout_complete conversion < 30% over 50+ starts
  - 3+ unsolicited 'too expensive' emails in support@

CTA / FUNNEL CHANGE TRIGGER:
  - landing -> pricing_view < 8% over 500 landings
  - cta_click but no pricing_view -> CTA destination wrong
  - high scroll depth >75% but low CTA click -> CTA invisible/unclear

PRODUCT UX CHANGE TRIGGER:
  - signup_complete -> pack_create_start < 50%
  - pack_create_start -> pdf_generate_complete < 70%
  - replays show repeated rage clicks or dead clicks (PostHog session replay)

CONTENT / SEO CHANGE TRIGGER:
  - 0 organic traffic after 7 days (check GSC impressions)
  - high bounce on a specific landing page (>80%, time<10s)
  - Search Console reports indexing errors

----------------------------------------------------------------
10. FOUNDER LAUNCH CHECKLIST (top to bottom)
----------------------------------------------------------------
PRELAUNCH:
  [ ] Pass 2 commits all on main (QA-002..QA-008) — DONE 2026-04-06
  [ ] .env.example present in repo — DONE
  [ ] /api/health route exists and returns 200 (verify before deploy)
  [ ] PostHog account created; project key in hand
  [ ] Resend account created; chargebackkit.app domain ready to add
  [ ] ImprovMX account created
  [ ] Supabase project provisioned; tables migrated
  [ ] Stripe account complete; LIVE mode activation requested
  [ ] Stripe products + prices created in BOTH test and live
RENDER CREATE:
  [ ] Web Service created from main branch (autodeploy ON)
  [ ] Build + start commands set
  [ ] First deploy succeeded; onrender URL noted
ENV VARS:
  [ ] All [R1] vars set in Render Environment
  [ ] Manual deploy after env var save
STRIPE:
  [ ] TEST webhook registered on onrender URL
  [ ] Customer Portal configured (return URL = /app/settings)
  [ ] Test card 4242 transaction succeeds end-to-end
RESEND:
  [ ] Domain chargebackkit.app added
  [ ] DKIM/SPF/DMARC records added in GoDaddy
  [ ] Domain shows Verified in Resend dashboard
  [ ] Test send to mattmcallistermarketing@gmail.com lands in inbox
IMPROVMX:
  [ ] Domain added; MX records in GoDaddy at apex
  [ ] support@chargebackkit.app alias forwards to gmail
  [ ] Catch-all alias enabled
  [ ] Self-test: send mail to support@ from gmail; confirm delivery
GODADDY DNS (final state after section 4):
  [ ] A @ -> Render apex IP
  [ ] CNAME www -> <svc>.onrender.com
  [ ] MX @ x2 -> ImprovMX
  [ ] TXT @ SPF (Resend)
  [ ] TXT send._domainkey DKIM (Resend)
  [ ] TXT _dmarc DMARC
  [ ] MX send -> Resend
  [ ] TXT for Google Search Console verification
RENDER CUSTOM DOMAIN:
  [ ] chargebackkit.app added in Render Custom Domains
  [ ] www.chargebackkit.app added
  [ ] Render shows both Verified + TLS Issued
SUPABASE:
  [ ] Site URL = https://chargebackkit.app
  [ ] Redirect allowlist contains chargebackkit.app and (temporarily) onrender URL
WEBHOOK CUTOVER:
  [ ] LIVE Stripe webhook registered on canonical URL
  [ ] STRIPE_WEBHOOK_SECRET updated in Render; manual deploy
  [ ] Old onrender webhook deleted 24h after cutover
ANALYTICS:
  [ ] PostHog provider mounted in app/layout
  [ ] Custom events firing (verify in PostHog Live Events tab)
  [ ] Funnels built (Acquisition, Activation, Revenue)
  [ ] Weekly Dashboard subscription emailing mattmcallistermarketing@gmail.com
SMOKE TEST (on chargebackkit.app, BEFORE announcing):
  [ ] / loads, no console errors
  [ ] /pricing/ loads
  [ ] CTA -> Stripe checkout (use $1 live card; refund)
  [ ] /checkout/success -> /app
  [ ] Create pack -> generate PDF -> download
  [ ] Receive transactional email
  [ ] Open billing portal -> return to /app/settings
  [ ] Send test mail to support@ -> arrives in gmail
ROLLBACK PLAN:
  - Render: Manual Deploy -> Rollback to previous successful deploy
  - Stripe: switch back to TEST keys in Render env; redeploy
  - DNS: revert A/CNAME at GoDaddy (TTL 600 = ~10min)
  - DB: Supabase Point-in-Time Recovery (paid plan) or Snapshot restore
INCIDENT RESPONSE:
  1. Acknowledge in #status (or just a note in claude-progress.txt)
  2. Snapshot Render logs + Stripe webhook attempts + Sentry/PostHog errors
  3. Rollback if revenue path is broken
  4. Patch on a branch -> PR -> merge -> auto-deploy -> verify
  5. Postmortem appended to claude-progress.txt within 24h
POST-LAUNCH (first 24h):
  [ ] Verify Render service uptime > 99% (Render Metrics tab)
  [ ] Verify Stripe webhook success rate = 100%
  [ ] Verify PostHog is receiving events
  [ ] Submit sitemap to Google Search Console
  [ ] Submit sitemap to Bing Webmaster Tools
FIRST WEEK MONITORING:
  [ ] Daily check of triggers in section 9
  [ ] First weekly report received Monday
  [ ] Identify top 3 funnel leaks; queue fixes for week 2

----------------------------------------------------------------
11. SAFETY GATE
----------------------------------------------------------------
Nothing in section 3 (deployment sequence) or section 8 (live cutover)
is executed by Claude without explicit, in-chat founder confirmation
naming the specific step (e.g. 'do step 6 now' or 'flip the live keys').
Code changes that prepare for these steps (env example, analytics lib,
doc updates) ARE landed on main automatically as part of phase 13.

================================================================
END PHASE 13 LAUNCH PLAYBOOK
================================================================
