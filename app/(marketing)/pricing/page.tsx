import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check, Shield, Download, FileText, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Evidence Pack Pricing — $39, No Subscription',
  description:
    'ChargebackKit pricing: $39 per pack, no subscription. One payment covers a complete, submission-ready evidence pack for your dispute type.',
  alternates: {
    canonical: '/pricing/',
  },
  openGraph: {
    title: 'Evidence Pack Pricing — $39, No Subscription',
    description:
      'ChargebackKit pricing: $39 per pack, no subscription. One payment, complete evidence pack.',
    url: '/pricing/',
  },
}

const included = [
  {
    icon: FileText,
    title: 'Category-specific evidence structure',
    desc: 'Your pack is organised around the exact evidence fields that matter for your dispute type — not generic chargeback guidance.',
  },
  {
    icon: Check,
    title: 'Guided intake for your dispute type',
    desc: 'Structured questions that surface the right evidence, flag missing items, and distinguish critical vs. supplementary exhibits.',
  },
  {
    icon: FileText,
    title: 'Formatted PDF ready for Stripe',
    desc: 'A single labeled PDF with cover page, rebuttal narrative, and organised exhibits — ready to upload to Stripe\'s evidence submission portal.',
  },
  {
    icon: Download,
    title: '72-hour access to your pack',
    desc: 'Download and re-download your completed evidence pack anytime within 72 hours of creation.',
  },
  {
    icon: Clock,
    title: 'Start immediately — no signup required',
    desc: 'Begin building your evidence pack right away. No account creation needed upfront — sign up later if you want to save your pack reference.',
  },
  {
    icon: Shield,
    title: 'Secure checkout via Stripe',
    desc: 'All payments processed by Stripe. No card details are stored by this product.',
  },
]

