import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check, Shield, Download, FileText, Clock, ChevronDown } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Evidence Pack Pricing \u2014 Starting at $19 | ChargebackKit',
  description:
    'ChargebackKit pricing: single packs from $19, volume discounts up to 45% off. No subscription. One payment, submission-ready evidence pack for your dispute type.',
  alternates: {
    canonical: '/pricing/',
  },
  openGraph: {
    title: 'Evidence Pack Pricing \u2014 Starting at $19 | ChargebackKit',
    description:
      'ChargebackKit pricing: single packs from $19, volume packs available. No subscription required.',
    url: '/pricing/',
  },
}

const tiers = [
  {
    name: 'Single Pack',
    price: 19,
    unit: 'per pack',
    packs: 1,
    perPack: '$19.00',
    savings: null,
    description: 'One submission-ready evidence pack for a single dispute.',
    href: 'https://buy.stripe.com/5kQaEY83P3f02Hdf0l3Nm02',
    popular: false,
  },
  {
    name: '5-Pack',
    price: 79,
    unit: 'one-time',
    packs: 5,
    perPack: '$15.80',
    savings: 'Save 17%',
    description: 'For merchants managing a handful of active disputes.',
    href: 'https://buy.stripe.com/00w5kE2JvdTE5Tp05r3Nm03',
    popular: true,
  },
  {
    name: '10-Pack',
    price: 129,
    unit: 'one-time',
    packs: 10,
    perPack: '$12.90',
    savings: 'Save 32%',
    description: 'High-volume merchants with ongoing dispute queues.',
    href: 'https://buy.stripe.com/14A00k97TbLw2Hd3hD3Nm04',
    popular: false,
  },
  {
    name: '25-Pack',
    price: 269,
    unit: 'one-time',
    packs: 25,
    perPack: '$10.76',
    savings: 'Save 43%',
    description: 'Enterprise-grade volume for teams and agencies.',
    href: 'https://buy.stripe.com/3cIdRa97TbLwa9FdWh3Nm05',
    popular: false,
  },
]

