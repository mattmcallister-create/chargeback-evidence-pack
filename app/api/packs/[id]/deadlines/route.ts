import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth/get-user';
import { getPack } from '@/lib/database/packs';
import {
  createDeadline,
  listPackDeadlines,
} from '@/lib/database/deadlines';
import type { DeadlineType } from '@/lib/database/types';

const VALID_TYPES: DeadlineType[] = [
  'dispute_response',
  'evidence_submission',
  'arbitration',
  'custom',
];

/**
 * POST /api/packs/[id]/deadlines
 * Create a deadline for a pack.
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const packId = params.id;
    const pack = await getPack(packId, user.id);
    if (!pack) {
      return NextResponse.json({ error: 'Pack not found' }, { status: 404 });
    }

    const body = await request.json();

    if (!body.deadline_type || !VALID_TYPES.includes(body.deadline_type)) {
      return NextResponse.json(
        { error: `Invalid deadline type. Must be one of: ${VALID_TYPES.join(', ')}` },
        { status: 400 }
      );
    }

    if (!body.due_date) {
      return NextResponse.json(
        { error: 'due_date is required' },
        { status: 400 }
      );
    }

    // Validate date format
    const dueDate = new Date(body.due_date);
    if (isNaN(dueDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format' },
        { status: 400 }
      );
    }

    const deadline = await createDeadline(packId, user.id, {
      deadline_type: body.deadline_type,
      due_date: body.due_date,
    });

    return NextResponse.json({ deadline }, { status: 201 });
  } catch (err: any) {
    console.error('[POST /api/packs/[id]/deadlines]', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/packs/[id]/deadlines
 * List all deadlines for a pack.
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

    const packId = params.id;
    const pack = await getPack(packId, user.id);
    if (!pack) {
      return NextResponse.json({ error: 'Pack not found' }, { status: 404 });
    }

    const deadlines = await listPackDeadlines(packId, user.id);
    return NextResponse.json({ deadlines });
  } catch (err: any) {
    console.error('[GET /api/packs/[id]/deadlines]', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
