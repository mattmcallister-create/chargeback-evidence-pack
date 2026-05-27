import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Shield, CheckCircle } from 'lucide-react'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chargebackkit.app'

export const metadata: Metadata = {
  title: 'Shopify Chargeback Evidence: What to Submit & How to Win | ChargebackKit',
  description:
    'Learn what Shopify Payments requires for chargeback evidence. Covers Shopify dispute flow, evidence types, inquiry vs chargeback, and how to respond through the Shopify admin.',
  alternates: {
    canonical: `${siteUrl}/shopify-chargeback-evidence`,
  },
  openGraph: {
    title: 'Shopify Chargeback Evidence: What to Submit & How to Win | ChargebackKit',
    description:
      'Complete guide to Shopify Payments chargeback evidence. Inquiry vs chargeback, evidence types, and how to respond.',
    url: `${siteUrl}/shopify-chargeback-evidence`,
    type: 'article',
  },
}

const evidenceTypes = [
  { type: 'Shipping & Tracking', proves: 'Order was shipped and delivered to the customer', priority: 'Critical' },
  { type: 'Customer Communication', proves: 'Buyer acknowledged order, delivery, or satisfaction', priority: 'Critical' },
  { type: 'Billing Statement Descriptor', proves: 'Charge description matches what customer expected', priority: 'High' },
  { type: 'Refund/Cancellation Policy', proves: 'Customer agreed to store policies at checkout', priority: 'High' },
  { type: 'Order Confirmation', proves: 'Customer received confirmation of their purchase', priority: 'High' },
  { type: 'Product Description', proves: 'Item delivered matches the product listing', priority: 'High' },
  { type: 'Customer IP & Geolocation', proves: 'Purchase originated from customer location', priority: 'Medium' },
  { type: 'Previous Order History', proves: 'Customer has a pattern of legitimate purchases', priority: 'Medium' },
]

const disputeTypes = [
  {
    name: 'Fraudulent',
    desc: 'Cardholder claims they did not authorize the charge.',
    key: 'AVS/CVV match, IP geolocation, and prior purchase history are your strongest evidence. Shopify Payments records these automatically.',
    evidence: ['AVS/CVV verification records', 'IP address and device fingerprint', 'Delivery confirmation to billing address', 'Prior successful orders from same customer'],
  },
  {
    name: 'Product Not Received',
    desc: 'Customer claims the order was never delivered.',
    key: 'Tracking with delivery confirmation to the shipping address on the order. For orders over $750, signature confirmation.',
    evidence: ['Carrier tracking number with delivery status', 'Delivery confirmation with date and address', 'Shipping notification email sent to customer', 'Proof of fulfillment from Shopify admin'],
  },
  {
    name: 'Product Unacceptable',
    desc: 'Customer claims the product was defective or not as described.',
    key: 'Original product listing, customer communication, and your return/refund policy are critical.',
    evidence: ['Product listing screenshots with description and images', 'Return/refund policy shown at checkout', 'Customer communication before and after delivery', 'Proof of any replacement or partial refund offered'],
  },
  {
    name: 'Subscription Cancelled',
    desc: 'Customer claims they cancelled a recurring subscription.',
    key: 'Proof that no cancellation request was received and the customer continued using the service after the charge.',
    evidence: ['Subscription terms accepted at signup', 'Cancellation policy with instructions', 'Login/usage logs after the charge date', 'No cancellation request on file'],
  },
]

const steps = [
  { num: '01', title: 'Review the dispute in Shopify admin', body: 'Navigate to Orders, find the disputed order, and review the chargeback details. Shopify shows the reason code, amount, and response deadline.' },
  { num: '02', title: 'Understand inquiry vs chargeback', body: 'An inquiry is a pre-chargeback information request. Responding to inquiries can prevent chargebacks entirely. A chargeback is a formal dispute with funds already debited.' },
  { num: '03', title: 'Gather evidence from Shopify', body: 'Shopify automatically collects some evidence (AVS/CVV results, IP address, order timeline). Supplement this with shipping proof, customer emails, and policy screenshots.' },
  { num: '04', title: 'Build your evidence pack', body: 'Organize all evidence into a structured response. ChargebackKit formats this for the specific dispute type and card network reviewing your case.' },
  { num: '05', title: 'Submit your response', body: 'Upload your evidence pack through the Shopify admin dispute response form. Add a clear, concise rebuttal statement. Shopify forwards this to the card network.' },
]

