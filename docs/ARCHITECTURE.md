# Architecture — Chargeback Evidence Pack Builder

_Last updated: 2026-03-31 | Status: Decided_

This is the authoritative architecture reference for v1. All decisions cross-reference `product/Decisions.md`. Do not implement anything that contradicts this document without logging a new DEC entry.

---

## 1. System Overview

Single Render service. No microservices. No separate workers. All components hang off one Next.js deployment.

```
[Browser]
    |
    v
[Next.js on Render]  (always-on service, free tier initially)
    |-- App Router (pages, layouts, server components)
    |-- Server Actions (form mutations, draft saves)
    |-- API Routes
         |-- /api/checkout          --> Stripe (create session)
         |-- /api/webhooks/stripe   <-- Stripe (event delivery)
         |-- /api/packs/*           <-> Supabase Postgres
         |-- /api/generate/*        --> OpenAI + Puppeteer
         |-- /api/download/*        --> Supabase Storage (signed URL)
         |-- /api/billing/portal    --> Stripe Customer Portal
         |-- /api/cron/*            <-- cron-job.org (secured)
    |
    |---- [Supabase]
    |         |-- Auth (email/password, sessions, JWT)
    |         |-- Postgres (7 tables, RLS enforced)
    |         |-- Storage (2 private buckets)
    |
    |---- [OpenAI GPT-4o] (narrative generation, server-side only)
    |
    |---- [Puppeteer / Chromium] (HTML->PDF, same Render process)
    |
    |---- [Resend] (transactional email: purchase confirmation)
    |
    |---- [Sentry] (error monitoring, production only)

[Stripe] -----checkout.session.completed-----> /api/webhooks/stripe
[cron-job.org] --POST /api/cron/retention----> Supabase Storage + Postgres (hourly)
[cron-job.org] --POST /api/cron/purge--------> Supabase Postgres (daily)
```

---

## 2. Architecture Options

### Option A — Unified Monolith (chosen, DEC-021)

| Dimension | Choice |
|---|---|
| Frontend | Next.js 14+ App Router, Tailwind CSS, shadcn/ui |
| Backend | Next.js API routes + server actions (same process) |
| Auth | Supabase Auth (email/password) |
| Database | Supabase Postgres (managed, same project as Auth + Storage) |
| Storage | Supabase Storage (2 private buckets, RLS) |
| PDF generation | Puppeteer (Chromium binary on Render service) |
| Email (auth) | Supabase built-in SMTP (verification, password reset) |
| Email (transactional) | Resend (purchase confirmation; free tier 100/day) |
| Render compatibility | Full — always-on service, no serverless constraints |
| Operational burden | Minimal — one deploy, one provider dashboard for DB/Auth/Storage |
| Security risks | Chromium on server (acceptable); shared process for generation |

**Pros:** One codebase, one deploy, one provider for auth/db/storage. No cross-service auth tokens. No distributed state to debug. Single .env file. Supabase free tier covers early traffic.

**Cons:** Puppeteer adds ~300MB to container memory. If generation is slow it shares the request worker pool with page requests. (Mitigated by async 202 pattern — see Section 7.)

### Option B — Split Services (rejected)

| Dimension | Choice |
|---|---|
| Frontend/API | Next.js on Render |
| PDF worker | Separate Express.js service on Render |
| Database | Neon Postgres (serverless) |
| Storage | AWS S3 or Cloudflare R2 |
| Auth | NextAuth.js |

**Why rejected:** Two Render services to keep in sync. Cross-service JWT passing for the PDF worker. S3 bucket config + IAM policy management. Multiple .env files. Harder to debug for a solo founder. No user benefit at V1 volume (<100 packs/month). The added complexity is engineering debt with no payoff until significant scale. See DEC-021.

---

## 3. Auth Model Decision

### Comparison

