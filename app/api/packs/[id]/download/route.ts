import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth/get-user';
import { getPack } from '@/lib/database/packs';
import { getGeneration } from '@/lib/database/generations';
import { getPDFUrl } from '@/lib/storage/uploads';

/**
 * GET /api/packs/[id]/download
 * Returns a signed download URL for the generated PDF.
 * URL is valid for 1 hour.
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

    if (pack.status !== 'ready') {
      return NextResponse.json(
        { error: 'PDF is not ready for download' },
        { status: 400 }
      );
    }

    const generation = await getGeneration(packId);
    if (!generation || !generation.pdf_storage_path) {
      return NextResponse.json(
        { error: 'No PDF found for this pack' },
        { status: 404 }
      );
    }

    const downloadUrl = await getPDFUrl(generation.pdf_storage_path);

    // Redirect to the signed URL
    return NextResponse.redirect(downloadUrl);
  } catch (err: any) {
    console.error('[GET /api/packs/[id]/download]', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
