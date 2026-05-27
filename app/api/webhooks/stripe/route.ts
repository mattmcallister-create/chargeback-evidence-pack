// @ts-nocheck
import { NextRequest } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase-admin';
import {
  grantCredits,
  upsertSubscription,
} from '@/lib/billing/entitlements';
import {
  HANDLED_WEBHOOK_EVENTS,
  type HandledWebhookEvent,
  type CheckoutMetadata,
} from '@/lib/billing/types';

/**
 * CRITICAL: Disable Next.js body parsing.
 * Stripe signature verification requires the raw request body.
 * Any parsing before constructEvent() = broken signature = vulnerability.
 */
export const dynamic = 'force-dynamic';

// ---------------------------------------------------------------------------
// POST /api/webhooks/stripe
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  let event: Stripe.Event;

  // --- Step 1: Verify webhook signature ---
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      console.error('[webhook/stripe] Missing stripe-signature header');
      return new Response('Missing signature', { status: 400 });
    }

    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error(`[webhook/stripe] Signature verification failed: ${message}`);
    return new Response('Invalid signature', { status: 400 });
  }

  // --- Step 2: Ignore events we don't handle ---
  if (!HANDLED_WEBHOOK_EVENTS.includes(event.type as HandledWebhookEvent)) {
    return new Response('Event type not handled', { status: 200 });
  }

  // --- Step 3: Idempotency check ---
  // Check if this event was already COMPLETED (not just claimed).
  // Events in 'pending' status may be from a failed prior attempt â allow retry.
  const { data: existingEvent } = await supabaseAdmin
    .from('webhook_events')
    .select('id, status')
    .eq('event_id', event.id)
    .single();

  if (existingEvent?.status === 'completed') {
    console.log(
      JSON.stringify({
        event: 'webhook.duplicate',
        webhook_event_id: event.id,
        event_type: event.type,
        timestamp: new Date().toISOString(),
      })
    );
    return new Response('Already processed', { status: 200 });
  }

  // --- Step 4: Claim the event with 'pending' status ---
  // If no record exists, INSERT. If a 'pending' record exists (failed prior attempt),
  // we skip the insert and proceed to reprocess.
  // UNIQUE constraint on event_id prevents double-claim from concurrent requests.
  if (!existingEvent) {
    const { error: insertError } = await supabaseAdmin
      .from('webhook_events')
      .insert({
        event_id: event.id,
        event_type: event.type,
        status: 'pending',
        payload: event.data.object,
      });

    if (insertError) {
      // UNIQUE constraint violation = concurrent retry already claimed it
      if (insertError.code === '23505') {
        console.log(
          JSON.stringify({
            event: 'webhook.duplicate_race',
            webhook_event_id: event.id,
            timestamp: new Date().toISOString(),
          })
        );
        return new Response('Already processing', { status: 200 });
      }
      console.error(`[webhook/stripe] Failed to record event: ${insertError.message}`);
      return new Response('Internal error', { status: 500 });
    }
  }

  // --- Step 5: Process the event ---
  try {
    await processEvent(event);

    // Mark event as completed AFTER successful processing
    await supabaseAdmin
      .from('webhook_events')
      .update({ status: 'completed' })
      .eq('event_id', event.id);

    console.log(
      JSON.stringify({
        event: 'webhook.processed',
        webhook_event_id: event.id,
        event_type: event.type,
        timestamp: new Date().toISOString(),
      })
    );

    return new Response('OK', { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error(
      JSON.stringify({
        event: 'webhook.processing_failed',
        webhook_event_id: event.id,
        event_type: event.type,
        error: message,
        timestamp: new Date().toISOString(),
      })
    );

    // Leave status as 'pending' so Stripe retries can reprocess
    // Update the error message for debugging
    await supabaseAdmin
      .from('webhook_events')
      .update({ last_error: message })
      .eq('event_id', event.id);

    return new Response('Processing failed', { status: 500 });
  }
}

// ---------------------------------------------------------------------------
// Event processors
// ---------------------------------------------------------------------------

async function processEvent(event: Stripe.Event): Promise<void> {
  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
      break;

    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      await handleSubscriptionChange(event.data.object as Stripe.Subscription);
      break;

    case 'customer.subscription.deleted':
      await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
      break;

    case 'invoice.payment_succeeded':
      await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice);
      break;

    case 'invoice.payment_failed':
      await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
      break;

    default:
      // Should not reach here due to filter in Step 2
      break;
  }
}

// ---------------------------------------------------------------------------
// checkout.session.completed
// ---------------------------------------------------------------------------

