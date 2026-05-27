import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Shield, CheckCircle } from 'lucide-react'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chargebackkit.app'

export const metadata: Metadata = {
  title: 'Square Chargeback Evidence: What to Submit & How to Win | ChargebackKit',
  description:
    'Learn what Square requires for chargeback evidence. Covers Square dispute flow, evidence types for in-person and online payments, and how to respond through the Square Dashboard.',
  alternates: {
    canonical: `${siteUrl}/square-chargeback-evidence`,
  },
  openGraph: {
    title: 'Square Chargeback Evidence: What to Submit & How to Win | ChargebackKit',
    description:
      'Complete guide to Square chargeback evidence for both in-person and online transactions.',
    url: `${siteUrl}/square-chargeback-evidence`,
    type: 'article',
  },
}

const evidenceTypes = [
  { type: 'Receipt / Invoice', proves: 'Transaction details, amount, date, and items purchased', priority: 'Critical' },
  { type: 'Delivery / Pickup Proof', proves: 'Customer received the product or service', priority: 'Critical' },
  { type: 'Customer Communication', proves: 'Buyer confirmed purchase, delivery, or satisfaction', priority: 'Critical' },
  { type: 'EMV Chip / Tap Records', proves: 'Card was physically present for in-person transactions', priority: 'High' },
  { type: 'Signed Receipts', proves: 'Cardholder authorized the transaction (in-person)', priority: 'High' },
  { type: 'Refund/Return Policy', proves: 'Customer was informed of store policies', priority: 'High' },
  { type: 'Product Photos / Description', proves: 'Product matched listing or customer expectation', priority: 'Medium' },
  { type: 'Customer Identity Verification', proves: 'Purchaser matches the cardholder on file', priority: 'Medium' },
]

const disputeTypes = [
  {
    name: 'Unauthorized / Fraudulent',
    desc: 'Cardholder claims they did not make or authorize the purchase.',
    key: 'For in-person transactions, EMV chip read and signed receipts are strong. For online, AVS/CVV match and IP verification.',
    evidence: ['EMV chip transaction record (in-person)', 'Signed receipt or PIN verification', 'AVS/CVV verification (online)', 'Customer IP and device data (online)'],
  },
  {
    name: 'Goods / Services Not Received',
    desc: 'Customer claims they never received what they paid for.',
    key: 'Tracking with delivery confirmation is essential. For services, documentation of service completion.',
    evidence: ['Shipping tracking with delivery confirmation', 'In-person pickup receipt with signature', 'Service completion records with dates', 'Communication confirming delivery or completion'],
  },
  {
    name: 'Goods / Services Not as Described',
    desc: 'Customer claims the product or service did not match expectations.',
    key: 'Original product listing or service description plus communication showing customer acknowledgment.',
    evidence: ['Product listing or service description', 'Photos of item as shipped', 'Customer communication before purchase', 'Return policy presented at point of sale'],
  },
  {
    name: 'Duplicate Processing',
    desc: 'Customer claims they were charged more than once.',
    key: 'Transaction logs showing each charge corresponds to a separate order or service.',
    evidence: ['Separate receipts for each transaction', 'Distinct order or invoice numbers', 'Itemized list showing different products/services', 'Timestamps showing separate transactions'],
  },
]

const steps = [
  { num: '01', title: 'Review the dispute in Square Dashboard', body: 'Navigate to Transactions in your Square Dashboard. Find the disputed payment and review the dispute details, reason code, and deadline. Square notifies you via email when a dispute is filed.' },
  { num: '02', title: 'Determine in-person vs online', body: 'Square handles both card-present (in-person POS) and card-not-present (online) transactions. The evidence strategy differs significantly. EMV chip data is strong for in-person; tracking and digital records matter for online.' },
  { num: '03', title: 'Collect your evidence', body: 'Pull receipts, tracking info, customer emails, signed documents, and transaction records. Square automatically provides some transaction data, but you need to supplement with delivery proof and communication.' },
  { num: '04', title: 'Structure your response', body: 'Organize evidence with a clear narrative addressing the specific dispute reason. ChargebackKit formats this for the card network that will review your case.' },
  { num: '05', title: 'Submit through Square', body: 'Upload your evidence through the Square Dashboard dispute response form. Include a seller statement and all supporting documents before the deadline.' },
]