| Dimension | Email/Password | Magic Link | Stripe-Linked |
|---|---|---|---|
| Login reliability | High (no email needed to log in) | Medium (email delivery required every login) | Low (custom webhook-to-account flow) |
| User expectation | Standard for B2B tools | Common for consumer apps | Unusual |
| Implementation | Supabase Auth built-in | Supabase Auth built-in + SMTP config | Custom: create account on webhook, verify email |
| Locked-out risk | Password reset only (rare) | Email deliverability issue = locked out on every login attempt | Depends entirely on email delivery |
| Returning user | Fast (email + password) | Waits for email each time | Complex |
| Solo-founder maintainability | High | Medium | Low |

### Decision: Email/Password (DEC-017)

Email/password is chosen for three reasons. First, this is a B2B tool used by merchants under time pressure — an active chargeback has a deadline. If a merchant cannot log in because an OTP email is delayed, the product has failed them at the worst possible moment. Second, Supabase Auth handles signup, hashing, verification, password reset, JWT issuance, and refresh tokens natively. Zero custom auth code required. Third, magic link requires reliable SMTP at every login, not just at signup — a higher operational dependency for no UX gain with this audience.

Stripe-linked account creation was considered but rejected: it requires a webhook-to-account flow with no clean path for direct login by returning users.

Supabase built-in SMTP handles: email verification on signup, password reset link delivery. Both are one-time actions (not every login), so email delivery unreliability is a much smaller risk.

---

## 4. Data Model

Seven tables. All in Supabase Postgres. All tables enforce Row Level Security. Client queries use the `NEXT_PUBLIC_SUPABASE_ANON_KEY` with the user's JWT (enforces RLS). Server-side operations use `SUPABASE_SERVICE_ROLE_KEY` (bypasses RLS, never sent to client).

### 4.1 profiles

Extends `auth.users` with app-specific fields. Created by a Postgres trigger on `auth.users INSERT`.

```sql
CREATE TABLE profiles (
  id                 uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email              text NOT NULL,
  full_name          text,
  stripe_customer_id text UNIQUE,
  created_at         timestamptz DEFAULT now(),
  updated_at         timestamptz DEFAULT now()
);
-- RLS: SELECT/UPDATE own row only. INSERT via trigger. No client DELETE.
```

### 4.2 user_credits

One row per user. Credits are never manipulated directly from application code. Only `deduct_credit()` and `restore_credit()` SECURITY DEFINER functions touch this table — see Section 4.8.

```sql
CREATE TABLE user_credits (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid UNIQUE NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  credits    int NOT NULL DEFAULT 0 CHECK (credits >= 0),
  updated_at timestamptz DEFAULT now()
);
-- RLS: SELECT own row only. No INSERT/UPDATE/DELETE from client.
```

### 4.3 webhook_events

Idempotency table for Stripe webhooks. Prevents duplicate credit grants when Stripe retries delivery.

```sql
CREATE TABLE webhook_events (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id     text UNIQUE NOT NULL,   -- Stripe evt_... ID
  event_type   text NOT NULL,
  processed_at timestamptz DEFAULT now(),
  payload      jsonb
);
-- RLS: No client access. Server-side only via SUPABASE_SERVICE_ROLE_KEY.
```

### 4.4 packs

Core entity. One row per dispute pack. Intake answers stored as JSONB.

```sql
CREATE TABLE packs (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  dispute_category text NOT NULL CHECK (dispute_category IN (
                     'fraudulent', 'subscription_cancelled',
                     'product_not_received', 'product_not_as_described',
                     'duplicate_charge', 'credit_not_processed'
                   )),
  dispute_amount   numeric(10,2),
  stripe_dispute_id text,
  cardholder_name  text,
  card_last4       text CHECK (card_last4 ~ '^[0-9]{4}$'),
  intake_answers   jsonb,
  status           text NOT NULL DEFAULT 'draft' CHECK (status IN (
                     'draft', 'generating', 'generated', 'failed', 'expired'
                   )),
  expires_at       timestamptz,   -- set to now() + 72h on generation
  created_at       timestamptz DEFAULT now(),
  updated_at       timestamptz DEFAULT now()
);
-- RLS: SELECT/INSERT/UPDATE own rows only. No DELETE from client.
-- Status transitions validated server-side before UPDATE.
```

### 4.5 pack_exhibits

File metadata. Actual files live in Supabase Storage bucket `pack-exhibits`.