const included = [
  {
    icon: FileText,
    title: 'Category-specific evidence structure',
    desc: 'Your pack is organised around the exact evidence fields that matter for your dispute type \u2014 not generic chargeback guidance.',
  },
  {
    icon: Check,
    title: 'Guided intake for your dispute type',
    desc: 'Structured questions that surface the right evidence, flag missing items, and distinguish critical vs. supplementary exhibits.',
  },
  {
    icon: FileText,
    title: 'Formatted PDF ready for Stripe',
    desc: 'A single labeled PDF with cover page, rebuttal narrative, and organised exhibits \u2014 ready to upload to Stripe\'s evidence submission portal.',
  },
  {
    icon: Download,
    title: '72-hour access to your pack',
    desc: 'Download and re-download your completed evidence pack anytime within 72 hours of creation.',
  },
  {
    icon: Clock,
    title: 'Start immediately \u2014 no signup required',
    desc: 'Begin building your evidence pack right away. No account creation needed upfront \u2014 sign up later if you want to save your pack reference.',
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
    a: 'No product can guarantee a chargeback outcome. Card networks \u2014 not this product \u2014 make the final determination. What ChargebackKit guarantees is that your evidence is structured correctly for your dispute type. That is the part in your control.',
  },
  {
    q: 'Is there a subscription?',
    a: 'No. Every tier is a one-time purchase \u2014 no monthly fees, no recurring charges. Buy a single pack for $19 or save with volume packs: 5-Pack ($79), 10-Pack ($129), or 25-Pack ($269).',
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
    q: 'How do volume packs work?',
    a: 'Volume packs give you credits for multiple evidence packs at a discounted per-pack price. Use them whenever you have disputes \u2014 they do not expire. The 5-Pack drops your cost to $15.80/pack, the 10-Pack to $12.90/pack, and the 25-Pack to just $10.76/pack.',
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
      price: '19.00',
      priceCurrency: 'USD',
      description: 'One submission-ready chargeback evidence pack for your dispute type.',
    },
    {
      '@type': 'Offer',
      name: '5-Pack',
      price: '79.00',
      priceCurrency: 'USD',
      description: 'Five evidence packs at $15.80 each \u2014 save 17%.',
    },
    {
      '@type': 'Offer',
      name: '10-Pack',
      price: '129.00',
      priceCurrency: 'USD',
      description: 'Ten evidence packs at $12.90 each \u2014 save 32%.',
    },
    {
      '@type': 'Offer',
      name: '25-Pack',
      price: '269.00',
      priceCurrency: 'USD',
      description: 'Twenty-five evidence packs at $10.76 each \u2014 save 43%.',
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
            Evidence packs from $19
          </h1>
          <p className="text-xl text-slate-300 mb-2">
            No subscription. No recurring charges. Volume discounts up to 43% off.
          </p>
        </div>
      </section>

      {/* Pricing tiers */}
      <section className="px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`bg-white rounded-2xl shadow-lg border overflow-hidden flex flex-col ${
                tier.popular ? 'border-emerald-500 ring-2 ring-emerald-500' : 'border-slate-200'
              }`}
            >
              {tier.popular && (
                <div className="bg-emerald-500 text-white text-xs font-bold text-center py-1.5 uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              <div className="px-6 pt-6 pb-4 flex-1">
                <h2 className="text-lg font-bold text-slate-900 mb-1">{tier.name}</h2>
                <p className="text-sm text-slate-500 mb-4">{tier.description}</p>
                <div className="mb-1">
                  <span className="text-4xl font-bold text-slate-900">${tier.price}</span>
                  <span className="text-sm text-slate-500 ml-1">{tier.unit}</span>
                </div>
                {tier.savings ? (
                  <p className="text-sm font-semibold text-emerald-600 mb-1">{tier.savings}</p>
                ) : (
                  <p className="text-sm text-slate-400 mb-1">&nbsp;</p>
                )}
                <p className="text-xs text-slate-500">{tier.perPack}/pack</p>
              </div>
              <div className="px-6 pb-6">
                <Link
                  href={tier.href}
                  className={`w-full flex items-center justify-center gap-2 font-bold text-sm px-6 py-3 rounded-lg transition-colors ${
                    tier.popular
                      ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                      : 'bg-brand-800 text-white hover:bg-brand-700'
                  }`}
                >
                  {tier.packs === 1 ? 'Buy Pack' : `Buy ${tier.packs} Packs`}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What's included */}
      <section className="section bg-white px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">
            Every pack includes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
        </div>
      </section>

      {/* Pricing comparison */}
      <section className="section bg-white px-4 sm:px-6 lg:px-8 pt-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">
            What does $19 compare to?
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
                  <td className="px-6 py-4 text-slate-700">$300&ndash;$500</td>
                  <td className="px-6 py-4 text-slate-700">1&ndash;3 days</td>
                  <td className="px-6 py-4 text-slate-500">Varies by consultant</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="px-6 py-4 text-slate-700">DIY with ChatGPT</td>
                  <td className="px-6 py-4 text-slate-700">$0</td>
                  <td className="px-6 py-4 text-slate-700">2&ndash;4 hours</td>
                  <td className="px-6 py-4 text-slate-500">Generic, may miss reason-code requirements</td>
                </tr>
                <tr className="bg-brand-50">
                  <td className="px-6 py-4 font-semibold text-brand-900">Evidence Pack Builder</td>
                  <td className="px-6 py-4 font-bold text-brand-800">From $10.76/pack</td>
                  <td className="px-6 py-4 font-medium text-brand-800">30 minutes</td>
                  <td className="px-6 py-4 font-medium text-brand-800">Category-specific, submission-ready</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-center mt-4 text-sm text-slate-500">
            A chargeback consultant charges $300&ndash;$500. Evidence packs start at $19 and take 30 minutes.
          </p>
        </div>
      </section>

      {/* No-guarantee disclosure */}
      <section className="bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-2">About chargeback outcomes</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              We can&apos;t guarantee a chargeback outcome &mdash; no one can. Card networks make the
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
                    &darr;
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
            Get started &mdash; from $19
          </h2>
          <p className="text-slate-300 text-lg mb-8">
            One pack or volume pricing. Submission-ready in 30 minutes.
          </p>
          <Link
            href="https://buy.stripe.com/5kQaEY83P3f02Hdf0l3Nm02"
            className="inline-flex items-center gap-2 bg-white text-brand-900 font-bold text-base px-8 py-4 rounded-lg hover:bg-brand-50 transition-colors shadow-lg"
          >
            Build My Evidence Pack &mdash; $19
            <ArrowRight size={18} />
          </Link>
          <p className="mt-4 text-sm text-slate-400">
            Secure checkout via Stripe &middot; No subscription &middot; Volume discounts available
          </p>
        </div>
      </section>
    </>
  )
}