const faqs = [
  {
    q: 'How long do I have to respond to a Shopify chargeback?',
    a: 'Shopify gives you 7 calendar days to submit evidence after a chargeback notification. The underlying card network deadline is longer (Visa 30 days, Mastercard 45 days), but Shopify needs time to process and forward your response.',
  },
  {
    q: 'What is the difference between a Shopify inquiry and a chargeback?',
    a: 'An inquiry (also called a retrieval request) is when the issuing bank asks for transaction information before filing a chargeback. Responding to inquiries quickly and thoroughly can prevent the dispute from escalating to a full chargeback. A chargeback is a formal reversal of funds.',
  },
  {
    q: 'Does Shopify automatically submit evidence?',
    a: 'Shopify Payments automatically includes some data in your response (AVS/CVV results, order details, customer IP). However, you must manually add shipping proof, customer communication, refund policies, and any other supporting evidence through the admin interface.',
  },
  {
    q: 'What is the Shopify chargeback fee?',
    a: 'Shopify charges a $15 USD chargeback fee when a dispute is filed (this varies by country). The fee is returned if you win the dispute. This is in addition to the disputed transaction amount being held.',
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

export default function ShopifyChargebackEvidencePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="bg-brand-900 pt-16 pb-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-100 text-sm font-medium uppercase tracking-widest mb-4">Shopify Payments Disputes</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
            Shopify Chargeback Evidence: What to Submit and How to Win
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed mb-8">
            When a customer disputes a charge through Shopify Payments, you need structured evidence
            that addresses the specific reason code. Here is what to submit and how to format it.
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
          <h2 className="text-2xl font-bold text-slate-900 mb-6">What Shopify Payments Requires</h2>
          <p className="text-slate-600 mb-6">
            Shopify Payments forwards your evidence to the card network (Visa, Mastercard, Amex).
            The card network &mdash; not Shopify &mdash; makes the final decision.
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
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Shopify Dispute Categories</h2>
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

      {/* Inquiry vs Chargeback callout */}
      <section className="bg-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-brand-50 rounded-xl p-6 border border-brand-200">
            <div className="flex gap-4">
              <Shield size={24} className="text-brand-700 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-brand-900 mb-2">Respond to inquiries immediately</h3>
                <p className="text-sm text-brand-800 leading-relaxed">
                  Shopify Payments sends inquiry notifications before some chargebacks. Responding to an
                  inquiry with strong evidence can prevent the dispute from escalating to a chargeback entirely.
                  Treat every inquiry as urgent &mdash; you have the same 7-day response window.
                </p>
              </div>
            </div>
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
          <h2 className="text-3xl font-bold text-white mb-4">Win your Shopify dispute</h2>
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
            <Link href="/guides/shopify-chargeback-response/" className="text-sm text-brand-700 hover:text-brand-800 hover:underline">Shopify Chargeback Response Guide &rarr;</Link>
            <Link href="/stripe-chargeback-evidence/" className="text-sm text-brand-700 hover:text-brand-800 hover:underline">Stripe Chargeback Evidence Guide &rarr;</Link>
            <Link href="/paypal-chargeback-evidence/" className="text-sm text-brand-700 hover:text-brand-800 hover:underline">PayPal Chargeback Evidence Guide &rarr;</Link>
            <Link href="/templates/" className="text-sm text-brand-700 hover:text-brand-800 hover:underline">Response Letter Templates &rarr;</Link>
            <Link href="/chargeback-evidence-checklist/" className="text-sm text-brand-700 hover:text-brand-800 hover:underline">Evidence Checklist by Dispute Type &rarr;</Link>
            <Link href="/preview/" className="text-sm text-brand-700 hover:text-brand-800 hover:underline">Preview a Sample Evidence Pack &rarr;</Link>
          </div>
        </div>
      </section>
    </>
  )
}