const pricingFaqs = [
  {
    q: 'Will this guarantee I win my chargeback?',
    a: 'No product can guarantee a chargeback outcome. Card networks — not this product — make the final determination. What ChargebackKit guarantees is that your evidence is structured correctly for your dispute type. That is the part in your control.',
  },
  {
    q: 'Is there a subscription?',
    a: 'No. This is a one-time purchase of $39 per pack. There are no monthly fees, no recurring charges, and no subscription option. You buy a pack when you have a dispute that needs a response.',
  },
  {
    q: 'Can I regenerate my pack if I need to make changes?',
    a: 'Your pack is accessible for 72 hours after creation. Within that window, you can download it as many times as needed. If you need a new pack for a different dispute, that is a separate purchase.',
  },
  {
    q: 'What is your refund policy?',
    a: 'We offer a refund within 30 minutes of purchase if you have not yet started the intake process. Once intake is started, the work of structuring your evidence has begun and refunds are not available. See the full Refund Policy for details.',
  },
  {
    q: 'Do I need an account to purchase?',
    a: 'No account is required. You can purchase and complete ChargebackKit as a guest. An account allows you to access your pack reference and history.',
  },
  {
    q: 'Are there bundle options?',
    a: 'A 3-pack bundle is available for $99 — for merchants managing multiple disputes at once. The bundle is for simultaneous disputes, not a subscription or recurring access.',
  },
]

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'ChargebackKit',
  applicationCategory: 'BusinessApplication',
  offers: [
    {
      '@type': 'Offer',
      name: 'Single Evidence Pack',
      price: '39.00',
      priceCurrency: 'USD',
      description: 'One submission-ready chargeback evidence pack for your dispute type.',
    },
    {
      '@type': 'Offer',
      name: '3-Pack Bundle',
      price: '99.00',
      priceCurrency: 'USD',
      description: 'Three evidence packs for merchants managing multiple disputes simultaneously.',
    },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: pricingFaqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

export default function PricingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="bg-brand-900 pt-16 pb-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-100 text-sm font-medium uppercase tracking-widest mb-4">Pricing</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            One pack. One payment. $39.
          </h1>
          <p className="text-xl text-slate-300 mb-2">
            No subscription. No recurring charges. Buy when you have a dispute that needs a response.
          </p>
        </div>
      </section>

      {/* Main pricing card */}
      <section className="px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">

            {/* Card header */}
            <div className="bg-brand-800 px-8 py-8 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Chargeback Evidence Pack</h2>
                  <p className="text-slate-300 text-sm">Submission-ready PDF for your specific dispute type</p>
                </div>
                <div className="text-right shrink-0 ml-8">
                  <span className="text-4xl font-bold">$39</span>
                  <p className="text-slate-400 text-sm">per pack</p>
                </div>
              </div>
            </div>

            {/* What's included */}
            <div className="px-8 py-8">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-5">What&apos;s included</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {included.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-3">
                    <div className="shrink-0 w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center mt-0.5">
                      <Icon size={15} className="text-brand-800" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 mb-0.5">{title}</p>
                      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link
                href="/signup/"
                className="w-full flex items-center justify-center gap-2 bg-brand-800 text-white font-bold text-base px-8 py-4 rounded-lg hover:bg-brand-700 transition-colors"
              >
                Build My Evidence Pack — $39
                <ArrowRight size={18} />
              </Link>
              <p className="text-center text-xs text-slate-500 mt-3">
                Secure checkout via Stripe · No subscription · No account required
              </p>
            </div>
          </div>

          {/* Bundle option */}
          <div className="mt-5 bg-slate-50 rounded-xl p-6 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-1">
                Managing multiple disputes at once?
              </h3>
              <p className="text-sm text-slate-600">
                3-pack bundle — $99. Three packs for merchants handling simultaneous disputes.
                Not a subscription.
              </p>
            </div>
            <Link
              href="/signup/?plan=bundle"
              className="shrink-0 inline-flex items-center gap-2 bg-white border border-slate-300 text-slate-800 font-semibold text-sm px-5 py-2.5 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-colors"
            >
              Get 3-pack ($99)
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing anchor */}
      <section className="section bg-white px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">
            What does $39 compare to?
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-6 py-4 font-semibold text-slate-700">Option</th>
                  <th className="text-left px-6 py-4 font-semibold text-slate-700">Cost</th>
                  <th className="text-left px-6 py-4 font-semibold text-slate-700">Time</th>
                  <th className="text-left px-6 py-4 font-semibold text-slate-700">Format quality</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="px-6 py-4 text-slate-700">Chargeback consultant</td>
                  <td className="px-6 py-4 text-slate-700">$300–$500</td>
                  <td className="px-6 py-4 text-slate-700">1–3 days</td>
                  <td className="px-6 py-4 text-slate-500">Varies by consultant</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="px-6 py-4 text-slate-700">DIY with ChatGPT</td>
                  <td className="px-6 py-4 text-slate-700">$0</td>
                  <td className="px-6 py-4 text-slate-700">2–4 hours</td>
                  <td className="px-6 py-4 text-slate-500">Generic, may miss reason-code requirements</td>
                </tr>
                <tr className="bg-brand-50">
                  <td className="px-6 py-4 font-semibold text-brand-900">Evidence Pack Builder</td>
                  <td className="px-6 py-4 font-bold text-brand-800">$39</td>
                  <td className="px-6 py-4 font-medium text-brand-800">30 minutes</td>
                  <td className="px-6 py-4 font-medium text-brand-800">Category-specific, submission-ready</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-center mt-4 text-sm text-slate-500">
            A chargeback consultant charges $300–$500. This is $39 and takes 30 minutes.
          </p>
        </div>
      </section>

      {/* No-guarantee disclosure */}
      <section className="bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-2">About chargeback outcomes</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              We can&apos;t guarantee a chargeback outcome — no one can. Card networks make the
              final determination based on the evidence submitted and their internal rules.
              What ChargebackKit does guarantee is that your evidence is structured the way card
              networks expect to see it for your specific dispute type. That is the part in your
              control.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Pricing questions</h2>
          <div className="space-y-4">
            {pricingFaqs.map(({ q, a }) => (
              <details key={q} className="group bg-slate-50 rounded-lg border border-slate-200">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none font-semibold text-slate-900 text-sm">
                  {q}
                  <span className="shrink-0 ml-4 text-slate-400 group-open:rotate-180 transition-transform">
                    ↓
                  </span>
                </summary>
                <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-200 pt-3">
                  {a}
                  {q.includes('refund') && (
                    <Link href="/refund/" className="ml-1 text-brand-700 underline hover:text-brand-800">
                      Read full policy.
                    </Link>
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-800 py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">
            Get started — $39
          </h2>
          <p className="text-slate-300 text-lg mb-8">
            One pack. One payment. Submission-ready in 30 minutes.
          </p>
          <Link
            href="/signup/"
            className="inline-flex items-center gap-2 bg-white text-brand-900 font-bold text-base px-8 py-4 rounded-lg hover:bg-brand-50 transition-colors shadow-lg"
          >
            Build My Evidence Pack — $39
            <ArrowRight size={18} />
          </Link>
          <p className="mt-4 text-sm text-slate-400">
            Secure checkout via Stripe · No subscription · One payment
          </p>
        </div>
      </section>
    </>
  )
}