```sql
CREATE TABLE pack_exhibits (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pack_id       uuid NOT NULL REFERENCES packs(id) ON DELETE CASCADE,
  user_id       uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  file_name     text NOT NULL,
  storage_path  text NOT NULL,    -- {user_id}/{pack_id}/{filename}
  file_size     int NOT NULL CHECK (file_size <= 10485760),   -- 10 MB max
  mime_type     text NOT NULL CHECK (mime_type IN (
                  'application/pdf', 'image/png', 'image/jpeg'
                )),
  display_label text,
  display_order int DEFAULT 0,
  uploaded_at   timestamptz DEFAULT now()
);
-- RLS: SELECT/INSERT/DELETE own rows only.
```

### 4.6 pack_generations

Audit log for every generation attempt. Enables credit restoration on failure and cost tracking.

```sql
CREATE TABLE pack_generations (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pack_id           uuid NOT NULL REFERENCES packs(id) ON DELETE CASCADE,
  user_id           uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status            text NOT NULL DEFAULT 'pending' CHECK (
                      status IN ('pending', 'succeeded', 'failed')
                    ),
  pdf_storage_path  text,          -- set on success: {user_id}/{pack_id}/pack.pdf
  openai_request_id text,
  credit_deducted   boolean DEFAULT false,
  credit_restored   boolean DEFAULT false,
  error_message     text,
  started_at        timestamptz DEFAULT now(),
  completed_at      timestamptz
);
-- RLS: SELECT own rows only. No INSERT/UPDATE from client.
```

### 4.7 pack_deadlines

Separate from packs so dismissal does not mutate the pack record.

```sql
CREATE TABLE pack_deadlines (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pack_id          uuid UNIQUE NOT NULL REFERENCES packs(id) ON DELETE CASCADE,
  user_id          uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  deadline_date    date NOT NULL,
  dismissed        boolean DEFAULT false,
  marked_submitted boolean DEFAULT false,
  created_at       timestamptz DEFAULT now()
);
-- RLS: SELECT/INSERT/UPDATE own rows only.
```

### 4.8 SECURITY DEFINER Functions

These functions run with elevated privileges regardless of the calling user. Called from server-side code only.

```sql
-- Atomic credit deduction. Raises exception if insufficient.
CREATE OR REPLACE FUNCTION deduct_credit(p_user_id uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  UPDATE user_credits
  SET credits = credits - 1, updated_at = now()
  WHERE user_id = p_user_id AND credits > 0;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'insufficient_credits';
  END IF;
END;
$$;

-- Credit restoration on generation failure.
CREATE OR REPLACE FUNCTION restore_credit(p_user_id uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  UPDATE user_credits
  SET credits = credits + 1, updated_at = now()
  WHERE user_id = p_user_id;
END;
$$;

-- Credit grant from webhook (supports quantity for bundles).
CREATE OR REPLACE FUNCTION add_credits(p_user_id uuid, p_quantity int)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO user_credits (user_id, credits)
  VALUES (p_user_id, p_quantity)
  ON CONFLICT (user_id)
  DO UPDATE SET credits = user_credits.credits + p_quantity,
                updated_at = now();
END;
$$;
```

---

## 5. API Routes

All routes under `app/api/` (Next.js App Router). All routes require a valid Supabase session except `/api/webhooks/stripe` (signature-verified) and `/api/cron/*` (CRON_SECRET header).

