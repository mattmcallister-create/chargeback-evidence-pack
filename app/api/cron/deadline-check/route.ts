import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * GET /api/cron/deadline-check
 *
 * Checks for evidence packs with dispute deadlines within the next 48 hours
 * and sends reminder emails via Resend. Designed to be called by an external
 * cron service (e.g., Render Cron Job or GitHub Actions).
 *
 * Auth: Requires CRON_SECRET header to match env var.
 */
export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json(
      { error: 'Missing Supabase configuration' },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const now = new Date();
  const fortyEightHoursFromNow = new Date(
    now.getTime() + 48 * 60 * 60 * 1000
  );

  try {
    // Find evidence packs with deadlines in the next 48 hours
    // that haven't been submitted yet and haven't had a reminder sent
    const { data: urgentPacks, error } = await supabase
      .from('evidence_packs')
      .select(
        `
        id,
        dispute_reason,
        dispute_amount,
        dispute_deadline,
        status,
        user_id,
        profiles!inner(email, full_name)
      `
      )
      .eq('status', 'draft')
      .lte('dispute_deadline', fortyEightHoursFromNow.toISOString())
      .gte('dispute_deadline', now.toISOString())
      .is('reminder_sent_at', null);

    if (error) {
      console.error('Error querying urgent packs:', error);
      return NextResponse.json(
        { error: 'Database query failed' },
        { status: 500 }
      );
    }

    if (!urgentPacks || urgentPacks.length === 0) {
      return NextResponse.json({
        message: 'No urgent deadlines found',
        checked_at: now.toISOString(),
        count: 0,
      });
    }

    const results: Array<{
      pack_id: string;
      email_sent: boolean;
      error?: string;
    }> = [];

    for (const pack of urgentPacks) {
      const profile = Array.isArray(pack.profiles)
        ? pack.profiles[0]
        : pack.profiles;
      const email = profile?.email;
      const name = profile?.full_name || 'there';

      if (!email) {
        results.push({
          pack_id: pack.id,
          email_sent: false,
          error: 'No email found',
        });
        continue;
      }

      const deadline = new Date(pack.dispute_deadline);
      const hoursLeft = Math.round(
        (deadline.getTime() - now.getTime()) / (1000 * 60 * 60)
      );
      const formattedDeadline = deadline.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short',
      });

      const amount = pack.dispute_amount
        ? `$${(pack.dispute_amount / 100).toFixed(2)}`
        : 'N/A';

      // Send email via Resend if API key is configured
      if (resendApiKey) {
        try {
          const emailResponse = await fetch(
            'https://api.resend.com/emails',
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${resendApiKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                from: 'ChargebackKit <notifications@chargebackkit.app>',
                to: [email],
                subject: `â ï¸ ${hoursLeft}h left â Your chargeback response deadline is approaching`,
                html: `
                  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background: #0f172a; padding: 24px; border-radius: 12px 12px 0 0;">
                      <h1 style="color: #10b981; margin: 0; font-size: 24px;">â¡ ChargebackKit</h1>
                    </div>
                    <div style="background: #fff; border: 1px solid #e2e8f0; padding: 32px; border-radius: 0 0 12px 12px;">
                      <p style="font-size: 16px; color: #1e293b;">Hi ${name},</p>
                      <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 20px 0; border-radius: 0 8px 8px 0;">
                        <p style="margin: 0; font-weight: 600; color: #92400e;">
                          â° Only ${hoursLeft} hours remaining
                        </p>
                        <p style="margin: 8px 0 0; color: #78350f;">
                          Your chargeback response deadline is <strong>${formattedDeadline}</strong>
                        </p>
                      </div>
                      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                        <tr>
                          <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Dispute Reason</td>
                          <td style="padding: 8px 0; color: #1e293b; font-weight: 500;">${pack.dispute_reason || 'Not specified'}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Amount</td>
                          <td style="padding: 8px 0; color: #1e293b; font-weight: 500;">${amount}</td>
                        </tr>
                      </table>
                      <a href="https://chargebackkit.app/app" style="display: inline-block; background: #10b981; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; margin: 16px 0;">
                        Complete Your Evidence Pack â
                      </a>
                      <p style="font-size: 14px; color: #64748b; margin-top: 24px;">
                        Submitting a well-organized evidence pack before the deadline significantly increases your chances of winning the dispute.
                      </p>
                    </div>
                    <p style="font-size: 12px; color: #94a3b8; text-align: center; margin-top: 16px;">
                      ChargebackKit â Win more chargebacks with professional evidence packs
                    </p>
                  </div>
                `,
              }),
            }
          );

          if (emailResponse.ok) {
            // Mark reminder as sent
            await supabase
              .from('evidence_packs')
              .update({ reminder_sent_at: now.toISOString() })
              .eq('id', pack.id);

            results.push({ pack_id: pack.id, email_sent: true });
          } else {
            const errBody = await emailResponse.text();
            results.push({
              pack_id: pack.id,
              email_sent: false,
              error: `Resend API error: ${emailResponse.status} ${errBody}`,
            });
          }
        } catch (emailErr) {
          results.push({
            pack_id: pack.id,
            email_sent: false,
            error: `Email send failed: ${emailErr}`,
          });
        }
      } else {
        // Log without sending if no Resend key
        console.log(
          `[deadline-check] Would send reminder to ${email} for pack ${pack.id} (${hoursLeft}h left)`
        );
        results.push({
          pack_id: pack.id,
          email_sent: false,
          error: 'RESEND_API_KEY not configured',
        });
      }
    }

    return NextResponse.json({
      message: `Processed ${urgentPacks.length} urgent packs`,
      checked_at: now.toISOString(),
      count: urgentPacks.length,
      results,
    });
  } catch (err) {
    console.error('Deadline check error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
