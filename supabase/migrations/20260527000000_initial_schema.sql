-- ChargebackKit Initial Schema Migration
-- Exported from Supabase project: rcuccrirniqmomrsparw
-- Date: 2026-05-27
--
-- This migration creates the full database schema from scratch.
-- Run against a fresh Supabase project to recreate the database.

-- ============================================================
-- TABLES
-- ============================================================

-- Profiles (linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT,
  full_name TEXT,
  stripe_customer_id TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- User credits
CREATE TABLE IF NOT EXISTS public.user_credits (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id),
  credits INTEGER NOT NULL DEFAULT 0 CHECK (credits >= 0),
  lifetime_credits_used INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- User subscriptions (Stripe)
CREATE TABLE IF NOT EXISTS public.user_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  stripe_subscription_id TEXT NOT NULL UNIQUE,
  stripe_price_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'incomplete',
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Webhook events (idempotency tracking)
CREATE TABLE IF NOT EXISTS public.webhook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id TEXT NOT NULL UNIQUE,
  event_type TEXT NOT NULL,
  processed_at TIMESTAMPTZ DEFAULT now(),
  payload JSONB,
  status TEXT NOT NULL DEFAULT 'pending',
  last_error TEXT
);

-- Evidence packs
CREATE TABLE IF NOT EXISTS public.evidence_packs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  title TEXT NOT NULL,
  dispute_amount NUMERIC,
  dispute_reason TEXT,
  reason_code TEXT,
  card_network TEXT,
  merchant_name TEXT,
  transaction_date DATE,
  dispute_deadline DATE,
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status = ANY (ARRAY['draft', 'generating', 'complete', 'submitted', 'won', 'lost'])),
  evidence_data JSONB DEFAULT '{}'::jsonb,
  generated_document_url TEXT,
  ai_confidence_score NUMERIC,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Evidence items (files/content attached to packs)
CREATE TABLE IF NOT EXISTS public.evidence_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pack_id UUID NOT NULL REFERENCES public.evidence_packs(id),
  item_type TEXT NOT NULL,
  label TEXT NOT NULL,
  content TEXT,
  file_url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Credit transactions (audit trail)
CREATE TABLE IF NOT EXISTS public.credit_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  amount INTEGER NOT NULL,
  balance_after INTEGER NOT NULL,
  transaction_type TEXT NOT NULL
    CHECK (transaction_type = ANY (ARRAY['grant', 'use', 'refund', 'expire'])),
  description TEXT,
  stripe_session_id TEXT,
  evidence_pack_id UUID REFERENCES public.evidence_packs(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Templates (marketing content for /templates/ pages)
CREATE TABLE IF NOT EXISTS public.templates (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  short_title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL
    CHECK (category = ANY (ARRAY['gateway-response', 'platform-checklist', 'reason-checklist', 'reason-response', 'industry', 'network'])),
  type TEXT NOT NULL
    CHECK (type = ANY (ARRAY['response-letter', 'evidence-checklist', 'playbook'])),
  gateway TEXT NOT NULL,
  dispute_reason TEXT NOT NULL,
  evidence_items TEXT[] DEFAULT '{}',
  sections JSONB DEFAULT '[]'::jsonb,
  faqs JSONB DEFAULT '[]'::jsonb,
  related_slugs TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE public.templates IS 'Chargeback response template content for /templates/ marketing pages';

-- Unclaimed payments (payments before user account exists)
CREATE TABLE IF NOT EXISTS public.unclaimed_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id TEXT NOT NULL,
  stripe_customer_id TEXT,
  email TEXT NOT NULL,
  amount_total BIGINT,
  mode TEXT,
  metadata JSONB,
  claimed_by UUID REFERENCES auth.users(id),
  claimed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- App errors (client/server error tracking)
CREATE TABLE IF NOT EXISTS public.app_errors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  user_id UUID REFERENCES auth.users(id),
  error_message TEXT NOT NULL,
  error_stack TEXT,
  error_digest TEXT,
  path TEXT,
  component TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  severity TEXT DEFAULT 'error'
    CHECK (severity = ANY (ARRAY['error', 'warning', 'fatal']))
);
COMMENT ON TABLE public.app_errors IS 'Client and server error tracking. Auto-cleanup recommended for entries older than 30 days.';

-- ============================================================
-- FUNCTIONS
-- ============================================================

-- Auto-create profile + credits on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', '')
  );
  INSERT INTO public.user_credits (user_id, credits)
  VALUES (NEW.id, 0);
  RETURN NEW;
END;
$$;

-- Add credits (upsert)
CREATE OR REPLACE FUNCTION public.add_credits(p_user_id uuid, p_quantity integer)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.user_credits (user_id, credits, updated_at)
  VALUES (p_user_id, p_quantity, NOW())
  ON CONFLICT (user_id)
  DO UPDATE SET
    credits = user_credits.credits + p_quantity,
    updated_at = NOW();
END;
$$;

-- Use one credit (atomic deduction with row-level lock)
CREATE OR REPLACE FUNCTION public.use_credit(p_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_current_credits INTEGER;
BEGIN
  SELECT credits INTO v_current_credits
  FROM public.user_credits
  WHERE user_id = p_user_id
  FOR UPDATE;

  IF v_current_credits IS NULL OR v_current_credits <= 0 THEN
    RETURN FALSE;
  END IF;

  UPDATE public.user_credits
  SET credits = credits - 1,
      lifetime_credits_used = lifetime_credits_used + 1,
      updated_at = NOW()
  WHERE user_id = p_user_id;

  RETURN TRUE;
END;
$$;

-- ============================================================
-- TRIGGERS
-- ============================================================

-- Create profile + credits when a new user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evidence_packs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evidence_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.unclaimed_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_errors ENABLE ROW LEVEL SECURITY;

-- Profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- User credits
CREATE POLICY "Users can view own credits" ON public.user_credits
  FOR SELECT USING (auth.uid() = user_id);

-- User subscriptions
CREATE POLICY "Users can view own subscriptions" ON public.user_subscriptions
  FOR SELECT USING (auth.uid() = user_id);

-- Webhook events: no public policies (service role only)

-- Evidence packs
CREATE POLICY "Users can view own evidence packs" ON public.evidence_packs
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create evidence packs" ON public.evidence_packs
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own evidence packs" ON public.evidence_packs
  FOR UPDATE USING (auth.uid() = user_id);

-- Evidence items (access via parent pack ownership)
CREATE POLICY "Users can view own evidence items" ON public.evidence_items
  FOR SELECT USING (pack_id IN (SELECT id FROM evidence_packs WHERE user_id = auth.uid()));
CREATE POLICY "Users can create evidence items" ON public.evidence_items
  FOR INSERT WITH CHECK (pack_id IN (SELECT id FROM evidence_packs WHERE user_id = auth.uid()));
CREATE POLICY "Users can update own evidence items" ON public.evidence_items
  FOR UPDATE USING (pack_id IN (SELECT id FROM evidence_packs WHERE user_id = auth.uid()));

-- Credit transactions
CREATE POLICY "Users can view own credit transactions" ON public.credit_transactions
  FOR SELECT USING (auth.uid() = user_id);

-- Templates (public read)
CREATE POLICY "Anyone can read templates" ON public.templates
  FOR SELECT USING (true);

-- Unclaimed payments (service role only)
CREATE POLICY "Service role full access" ON public.unclaimed_payments
  FOR ALL USING (auth.role() = 'service_role');

-- App errors
CREATE POLICY "Allow error inserts" ON public.app_errors
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Users read own errors" ON public.app_errors
  FOR SELECT TO authenticated USING (user_id = auth.uid());
