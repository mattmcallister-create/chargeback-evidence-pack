import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { PORTAL_RETURN_URL } from '@/lib/billing/types';

export const dynamic = 'force-dynamic';

/**
 * GET /api/billing/portal
 *
 * Creates a Stripe Customer Portal session and redirects.
 * Portal shows: payment history, receipts, subscription management.
 *
 * Requires authenticated user with a Stripe customer ID.
 */
export async function GET() {
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

    // --- Get Stripe customer ID ---
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single();

    if (!profile?.stripe_customer_id) {
      return NextResponse.json(
        { error: 'No billing history found. Make a purchase first.' },
        { status: 404 }
      );
    }

    // --- Create portal session ---
    const session = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: PORTAL_RETURN_URL,
    });

    console.log(
      JSON.stringify({
        event: 'billing.portal_created',
        user_id: user.id,
        timestamp: new Date().toISOString(),
      })
    );

    return NextResponse.redirect(session.url);
  } catch (error) {
    console.error('[api/billing/portal] Error:', error);
    return NextResponse.json(
      { error: 'internal_error' },
      { status: 500 }
    );
  }
}
