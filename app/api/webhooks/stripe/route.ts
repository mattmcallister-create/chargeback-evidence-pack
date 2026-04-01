import { NextRequest } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { grantCredits, upsertSubscription } from '@/lib/billing/entitlements';
import { HANDLED_WEBHOOK_EVENTS, type HandledWebhookEvent, type CheckoutMetadata } from '@/lib/billing/types';

export const dynamic = 'force-dynamic';

// POST /api/webhooks/stripe
export async function POST(request: NextRequest) {
  let event: Stripe.Event;

  // Step 1: Verify webhook signature
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('stripe-signature');
    if (!signature) {
      console.error('[webhook/stripe] Missing stripe-signature header');
      return new Response('Missing signature', { status: 400 });
    }
    event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[webhook/stripe] Signature verification failed: ' + message);
    return new Response('Invalid signature', { status: 400 });
  }

  // Step 2: Ignore events we don't handle
  if (!HANDLED_WEBHOOK_EVENTS.includes(event.type as HandledWebhookEvent)) {
    return new Response('Event type not handled', { status: 200 });
  }

  // Step 3: Idempotency check
  const { data: existingEvent } = await supabaseAdmin
    .from('webhook_events').select('id').eq('event_id', event.id).single();
  if (existingEvent) {
    console.log(JSON.stringify({ event: 'webhook.duplicate', webhook_event_id: event.id }));
    return new Response('Already processed', { status: 200 });
  }

  // Step 4: Record event BEFORE processing (prevents double-grant)
  const { error: insertError } = await supabaseAdmin
    .from('webhook_events').insert({ event_id: event.id, event_type: event.type, payload: event.data.object });
  if (insertError) {
    if (insertError.code === '23505') return new Response('Already processing', { status: 200 });
    console.error('[webhook/stripe] Failed to record event: ' + insertError.message);
    return new Response('Internal error', { status: 500 });
  }

  // Step 5: Process the event
  try {
    await processEvent(event);
    console.log(JSON.stringify({ event: 'webhook.processed', webhook_event_id: event.id, event_type: event.type }));
    return new Response('OK', { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error(JSON.stringify({ event: 'webhook.processing_failed', webhook_event_id: event.id, error: message }));
    return new Response('Processing failed', { status: 500 });
  }
}

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
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session): Promise<void> {
  const metadata = session.metadata as unknown as CheckoutMetadata;
  const userId = metadata?.user_id;
  if (!userId) throw new Error('checkout.session.completed missing user_id in metadata');
  if (session.mode === 'payment') {
    const credits = parseInt(metadata.credits, 10) || 1;
    await grantCredits(userId, credits);
    console.log(JSON.stringify({ event: 'credits.granted', user_id: userId, quantity: credits, source: 'checkout' }));
  }
}

async function handleSubscriptionChange(subscription: Stripe.Subscription): Promise<void> {
  const userId = subscription.metadata?.user_id ?? await resolveUserIdFromCustomer(subscription.customer as string);
  if (!userId) throw new Error('subscription has no user_id and customer lookup failed');
  await syncSubscription(userId, subscription);
}

async function syncSubscription(userId: string, subscription: Stripe.Subscription): Promise<void> {
  const priceId = subscription.items.data[0]?.price?.id ?? '';
  await upsertSubscription(userId, {
    stripe_subscription_id: subscription.id,
    stripe_price_id: priceId,
    status: subscription.status,
    current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
    current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
    cancel_at_period_end: subscription.cancel_at_period_end,
  });
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription): Promise<void> {
  const userId = subscription.metadata?.user_id ?? await resolveUserIdFromCustomer(subscription.customer as string);
  if (!userId) throw new Error('subscription.deleted: cannot resolve user_id');
  await upsertSubscription(userId, {
    stripe_subscription_id: subscription.id,
    stripe_price_id: subscription.items.data[0]?.price?.id ?? '',
    status: 'canceled',
    current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
    current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
    cancel_at_period_end: true,
  });
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice): Promise<void> {
  if (!invoice.subscription) return;
  const customerId = invoice.customer as string;
  const userId = await resolveUserIdFromCustomer(customerId);
  if (!userId) throw new Error('invoice.payment_succeeded: cannot resolve user_id for customer ' + customerId);
  const subscriptionId = invoice.subscription as string;
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const credits = parseInt(subscription.metadata?.credits ?? '3', 10);
  await grantCredits(userId, credits);
  console.log(JSON.stringify({ event: 'credits.granted', user_id: userId, quantity: credits, source: 'invoice' }));
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice): Promise<void> {
  if (!invoice.subscription) return;
  const userId = await resolveUserIdFromCustomer(invoice.customer as string);
  if (!userId) throw new Error('invoice.payment_failed: cannot resolve user_id');
  console.log(JSON.stringify({ event: 'invoice.payment_failed', user_id: userId, invoice_id: invoice.id }));
}

async function resolveUserIdFromCustomer(stripeCustomerId: string): Promise<string | null> {
  const { data } = await supabaseAdmin.from('profiles').select('id').eq('stripe_customer_id', stripeCustomerId).single();
  return data?.id ?? null;
}