async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session
): Promise<void> {
  const metadata = session.metadata as unknown as CheckoutMetadata;
  let userId = metadata?.user_id;

  // --- Fallback: resolve user from Stripe customer or email ---
  // Direct Stripe payment links (buy.stripe.com) don't carry metadata.user_id.
  // We must resolve the user from the Stripe customer ID or email.
  if (!userId) {
    // Try 1: Resolve from Stripe customer ID â profiles table
    if (session.customer) {
      userId = await resolveUserIdFromCustomer(session.customer as string) ?? undefined;
    }

    // Try 2: Resolve from customer email â auth.users table
    if (!userId) {
      const email = session.customer_details?.email ?? session.customer_email;
      if (email) {
        userId = await resolveUserIdFromEmail(email) ?? undefined;

        // If user exists, link their Stripe customer ID for future lookups
        if (userId && session.customer) {
          await supabaseAdmin
            .from('profiles')
            .update({ stripe_customer_id: session.customer as string })
            .eq('id', userId);
        }
      }
    }

    // Try 3: Store as unclaimed payment for manual reconciliation
    if (!userId) {
      const email = session.customer_details?.email ?? session.customer_email ?? 'unknown';
      await supabaseAdmin.from('unclaimed_payments').insert({
        stripe_session_id: session.id,
        stripe_customer_id: (session.customer as string) ?? null,
        email,
        amount_total: session.amount_total,
        mode: session.mode,
        metadata: session.metadata,
        created_at: new Date().toISOString(),
      });

      console.log(
        JSON.stringify({
          event: 'payment.unclaimed',
          session_id: session.id,
          email,
          amount: session.amount_total,
          timestamp: new Date().toISOString(),
        })
      );
      // Don't throw â return gracefully so the event is marked completed.
      // An admin can reconcile this manually or the user can claim it on login.
      return;
    }
  }

  if (session.mode === 'payment') {
    // One-time purchase: grant credits immediately
    // For direct payment links, determine credits from the amount paid
    const credits = metadata?.credits
      ? parseInt(metadata.credits, 10) || 1
      : deriveCreditsFromAmount(session.amount_total ?? 0);

    await grantCredits(userId, credits);

    console.log(
      JSON.stringify({
        event: 'credits.granted',
        user_id: userId,
        quantity: credits,
        source: 'checkout.session.completed',
        price_label: metadata?.price_label ?? 'direct_payment_link',
        amount: session.amount_total,
        timestamp: new Date().toISOString(),
      })
    );
  }

  // For subscription mode, credits are granted via invoice.payment_succeeded
  // The subscription object is handled by customer.subscription.created
}

// ---------------------------------------------------------------------------
// customer.subscription.created / updated
// ---------------------------------------------------------------------------

async function handleSubscriptionChange(
  subscription: Stripe.Subscription
): Promise<void> {
  const userId = subscription.metadata?.user_id;
  if (!userId) {
    // Try to resolve from Stripe customer
    const resolvedUserId = await resolveUserIdFromCustomer(
      subscription.customer as string
    );
    if (!resolvedUserId) {
      throw new Error(
        `subscription ${subscription.id} has no user_id in metadata and customer lookup failed`
      );
    }
    await syncSubscription(resolvedUserId, subscription);
    return;
  }

  await syncSubscription(userId, subscription);
}

async function syncSubscription(
  userId: string,
  subscription: Stripe.Subscription
): Promise<void> {
  const priceId = subscription.items.data[0]?.price?.id ?? '';

  await upsertSubscription(userId, {
    stripe_subscription_id: subscription.id,
    stripe_price_id: priceId,
    status: subscription.status,
    current_period_start: new Date(
      subscription.current_period_start * 1000
    ).toISOString(),
    current_period_end: new Date(
      subscription.current_period_end * 1000
    ).toISOString(),
    cancel_at_period_end: subscription.cancel_at_period_end,
  });

  console.log(
    JSON.stringify({
      event: 'subscription.synced',
      user_id: userId,
      subscription_id: subscription.id,
      status: subscription.status,
      cancel_at_period_end: subscription.cancel_at_period_end,
      timestamp: new Date().toISOString(),
    })
  );
}

// ---------------------------------------------------------------------------
// customer.subscription.deleted
// ---------------------------------------------------------------------------