```
AUTH
POST   /api/auth/logout                          Invalidate session

PACKS
GET    /api/packs                                List user's packs (max 50, paginated)
POST   /api/packs                                Create new pack draft
GET    /api/packs/[packId]                       Get pack + exhibits + deadline
PATCH  /api/packs/[packId]                       Update intake answers or deadline

EXHIBITS
POST   /api/packs/[packId]/exhibits              Issue signed upload URL (60s expiry)
DELETE /api/packs/[packId]/exhibits/[exhibitId]  Delete exhibit (storage + DB row)

GENERATION
POST   /api/packs/[packId]/generate              Start generation -> 202 Accepted
GET    /api/packs/[packId]/generate/status       Poll status (pending/generating/generated/failed)

DOWNLOAD
GET    /api/packs/[packId]/download              Issue signed download URL (15min expiry)

PAYMENTS
POST   /api/checkout                             Create Stripe Checkout session
GET    /api/checkout/success                     Display-only post-redirect confirmation

WEBHOOK
POST   /api/webhooks/stripe                      Stripe event receiver
                                                 export const dynamic = 'force-dynamic'
                                                 MUST disable body parsing

BILLING
GET    /api/billing/portal                       Create Stripe Customer Portal session

CRON (Authorization: Bearer CRON_SECRET)
POST   /api/cron/retention                       Delete expired pack files (hourly)
POST   /api/cron/purge-answers                   Null intake_answers > 90 days (daily)

ADMIN (future: admin flag on profiles)
GET    /api/admin/health                         DB connectivity health check
```

### Route Security Rules

1. All routes: validate Supabase JWT server-side, extract `userId` from session.
2. All pack routes: explicitly check `packs.user_id = userId` even with RLS active (triple-layer defence).
3. `/api/webhooks/stripe`: no session check; Stripe signature verification only; raw body required.
4. `/api/cron/*`: no session check; check `Authorization: Bearer ${CRON_SECRET}` header.
5. Generation endpoint: before deducting credit, confirm pack status is `draft`. Prevents double-generation.

---

## 6. Background Jobs

Two cron jobs. Both are secured Next.js API routes called by cron-job.org (free external cron service). This approach works on Render free tier without a persistent worker. See DEC-019.

On Render paid tier, migrate to Render's native cron service to remove the external dependency.

### 6.1 Retention Job — POST /api/cron/retention

Frequency: Every 1 hour. Deletes files and marks expired packs.

```
1. Verify: Authorization header === 'Bearer ' + CRON_SECRET
2. Query:  SELECT id, user_id FROM packs
           WHERE expires_at < now() AND status != 'expired'
           LIMIT 100   <- batch to avoid long-running requests
3. For each pack:
   a. supabase.storage.from('pack-exhibits').remove([{user_id}/{pack_id}/*])
   b. supabase.storage.from('pack-pdfs').remove([{user_id}/{pack_id}/*])
   c. UPDATE packs SET status = 'expired' WHERE id = pack.id
4. Log: [cron/retention] Expired N packs
5. Return 200 { expired: N }
```

### 6.2 Intake Answer Purge — POST /api/cron/purge-answers

Frequency: Once daily (midnight UTC). Nulls intake_answers on old packs.

```
1. Verify: Authorization header === 'Bearer ' + CRON_SECRET
2. Query:  SELECT id FROM packs
           WHERE created_at < now() - interval '90 days'
             AND intake_answers IS NOT NULL
3. UPDATE packs SET intake_answers = NULL WHERE id IN (...)
4. Log: [cron/purge-answers] Purged answers for N packs
5. Return 200 { purged: N }
```

---

## 7. Generation Pipeline (Async 202 Pattern)

Generation is CPU- and time-intensive (OpenAI call + Puppeteer render). It runs async to prevent connection timeouts.

```
POST /api/packs/[packId]/generate
    |
    v
1.  Auth check: user owns pack
2.  Status check: pack.status === 'draft'
3.  Entitlement check: user_credits.credits > 0
4.  deduct_credit(userId)            <- atomic DB function, raises if 0
5.  INSERT pack_generations { status: 'pending', credit_deducted: true }
6.  UPDATE packs SET status = 'generating'
7.  Return 202 Accepted { generationId }
    |
    v (async, same Node.js process, does not block response)
8.  POST to OpenAI /v1/chat/completions
    - model: gpt-4o
    - system: shared no-win-guarantee guardrails prompt
    - user: category-specific template + sanitized intake_answers
    - response_format: { type: 'json_object' }
    - temperature: 0.3, max_tokens: 1000, timeout: 30s
9.  Parse GenerationResult JSON (rebuttal_narrative, evidence_gaps, win_assessment)
10. Render HTML evidence pack template (Node.js template literals)
    - Cover page, category checklist, rebuttal narrative, exhibit pages
11. Puppeteer: await page.pdf({ format: 'A4', printBackground: true })
12. Upload PDF buffer to pack-pdfs/{user_id}/{pack_id}/pack.pdf
13. UPDATE packs SET status = 'generated', expires_at = now() + interval '72 hours'
14. UPDATE pack_generations SET status = 'succeeded', pdf_storage_path = ..., completed_at = now()

On any failure at step 8-12 (after credit deducted):
15. restore_credit(userId)
16. UPDATE packs SET status = 'failed'
17. UPDATE pack_generations SET status = 'failed', credit_restored = true, error_message = ...
```

