# Database Schema — Chargeback Evidence Pack Builder
# Last updated: 2026-03-30 | Phase 2 Architecture
#
# Database: Supabase (PostgreSQL)
# Auth: Supabase Auth (built-in users table extended with profiles)
# All UUIDs use gen_random_uuid() as default
# All timestamps use timestamptz (UTC)
# RLS policies are defined in architecture/storage-rls.md

---

## DESIGN PRINCIPLES

1. Users own their data — all tables have user_id FK with RLS enforcement
2. Idempotency — webhook_events table prevents duplicate credit grants
3. Atomic credit deduction — deduct BEFORE generation starts, restore on failure
4. Append-only audit trail — generations are never deleted, just expired
5. Minimal PII storage — only what is needed to process and track disputes
6. Soft retention boundaries — use expires_at for file cleanup, not hard deletes

---

## TABLE: profiles

Extends Supabase's auth.users with app-specific fields.
Created automatically via trigger on auth.users insert.

```sql
CREATE TABLE public.profiles (
  id            uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email         text NOT NULL,
  full_name     text,
  stripe_customer_id  text UNIQUE,          -- Stripe customer ID for billing
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);
```

**Indexes:** PRIMARY KEY on id, UNIQUE on stripe_customer_id

---

## TABLE: user_credits

Tracks how many evidence packs a user has available to generate.
Credits are added by the Stripe webhook on checkout.session.completed.
Credits are deducted atomically at generation start.

```sql
CREATE TABLE public.user_credits (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  balance       integer NOT NULL DEFAULT 0 CHECK (balance >= 0),
  total_purchased  integer NOT NULL DEFAULT 0,  -- lifetime credits purchased
  total_used       integer NOT NULL DEFAULT 0,  -- lifetime credits consumed
  updated_at    timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT one_credit_record_per_user UNIQUE (user_id)
);

-- Atomic credit deduction function (call this before starting generation)
CREATE OR REPLACE FUNCTION public.deduct_credit(p_user_id uuid)
RETURNS boolean AS $$
DECLARE
  rows_affected integer;
BEGIN
  UPDATE public.user_credits
  SET balance = balance - 1,
      total_used = total_used + 1,
      updated_at = now()
  WHERE user_id = p_user_id AND balance > 0;

  GET DIAGNOSTICS rows_affected = ROW_COUNT;
  RETURN rows_affected > 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Credit restore function (call this if generation fails after deduction)
CREATE OR REPLACE FUNCTION public.restore_credit(p_user_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.user_credits
  SET balance = balance + 1,
      total_used = total_used - 1,
      updated_at = now()
  WHERE user_id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS
ALTER TABLE public.user_credits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own credits"
  ON public.user_credits FOR SELECT USING (auth.uid() = user_id);
-- No direct INSERT/UPDATE/DELETE from client — only via service role functions
```

**Indexes:** PRIMARY KEY, UNIQUE(user_id)

---

## TABLE: webhook_events

Idempotency log for Stripe webhook events.
Before processing any webhook, check this table.
If event_id already exists, skip processing and return 200.

```sql
CREATE TABLE public.webhook_events (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id      text NOT NULL UNIQUE,    -- Stripe event ID (e.g., evt_xxx)
  event_type    text NOT NULL,           -- e.g., checkout.session.completed
  processed_at  timestamptz NOT NULL DEFAULT now(),
  metadata      jsonb                    -- raw relevant fields for debugging
);

CREATE INDEX idx_webhook_events_event_id ON public.webhook_events(event_id);
-- No RLS needed — this table is only accessed by service role (server-side)
```

**Critical:** This table must be checked BEFORE crediting the user. Never process
the same event_id twice. Return HTTP 200 on duplicate (do not return error to Stripe).

---

## TABLE: packs

Core entity. One row per dispute evidence pack.
A pack is created when the merchant starts the intake flow.
It is paid for separately (via user_credits deduction at generation time).

