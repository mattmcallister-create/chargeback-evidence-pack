import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth/get-user';
import { getPack } from '@/lib/database/packs';
import { reorderExhibits } from '@/lib/database/exhibits';

/**
 * PUT /api/packs/[id]/exhibits/reorder
 * Bulk reorder exhibits for a pack.
 *
 * Body: { order: [{ id: string, sort_order: number }, ...] }
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

    const packId = params.id;
    const pack = await getPack(packId, user.id);
    if (!pack) {
      return NextResponse.json({ error: 'Pack not found' }, { status: 404 });
    }

    if (pack.status !== 'draft') {
      return NextResponse.json(
        { error: 'Can only reorder exhibits on draft packs' },
        { status: 409 }
      );
    }

    const body = await request.json();

    if (!Array.isArray(body.order) || body.order.length === 0) {
      return NextResponse.json(
        { error: 'order must be a non-empty array of { id, sort_order }' },
        { status: 400 }
      );
    }

    // Validate each entry
    for (const entry of body.order) {
      if (typeof entry.id !== 'string' || typeof entry.sort_order !== 'number') {
        return NextResponse.json(
          { error: 'Each entry must have a string id and number sort_order' },
          { status: 400 }
        );
      }
    }

    await reorderExhibits(packId, user.id, body.order);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[PUT /api/packs/[id]/exhibits/reorder]', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