async function handleSubscriptionDeleted(
  subscription: Stripe.Subscription
): Promise<void> {
  const userId =
    subscription.metadata?.user_id ??
    (await resolveUserIdFromCustomer(subscription.customer as string));

  if (!userId) {
    throw new Error(
      `subscription.deleted ${subscription.id}: cannot resolve user_id`
    );
  }

  await upsertSubscription(userId, {
    stripe_subscription_id: subscription.id,
    stripe_price_id: subscription.items.data[0]?.price?.id ?? '',
    status: 'canceled',
    current_period_start: new Date(
      subscription.current_period_start * 1000
    ).toISOString(),
    current_period_end: new Date(
      subscription.current_period_end * 1000
    ).toISOString(),
    cancel_at_period_end: true,
  });

  console.log(
    JSON.stringify({
      event: 'subscription.deleted',
      user_id: userId,
      subscription_id: subscription.id,
      timestamp: new Date().toISOString(),
    })
  );
}

// ---------------------------------------------------------------------------
// invoice.payment_succeeded
// ---------------------------------------------------------------------------

async function handleInvoicePaymentSucceeded(
  invoice: Stripe.Invoice
): Promise<void> {
  // Only grant credits for subscription invoices (not one-time)
  if (!invoice.subscription) return;

  // Skip the first invoice if checkout.session.completed already handled it
  // The first subscription invoice has billing_reason = 'subscription_create'
  // Subsequent renewals have billing_reason = 'subscription_cycle'
  if (invoice.billing_reason === 'subscription_create') {
    // Credits for initial subscription are granted here (not in checkout.session.completed)
    // This is the single provisioning path for subscription credits
  }

  const customerId = invoice.customer as string;
  const userId = await resolveUserIdFromCustomer(customerId);

  if (!userId) {
    throw new Error(
      `invoice.payment_succeeded: cannot resolve user_id for customer ${customerId}`
    );
  }

  // Determine credits from subscription metadata or price config
  const subscriptionId = invoice.subscription as string;
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const credits = parseInt(subscription.metadata?.credits ?? '3', 10);

  await grantCredits(userId, credits);

  console.log(
    JSON.stringify({
      event: 'credits.granted',
      user_id: userId,
      quantity: credits,
      source: 'invoice.payment_succeeded',
      billing_reason: invoice.billing_reason,
      invoice_id: invoice.id,
      timestamp: new Date().toISOString(),
    })
  );
}

// ---------------------------------------------------------------------------
// invoice.payment_failed
// ---------------------------------------------------------------------------

async function handleInvoicePaymentFailed(
  invoice: Stripe.Invoice
): Promise<void> {
  if (!invoice.subscription) return;

  const customerId = invoice.customer as string;
  const userId = await resolveUserIdFromCustomer(customerId);

  if (!userId) {
    throw new Error(
      `invoice.payment_failed: cannot resolve user_id for customer ${customerId}`
    );
  }

  console.log(
    JSON.stringify({
      event: 'invoice.payment_failed',
      user_id: userId,
      invoice_id: invoice.id,
      subscription_id: invoice.subscription,
      timestamp: new Date().toISOString(),
    })
  );

  // Subscription status update is handled by customer.subscription.updated webhook
  // which fires when Stripe marks the subscription as past_due
}

// ---------------------------------------------------------------------------
// Helper: resolve user_id from Stripe customer ID
// ---------------------------------------------------------------------------

async function resolveUserIdFromCustomer(
  stripeCustomerId: string
): Promise<string | null> {
  const { data } = await supabaseAdmin
    .from('profiles')
    .select('id')
    .eq('stripe_customer_id', stripeCustomerId)
    .single();

  return data?.id ?? null;
}

// ---------------------------------------------------------------------------
// Helper: resolve user_id from email (for direct payment links)
// ---------------------------------------------------------------------------

async function resolveUserIdFromEmail(
  email: string
): Promise<string | null> {
  // Look up in auth.users via Supabase admin API
  const { data: { users } } = await supabaseAdmin.auth.admin.listUsers();
  const matchedUser = users.find(
    (u) => u.email?.toLowerCase() === email.toLowerCase()
  );
  return matchedUser?.id ?? null;
}

// ---------------------------------------------------------------------------
// Helper: derive credits from payment amount (for direct payment links)
// ---------------------------------------------------------------------------
// Maps known price points to credit quantities.
// This is the fallback when metadata.credits is not present.

function deriveCreditsFromAmount(amountInCents: number): number {
  const creditMap: Record<number, number> = {
    1900: 1,    // $19 â Single Pack
    7900: 5,    // $79 â 5-Pack
    12900: 10,  // $129 â 10-Pack
    26900: 25,  // $269 â 25-Pack
  };

  return creditMap[amountInCents] ?? 1; // Default to 1 credit for unknown amounts
}
