import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Shield, AlertTriangle, Clock, FileText, CheckCircle } from 'lucide-react'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chargebackkit.app'

export const metadata: Metadata = {
  title: 'PayPal Chargeback Evidence: What to Submit & How to Win | ChargebackKit',
  description:
    'Learn what PayPal requires for dispute evidence and how to submit a winning response. Covers PayPal Resolution Center, INR claims, SNAD disputes, and unauthorized transaction chargebacks.',
  alternates: {
    canonical: `${siteUrl}/paypal-chargeback-evidence`,
  },
  openGraph: {
    title: 'PayPal Chargeback Evidence: What to Submit & How to Win | ChargebackKit',
    description:
      'Complete guide to PayPal chargeback evidence. Covers Resolution Center disputes, INR claims, SNAD disputes, and unauthorized transactions.',
    url: `${siteUrl}/paypal-chargeback-evidence`,
    type: 'article',
  },
}

const evidenceTypes = [
  { type: 'Shipping & Tracking Proof', proves: 'Item was shipped and delivered to the buyer', priority: 'Critical' },
  { type: 'Delivery Confirmation', proves: 'Package was delivered to the correct address with signature', priority: 'Critical' },
  { type: 'Buyer Communication', proves: 'Customer acknowledged receipt or satisfaction', priority: 'Critical' },
  { type: 'Transaction Records', proves: 'Order details, PayPal transaction ID, timestamps', priority: 'High' },
  { type: 'Product Description & Photos', proves: 'Item matched the listing description', priority: 'High' },
  { type: 'Refund/Return Policy', proves: 'Buyer agreed to terms before purchase', priority: 'High' },
  { type: 'IP & Device Information', proves: 'Buyer location matches shipping address', priority: 'Medium' },
  { type: 'Prior Transaction History', proves: 'Buyer has history of legitimate purchases', priority: 'Medium' },
]

const disputeTypes = [
  {
    name: 'Item Not Received (INR)',
    desc: 'Buyer claims the item never arrived.',
    key: 'Tracking with delivery confirmation is essential. Signature confirmation for items over $750 (PayPal Seller Protection threshold).',
    evidence: ['Tracking number with carrier name', 'Delivery confirmation to the address on the transaction', 'Shipping date relative to order date'],
  },
  {
    name: 'Significantly Not as Described (SNAD)',
    desc: 'Buyer claims the item differs materially from the listing.',
    key: 'Original product listing screenshots and detailed item descriptions are your strongest evidence.',
    evidence: ['Original listing with photos and description', 'Communication showing buyer acknowledged product details', 'Return shipping label (if return was offered)'],
  },
  {
    name: 'Unauthorized Transaction',
    desc: 'Account holder claims they did not authorize the payment.',
    key: 'This is escalated to the card network. Evidence proving the real cardholder made the purchase wins these disputes.',
    evidence: ['AVS/CVV match records', 'IP address matching billing address location', 'Device fingerprint from prior orders', 'Communication from buyer email on file'],
  },
]

const steps = [
  { num: '01', title: 'Check the Resolution Center', body: 'Log into PayPal and navigate to the Resolution Center. Review the dispute details, reason code, and response deadline. PayPal gives you 10 days to respond to buyer disputes.' },
  { num: '02', title: 'Identify the dispute type', body: 'PayPal disputes fall into INR (Item Not Received), SNAD (Significantly Not as Described), or Unauthorized Transaction. Each requires different evidence priorities.' },
  { num: '03', title: 'Gather your evidence', body: 'Collect tracking proof, delivery confirmation, customer communication, product descriptions, and transaction records. Prioritize evidence that directly addresses the buyer claim.' },
  { num: '04', title: 'Structure your response', body: 'Organize evidence into a clear narrative with labeled exhibits. ChargebackKit assembles this automatically for your specific dispute type and formats it for the reviewing team.' },
  { num: '05', title: 'Submit through the Resolution Center', body: 'Upload your evidence pack through PayPal Resolution Center before the deadline. Include a concise seller statement summarizing your position.' },
]

