import { packReadyHTML, packReadyText } from './templates';
import { getPack } from '@/lib/database/packs';
import { getGeneration } from '@/lib/database/generations';
import { getPDFUrl } from '@/lib/storage/uploads';

/**
 * Send "Your pack is ready" email via Resend.
 * Fire-and-forget with error logging â email failures
 * should never block the generation pipeline.
 */
export async function sendPackReadyEmail(
  packId: string,
  userId: string
): Promise<void> {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    console.warn('[email] RESEND_API_KEY not configured, skipping email');
    return;
  }

  // Get user email from Supabase auth
  const { supabaseAdmin } = await import('@/lib/supabase-admin');
  const { data: userData, error: userError } =
    await supabaseAdmin.auth.admin.getUserById(userId);

  if (userError || !userData?.user?.email) {
    console.error('[email] Could not get user email:', userError);
    return;
  }

  const userEmail = userData.user.email;
  const userName =
    userData.user.user_metadata?.full_name ||
    userData.user.user_metadata?.name ||
    '';

  // Get pack data
  const pack = await getPack(packId, userId);
  if (!pack) {
    console.error('[email] Pack not found:', packId);
    return;
  }

  // Get download URL
  const generation = await getGeneration(packId);
  if (!generation?.pdf_storage_path) {
    console.error('[email] No PDF path for pack:', packId);
    return;
  }

  const downloadUrl = await getPDFUrl(generation.pdf_storage_path);

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL || 'https://chargebackkit.com';

  const templateData = {
    userName,
    merchantName: pack.merchant_name,
    transactionAmount: `$${(pack.transaction_amount / 100).toFixed(2)}`,
    packId,
    downloadUrl: `${appUrl}/api/packs/${packId}/download`,
  };

  const fromEmail =
    process.env.RESEND_FROM_EMAIL || 'ChargebackKit <noreply@chargebackkit.com>';

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${resendApiKey}`,
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [userEmail],
      subject: `Your evidence pack for ${pack.merchant_name} is ready`,
      html: packReadyHTML(templateData),
      text: packReadyText(templateData),
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    console.error('[email] Resend API error:', response.status, body);
    return;
  }

  console.log(`[email] Pack-ready email sent to ${userEmail} for pack ${packId}`);
}