Client polls `GET /api/packs/[packId]/generate/status` every 3 seconds. Returns `{ status: 'pending' | 'generating' | 'generated' | 'failed' }`. On `generated`, client shows download button. On `failed`, client shows error + credit-restored confirmation.

---

## 8. Storage Model

Two Supabase Storage buckets. Both private. No public read access.

| Bucket | Who uploads | Who reads | Max object size | Allowed MIME types |
|---|---|---|---|---|
| pack-exhibits | Client via signed upload URL (60s) | Server only (PDF assembly) | 10 MB | application/pdf, image/png, image/jpeg |
| pack-pdfs | Server only (Puppeteer upload) | Server (issues signed download URL) | 50 MB | application/pdf |

**Path convention:** `{bucket}/{user_id}/{pack_id}/{filename}`

**Signed upload URL** (pack-exhibits):
- Issued by `POST /api/packs/[packId]/exhibits`
- Server validates: user owns pack, pack is in `draft` status, exhibit count < 20, MIME type allowed, file size within limit
- 60-second expiry; client uploads directly to Supabase Storage using the signed URL
- After upload, client POSTs metadata (file_name, storage_path, file_size, mime_type) to server to INSERT pack_exhibits row

**Signed download URL** (pack-pdfs):
- Issued by `GET /api/packs/[packId]/download`
- Server validates: user owns pack, status = `generated`, not expired
- 15-minute expiry; URL is not shareable (expires before typical forwarding)

`SUPABASE_SERVICE_ROLE_KEY` is used server-side to issue signed URLs and perform server-to-storage writes. Never sent to client.

---

## 9. Access Model

Triple-layer defence. A bug in any single layer does not expose data.

**Layer 1 — Supabase Auth JWT**
Every client request carries a Supabase JWT in the Authorization header or cookie. Server-side routes call `supabase.auth.getUser()` before any data operation. No JWT = 401.

**Layer 2 — Row Level Security (RLS)**
All tables enforce RLS. Core policy pattern:
```sql
CREATE POLICY "user_owns_row" ON packs FOR ALL
USING (auth.uid() = user_id);
```
RLS is always enabled. The service role key bypasses it server-side only.

**Layer 3 — Explicit Server-Side Ownership Check**
Every sensitive API route performs an explicit ownership query even with RLS active:
```typescript
const { data: pack, error } = await supabase
  .from('packs')
  .select('id, user_id, status, expires_at')
  .eq('id', packId)
  .eq('user_id', session.user.id)  // <- explicit, redundant with RLS
  .single();

if (!pack) return NextResponse.json({ error: 'Not found' }, { status: 404 });
```
This means a RLS misconfiguration alone cannot expose data to another user.

---

## 10. File and Exhibit Limits

| Limit | Value | Enforced by |
|---|---|---|
| Max exhibits per pack | 20 files | Server (count check before signing upload URL) |
| Max exhibit file size | 10 MB | Supabase Storage bucket policy + server check |
| Allowed exhibit MIME types | PDF, PNG, JPEG | Server (MIME check) + bucket CORS policy |
| Max generated PDF size | 50 MB | Supabase Storage bucket policy |
| Max intake answer field | 2,000 characters | Server input validation (before AI prompt injection) |
| Max dispute amount | 999,999.99 | DB CHECK constraint on packs.dispute_amount |
| Max exhibit label length | 100 characters | Server input validation |

