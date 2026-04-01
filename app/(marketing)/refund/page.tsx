import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'Refund Policy for the Chargeback Evidence Pack Builder. One-time purchase, 30-minute refund window before intake starts.',
  alternates: {
    canonical: '/refund/',
  },
}

export default function RefundPage() {
  const lastUpdated = 'March 31, 2026'

  return (
    <section className="section bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-[720px] mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Refund Policy</h1>
          <p className="text-sm text-slate-500">Last updated: {lastUpdated}</p>
        </div>

        <div className="prose-marketing">
          <p>
            The Chargeback Evidence Pack Builder is a digital product. Because pack assembly
            begins immediately upon intake, our refund window is narrow by necessity.
          </p>

          <h2>When a refund is available</h2>
          <p>
            A full refund is available if you request it within 30 minutes of purchase
            <strong> and</strong> you have not yet started the intake process (i.e., you
            have not begun answering questions in the builder). To request a refund, contact
            us at the email address in your purchase confirmation with your order reference.
          </p>

          <h2>When a refund is not available</h2>
          <p>
            Once you have started the intake process, the work of structuring your evidence
            has begun and a refund is not available. We cannot offer refunds based on
            chargeback outcomes — we structure your evidence correctly, but we cannot control
            how card networks rule on disputes.
          </p>

          <h2>Technical issues</h2>
          <p>
            If you experience a technical problem that prevents you from completing your pack
            or downloading your PDF, contact us immediately with your order reference. We
            will resolve the issue or issue a refund at our discretion.
          </p>

          <h2>How to request a refund</h2>
          <p>
            Email us within 30 minutes of purchase, before starting intake, using the email
            address in your purchase confirmation. Include your order reference number.
            Refunds are processed to your original payment method within 5–10 business days,
            depending on your card issuer.
          </p>

          <h2>Chargebacks against this product</h2>
          <p>
            If you dispute a charge with your bank instead of contacting us first, we will
            respond to the dispute with the evidence above. We request that you contact us
            first — most issues can be resolved without a bank dispute.
          </p>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-200 text-sm text-slate-500">
          <p>
            Related:{' '}
            <Link href="/terms/" className="text-brand-700 underline hover:text-brand-800">Terms of Service</Link>
            {' · '}
            <Link href="/privacy/" className="text-brand-700 underline hover:text-brand-800">Privacy Policy</Link>
            {' · '}
            <Link href="/faq/" className="text-brand-700 underline hover:text-brand-800">FAQ</Link>
          </p>
        </div>
      </div>
    </section>
  )
}
