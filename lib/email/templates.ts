/**
 * Transactional email templates for ChargebackKit.
 *
 * Boundary: ChargebackKit sends pack-ready notifications only.
 * Stripe handles receipts, renewals, and payment failures (DEC-030).
 */

export interface PackReadyEmailData {
  userName: string;
  merchantName: string;
  transactionAmount: string;
  packId: string;
  downloadUrl: string;
}

export function packReadyHTML(data: PackReadyEmailData): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="background:#111;padding:24px 32px;">
              <h1 style="margin:0;color:#fff;font-size:20px;font-weight:600;">
                ChargebackKit
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <h2 style="margin:0 0 16px;color:#111;font-size:22px;font-weight:600;">
                Your Evidence Pack is Ready
              </h2>

              <p style="margin:0 0 16px;color:#444;font-size:15px;line-height:1.6;">
                Hi${data.userName ? ` ${data.userName}` : ''},
              </p>

              <p style="margin:0 0 16px;color:#444;font-size:15px;line-height:1.6;">
                Your professional evidence pack for the
                <strong>${escapeHtml(data.merchantName)}</strong> dispute
                (${data.transactionAmount}) has been generated and is ready
                for download.
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;">
                <tr>
                  <td align="center">
                    <a href="${data.downloadUrl}"
                       style="display:inline-block;background:#16a34a;color:#fff;text-decoration:none;padding:12px 32px;border-radius:6px;font-size:15px;font-weight:600;">
                      Download Your PDF
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 8px;color:#666;font-size:13px;line-height:1.5;">
                This download link expires in 1 hour. You can always download
                your pack again from your
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://chargebackkit.com'}/app/packs/${data.packId}"
                   style="color:#2563eb;text-decoration:none;">
                  dashboard
                </a>.
              </p>

              <!-- Tips -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;background:#f9fafb;border-radius:6px;border:1px solid #e5e7eb;">
                <tr>
                  <td style="padding:16px;">
                    <p style="margin:0 0 8px;color:#111;font-size:14px;font-weight:600;">
                      Next Steps
                    </p>
                    <p style="margin:0;color:#555;font-size:13px;line-height:1.6;">
                      1. Download and review your evidence pack PDF<br/>
                      2. Submit it to your bank&rsquo;s dispute department<br/>
                      3. Keep your reference number for follow-up
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px;background:#fafafa;border-top:1px solid #eee;">
              <p style="margin:0;color:#999;font-size:12px;line-height:1.5;">
                You received this email because you generated an evidence pack
                on ChargebackKit. If you have questions, reply to this email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function packReadyText(data: PackReadyEmailData): string {
  return `Your Evidence Pack is Ready

Hi${data.userName ? ` ${data.userName}` : ''},

Your professional evidence pack for the ${data.merchantName} dispute (${data.transactionAmount}) has been generated and is ready for download.

Download your PDF: ${data.downloadUrl}

This download link expires in 1 hour. You can always download your pack again from your dashboard.

Next Steps:
1. Download and review your evidence pack PDF
2. Submit it to your bank's dispute department
3. Keep your reference number for follow-up

â ChargebackKit`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