Server-side validation before issuing a signed upload URL:
```typescript
const MAX_EXHIBITS = 20;
const MAX_FILE_SIZE = 10 * 1024 * 1024;  // 10 MB
const ALLOWED_MIME = ['application/pdf', 'image/png', 'image/jpeg'];

const { count } = await supabase
  .from('pack_exhibits')
  .select('id', { count: 'exact', head: true })
  .eq('pack_id', packId);

if ((count ?? 0) >= MAX_EXHIBITS)
  return NextResponse.json({ error: 'Max 20 exhibits per pack' }, { status: 400 });

if (fileSize > MAX_FILE_SIZE)
  return NextResponse.json({ error: 'File exceeds 10 MB limit' }, { status: 400 });

if (!ALLOWED_MIME.includes(mimeType))
  return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
```

---

## 11. Retention and Deletion Flow

### 11.1 Pack Expiry (72 hours after generation)

```
PDF generated successfully
    |
    v
packs.expires_at = now() + 72h
packs.status = 'generated'
    |
    v  (hourly cron)
SELECT packs WHERE expires_at < now() AND status != 'expired'
    |
    |-- Delete pack-exhibits/{user_id}/{pack_id}/* from Supabase Storage
    |-- Delete pack-pdfs/{user_id}/{pack_id}/*    from Supabase Storage
    |
    v
UPDATE packs SET status = 'expired'
```

Pack record and intake_answers are retained after expiry (for re-generation within 90 days). Only stored files are deleted.

### 11.2 Intake Answer Purge (90 days after creation)

```
daily cron: packs WHERE created_at < now() - 90 days AND intake_answers IS NOT NULL
    |
    v
UPDATE packs SET intake_answers = NULL
```
Pack record is retained for dashboard history. Only the JSONB intake payload is removed.

### 11.3 Account Deletion

```
User requests account deletion (server action)
    |
    v
1. List all storage objects: pack-exhibits/{user_id}/*
2. Delete all from pack-exhibits bucket
3. List all storage objects: pack-pdfs/{user_id}/*
4. Delete all from pack-pdfs bucket
5. DELETE FROM auth.users WHERE id = user_id
   (cascades via FK: profiles -> user_credits, packs, pack_exhibits, pack_generations, pack_deadlines)
6. Log: [account/delete] Deleted user {userId}, removed N files
```

Stripe customer record is NOT deleted. Financial records must be retained for 7 years.

### 11.4 User-Facing Disclosure

Shown on the generation confirmation screen:

> "Your evidence pack will be available to download for 72 hours. After that, your uploaded files and generated PDF are permanently deleted. Save your download. You can re-build from saved answers for 90 days."

---

## 12. Stripe Billing Architecture

### 12.1 Entitlement State Machine

```
GUEST
  | (signup)
  v
AUTHENTICATED_NO_CREDITS
  | (checkout.session.completed webhook)
  v
AUTHENTICATED_WITH_CREDITS (1 or 3)
  | (deduct_credit() on generate)
  v
AUTHENTICATED_NO_CREDITS  (or stays WITH_CREDITS if bundle credits remain)
```

Entitlement is always read from `user_credits.credits` server-side. The checkout success redirect URL is display-only and never used for provisioning.

### 12.2 Checkout Flow

```
1. User clicks "Buy Pack" or hits generation gate
2. Client: POST /api/checkout { priceId }
3. Server:
   a. Get or create Stripe customer (store stripe_customer_id on profiles)
   b. stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [{ price: STRIPE_PRICE_ID, quantity: 1 }],
        success_url: APP_URL + '/checkout/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url:  APP_URL + '/pricing',
        customer: stripeCustomerId,
        metadata: { user_id: userId, pack_type: 'single' }  // or 'bundle'
      })
   c. Return { url: checkoutSession.url }
4. Client redirects to Stripe-hosted Checkout
5. User pays
6. Stripe fires checkout.session.completed to /api/webhooks/stripe
7. Webhook provisions credits (see 12.3)
8. User lands on /checkout/success?session_id=...
   -> Server reads session from Stripe for display only (NOT for provisioning)
   -> Client shows "Payment confirmed" + redirects to /dashboard
```

Step 7 (webhook) is the ONLY provisioning path. Step 8 is display only.

