import type { Pack, Exhibit } from '@/lib/database/types';
import { DISPUTE_CATEGORIES } from '@/lib/constants';

/**
 * Data needed to render the evidence pack PDF.
 */
export interface PDFTemplateData {
  pack: Pack;
  exhibits: Exhibit[];
  rebuttalText: string;
  exhibitUrls: { exhibit: Exhibit; url: string }[];
  generatedAt: string;
}

function getCategoryLabel(categoryId: string): string {
  return (
    DISPUTE_CATEGORIES.find((c) => c.id === categoryId)?.label ?? categoryId
  );
}

function formatCurrency(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Build the full HTML document for the evidence pack PDF.
 *
 * Sections:
 * 1. Cover page with dispute summary
 * 2. Rebuttal narrative
 * 3. Evidence checklist / exhibit index
 * 4. Individual exhibit pages (images rendered inline, PDFs as references)
 */
export function buildPDFHTML(data: PDFTemplateData): string {
  const { pack, exhibits, rebuttalText, exhibitUrls, generatedAt } = data;
  const categoryLabel = getCategoryLabel(pack.dispute_category);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    @page {
      size: A4;
      margin: 1in;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Georgia', 'Times New Roman', serif;
      font-size: 11pt;
      line-height: 1.6;
      color: #1a1a1a;
    }

    .page-break {
      page-break-before: always;
    }

    /* ââ Cover Page ââââââââââââââââââââââââââââââââââââââââ */

    .cover {
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-height: 80vh;
      text-align: center;
    }

    .cover h1 {
      font-size: 28pt;
      font-weight: 700;
      color: #111;
      margin-bottom: 8pt;
      letter-spacing: -0.5px;
    }

    .cover .subtitle {
      font-size: 14pt;
      color: #555;
      margin-bottom: 40pt;
    }

    .cover .summary-table {
      width: 80%;
      margin: 0 auto;
      border-collapse: collapse;
      text-align: left;
    }

    .cover .summary-table td {
      padding: 8pt 12pt;
      font-size: 11pt;
      border-bottom: 1px solid #e0e0e0;
    }

    .cover .summary-table td:first-child {
      font-weight: 600;
      color: #666;
      width: 40%;
    }

    .cover .footer-note {
      margin-top: 40pt;
      font-size: 9pt;
      color: #999;
    }

    /* ââ Section Headers âââââââââââââââââââââââââââââââââââ */

    h2 {
      font-size: 16pt;
      font-weight: 700;
      color: #222;
      margin-bottom: 12pt;
      padding-bottom: 6pt;
      border-bottom: 2px solid #333;
    }

    h3 {
      font-size: 13pt;
      font-weight: 600;
      color: #333;
      margin-top: 16pt;
      margin-bottom: 8pt;
    }

    /* ââ Body Text âââââââââââââââââââââââââââââââââââââââââ */

    p {
      margin-bottom: 10pt;
      text-align: justify;
    }

    /* ââ Rebuttal Section ââââââââââââââââââââââââââââââââââ */

    .rebuttal {
      padding-top: 20pt;
    }

    .rebuttal .narrative {
      background: #fafafa;
      border-left: 3px solid #333;
      padding: 16pt 20pt;
      margin: 12pt 0;
    }

    /* ââ Evidence Checklist âââââââââââââââââââââââââââââââââ */

    .checklist {
      padding-top: 20pt;
    }

    .checklist table {
      width: 100%;
      border-collapse: collapse;
      font-size: 10pt;
    }

    .checklist th {
      text-align: left;
      padding: 8pt;
      background: #f0f0f0;
      border-bottom: 2px solid #ccc;
      font-weight: 600;
      font-size: 9pt;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #555;
    }

    .checklist td {
      padding: 8pt;
      border-bottom: 1px solid #e8e8e8;
    }

    .checklist tr:nth-child(even) td {
      background: #fafafa;
    }

    /* ââ Exhibit Pages âââââââââââââââââââââââââââââââââââââ */

    .exhibit-page {
      padding-top: 20pt;
    }

    .exhibit-page .exhibit-header {
      background: #f5f5f5;
      padding: 12pt 16pt;
      border: 1px solid #ddd;
      margin-bottom: 16pt;
    }

    .exhibit-page .exhibit-header .label {
      font-size: 14pt;
      font-weight: 600;
    }

    .exhibit-page .exhibit-header .meta {
      font-size: 9pt;
      color: #777;
      margin-top: 4pt;
    }

    .exhibit-page img {
      max-width: 100%;
      max-height: 700pt;
      display: block;
      margin: 0 auto;
      border: 1px solid #e0e0e0;
    }

    .exhibit-page .non-image-notice {
      background: #f9f9f9;
      border: 1px dashed #ccc;
      padding: 24pt;
      text-align: center;
      color: #666;
      font-size: 10pt;
    }

    /* ââ Dispute Reason ââââââââââââââââââââââââââââââââââââ */

    .dispute-reason {
      padding-top: 20pt;
    }

    .dispute-reason .reason-text {
      background: #fff8f0;
      border: 1px solid #f0dcc0;
      padding: 16pt;
      font-style: italic;
    }
  </style>
</head>
<body>

  <!-- ââââââââââââ COVER PAGE ââââââââââââ -->
  <div class="cover">
    <h1>Evidence Pack</h1>
    <p class="subtitle">Chargeback Dispute Documentation</p>

    <table class="summary-table">
      <tr>
        <td>Merchant</td>
        <td>${escapeHtml(pack.merchant_name)}</td>
      </tr>
      <tr>
        <td>Transaction Amount</td>
        <td>${formatCurrency(pack.transaction_amount)}</td>
      </tr>
      <tr>
        <td>Transaction Date</td>
        <td>${formatDate(pack.transaction_date)}</td>
      </tr>
      <tr>
        <td>Dispute Category</td>
        <td>${escapeHtml(categoryLabel)}</td>
      </tr>
      <tr>
        <td>Evidence Items</td>
        <td>${exhibits.length} document${exhibits.length !== 1 ? 's' : ''}</td>
      </tr>
      <tr>
        <td>Generated</td>
        <td>${formatDate(generatedAt)}</td>
      </tr>
    </table>

    <p class="footer-note">
      Generated by ChargebackKit &mdash; Professional Dispute Evidence Packs
    </p>
  </div>

  <!-- ââââââââââââ DISPUTE REASON ââââââââââââ -->
  <div class="dispute-reason page-break">
    <h2>Dispute Summary</h2>
    <p>
      This evidence pack documents a <strong>${escapeHtml(categoryLabel)}</strong>
      dispute for a transaction of <strong>${formatCurrency(pack.transaction_amount)}</strong>
      with <strong>${escapeHtml(pack.merchant_name)}</strong> on
      <strong>${formatDate(pack.transaction_date)}</strong>.
    </p>

    <h3>Cardholder&rsquo;s Statement</h3>
    <div class="reason-text">
      ${escapeHtml(pack.dispute_reason)}
    </div>

    ${buildIntakeAnswersSection(pack)}
  </div>

  <!-- ââââââââââââ REBUTTAL NARRATIVE ââââââââââââ -->
  <div class="rebuttal page-break">
    <h2>Rebuttal Narrative</h2>
    <p>
      The following narrative summarizes the cardholder&rsquo;s position and
      supporting evidence for this dispute.
    </p>
    <div class="narrative">
      ${rebuttalText.split('\n').map((p) => `<p>${escapeHtml(p)}</p>`).join('\n')}
    </div>
  </div>

  <!-- ââââââââââââ EVIDENCE CHECKLIST ââââââââââââ -->
  <div class="checklist page-break">
    <h2>Evidence Index</h2>
    <p>
      The following ${exhibits.length} piece${exhibits.length !== 1 ? 's' : ''} of
      evidence ${exhibits.length !== 1 ? 'are' : 'is'} included in this pack.
    </p>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Label</th>
          <th>File Name</th>
          <th>Type</th>
          <th>Size</th>
        </tr>
      </thead>
      <tbody>
        ${exhibits.map((ex, idx) => `
        <tr>
          <td>${idx + 1}</td>
          <td>${escapeHtml(ex.label)}</td>
          <td>${escapeHtml(ex.original_name)}</td>
          <td>${escapeHtml(friendlyMimeType(ex.mime_type))}</td>
          <td>${formatBytes(ex.file_size)}</td>
        </tr>
        `).join('')}
      </tbody>
    </table>
  </div>

  <!-- ââââââââââââ EXHIBIT PAGES ââââââââââââ -->
  ${exhibitUrls.map((item, idx) => buildExhibitPage(item.exhibit, item.url, idx)).join('\n')}

</body>
</html>`;
}

// âââ Helpers ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function friendlyMimeType(mime: string): string {
  const map: Record<string, string> = {
    'image/jpeg': 'JPEG Image',
    'image/png': 'PNG Image',
    'image/webp': 'WebP Image',
    'image/gif': 'GIF Image',
    'application/pdf': 'PDF Document',
    'text/plain': 'Text File',
    'text/csv': 'CSV File',
  };
  return map[mime] || mime;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isImageMime(mime: string): boolean {
  return mime.startsWith('image/');
}

function buildExhibitPage(exhibit: Exhibit, url: string, index: number): string {
  const isImage = isImageMime(exhibit.mime_type);

  return `
  <div class="exhibit-page page-break">
    <div class="exhibit-header">
      <div class="label">Exhibit ${index + 1}: ${escapeHtml(exhibit.label)}</div>
      <div class="meta">
        ${escapeHtml(exhibit.original_name)} &middot;
        ${friendlyMimeType(exhibit.mime_type)} &middot;
        ${formatBytes(exhibit.file_size)}
      </div>
    </div>
    ${isImage
      ? `<img src="${url}" alt="${escapeHtml(exhibit.label)}" />`
      : `<div class="non-image-notice">
           <p><strong>${escapeHtml(exhibit.original_name)}</strong></p>
           <p>${friendlyMimeType(exhibit.mime_type)} &mdash; ${formatBytes(exhibit.file_size)}</p>
           <p>This document is included as a separate attachment in the evidence pack.</p>
         </div>`
    }
  </div>`;
}

function buildIntakeAnswersSection(pack: Pack): string {
  const answers = pack.intake_answers;
  if (!answers || Object.keys(answers).length === 0) return '';

  const rows = Object.entries(answers)
    .filter(([, value]) => value !== '' && value !== null && value !== undefined)
    .map(([key, value]) => {
      const label = key
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
      const displayValue =
        typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value);
      return `<tr><td>${escapeHtml(label)}</td><td>${escapeHtml(displayValue)}</td></tr>`;
    })
    .join('');

  if (!rows) return '';

  return `
    <h3>Additional Details</h3>
    <table class="summary-table" style="width:100%; margin-top:8pt;">
      ${rows}
    </table>
  `;
}
