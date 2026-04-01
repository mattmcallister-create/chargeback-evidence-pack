import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { getBillingStatus } from '@/lib/billing/entitlements';

export const dynamic = 'force-dynamic';

/**
 * GET /api/billing/status
 *
 * Returns the authenticated user's current billing status.
 * Used by dashboard and generation gate to check entitlements.
 *
 * Response: BillingStatus object (see lib/billing/types.ts)
 */
export async function GET() {
  try {
    // --- Auth check ---
    const cookieStore = await cookies();
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
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

    // --- Get billing status ---
    const status = await getBillingStatus(user.id);

    return NextResponse.json(status);
  } catch (error) {
    console.error('[api/billing/status] Error:', error);
    return NextResponse.json(
      { error: 'internal_error' },
      { status: 500 }
    );
  }
}