### 12.3 Webhook Handler

```typescript
// /api/webhooks/stripe
// Body parsing must be disabled for raw body access:
// export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const rawBody = await request.text();     // raw string, not parsed JSON
  const sig = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return new Response('Invalid signature', { status: 400 });
  }

  // Only handle checkout completion; return 200 for all other events
  if (event.type !== 'checkout.session.completed') {
    return new Response('Ignored', { status: 200 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  // Idempotency: check if already processed
  const { data: existing } = await supabaseAdmin
    .from('webhook_events')
    .select('id')
    .eq('event_id', event.id)
    .single();

  if (existing) {
    return new Response('Already processed', { status: 200 });
  }

  // Record event BEFORE credit grant (prevents double-grant on concurrent retry)
  await supabaseAdmin.from('webhook_events').insert({
    event_id: event.id,
    event_type: event.type,
    payload: session,
  });

  // Grant credits
  const userId = session.metadata?.user_id;
  const packType = session.metadata?.pack_type;
  const quantity = packType === 'bundle' ? 3 : 1;

  await supabaseAdmin.rpc('add_credits', { p_user_id: userId, p_quantity: quantity });

  console.log(`[webhook/stripe] ${event.id} -> +${quantity} credits for user ${userId}`);
  return new Response('OK', { status: 200 });
}
```

### 12.4 Stripe Restricted Key

Create a restricted key in Stripe Dashboard → Developers → API keys:

| Resource | Permission |
|---|---|
| Checkout Sessions | Write |
| Customers | Write |
| Billing Portal Sessions | Write |
| Prices | Read |
| Events | Read |
| All others | None |

Use this restricted key as `STRIPE_SECRET_KEY` in production. Never use the full secret key in the application.

### 12.5 Customer Portal

```typescript
// GET /api/billing/portal
const session = await stripe.billingPortal.sessions.create({
  customer: stripeCustomerId,
  return_url: process.env.NEXT_PUBLIC_APP_URL + '/dashboard',
});
return NextResponse.redirect(session.url);
```

Portal shows: payment history, PDF receipts/invoices. No subscription management in V1 (no subscriptions exist).

---

## 13. Logging and Monitoring

### 13.1 Log Format

All server-side log lines use a structured prefix for easy grep in Render logs:

```
[route/operation] action | key=value
```

Examples:
```
[webhook/stripe] checkout.session.completed evt_abc123 | user=xyz credits=+1
[cron/retention] completed | expired=3 packs=[abc,def,ghi]
[generate/pack] started | pack=abc user=xyz
[generate/pack] completed | pack=abc duration=12.3s
[generate/pack] FAILED | pack=abc error=openai_timeout credit_restored=true
[download/pack] signed_url issued | pack=abc user=xyz expires=15min
```

Never log: API keys, raw webhook payloads, full intake_answers, cardholder data, full Stripe session objects.

### 13.2 Error Monitoring

Sentry (`@sentry/nextjs`, free tier: 5K errors/month). Configure DSN in `SENTRY_DSN`. Sufficient for V1 volume. Set `beforeSend` filter to strip sensitive fields before event upload.

### 13.3 Uptime Monitoring

UptimeRobot (free tier): Monitor `GET /api/admin/health` every 5 minutes. Alert on 2 consecutive failures.

```typescript
// GET /api/admin/health
export async function GET() {
  const { error } = await supabase.from('profiles').select('id').limit(1);
  return Response.json({
    status: error ? 'error' : 'ok',
    db: error ? error.message : 'ok',
    ts: new Date().toISOString(),
  });
}
```

### 13.4 OpenAI Cost Monitoring

Check `platform.openai.com/usage` daily for the first 30 days. Target: <$5/day (alert threshold). At $0.05–0.15 per pack, this triggers at 33–100 packs/day — beyond V1 scale. If costs exceed budget, fall back to GPT-4o-mini for a draft pass.

---

## 14. Security Considerations