const faqs = [
  {
    q: 'How long do I have to respond to a Square chargeback?',
    a: 'Square gives you 7 days from the dispute notification to submit evidence. The card network deadline is longer, but Square needs processing time. Respond as soon as possible to avoid missing the window.',
  },
  {
    q: 'Does Square charge a chargeback fee?',
    a: 'Square does not charge a chargeback fee for standard processing accounts. However, the disputed amount is held during the review period. If you lose the dispute, the held funds are returned to the cardholder.',
  },
  {
    q: 'Are in-person Square transactions easier to win?',
    a: 'Generally yes. Card-present transactions with EMV chip reads have lower fraud rates and stronger evidence (the physical card was present). Signed receipts and chip verification records are powerful evidence that the cardholder was physically present.',
  },
  {
    q: 'Can I use ChargebackKit for Square disputes?',
    a: 'Yes. ChargebackKit structures your evidence for any payment processor, including Square. The evidence format is optimized for the card network (Visa, Mastercard, Amex) that ultimately reviews the dispute.',
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

export default function SquareChargebackEvidencePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="bg-brand-900 pt-16 pb-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-100 text-sm font-medium uppercase tracking-widest mb-4">Square Disputes</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
            Square Chargeback Evidence: What to Submit and How to Win
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed mb-8">
            Whether the disputed transaction was in-person at your POS or through your Square Online store,
            the right evidence strategy depends on how the card was used. Here is what to submit for each scenario.
          </p>
          <Link
            href="https://buy.stripe.com/5kQaEY83P3f02Hdf0l3Nm02"
            className="inline-flex items-center gap-2 bg-emerald-500 text-white font-bold text-base px-8 py-4 rounded-lg hover:bg-emerald-600 transition-colors shadow-lg"
          >
            Build My Evidence Pack &mdash; $19
            <ArrowRight size={18} />
          </Link>
          <p className="mt-4">
            <Link href="/preview" className="text-sm text-slate-300 hover:text-white underline underline-offset-2 transition-colors">
              See a sample evidence pack &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* Evidence Table */}
      <section className="section bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">What Square Requires</h2>
          <p className="text-slate-600 mb-6">
            Square forwards your evidence to the card network. The card network &mdash; not Square &mdash; makes
            the final determination. Your evidence must address the specific reason code on the dispute.
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

      {/* In-Person vs Online callout */}
      <section className="bg-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-brand-50 rounded-xl p-6 border border-brand-200">
              <h3 className="font-semibold text-brand-900 mb-2">In-Person (Card Present)</h3>
              <p className="text-sm text-brand-800 leading-relaxed">
                EMV chip read records, signed receipts, and PIN verification are your strongest evidence.
                Card-present transactions have built-in fraud protection from the physical card verification.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-2">Online (Card Not Present)</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                AVS/CVV verification, IP geolocation, shipping tracking, and customer communication
                are critical. Without physical card presence, you must prove the real cardholder made the purchase.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dispute Types */}
      <section className="section bg-slate-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Square Dispute Categories</h2>
          <p className="text-slate-600 mb-8">Each category requires a different evidence strategy.</p>
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

      {/* Steps */}
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
          <h2 className="text-3xl font-bold text-white mb-4">Win your Square dispute</h2>
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
          <p className="mt-3">
            <Link href="/preview" className="text-sm text-slate-300 hover:text-white underline underline-offset-2 transition-colors">
              Or see a sample pack first &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* Related */}
      <section className="bg-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Resources</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link href="/guides/square-chargeback-response/" className="text-sm text-brand-700 hover:text-brand-800 hover:underline">Square Chargeback Response Guide &rarr;</Link>
            <Link href="/stripe-chargeback-evidence/" className="text-sm text-brand-700 hover:text-brand-800 hover:underline">Stripe Chargeback Evidence Guide &rarr;</Link>
            <Link href="/paypal-chargeback-evidence/" className="text-sm text-brand-700 hover:text-brand-800 hover:underline">PayPal Chargeback Evidence Guide &rarr;</Link>
            <Link href="/shopify-chargeback-evidence/" className="text-sm text-brand-700 hover:text-brand-800 hover:underline">Shopify Chargeback Evidence Guide &rarr;</Link>
            <Link href="/chargeback-evidence-checklist/" className="text-sm text-brand-700 hover:text-brand-800 hover:underline">Evidence Checklist by Dispute Type &rarr;</Link>
            <Link href="/preview/" className="text-sm text-brand-700 hover:text-brand-800 hover:underline">Preview a Sample Evidence Pack &rarr;</Link>
          </div>
        </div>
      </section>
    </>
  )
}