```sql
CREATE TYPE pack_status AS ENUM (
  'draft',          -- intake in progress, not yet generated
  'generating',     -- generation job in progress
  'ready',          -- PDF generated, available for download
  'expired',        -- PDF deleted (72h retention window passed)
  'failed'          -- generation failed
);

CREATE TABLE public.packs (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,

  -- Dispute metadata
  dispute_category  text NOT NULL CHECK (dispute_category IN (
    'product_not_received',
    'product_unacceptable',
    'subscription_canceled',
    'duplicate',
    'credit_not_processed',
    'fraudulent'
  )),
  stripe_dispute_id  text,              -- optional: user's Stripe dispute ID for reference
  merchant_name      text,              -- optional: merchant's business name
  dispute_amount     numeric(10, 2),    -- disputed charge amount
  dispute_date       date,              -- date of original charge
  response_deadline  date,              -- deadline to respond (user-entered)

  -- Intake answers (raw JSON from form)
  intake_answers    jsonb NOT NULL DEFAULT '{}',

  -- Status tracking
  status            pack_status NOT NULL DEFAULT 'draft',
  generation_started_at  timestamptz,
  generation_completed_at  timestamptz,

  -- File references (Supabase Storage paths)
  pdf_storage_path  text,              -- e.g., pack-pdfs/{user_id}/{pack_id}.pdf
  pdf_expires_at    timestamptz,       -- 72h after generation_completed_at

  -- Metadata
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_packs_user_id ON public.packs(user_id);
CREATE INDEX idx_packs_status ON public.packs(status);
CREATE INDEX idx_packs_pdf_expires_at ON public.packs(pdf_expires_at)
  WHERE pdf_expires_at IS NOT NULL;

-- RLS
ALTER TABLE public.packs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own packs"
  ON public.packs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own packs"
  ON public.packs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own packs"
  ON public.packs FOR UPDATE USING (auth.uid() = user_id);
-- No DELETE from client — packs are expired, not deleted
```

**Notes on intake_answers:**
Store as JSONB keyed by question ID from evidence-matrix.md.
Example: { "PNR-01": "Blue Widget Pro", "PNR-02": "physical", "PNR-03": "2026-03-15" }
This is the data that gets fed to the OpenAI prompt.

**Notes on status transitions:**
draft → generating (on generate trigger, after credit deducted)
generating → ready (on successful PDF generation)
generating → failed (on error, credit restored)
ready → expired (on 72h cron job)

---

## TABLE: pack_exhibits

User-uploaded evidence files attached to a pack.
Files stored in Supabase Storage bucket: pack-exhibits.
Deleted when pack is expired or user deletes the pack.

```sql
CREATE TABLE public.pack_exhibits (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pack_id         uuid NOT NULL REFERENCES public.packs(id) ON DELETE CASCADE,
  user_id         uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,

  -- File metadata
  original_filename  text NOT NULL,
  storage_path       text NOT NULL,    -- pack-exhibits/{user_id}/{pack_id}/{exhibit_id}.{ext}
  file_size_bytes    integer NOT NULL,
  mime_type          text NOT NULL,

  -- Exhibit labeling
  exhibit_letter     text,             -- A, B, C, etc. — assigned at generation time
  exhibit_label      text,             -- e.g., "Carrier Tracking Confirmation"
  display_order      integer NOT NULL DEFAULT 0,

  -- Retention
  expires_at         timestamptz,      -- set when parent pack expires

  created_at         timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_pack_exhibits_pack_id ON public.pack_exhibits(pack_id);
CREATE INDEX idx_pack_exhibits_user_id ON public.pack_exhibits(user_id);

-- RLS
ALTER TABLE public.pack_exhibits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own exhibits"
  ON public.pack_exhibits FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own exhibits"
  ON public.pack_exhibits FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own exhibits"
  ON public.pack_exhibits FOR DELETE USING (auth.uid() = user_id);
```

**File size limits:** 10MB per file, max 8 exhibits per pack (covers exhibits A–H).
**Allowed types:** PDF, PNG, JPG, JPEG (evidence documents and screenshots).

---

## TABLE: pack_generations

Audit log of all generation attempts. One row per generation attempt.
Never deleted (used for debugging, retry tracking, and billing audit).

```sql
CREATE TYPE generation_status AS ENUM (
  'started',
  'completed',
  'failed'
);

CREATE TABLE public.pack_generations (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pack_id         uuid NOT NULL REFERENCES public.packs(id) ON DELETE CASCADE,
  user_id         uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,

  status          generation_status NOT NULL DEFAULT 'started',

  -- OpenAI usage tracking
  openai_tokens_input   integer,
  openai_tokens_output  integer,
  openai_model          text DEFAULT 'gpt-4o',

  -- Timing
  started_at      timestamptz NOT NULL DEFAULT now(),
  completed_at    timestamptz,
  duration_ms     integer,             -- generation wall-clock time

  -- Error info (if failed)
  error_code      text,
  error_message   text,

  -- Credit tracking
  credit_deducted  boolean NOT NULL DEFAULT false,
  credit_restored  boolean NOT NULL DEFAULT false
);

CREATE INDEX idx_pack_generations_pack_id ON public.pack_generations(pack_id);
CREATE INDEX idx_pack_generations_user_id ON public.pack_generations(user_id);
CREATE INDEX idx_pack_generations_status ON public.pack_generations(status);
-- No client-facing RLS needed — accessed only server-side
```

