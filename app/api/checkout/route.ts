import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { stripe } from '@/lib/stripe';
import type Stripe from 'stripe';
import { getOrCreateStripeCustomerId } from '@/lib/billing/entitlements';
import {
  getPriceConfigById,
  CHECKOUT_SUCCESS_URL,
  CHECKOUT_CANCEL_URL,
  type CheckoutMetadata,
} from '@/lib/billing/types';

export const dynamic = 'force-dynamic';

/**
 * POST /api/checkout
 *
 * Creates a Stripe Checkout session for one-time or subscription purchase.
 * Requires authenticated Supabase session.
 *
 * Body: { priceId: string }
 *
 * Returns: { url: string } — Stripe-hosted Checkout URL
 */
export async function POST(request: NextRequest) {
  try {
    // --- Auth check ---
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {}
          },
        },
      }
    );

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // --- Parse and validate request ---
    const body = await request.json();
    const { priceId } = body;

    if (!priceId || typeof priceId !== 'string') {
      return NextResponse.json(
        { error: 'priceId is required' },
        { status: 400 }
      );
    }

    const priceConfig = getPriceConfigById(priceId);
    if (!priceConfig) {
      return NextResponse.json(
        { error: 'Invalid price ID' },
        { status: 400 }
      );
    }

    // --- Get or create Stripe customer ---
    const stripeCustomerId = await getOrCreateStripeCustomerId(
      user.id,
      user.email!
    );

    // --- Build checkout session params ---
    const metadata: Record<string, string> = {
      user_id: user.id,
      purchase_mode: priceConfig.mode,
      credits: String(priceConfig.credits),
      price_label: priceConfig.label,
    };

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      customer: stripeCustomerId,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: CHECKOUT_SUCCESS_URL,
      cancel_url: CHECKOUT_CANCEL_URL,
      metadata,
      customer_update: {
        address: 'auto',
      },
      // Stripe sends receipt emails automatically when this is set
      payment_intent_data: priceConfig.mode === 'one_time'
        ? { metadata }
        : undefined,
    };

    // Set mode based on purchase type
    if (priceConfig.mode === 'subscription') {
      sessionParams.mode = 'subscription';
      sessionParams.subscription_data = { metadata };
    } else {
      sessionParams.mode = 'payment';
    }

    // --- Create session ---
    const session = await stripe.checkout.sessions.create(sessionParams);

    console.log(
      JSON.stringify({
        event: 'checkout.session_created',
        user_id: user.id,
        mode: priceConfig.mode,
        price_label: priceConfig.label,
        session_id: session.id,
        timestamp: new Date().toISOString(),
      })
    );

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('[api/checkout] Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'internal_error' },
      { status: 500 }
    );
  }
}
