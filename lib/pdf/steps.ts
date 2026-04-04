import { getPack, updatePack } from '@/lib/database/packs';
import { listExhibits } from '@/lib/database/exhibits';
import {
  createGeneration,
  updateGeneration,
} from '@/lib/database/generations';
import { getExhibitUrl, uploadPDF } from '@/lib/storage/uploads';
import { generateRebuttal } from './rebuttal-generator';
import { buildPDFHTML } from './html-template';
import { htmlToPDF } from './generator';
import type { Pack, Exhibit } from '@/lib/database/types';

/**
 * Execute the full generation pipeline for a dispute pack.
 *
 * Steps:
 * 1. Fetch and validate pack + exhibits
 * 2. Deduct credit
 * 3. Generate AI rebuttal narrative
 * 4. Build HTML template
 * 5. Render PDF via Puppeteer
 * 6. Upload PDF to storage
 * 7. Update records (generation + pack status)
 * 8. Send notification email (non-blocking)
 *
 * On failure at any step after credit deduction: restore credit + mark failed.
 */
export async function runGenerationPipeline(
  packId: string,
  userId: string
): Promise<void> {
  let generationId: string | null = null;
  let creditDeducted = false;

  try {
    // ââ Step 1: Fetch and validate âââââââââââââââââââââââââââââââââââââ
    const pack = await getPack(packId, userId);
    if (!pack) {
      throw new Error('Pack not found');
    }

    if (pack.status !== 'draft' && pack.status !== 'failed') {
      throw new Error(`Pack is in ${pack.status} state, cannot generate`);
    }

    const exhibits = await listExhibits(packId, userId);

    // ââ Step 2: Set status to generating âââââââââââââââââââââââââââââââ
    await updatePack(packId, userId, { status: 'generating' });

    // ââ Step 3: Create generation record âââââââââââââââââââââââââââââââ
    const generation = await createGeneration(packId);
    generationId = generation.id;

    await updateGeneration(generationId, { status: 'processing' });

    // ââ Step 4: Deduct credit ââââââââââââââââââââââââââââââââââââââââââ
    await deductCredit(userId);
    creditDeducted = true;

    // ââ Step 5: Generate AI rebuttal âââââââââââââââââââââââââââââââââââ
    const rebuttalText = await generateRebuttal(pack, exhibits);

    // Cache the rebuttal text
    await updateGeneration(generationId, { rebuttal_text: rebuttalText });

    // ââ Step 6: Get signed URLs for exhibit images âââââââââââââââââââââ
    const exhibitUrls = await Promise.all(
      exhibits.map(async (exhibit) => ({
        exhibit,
        url: await getExhibitUrl(exhibit.storage_path),
      }))
    );

    // ââ Step 7: Build HTML and render PDF ââââââââââââââââââââââââââââââ
    const html = buildPDFHTML({
      pack,
      exhibits,
      rebuttalText,
      exhibitUrls,
      generatedAt: new Date().toISOString(),
    });

    const pdfBuffer = await htmlToPDF(html);

    // ââ Step 8: Upload PDF to storage ââââââââââââââââââââââââââââââââââ
    const { path: pdfPath } = await uploadPDF(packId, userId, pdfBuffer);

    // ââ Step 9: Update records âââââââââââââââââââââââââââââââââââââââââ
    await updateGeneration(generationId, {
      status: 'ready',
      completed_at: new Date().toISOString(),
      pdf_storage_path: pdfPath,
    });

    await updatePack(packId, userId, { status: 'ready' });

    // ââ Step 10: Send notification email (non-blocking) ââââââââââââââââ
    sendCompletionEmail(packId, userId).catch((err) => {
      console.error('[pipeline] Email send failed (non-blocking):', err);
    });
  } catch (err: any) {
    console.error(`[pipeline] Generation failed for pack ${packId}:`, err);

    // Restore credit if it was deducted
    if (creditDeducted) {
      try {
        await restoreCredit(userId);
      } catch (restoreErr) {
        console.error('[pipeline] CRITICAL: Failed to restore credit:', restoreErr);
      }
    }

    // Mark generation as failed
    if (generationId) {
      try {
        await updateGeneration(generationId, {
          status: 'failed',
          completed_at: new Date().toISOString(),
          error_message: err.message || 'Unknown error',
        });
      } catch (updateErr) {
        console.error('[pipeline] Failed to update generation status:', updateErr);
      }
    }

    // Mark pack as failed
    try {
      await updatePack(packId, userId, { status: 'failed' });
    } catch (updateErr) {
      console.error('[pipeline] Failed to update pack status:', updateErr);
    }

    throw err;
  }
}

// âââ Credit Management âââââââââââââââââââââââââââââââââââââââââââââââââ
// Uses SECURITY DEFINER functions from the billing system.

async function deductCredit(userId: string): Promise<void> {
  const { supabaseAdmin } = await import('@/lib/supabase-admin');

  const { data, error } = await supabaseAdmin.rpc('deduct_credit', {
    p_user_id: userId,
  });

  if (error) {
    console.error('[pipeline] deduct_credit error:', error);
    throw new Error('Failed to deduct credit. You may not have enough credits.');
  }

  if (data === false) {
    throw new Error('Insufficient credits. Please purchase more credits to generate a pack.');
  }
}

async function restoreCredit(userId: string): Promise<void> {
  const { supabaseAdmin } = await import('@/lib/supabase-admin');

  const { error } = await supabaseAdmin.rpc('restore_credit', {
    p_user_id: userId,
  });

  if (error) {
    console.error('[pipeline] restore_credit error:', error);
    throw new Error(`Failed to restore credit: ${error.message}`);
  }
}

// âââ Email Notification ââââââââââââââââââââââââââââââââââââââââââââââââ

async function sendCompletionEmail(
  packId: string,
  userId: string
): Promise<void> {
  try {
    // Dynamic import to avoid circular deps and make email optional
    const { sendPackReadyEmail } = await import('@/lib/email/send');
    await sendPackReadyEmail(packId, userId);
  } catch (err) {
    // Email is non-blocking â log and continue
    console.error('[pipeline] sendCompletionEmail error:', err);
  }
}
