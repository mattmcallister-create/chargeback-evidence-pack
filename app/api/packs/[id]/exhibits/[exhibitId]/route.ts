import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth/get-user';
import { getPack } from '@/lib/database/packs';
import { updateExhibit, deleteExhibit } from '@/lib/database/exhibits';
import { deleteExhibitFile } from '@/lib/storage/uploads';

/**
 * PUT /api/packs/[id]/exhibits/[exhibitId]
 * Update an exhibit's label or sort order.
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; exhibitId: string } }
) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const packId = params.id;
    const exhibitId = params.exhibitId;

    const pack = await getPack(packId, user.id);
    if (!pack) {
      return NextResponse.json({ error: 'Pack not found' }, { status: 404 });
    }

    if (pack.status !== 'draft') {
      return NextResponse.json(
        { error: 'Can only modify exhibits on draft packs' },
        { status: 409 }
      );
    }

    const body = await request.json();
    const updates: { label?: string; sort_order?: number } = {};

    if (typeof body.label === 'string') {
      const trimmed = body.label.trim();
      if (!trimmed) {
        return NextResponse.json(
          { error: 'Label cannot be empty' },
          { status: 400 }
        );
      }
      updates.label = trimmed;
    }

    if (typeof body.sort_order === 'number') {
      updates.sort_order = body.sort_order;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No valid updates provided' },
        { status: 400 }
      );
    }

    const exhibit = await updateExhibit(exhibitId, packId, user.id, updates);
    if (!exhibit) {
      return NextResponse.json(
        { error: 'Exhibit not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ exhibit });
  } catch (err: any) {
    console.error('[PUT /api/packs/[id]/exhibits/[exhibitId]]', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/packs/[id]/exhibits/[exhibitId]
 * Delete an exhibit and its file from storage.
 */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string; exhibitId: string } }
) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const packId = params.id;
    const exhibitId = params.exhibitId;

    const pack = await getPack(packId, user.id);
    if (!pack) {
      return NextResponse.json({ error: 'Pack not found' }, { status: 404 });
    }

    if (pack.status !== 'draft') {
      return NextResponse.json(
        { error: 'Can only delete exhibits from draft packs' },
        { status: 409 }
      );
    }

    // We need the exhibit's storage_path before deleting the record.
    // Fetch it via a direct query since deleteExhibit doesn't return it.
    const { supabaseAdmin } = await import('@/lib/supabase-admin');
    const { data: exhibit } = await supabaseAdmin
      .from('pack_exhibits')
      .select('storage_path')
      .eq('id', exhibitId)
      .eq('pack_id', packId)
      .eq('user_id', user.id)
      .single();

    if (!exhibit) {
      return NextResponse.json(
        { error: 'Exhibit not found' },
        { status: 404 }
      );
    }

    // Delete from storage first, then the database record
    try {
      await deleteExhibitFile(exhibit.storage_path);
    } catch (storageErr) {
      console.error('[DELETE exhibit] Storage cleanup failed:', storageErr);
    }

    await deleteExhibit(exhibitId, packId, user.id);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[DELETE /api/packs/[id]/exhibits/[exhibitId]]', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
