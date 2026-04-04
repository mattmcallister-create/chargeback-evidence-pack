import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth/get-user';
import { getPack } from '@/lib/database/packs';
import { getGeneration } from '@/lib/database/generations';

/**
 * GET /api/packs/[id]/generate/status
 * Poll the current generation status for a pack.
 * Client polls every 3 seconds until status is 'ready' or 'failed'.
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

    const generation = await getGeneration(packId);

    if (!generation) {
      return NextResponse.json({
        status: pack.status,
        generation: null,
      });
    }

    return NextResponse.json({
      status: generation.status,
      pack_status: pack.status,
      started_at: generation.started_at,
      completed_at: generation.completed_at,
      error_message: generation.error_message,
      has_pdf: !!generation.pdf_storage_path,
    });
  } catch (err: any) {
    console.error('[GET /api/packs/[id]/generate/status]', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
