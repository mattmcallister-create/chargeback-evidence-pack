import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth/get-user';
import { getPack, updatePack } from '@/lib/database/packs';
import type { UpdatePackInput } from '@/lib/database/types';

/**
 * GET /api/packs/[id] — Get a single pack by ID.
 * Returns 404 if not found or not owned by the user.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const pack = await getPack(params.id, user.id);

    if (!pack) {
      return NextResponse.json({ error: 'Pack not found' }, { status: 404 });
    }

    return NextResponse.json({ pack });
  } catch (error) {
    console.error('[API GET /api/packs/[id]] Error:', error);
    return NextResponse.json(
      { error: 'Failed to get pack' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/packs/[id] — Update an existing pack.
 * Only draft packs can be edited.
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify pack exists and is owned by user
    const existing = await getPack(params.id, user.id);
    if (!existing) {
      return NextResponse.json({ error: 'Pack not found' }, { status: 404 });
    }

    // Only draft packs can be edited
    if (existing.status !== 'draft') {
      return NextResponse.json(
        { error: 'Only draft packs can be edited' },
        { status: 409 }
      );
    }

    const body = await request.json();
    const updates: UpdatePackInput = {};

    // Only include fields that were provided
    if (body.merchant_name !== undefined) {
      updates.merchant_name = String(body.merchant_name).trim();
    }
    if (body.transaction_amount !== undefined) {
      if (typeof body.transaction_amount !== 'number' || body.transaction_amount <= 0) {
        return NextResponse.json(
          { error: 'transaction_amount must be a positive number' },
          { status: 400 }
        );
      }
      updates.transaction_amount = body.transaction_amount;
    }
    if (body.transaction_date !== undefined) {
      if (isNaN(Date.parse(body.transaction_date))) {
        return NextResponse.json(
          { error: 'transaction_date must be a valid date' },
          { status: 400 }
        );
      }
      updates.transaction_date = body.transaction_date;
    }
    if (body.dispute_reason !== undefined) {
      updates.dispute_reason = String(body.dispute_reason).trim();
    }
    if (body.intake_answers !== undefined) {
      updates.intake_answers = body.intake_answers;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      );
    }

    const pack = await updatePack(params.id, user.id, updates);

    return NextResponse.json({ pack });
  } catch (error) {
    console.error('[API PUT /api/packs/[id]] Error:', error);
    return NextResponse.json(
      { error: 'Failed to update pack' },
      { status: 500 }
    );
  }
}