| Risk | Mitigation |
|---|---|
| API key exposure | All secrets in env vars only. SUPABASE_SERVICE_ROLE_KEY and STRIPE_SECRET_KEY never in client bundle, never logged. |
| Prompt injection | Intake answers are stripped of HTML/special chars before insertion into OpenAI prompts. Max 2,000 chars per field. |
| Credit bypass | Credits provisioned only via webhook handler. Checkout success redirect is display-only, no provisioning logic. |
| Webhook replay | webhook_events table enforces UNIQUE on event_id. INSERT before credit grant prevents race condition on concurrent retry. |
| IDOR on packs | Triple-layer: JWT auth + RLS + explicit user_id check in every API route. |
| File type spoofing | MIME type checked server-side using file magic bytes (not Content-Type header alone). Reject non-allowlisted types. |
| Unsigned download | Downloads always use signed URLs (15-min expiry). No publicly accessible storage paths. Never return a storage URL directly. |
| Chromium attack surface | Puppeteer renders a server-generated HTML template only. No user input is directly passed to the browser context. --no-sandbox --disable-dev-shm-usage flags set for container environments. |
| Retention non-compliance | Cron runs hourly. Missed run = compliance delay, not breach. Monitor daily log for [cron/retention] entries. |
| Stripe webhook forgery | Raw body + STRIPE_WEBHOOK_SECRET enforced. Any body parsing before signature check = vulnerability. |

---

## 15. Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=           # Public: used in client bundle
NEXT_PUBLIC_SUPABASE_ANON_KEY=      # Public: enforces RLS, not a secret
SUPABASE_SERVICE_ROLE_KEY=          # SERVER ONLY. Bypasses RLS. Never expose.

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY= # Public: for Stripe.js on client
STRIPE_SECRET_KEY=                  # SERVER ONLY. Use restricted key in prod.
STRIPE_WEBHOOK_SECRET=              # SERVER ONLY. From Stripe Dashboard endpoint.
STRIPE_PRICE_ID_SINGLE_PACK=        # $39 price ID (prod and test differ)
STRIPE_PRICE_ID_BUNDLE_3=           # $99 bundle price ID

# OpenAI
OPENAI_API_KEY=                     # SERVER ONLY. Monitor daily usage.

# Cron security
CRON_SECRET=                        # Random 32-byte hex. SERVER ONLY.
                                    # cron-job.org sends as Authorization: Bearer {CRON_SECRET}

# App
NEXT_PUBLIC_APP_URL=                # https://app.chargebackpack.com (no trailing slash)
NODE_ENV=                           # development | production

# Email (transactional)
RESEND_API_KEY=                     # SERVER ONLY. Resend.com free tier (100/day).

# Monitoring
SENTRY_DSN=                         # Optional. Production only.
```

### Secret Scanning

Run `git-secrets` or `trufflesecurity/trufflehog` on every commit. Add pre-commit hook. Never commit .env files. Verify .gitignore includes `.env*`.

---

## 16. Key Operational Decisions Summary

| DEC | Decision | See |
|---|---|---|
| DEC-001 | Render (free tier, upgrade on traction) | Decisions.md |
| DEC-002 | Stripe Checkout + webhooks + Customer Portal | Decisions.md |
| DEC-003 | 72h file retention, 90d intake retention | Decisions.md |
| DEC-009 | Stripe least-privilege restricted keys | Decisions.md |
| DEC-011 | Puppeteer for PDF generation | Decisions.md |
| DEC-012 | 7-table Postgres schema | Decisions.md |
| DEC-013 | Async 202 generation + polling | Decisions.md |
| DEC-014 | Supabase Storage, 2 private buckets, RLS | Decisions.md |
| DEC-015 | GPT-4o, JSON output, temp 0.3 | Decisions.md |
| DEC-017 | Email/password auth (Supabase Auth) | This doc, Section 3 |
| DEC-018 | Resend for transactional email | Decisions.md |
| DEC-019 | cron-job.org for background jobs | Decisions.md |
| DEC-020 | Sentry for error monitoring | Decisions.md |
| DEC-021 | Option A: monolith (this document) | Decisions.md |

---

_Cross-references: `product/Decisions.md`, `product/PRD.md`, `ops/runbook.md`_
_Last updated by: Claude (Session 005, 2026-03-31)_
