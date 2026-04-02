import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth/get-user';
import { createPack, listPacks } from '@/lib/database/packs';
import { DISPUTE_CATEGORIES } from '@/lib/constants';
import type { CreatePackInput } from '@/lib/database/types';

/**
 * POST /api/packs — Create a new dispute evidence pack.
 */
export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      dispute_category,
      merchant_name,
      transaction_amount,
      transaction_date,
      dispute_reason,
      intake_answers,
    } = body;

    // ── Validation ──────────────────────────────────────────────────
    const errors: string[] = [];

    if (
      !dispute_category ||
      !DISPUTE_CATEGORIES.some((c) => c.id === dispute_category)
    ) {
      errors.push('Invalid or missing dispute_category');
    }

    if (!merchant_name || typeof merchant_name !== 'string') {
      errors.push('merchant_name is required');
    }

    if (
      transaction_amount === undefined ||
      typeof transaction_amount !== 'number' ||
      transaction_amount <= 0
    ) {
      errors.push('transaction_amount must be a positive number (in cents)');
    }

    if (!transaction_date || isNaN(Date.parse(transaction_date))) {
      errors.push('transaction_date must be a valid date string');
    }

    if (!dispute_reason || typeof dispute_reason !== 'string') {
      errors.push('dispute_reason is required');
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { error: 'Validation failed', details: errors.join('; ') },
        { status: 400 }
      );
    }

    // ── Create pack ─────────────────────────────────────────────────
    const input: CreatePackInput = {
      dispute_category,
      merchant_name: merchant_name.trim(),
      transaction_amount,
      transaction_date,
      dispute_reason: dispute_reason.trim(),
      intake_answers: intake_answers || {},
    };

    const pack = await createPack(user.id, input);

    return NextResponse.json({ pack }, { status: 201 });
  } catch (error) {
    console.error('[API POST /api/packs] Error:', error);
    return NextResponse.json(
      { error: 'Failed to create pack' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/packs — List all packs for the authenticated user.
 */
export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const packs = await listPacks(user.id);

    return NextResponse.json({ packs });
  } catch (error) {
    console.error('[API GET /api/packs] Error:', error);
    return NextResponse.json(
      { error: 'Failed to list packs' },
      { status: 500 }
    );
  }
}
