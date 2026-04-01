-- =============================================================================
-- ChargebackKit — Subscription Support Migration
-- Phase 8: Billing Implementation
-- =============================================================================
--
-- Adds subscription tracking table to support the combined one-time + subscription
-- billing model. This table is written ONLY by the webhook handler.
-- Client code reads it via the entitlements module (server-side).
--
-- Run after the base schema (profiles, user_credits, webhook_events, etc.).
-- =============================================================================

-- ---------------------------------------------------------------------------
-- user_subscriptions — tracks Stripe subscription lifecycle
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS user_subscriptions (
  id                      uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                 uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  stripe_subscription_id  text UNIQUE NOT NULL,
  stripe_price_id         text NOT NULL,
  status                  text NOT NULL CHECK (status IN (
    'active', 'past_due', 'canceled', 'unpaid',
    'incomplete', 'incomplete_expired', 'trialing', 'paused'
  )),
  current_period_start    timestamptz NOT NULL,
  current_period_end      timestamptz NOT NULL,
  cancel_at_period_end    boolean DEFAULT false,
  created_at              timestamptz DEFAULT now(),
  updated_at              timestamptz DEFAULT now()
);

-- Index for user lookup
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user_id
  ON user_subscriptions(user_id);

-- Index for Stripe subscription lookup (upsert target)
CREATE UNIQUE INDEX IF NOT EXISTS idx_user_subscriptions_stripe_id
  ON user_subscriptions(stripe_subscription_id);

-- ---------------------------------------------------------------------------
-- RLS: No client access. Server-side only via SUPABASE_SERVICE_ROLE_KEY.
-- ---------------------------------------------------------------------------

ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Allow server-side read for entitlement checks
-- (service role key bypasses RLS, but this policy allows
--  authenticated users to read their own subscription status)
CREATE POLICY "Users can view own subscription"
  ON user_subscriptions
  FOR SELECT
  USING (auth.uid() = user_id);

-- No INSERT/UPDATE/DELETE from client. All writes via service role key.

-- ---------------------------------------------------------------------------
-- Add STRIPE_PRICE_ID_SUBSCRIPTION to env var documentation
-- ---------------------------------------------------------------------------
-- Required env var: STRIPE_PRICE_ID_SUBSCRIPTION
-- This is the Stripe Price ID for the monthly subscription plan.
-- Set separately for test and production environments.
