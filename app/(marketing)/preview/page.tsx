import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Lock, Eye, FileText, CheckCircle, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sample Evidence Pack Preview',
  description:
    'See exactly what a ChargebackKit evidence pack looks like before you buy. Interactive preview of cover page, rebuttal narrative, evidence checklist, and labeled exhibits.',
  alternates: {
    canonical: '/preview/',
  },
  openGraph: {
    title: 'Sample Evidence Pack Preview',
    description:
      'See exactly what a ChargebackKit evidence pack looks like before you buy.',
    url: '/preview/',
  },
}

const previewSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'ChargebackKit Evidence Pack',
  description: 'Submission-ready chargeback evidence pack with cover page, rebuttal narrative, evidence checklist, and labeled exhibits.',
  offers: {
    '@type': 'Offer',
    price: '19.00',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
}

export default function PreviewPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(previewSchema) }} />

      {/* Hero */}
      <section className="bg-brand-900 pt-16 pb-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-brand-800/50 text-emerald-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Eye size={14} />
            Sample Evidence Pack Preview
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
            See exactly what you get before you buy
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed mb-8">
            Every ChargebackKit evidence pack follows this structure &mdash; a cover page,
            rebuttal narrative, evidence checklist, and labeled exhibits. All formatted for
            the card network reviewing your dispute.
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

      {/* Interactive Pack Preview */}
      <section className="section bg-white px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            {/* PDF Header Bar */}
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-brand-800" />
                <span className="text-sm font-semibold text-slate-700">
                  ChargebackKit Evidence Pack &mdash; Sample Preview
                </span>
              </div>
              <span className="text-xs text-slate-400">4 sections &middot; 12 pages</span>
            </div>

            {/* Section 1: Cover Page */}
            <details open className="group border-b border-slate-100">
              <summary className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors cursor-pointer list-none">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-400 w-6">01</span>
                  <span className="font-semibold text-slate-900 text-sm">Cover Page</span>
                </div>
                <span className="shrink-0 text-slate-400 mt-0.5 group-open:rotate-180 transition-transform text-base leading-none">&darr;</span>
              </summary>
              <div className="px-6 pb-6 pt-2">
                <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
                  <div className="text-center mb-4 pb-4 border-b border-slate-200">
                    <div className="inline-flex items-center gap-2 mb-2">
                      <Shield size={16} className="text-emerald-500" />
                      <span className="font-bold text-brand-800 text-sm">ChargebackKit</span>
                    </div>
                    <p className="text-xs text-slate-500">Chargeback Evidence Pack</p>
                  </div>
                  <div className="space-y-2 font-mono text-sm">
                    <p className="text-slate-700">Dispute Reference: <span className="text-slate-900 font-semibold">CHG-2024-XXXXX</span></p>
                    <p className="text-slate-700">Dispute Category: <span className="text-slate-900 font-semibold">Fraudulent / Unauthorized</span></p>
                    <p className="text-slate-700">Card Network: <span className="text-slate-900 font-semibold">Visa</span></p>
                    <p className="text-slate-700">Dispute Amount: <span className="text-slate-900 font-semibold">$247.00</span></p>
                    <p className="text-slate-700">Response Deadline: <span className="text-slate-900 font-semibold">June 15, 2024</span></p>
                    <p className="text-slate-700">Pack Generated: <span className="text-slate-900 font-semibold">May 26, 2024</span></p>
                  </div>
                </div>
              </div>
            </details>

            {/* Section 2: Rebuttal Narrative */}
            <details className="group border-b border-slate-100">
              <summary className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors cursor-pointer list-none">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-400 w-6">02</span>
                  <span className="font-semibold text-slate-900 text-sm">Rebuttal Narrative</span>
                </div>
                <span className="shrink-0 text-slate-400 mt-0.5 group-open:rotate-180 transition-transform text-base leading-none">&darr;</span>
              </summary>
              <div className="px-6 pb-6 pt-2">
                <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
                  <p className="text-sm text-slate-700 leading-relaxed mb-3">
                    This evidence pack addresses Visa reason code 10.4 (Other Fraud &mdash; Card Absent Environment).
                    The transaction occurred on April 28, 2024, for $247.00. The cardholder completed checkout using...
                  </p>
                  <div className="relative mt-4 pt-4 border-t border-slate-200">
                    <div className="space-y-2 select-none" style={{ filter: 'blur(4px)' }} aria-hidden="true">
                      <p className="text-sm text-slate-600">AVS verification returned a full match (street + ZIP). CVV verification passed.</p>
                      <p className="text-sm text-slate-600">The IP address at purchase geolocates to the same city as the billing address on file.</p>
                      <p className="text-sm text-slate-600">The customer used the same device fingerprint across 3 prior successful orders with no disputes.</p>
                      <p className="text-sm text-slate-600">Delivery was confirmed via USPS tracking with signature on May 2, 2024.</p>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur-sm rounded-xl px-6 py-4 shadow-sm border border-slate-200 text-center">
                        <Lock size={20} className="mx-auto text-brand-700 mb-2" />
                        <p className="text-sm font-semibold text-slate-900 mb-1">Full narrative unlocked with purchase</p>
                        <p className="text-xs text-slate-500">Tailored to your specific dispute and evidence</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </details>

            {/* Section 3: Evidence Checklist */}
            <details className="group border-b border-slate-100">
              <summary className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors cursor-pointer list-none">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-400 w-6">03</span>
                  <span className="font-semibold text-slate-900 text-sm">Evidence Checklist</span>
                </div>
                <span className="shrink-0 text-slate-400 mt-0.5 group-open:rotate-180 transition-transform text-base leading-none">&darr;</span>
              </summary>
              <div className="px-6 pb-6 pt-2">
                <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
                  <div className="space-y-2.5">
                    {[
                      { label: 'AVS/CVV match result', status: 'included' },
                      { label: 'IP address geolocation', status: 'included' },
                      { label: 'Device fingerprint match', status: 'included' },
                      { label: 'Delivery confirmation with signature', status: 'included' },
                      { label: 'Customer communication log', status: 'included' },
                      { label: 'Terms of service acceptance', status: 'included' },
                      { label: 'Order confirmation email', status: 'included' },
                      { label: 'Prior successful transactions', status: 'supplementary' },
                    ].map(({ label, status }) => (
                      <div key={label} className="flex items-center gap-3">
                        <CheckCircle
                          size={16}
                          className={status === 'included' ? 'text-emerald-500' : 'text-slate-400'}
                        />
                        <span className="text-sm text-slate-700">{label}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          status === 'included' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {status === 'included' ? 'Included' : 'Supplementary'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </details>

            {/* Section 4: Labeled Exhibits */}
            <details className="group">
              <summary className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors cursor-pointer list-none">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-400 w-6">04</span>
                  <span className="font-semibold text-slate-900 text-sm">Labeled Exhibits (7 documents)</span>
                  <span className="inline-flex items-center gap-1 text-xs text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full">
                    <Lock size={10} />
                    Full version in paid pack
                  </span>
                </div>
                <span className="shrink-0 text-slate-400 mt-0.5 group-open:rotate-180 transition-transform text-base leading-none">&darr;</span>
              </summary>
              <div className="px-6 pb-6 pt-2">
                <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
                  <div className="space-y-2">
                    {[
                      'Exhibit A: Transaction Receipt & Order Details',
                      'Exhibit B: AVS/CVV Verification Record',
                      'Exhibit C: Shipping Confirmation & Tracking',
                      'Exhibit D: Delivery Confirmation with Signature',
                      'Exhibit E: Customer Communication Log',
                      'Exhibit F: Terms of Service (accepted at checkout)',
                      'Exhibit G: Prior Purchase History',
                    ].map((exhibit) => (
                      <div key={exhibit} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
                        <FileText size={14} className="text-brand-700 shrink-0" />
                        <span className="text-sm text-slate-700">{exhibit}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Lock size={12} />
                      Exhibit documents are generated from your uploaded evidence
                    </div>
                  </div>
                </div>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Why This Format Wins */}
      <section className="section bg-slate-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">
            Why this format wins disputes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center mb-4">
                <FileText size={18} className="text-brand-800" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Structured narrative</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Banks review hundreds of disputes. A clear, labeled narrative with
                a logical flow gets read. Disorganised uploads get skimmed.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center mb-4">
                <CheckCircle size={18} className="text-brand-800" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Reason-code specific</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Each pack is built around your dispute category. What proves a fraud
                claim is different from what proves a subscription cancellation.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center mb-4">
                <Shield size={18} className="text-brand-800" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Card network format</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Visa, Mastercard, and Amex each have preferences for how evidence
                is presented. ChargebackKit follows their expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Built for merchants who take disputes seriously
          </h2>
          <p className="text-slate-600 mb-8">
            Every dollar lost to a chargeback is a dollar plus fees. A $247 dispute costs
            you $247 + $15 Stripe fee + the cost of goods. ChargebackKit pays for itself
            on the first win.
          </p>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <p className="text-3xl font-bold text-brand-800">$19</p>
              <p className="text-xs text-slate-500 mt-1">Per evidence pack</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <p className="text-3xl font-bold text-brand-800">30 min</p>
              <p className="text-xs text-slate-500 mt-1">Average build time</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <p className="text-3xl font-bold text-brand-800">6</p>
              <p className="text-xs text-slate-500 mt-1">Dispute categories</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-brand-800 py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to build your evidence pack?
          </h2>
          <p className="text-slate-300 text-lg mb-8">
            $19. No subscription. Submission-ready in 30 minutes.
          </p>
          <Link
            href="https://buy.stripe.com/5kQaEY83P3f02Hdf0l3Nm02"
            className="inline-flex items-center gap-2 bg-emerald-500 text-white font-bold text-base px-8 py-4 rounded-lg hover:bg-emerald-600 transition-colors shadow-lg"
          >
            Build My Evidence Pack &mdash; $19
            <ArrowRight size={18} />
          </Link>
          <p className="mt-4 text-sm text-slate-400">
            Secure checkout via Stripe &middot; No subscription &middot;{' '}
            <Link href="/pricing/" className="underline hover:text-white transition-colors">
              Volume discounts available
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
