import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth/get-user';
import { getPack } from '@/lib/database/packs';
import { createExhibit, listExhibits } from '@/lib/database/exhibits';
import {
  sanitizeFilename,
  validateFile,
  uploadExhibit,
} from '@/lib/storage/uploads';
import { MAX_EXHIBITS_PER_PACK } from '@/lib/constants';

/**
 * POST /api/packs/[id]/exhibits
 * Upload an exhibit file to a pack.
 * Expects multipart/form-data with 'file' and optional 'label' fields.
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

    if (pack.status !== 'draft') {
      return NextResponse.json(
        { error: 'Can only add exhibits to draft packs' },
        { status: 409 }
      );
    }

    // Parse multipart form data
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const label = (formData.get('label') as string) || '';

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Check exhibit count limit
    const existing = await listExhibits(packId, user.id);
    if (existing.length >= MAX_EXHIBITS_PER_PACK) {
      return NextResponse.json(
        { error: `Maximum ${MAX_EXHIBITS_PER_PACK} exhibits per pack` },
        { status: 400 }
      );
    }

    // Validate file
    const totalExistingBytes = existing.reduce((sum, ex) => sum + ex.file_size, 0);
    const validation = validateFile(
      { size: file.size, type: file.type },
      totalExistingBytes
    );
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Upload to storage
    const sanitized = sanitizeFilename(file.name);
    const buffer = Buffer.from(await file.arrayBuffer());
    const { path: storagePath } = await uploadExhibit(
      packId,
      user.id,
      sanitized,
      buffer,
      file.type
    );

    // Create database record
    const exhibit = await createExhibit(packId, user.id, {
      file_name: sanitized,
      original_name: file.name,
      file_size: file.size,
      mime_type: file.type,
      label: label || file.name.replace(/\.[^/.]+$/, ''),
      sort_order: existing.length,
      storage_path: storagePath,
    });

    return NextResponse.json({ exhibit }, { status: 201 });
  } catch (err: any) {
    console.error('[POST /api/packs/[id]/exhibits]', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/packs/[id]/exhibits
 * List all exhibits for a pack.
 */
export async function GET(
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

    const exhibits = await listExhibits(packId, user.id);
    return NextResponse.json({ exhibits });
  } catch (err: any) {
    console.error('[GET /api/packs/[id]/exhibits]', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
