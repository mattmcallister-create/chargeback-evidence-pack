import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth/get-user';
import { getPack } from '@/lib/database/packs';
import { runGenerationPipeline } from '@/lib/pdf/steps';

/**
 * POST /api/packs/[id]/generate
 * Trigger async PDF generation for a dispute pack.
 * Returns 202 Accepted â client polls /status for progress.
 */
export async function POST(
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

    if (pack.status !== 'draft' && pack.status !== 'failed') {
      return NextResponse.json(
        { error: `Pack is ${pack.status}, cannot generate` },
        { status: 409 }
      );
    }

    // Fire and forget â pipeline runs async
    // We don't await this so the response returns immediately
    runGenerationPipeline(packId, user.id).catch((err) => {
      console.error(`[POST /generate] Pipeline failed for ${packId}:`, err);
    });

    return NextResponse.json(
      { message: 'Generation started', packId },
      { status: 202 }
    );
  } catch (err: any) {
    console.error('[POST /api/packs/[id]/generate]', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
