import puppeteer from 'puppeteer';
import { GENERATION_TIMEOUT_MS } from '@/lib/constants';

/**
 * Convert an HTML string to a PDF buffer using Puppeteer.
 *
 * Uses headless Chromium to render the HTML template with print-quality
 * output: A4 format, 1" margins, professional typography.
 */
export async function htmlToPDF(html: string): Promise<Buffer> {
  let browser;

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
    });

    const page = await browser.newPage();

    // Set content with generous timeout for image loading
    await page.setContent(html, {
      waitUntil: 'networkidle0',
      timeout: GENERATION_TIMEOUT_MS,
    });

    // Wait for all images to load
    await page.evaluate(() => {
      return Promise.all(
        Array.from(document.images)
          .filter((img) => !img.complete)
          .map(
            (img) =>
              new Promise<void>((resolve) => {
                img.onload = () => resolve();
                img.onerror = () => resolve(); // Don't block on failed images
              })
          )
      );
    });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: {
        top: '1in',
        right: '1in',
        bottom: '1in',
        left: '1in',
      },
      printBackground: true,
      preferCSSPageSize: false,
    });

    return Buffer.from(pdfBuffer);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