---

## TABLE: pack_deadlines

Tracks response deadlines for dispute packs.
Separate table to allow future notifications/reminders without coupling to packs.

```sql
CREATE TABLE public.pack_deadlines (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pack_id         uuid NOT NULL REFERENCES public.packs(id) ON DELETE CASCADE,
  user_id         uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,

  deadline_date   date NOT NULL,
  reminder_sent_at  timestamptz,       -- last reminder sent timestamp
  dismissed       boolean NOT NULL DEFAULT false,
  notes           text,                -- user notes about the deadline

  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_pack_deadlines_user_id ON public.pack_deadlines(user_id);
CREATE INDEX idx_pack_deadlines_deadline_date ON public.pack_deadlines(deadline_date);

-- RLS
ALTER TABLE public.pack_deadlines ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own deadlines"
  ON public.pack_deadlines FOR ALL USING (auth.uid() = user_id);
```

---

## RETENTION CRON JOB

Run every hour. Marks expired packs and deletes their storage files.

```sql
-- Query to find packs due for expiration
SELECT id, user_id, pdf_storage_path
FROM public.packs
WHERE status = 'ready'
  AND pdf_expires_at < now();

-- After deleting files from Supabase Storage:
UPDATE public.packs
SET status = 'expired',
    pdf_storage_path = NULL,
    updated_at = now()
WHERE id = $1;

-- Also expire exhibits
UPDATE public.pack_exhibits
SET expires_at = now()
WHERE pack_id = $1;
```

The cron job must:
1. Query for packs past their pdf_expires_at
2. Delete PDF from Supabase Storage (pack-pdfs bucket)
3. Delete all exhibit files from Supabase Storage (pack-exhibits bucket)
4. Update pack status to 'expired'
5. Log the deletion

---

## ADMIN HELPER QUERIES

```sql
-- Check user credit balance
SELECT p.email, uc.balance, uc.total_purchased, uc.total_used
FROM public.user_credits uc
JOIN public.profiles p ON p.id = uc.user_id
WHERE p.email = 'user@example.com';

-- Manually add credits (emergency use only — prefer Stripe checkout)
UPDATE public.user_credits
SET balance = balance + 1,
    total_purchased = total_purchased + 1,
    updated_at = now()
WHERE user_id = (SELECT id FROM public.profiles WHERE email = 'user@example.com');

-- View all packs for a user
SELECT id, dispute_category, status, created_at, pdf_expires_at
FROM public.packs
WHERE user_id = (SELECT id FROM public.profiles WHERE email = 'user@example.com')
ORDER BY created_at DESC;

-- View generation history for a pack
SELECT status, openai_tokens_input, openai_tokens_output,
       duration_ms, error_message, started_at
FROM public.pack_generations
WHERE pack_id = 'some-pack-uuid'
ORDER BY started_at DESC;

-- Upcoming deadlines (next 7 days)
SELECT pd.deadline_date, pk.dispute_category, p.email
FROM public.pack_deadlines pd
JOIN public.packs pk ON pk.id = pd.pack_id
JOIN public.profiles p ON p.id = pd.user_id
WHERE pd.deadline_date BETWEEN now()::date AND (now() + interval '7 days')::date
  AND pd.dismissed = false
ORDER BY pd.deadline_date;
```

---

## MIGRATION ORDER

Apply in this order when setting up Supabase:

1. Enable UUID extension: `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`
2. Create ENUM types: pack_status, generation_status
3. Create profiles table + trigger
4. Create user_credits table + functions
5. Create webhook_events table
6. Create packs table
7. Create pack_exhibits table
8. Create pack_generations table
9. Create pack_deadlines table
10. Enable RLS on all tables
11. Apply all policies
12. Create all indexes
13. Test with seed data (see quality/testplan.md)

---

## VERSION HISTORY

| Version | Date | Changes |
|---|---|---|
| 1.0 | 2026-03-30 | Initial schema — all tables |
