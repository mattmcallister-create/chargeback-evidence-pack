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