const faqs = [
  {
    q: 'How long do I have to respond to a PayPal dispute?',
    a: 'PayPal gives sellers 10 days to respond to buyer disputes in the Resolution Center. If the dispute escalates to a claim, you typically have 10 additional days. For chargebacks (card network disputes routed through PayPal), deadlines vary by card network: Visa allows 30 days, Mastercard 45 days.',
  },
  {
    q: 'What is the difference between a PayPal dispute and a PayPal chargeback?',
    a: 'A PayPal dispute is filed through PayPal Resolution Center and reviewed by PayPal. A PayPal chargeback is filed through the buyer card issuer and reviewed by the card network (Visa, Mastercard). Chargebacks bypass PayPal and go directly to the card network, requiring more formal evidence.',
  },
  {
    q: 'Does PayPal Seller Protection cover all disputes?',
    a: 'No. Seller Protection covers eligible transactions for Unauthorized Transaction and Item Not Received claims only. SNAD (Significantly Not as Described) claims are not covered. To qualify, you must ship to the address on the transaction page and have valid proof of delivery.',
  },
  {
    q: 'Can I use ChargebackKit for PayPal disputes?',
    a: 'Yes. ChargebackKit structures your evidence for any dispute type, including PayPal Resolution Center disputes and card network chargebacks routed through PayPal. The evidence format is optimized for the reviewing party.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

export default function PayPalChargebackEvidencePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="bg-brand-900 pt-16 pb-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-100 text-sm font-medium uppercase tracking-widest mb-4">PayPal Disputes</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
            PayPal Chargeback Evidence: What to Submit and How to Win
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed mb-8">
            Whether it is a Resolution Center dispute or a card network chargeback routed through PayPal,
            your evidence needs to directly address the buyer claim. Here is exactly what to submit.
          </p>
          <Link
            href="https://buy.stripe.com/5kQaEY83P3f02Hdf0l3Nm02"
            className="inline-flex items-center gap-2 bg-emerald-500 text-white font-bold text-base px-8 py-4 rounded-lg hover:bg-emerald-600 transition-colors shadow-lg"
          >
            Build My Evidence Pack &mdash; $19
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Evidence Requirements Table */}
      <section className="section bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">What PayPal Requires</h2>
          <p className="text-slate-600 mb-6">
            PayPal evaluates evidence based on the dispute type. The weight of each evidence category
            shifts depending on whether the buyer claims non-receipt, item mismatch, or unauthorized use.
          </p>
          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-5 py-3 font-semibold text-slate-700">Evidence Type</th>
                  <th className="text-left px-5 py-3 font-semibold text-slate-700">What It Proves</th>
                  <th className="text-left px-5 py-3 font-semibold text-slate-700">Priority</th>
                </tr>
              </thead>
              <tbody>
                {evidenceTypes.map(({ type, proves, priority }, i) => (
                  <tr key={type} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-5 py-3 font-medium text-slate-900">{type}</td>
                    <td className="px-5 py-3 text-slate-600">{proves}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        priority === 'Critical' ? 'bg-red-50 text-red-700' :
                        priority === 'High' ? 'bg-amber-50 text-amber-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>{priority}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Dispute Types */}
      <section className="section bg-slate-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">PayPal Dispute Types</h2>
          <p className="text-slate-600 mb-8">Each dispute type requires a different evidence strategy.</p>
          <div className="space-y-5">
            {disputeTypes.map(({ name, desc, key, evidence }) => (
              <div key={name} className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-1">{name}</h3>
                <p className="text-sm text-slate-500 mb-3">{desc}</p>
                <div className="bg-brand-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-brand-800"><span className="font-semibold">Key:</span> {key}</p>
                </div>
                <ul className="space-y-1.5">
                  {evidence.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step by Step */}
      <section className="section bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Step by Step: How to Respond</h2>
          <div className="space-y-8">
            {steps.map(({ num, title, body }) => (
              <div key={num} className="flex gap-5 items-start">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center">
                  <span className="text-sm font-bold text-brand-800">{num}</span>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-900 mb-1">{title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="section bg-slate-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Common Mistakes to Avoid</h2>
          <div className="space-y-4">
            {[
              { title: 'No tracking with delivery confirmation', desc: 'For INR claims, tracking alone is not enough. You need delivery confirmation showing the package reached the address on the PayPal transaction.' },
              { title: 'Missing the 10-day response window', desc: 'PayPal escalates disputes to claims if the seller does not respond within 10 days. Once escalated, your options narrow significantly.' },
              { title: 'Generic evidence without context', desc: 'Submitting a pile of screenshots without explaining what each one proves weakens your case. Label every exhibit and connect it to the buyer claim.' },
              { title: 'Not understanding Seller Protection limits', desc: 'SNAD claims are not covered by Seller Protection. Do not assume PayPal will cover you automatically for item-not-as-described disputes.' },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-white border-l-4 border-red-400 p-5 rounded-r-lg">
                <h3 className="font-semibold text-slate-900 mb-1 text-sm">{title}</h3>
                <p className="text-sm text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <details key={q} className="group bg-slate-50 rounded-lg border border-slate-200">
                <summary className="flex items-start justify-between gap-4 px-5 py-4 cursor-pointer list-none font-semibold text-slate-900 text-sm">
                  <span>{q}</span>
                  <span className="shrink-0 text-slate-400 mt-0.5 group-open:rotate-180 transition-transform text-base leading-none">&darr;</span>
                </summary>
                <div className="px-5 pb-4 pt-2 text-sm text-slate-600 leading-relaxed border-t border-slate-200">{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-800 py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Win your PayPal dispute</h2>
          <p className="text-slate-300 text-lg mb-8">$19. Submission-ready evidence pack in 30 minutes.</p>
          <Link
            href="https://buy.stripe.com/5kQaEY83P3f02Hdf0l3Nm02"
            className="inline-flex items-center gap-2 bg-emerald-500 text-white font-bold text-base px-8 py-4 rounded-lg hover:bg-emerald-600 transition-colors shadow-lg"
          >
            Build My Evidence Pack &mdash; $19
            <ArrowRight size={18} />
          </Link>
          <p className="mt-4 text-sm text-slate-400">
            Secure checkout via Stripe &middot; No subscription &middot;{' '}
            <Link href="/pricing/" className="underline hover:text-white transition-colors">Volume discounts available</Link>
          </p>
        </div>
      </section>

      {/* Related Resources */}
      <section className="bg-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Resources</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link href="/guides/paypal-dispute-response/" className="text-sm text-brand-700 hover:text-brand-800 hover:underline">PayPal Dispute Response Guide &rarr;</Link>
            <Link href="/stripe-chargeback-evidence/" className="text-sm text-brand-700 hover:text-brand-800 hover:underline">Stripe Chargeback Evidence Guide &rarr;</Link>
            <Link href="/chargeback-evidence-checklist/" className="text-sm text-brand-700 hover:text-brand-800 hover:underline">Evidence Checklist by Dispute Type &rarr;</Link>
            <Link href="/templates/" className="text-sm text-brand-700 hover:text-brand-800 hover:underline">Response Letter Templates &rarr;</Link>
            <Link href="/guides/chargeback-response-deadlines/" className="text-sm text-brand-700 hover:text-brand-800 hover:underline">Response Deadlines by Card Network &rarr;</Link>
            <Link href="/preview/" className="text-sm text-brand-700 hover:text-brand-800 hover:underline">Preview a Sample Evidence Pack &rarr;</Link>
          </div>
        </div>
      </section>
    </>
  )
}
