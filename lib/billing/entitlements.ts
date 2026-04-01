/**
 * ChargebackKit Entitlement Engine
 *
 * Server-side only. Derives access state from database + Stripe state.
 * This module is the ONLY authority on whether a user can generate a pack.
 *
 * Rules:
 * 1. Credits are granted ONLY via webhook (never client-side).
 * 2. Subscription status is read from the subscriptions table (written by webhooks).
 * 3. canGenerate = true if credits > 0 AND user is not in a restricted state.
 */

import { supabaseAdmin } from '@/lib/supabase-admin';
import type { AccessState, BillingStatus, SubscriptionInfo } from './types';

// ---------------------------------------------------------------------------
// Get billing status for a user
// ---------------------------------------------------------------------------

export async function getBillingStatus(userId: string): Promise<BillingStatus> {
  // Fetch credits and subscription in parallel
  const [creditsResult, subscriptionResult, profileResult] = await Promise.all([
    supabaseAdmin
      .from('user_credits')
      .select('credits')
      .eq('user_id', userId)
      .single(),
    supabaseAdmin
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single(),
    supabaseAdmin
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', userId)
      .single(),
  ]);

  const credits = creditsResult.data?.credits ?? 0;
  const sub = subscriptionResult.data;
  const stripeCustomerId = profileResult.data?.stripe_customer_id ?? null;

  // Derive subscription info
  let subscriptionInfo: SubscriptionInfo | null = null;
  if (sub && sub.stripe_subscription_id) {
    subscriptionInfo = {
      stripeSubscriptionId: sub.stripe_subscription_id,
      status: sub.status,
      currentPeriodEnd: sub.current_period_end,
      cancelAtPeriodEnd: sub.cancel_at_period_end ?? false,
      priceId: sub.stripe_price_id,
    };
  }

  // Derive access state
  const accessState = deriveAccessState(credits, subscriptionInfo);

  // Determine if user can generate
  const canGenerate = deriveCanGenerate(accessState, credits);

  return {
    accessState,
    credits,
    subscription: subscriptionInfo,
    stripeCustomerId,
    canGenerate,
  };
}

// ---------------------------------------------------------------------------
// Access state derivation (pure function, testable)
// ---------------------------------------------------------------------------

export function deriveAccessState(
  credits: number,
  subscription: SubscriptionInfo | null
): AccessState {
  // Subscription states take priority when subscription exists
  if (subscription) {
    switch (subscription.status) {
      case 'active':
        if (subscription.cancelAtPeriodEnd) {
          return 'subscription_canceling';
        }
        return 'subscription_active';

      case 'past_due':
        return 'subscription_past_due';

      case 'canceled':
      case 'unpaid':
      case 'incomplete_expired':
        // Subscription is no longer active — fall through to credit check
        break;

      case 'trialing':
        return 'subscription_active';

      default:
        // Unknown status — treat as expired
        break;
    }
  }

  // No active subscription — check credits
  if (credits > 0) {
    return 'one_time_active';
  }

  return 'unpaid';
}

export function deriveCanGenerate(
  accessState: AccessState,
  credits: number
): boolean {
  // User must have credits AND not be in a restricted state
  if (credits <= 0) return false;

  switch (accessState) {
    case 'one_time_active':
    case 'subscription_active':
    case 'subscription_canceling':   // Still active until period end
      return true;

    case 'subscription_past_due':    // Restricted — cannot generate
    case 'unpaid':
    case 'subscription_expired':
      return false;

    default:
      return false;
  }
}

// ---------------------------------------------------------------------------
// Credit operations (thin wrappers around SECURITY DEFINER functions)
// ---------------------------------------------------------------------------

export async function grantCredits(
  userId: string,
  quantity: number
): Promise<void> {
  const { error } = await supabaseAdmin.rpc('add_credits', {
    p_user_id: userId,
    p_quantity: quantity,
  });

  if (error) {
    throw new Error(`Failed to grant credits: ${error.message}`);
  }

  console.log(
    JSON.stringify({
      event: 'credits.granted',
      user_id: userId,
      quantity,
      timestamp: new Date().toISOString(),
    })
  );
}

// ---------------------------------------------------------------------------
// Subscription record management (written by webhooks only)
// ---------------------------------------------------------------------------

export async function upsertSubscription(
  userId: string,
  data: {
    stripe_subscription_id: string;
    stripe_price_id: string;
    status: string;
    current_period_start: string;
    current_period_end: string;
    cancel_at_period_end: boolean;
  }
): Promise<void> {
  const { error } = await supabaseAdmin
    .from('user_subscriptions')
    .upsert(
      {
        user_id: userId,
        ...data,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: 'stripe_subscription_id',
      }
    );

  if (error) {
    throw new Error(`Failed to upsert subscription: ${error.message}`);
  }
}

// ---------------------------------------------------------------------------
// Stripe customer ID management
// ---------------------------------------------------------------------------

export async function getOrCreateStripeCustomerId(
  userId: string,
  email: string
): Promise<string> {
  // Check if user already has a Stripe customer ID
  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('stripe_customer_id')
    .eq('id', userId)
    .single();

  if (profile?.stripe_customer_id) {
    return profile.stripe_customer_id;
  }

  // Import stripe here to avoid circular dependency at module level
  const { stripe } = await import('@/lib/stripe');

  // Create Stripe customer
  const customer = await stripe.customers.create({
    email,
    metadata: { user_id: userId },
  });

  // Store on profile
  await supabaseAdmin
    .from('profiles')
    .update({ stripe_customer_id: customer.id })
    .eq('id', userId);

  return customer.id;
}
