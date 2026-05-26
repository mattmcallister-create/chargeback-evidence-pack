import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ChargebackCalculator from './calculator'

export const metadata: Metadata = {
  title: 'Chargeback Cost Calculator — See What Disputes Really Cost Your Business',
  description:
    'Calculate the true cost of chargebacks: lost revenue, dispute fees, labor, COGS, and processor penalties. Free interactive calculator with industry benchmarks and Visa/Mastercard threshold warnings.',
  alternates: {
    canonical: '/tools/chargeback-calculator/',
  },
  openGraph: {
    title: 'Chargeback Cost Calculator — See What Disputes Really Cost Your Business',
    description:
      'Calculate the true cost of chargebacks: lost revenue, dispute fees, labor, COGS, and processor penalties. Free interactive calculator with industry benchmarks.',
    url: '/tools/chargeback-calculator/',
  },
}

const calculatorSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Chargeback Cost Calculator',
  applicationCategory: 'BusinessApplication',
  description:
    'Free interactive calculator that shows the true annual cost of chargebacks including lost revenue, dispute fees, labor costs, and COGS. Includes Visa VDMP and Mastercard ECM threshold warnings.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  operatingSystem: 'Web',
  creator: {
    '@type': 'Organization',
    name: 'ChargebackKit',
    url: 'https://chargebackkit.app',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much do chargebacks cost a business?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The true cost of a chargeback is 2 to 3 times the original transaction amount. This includes the lost revenue, chargeback fees of 15 to 25 dollars per dispute, cost of goods already shipped, labor hours spent on each dispute response, and potential processor rate increases. For a business processing 1000 orders per month with a 1 percent chargeback rate, total annual chargeback costs can exceed 30000 dollars.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Visa VDMP threshold?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Visa Dispute Monitoring Program (VDMP) has two thresholds. The standard threshold is 75 disputes per month and a 0.65 percent dispute ratio. The excessive threshold is 1000 disputes per month and a 1.8 percent ratio. Merchants who exceed these thresholds face fines starting at 50 dollars per dispute, required action plans, and potential account termination.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Mastercard ECM threshold?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Mastercard Excessive Chargeback Merchant program triggers at 100 chargebacks per month with a 1 percent chargeback ratio. The excessive tier triggers at 300 chargebacks per month with a 1.5 percent ratio. Penalties include fines of 1000 to 200000 dollars per month, mandatory chargeback reduction plans, and potential loss of Mastercard processing ability.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I reduce chargeback costs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The most effective way to reduce chargeback costs is to improve your dispute win rate by submitting properly formatted, evidence-rich response packs. The average merchant wins about 30 percent of disputes, but merchants with structured evidence packs can achieve 60 to 80 percent win rates. Tools like ChargebackKit help you build submission-ready evidence packs formatted for your specific dispute reason code.',
      },
    },
  ],
}

export default function ChargebackCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumb */}
      <nav className="bg-brand-900 pt-4 px-4 sm:px-6 lg:px-8" aria-label="Breadcrumb">
        <div className="max-w-6xl mx-auto">
          <ol className="flex items-center gap-2 text-sm text-slate-400">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/tools/" className="hover:text-white transition-colors">
                Tools
              </Link>
            </li>
            <li>/</li>
            <li className="text-slate-200">Chargeback Cost Calculator</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-brand-900 pt-12 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
            What Are Chargebacks<br className="hidden sm:block" />{' '}
            Actually Costing You?
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Most merchants only see the dispute fee. The real cost is 2&ndash;3&times; the transaction amount.
            This calculator shows the full picture &mdash; and how much you can recover.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <ChargebackCalculator />

      {/* FAQ */}
      <section className="section bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Understanding Chargeback Costs</h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((item, i) => (
              <details key={i} className="group bg-slate-50 rounded-lg border border-slate-200">
                <summary className="flex items-start justify-between gap-4 px-5 py-4 cursor-pointer list-none font-semibold text-slate-900 text-sm">
                  <span>{item.name}</span>
                  <span className="shrink-0 text-slate-400 mt-0.5 group-open:rotate-180 transition-transform text-base leading-none">&darr;</span>
                </summary>
                <div className="px-5 pb-4 pt-2 text-sm text-slate-600 leading-relaxed border-t border-slate-200">
                  {item.acceptedAnswer.text}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-brand-800 py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Stop losing money to chargebacks
          </h2>
          <p className="text-slate-300 text-lg mb-8">
            Build a submission-ready evidence pack in 30 minutes. Recover disputed revenue with properly structured responses.
          </p>
          <Link
            href="https://buy.stripe.com/5kQaEY83P3f02Hdf0l3Nm02"
            className="inline-flex items-center gap-2 bg-emerald-500 text-white font-bold text-base px-8 py-4 rounded-lg hover:bg-emerald-600 transition-colors shadow-lg"
          >
            Build My Evidence Pack &mdash; $19
            <ArrowRight size={18} />
          </Link>
          <p className="mt-4 text-sm text-slate-400">
            Starting at $19 &middot; Credits never expire &middot; Secure checkout via Stripe
          </p>
        </div>
      </section>
    </>
  )
}

