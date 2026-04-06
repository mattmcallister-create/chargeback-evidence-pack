/**
 * ChargebackKit Billing Types
 *
 * Defines all billing-related types, constants, and access states.
 * This is the single source of truth for billing terminology.
 */

// ---------------------------------------------------------------------------
// Price configuration
// ---------------------------------------------------------------------------

export type PurchaseMode = 'one_time' | 'subscription';

export interface PriceConfig {
  id: string;            // Stripe Price ID (from env)
  mode: PurchaseMode;
  label: string;         // User-facing name
  amount: number;        // Display price in cents
  credits: number;       // Credits granted (one-time) or per period (subscription)
  interval?: 'month';    // Billing interval for subscriptions
  description: string;   // Short description for pricing UI
}

/**
 * Returns all configured prices.
 * Price IDs come from environment variables so test/prod use different Stripe prices.
 */
export function getPriceConfigs(): PriceConfig[] {
  return [
    {
      id: process.env.STRIPE_PRICE_ID_SINGLE_PACK || '',
      mode: 'one_time',
      label: 'Single Pack',
      amount: 3900,
      credits: 1,
      description: 'One dispute evidence pack',
    },
    {
      id: process.env.STRIPE_PRICE_ID_BUNDLE_3 || '',
      mode: 'one_time',
      label: '3-Pack Bundle',
      amount: 9900,
      credits: 3,
      description: 'Three packs \u2014 save 15%',
    },
    {
      id: process.env.STRIPE_PRICE_ID_SUBSCRIPTION || '',
      mode: 'subscription',
      label: 'Monthly Pro',
      amount: 2900,
      credits: 3,
      interval: 'month',
      description: '3 packs per month, cancel anytime',
    },
  ];
}

/**
 * Look up a PriceConfig by its Stripe Price ID.
 */
export function getPriceConfigById(priceId: string): PriceConfig | undefined {
  return getPriceConfigs().find((p) => p.id === priceId);
}

// ---------------------------------------------------------------------------
// Access / entitlement states
// ---------------------------------------------------------------------------

/**
 * The five possible billing states a user can be in.
 * Derived server-side from user_credits + subscription status.
 * Never trust client-side derivation.
 */
export type AccessState =
  | 'unpaid'                    // No credits, no active subscription
  | 'one_time_active'           // Has credits from one-time purchase (no subscription)
  | 'subscription_active'       // Active subscription (may also have credits)
  | 'subscription_canceling'    // Canceled but active until period end
  | 'subscription_past_due'     // Payment failed, restricted access
  | 'subscription_expired';     // Subscription ended, check for remaining credits

export interface BillingStatus {
  accessState: AccessState;
  credits: number;
  subscription: SubscriptionInfo | null;
  stripeCustomerId: string | null;
  canGenerate: boolean;          // True if user can generate a pack right now
}

export interface SubscriptionInfo {
  stripeSubscriptionId: string;
  status: string;                // Stripe subscription status
  currentPeriodEnd: string;      // ISO date
  cancelAtPeriodEnd: boolean;
  priceId: string;
}

// ---------------------------------------------------------------------------
// Webhook event types we handle
// ---------------------------------------------------------------------------

export const HANDLED_WEBHOOK_EVENTS = [
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'invoice.payment_succeeded',
  'invoice.payment_failed',
] as const;

export type HandledWebhookEvent = typeof HANDLED_WEBHOOK_EVENTS[number];

// ---------------------------------------------------------------------------
// Checkout metadata
// ---------------------------------------------------------------------------

export interface CheckoutMetadata {
  user_id: string;
  purchase_mode: PurchaseMode;
  credits: string;      // Stringified number (Stripe metadata is string-only)
  price_label: string;
}

// ---------------------------------------------------------------------------
// Domain and branding constants
// ---------------------------------------------------------------------------

export const BRAND_NAME = 'ChargebackKit';
export const CANONICAL_DOMAIN = 'chargebackkit.app';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || `https://${CANONICAL_DOMAIN}`;

export const CHECKOUT_SUCCESS_URL = `${APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`;
export const CHECKOUT_CANCEL_URL = `${APP_URL}/pricing/`;
export const PORTAL_RETURN_URL = `${APP_URL}/app/settings`;
