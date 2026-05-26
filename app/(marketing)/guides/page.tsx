import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, FileText, Shield, Clock, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Chargeback Guides for Stripe Merchants',
  description:
    'Free guides on chargeback prevention, rebuttal letters, evidence requirements, response deadlines, and winning disputes as a merchant.',
  alternates: {
    canonical: '/guides',
  },
  openGraph: {
    title: 'Chargeback Guides for Stripe Merchants',
    description:
      'Free guides on chargeback prevention, rebuttal letters, evidence requirements, response deadlines, and winning disputes as a merchant.',
    url: '/guides',
  },
}

const guides = [
  {
    title: 'Chargeback Prevention: 12 Proven Strategies',
    description:
      'Prevent chargebacks before they happen. Covers billing descriptors, fraud tools, customer communication, and card network monitoring thresholds.',
    href: '/guides/chargeback-prevention',
    icon: Shield,
    tag: 'Prevention',
  },
  {
    title: 'How to Win a Chargeback as a Merchant',
    description:
      'Step-by-step guide to building a winning chargeback response — from gathering evidence to structuring your rebuttal for card networks.',
    href: '/guides/how-to-win-a-chargeback',
    icon: FileText,
    tag: 'Strategy',
  },
  {
    title: 'Chargeback Rebuttal Letter Guide',
    description:
      'How to write a compelling rebuttal letter that addresses the specific reason code and presents evidence card networks need to see.',
    href: '/guides/chargeback-rebuttal-letter',
    icon: BookOpen,
    tag: 'Writing',
  },
  {
    title: 'Chargeback Response Deadlines',
    description:
      'Every deadline you need to know — Visa, Mastercard, Amex, and Discover response windows, plus Stripe-specific timelines.',
    href: '/guides/chargeback-response-deadlines',
    icon: Clock,
    tag: 'Reference',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Chargeback Guides for Stripe Merchants',
  description:
    'Free guides on chargeback prevention, rebuttal letters, evidence requirements, and winning disputes.',
  url: 'https://chargebackkit.app/guides',
  mainEntity: guides.map((g) => ({
    '@type': 'Article',
    name: g.title,
    url: `https://chargebackkit.app${g.href}`,
    description: g.description,
  })),
}

export default function GuidesIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="bg-brand-900 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-emerald-400 uppercase tracking-widest font-medium mb-4">
            FREE RESOURCES
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
            Chargeback Guides for Merchants
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Everything you need to prevent, respond to, and win chargeback disputes — written specifically for Stripe merchants.
          </p>
        </div>
      </section>

      {/* Guide Cards */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map(({ title, description, href, icon: Icon, tag }) => (
              <Link
                key={href}
                href={href}
                className="group block bg-white rounded-xl border border-slate-200 p-6 hover:border-brand-300 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center group-hover:bg-brand-100 transition-colors">
                    <Icon size={22} className="text-brand-800" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-block text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold text-slate-900 group-hover:text-brand-800 transition-colors mb-2">
                      {title}
                    </h2>
                    <p className="text-sm text-slate-600 leading-relaxed mb-3">
                      {description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-700 group-hover:text-brand-800">
                      Read guide
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* More Resources */}
      <section className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">
            More resources
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/stripe-chargeback-evidence"
              className="block bg-white rounded-lg border border-slate-200 p-5 hover:border-brand-300 hover:shadow-sm transition-all text-center"
            >
              <h3 className="font-semibold text-slate-900 mb-1">Stripe Evidence Guide</h3>
              <p className="text-sm text-slate-500">Complete Stripe chargeback response walkthrough</p>
            </Link>
            <Link
              href="/chargeback-evidence-checklist"
              className="block bg-white rounded-lg border border-slate-200 p-5 hover:border-brand-300 hover:shadow-sm transition-all text-center"
            >
              <h3 className="font-semibold text-slate-900 mb-1">Evidence Checklist</h3>
              <p className="text-sm text-slate-500">Required evidence by dispute category</p>
            </Link>
            <Link
              href="/pricing"
              className="block bg-white rounded-lg border border-slate-200 p-5 hover:border-brand-300 hover:shadow-sm transition-all text-center"
            >
              <h3 className="font-semibold text-slate-900 mb-1">Build Your Pack</h3>
              <p className="text-sm text-slate-500">Get a submission-ready evidence pack — $39</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-800 py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Need to respond to a chargeback now?
          </h2>
          <p className="text-slate-300 mb-8">
            Build a submission-ready evidence pack in 30 minutes.
          </p>
          <Link
            href="https://buy.stripe.com/eVq8wQ83Pg1M95B3hD3Nm00"
            className="inline-flex items-center gap-2 bg-emerald-500 text-white font-bold text-base px-8 py-4 rounded-lg hover:bg-emerald-600 transition-colors shadow-lg"
          >
            Build My Evidence Pack — $39
            <ArrowRight size={18} />
          </Link>
          <p className="mt-4 text-sm text-slate-400">
            $39 · No subscription · 72-hour access
          </p>
        </div>
      </section>
    </>
  )
}
