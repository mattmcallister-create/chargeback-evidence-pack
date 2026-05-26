import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, FileText, Shield, Clock, BookOpen, CreditCard, AlertTriangle, Store, Code, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Chargeback Guides — Prevention, Response & Evidence Strategies',
  description:
    'Free guides on chargeback prevention, rebuttal letters, evidence requirements, response deadlines, and winning disputes for Stripe, Shopify, PayPal, and Square merchants.',
  alternates: {
    canonical: '/guides',
  },
  openGraph: {
    title: 'Chargeback Guides — Prevention, Response & Evidence Strategies',
    description:
      'Free guides on chargeback prevention, rebuttal letters, evidence requirements, response deadlines, and winning disputes for Stripe, Shopify, PayPal, and Square merchants.',
    url: '/guides',
  },
}

const guides = [
  {
    title: 'Chargeback Prevention: 12 Proven Strategies',
    description:
      'Prevent chargebacks before they happen. Covers billing descriptors, fraud tools, customer communication, and card network monitoring to reduce dispute rates.',
    href: '/guides/chargeback-prevention',
    icon: Shield,
    tag: 'Prevention',
  },
  {
    title: 'How to Write a Chargeback Rebuttal Letter',
    description:
      'Step-by-step guide to writing compelling rebuttal letters that win disputes. Includes templates, formatting tips, and real examples for common reason codes.',
    href: '/guides/chargeback-rebuttal-letter',
    icon: FileText,
    tag: 'Response',
  },
  {
    title: 'Chargeback Evidence Checklist',
    description:
      'Complete checklist of evidence types accepted by Visa, Mastercard, and major processors. Know exactly what documentation to gather for every dispute type.',
    href: '/guides/chargeback-evidence-checklist',
    icon: BookOpen,
    tag: 'Evidence',
  },
  {
    title: 'Chargeback Response Deadlines by Processor',
    description:
      'Never miss a deadline. Complete guide to response windows for Stripe, PayPal, Square, Shopify, and direct processor disputes with calendar planning tips.',
    href: '/guides/chargeback-response-deadlines',
    icon: Clock,
    tag: 'Deadlines',
  },
  {
    title: 'How to Win a Chargeback: The Complete Guide',
    description:
      'End-to-end strategy for winning chargeback disputes. From initial notification through evidence submission, learn what separates winning responses from losing ones.',
    href: '/guides/how-to-win-a-chargeback',
    icon: Zap,
    tag: 'Strategy',
  },
  {
    title: 'Visa Reason Code 13.1: Merchandise Not Received',
    description:
      'Complete guide to fighting Visa reason code 13.1 disputes. Learn required evidence, response deadlines, and proven strategies to win merchandise-not-received chargebacks.',
    href: '/guides/visa-reason-code-13-1',
    icon: CreditCard,
    tag: 'Reason Code',
  },
  {
    title: 'Mastercard Reason Code 4853: Cardholder Dispute',
    description:
      'How to respond to Mastercard reason code 4853 chargebacks. Covers all sub-reason codes, required evidence, and step-by-step response strategies.',
    href: '/guides/mastercard-reason-code-4853',
    icon: CreditCard,
    tag: 'Reason Code',
  },
  {
    title: 'Shopify Chargeback Response Guide',
    description:
      'How to respond to chargebacks on Shopify. Platform-specific evidence requirements, Shopify Protect details, and step-by-step dispute resolution for Shopify merchants.',
    href: '/guides/shopify-chargeback-response',
    icon: Store,
    tag: 'Shopify',
  },
  {
    title: 'PayPal Dispute Response Guide',
    description:
      'Navigate PayPal disputes, claims, and chargebacks. Understand Seller Protection eligibility, evidence requirements, and how to escalate or resolve PayPal disputes.',
    href: '/guides/paypal-dispute-response',
    icon: Store,
    tag: 'PayPal',
  },
  {
    title: 'Square Chargeback Response Guide',
    description:
      'Fight chargebacks on Square with confidence. Covers Square\'s dispute process, free chargeback protection program, evidence requirements, and response strategies.',
    href: '/guides/square-chargeback-response',
    icon: Store,
    tag: 'Square',
  },
  {
    title: 'SaaS Chargeback Prevention',
    description:
      'Prevent and fight chargebacks unique to SaaS and subscription businesses. Covers trial abuse, cancellation disputes, renewal chargebacks, and subscription evidence strategies.',
    href: '/guides/saas-chargeback-prevention',
    icon: Code,
    tag: 'SaaS',
  },
  {
    title: 'Friendly Fraud Prevention Guide',
    description:
      'Identify, prevent, and fight friendly fraud (first-party fraud). Learn the warning signs, prevention strategies, and evidence needed to win disputes from legitimate customers.',
    href: '/guides/friendly-fraud-prevention',
    icon: AlertTriangle,
    tag: 'Fraud',
  },
]

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-950 to-brand-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Chargeback Guides
          </h1>
          <p className="text-xl text-brand-200 max-w-2xl mx-auto">
            Free, expert-written guides to help Stripe, Shopify, PayPal, and Square merchants prevent chargebacks,
            build winning evidence, and recover lost revenue.
          </p>
        </div>
      </section>

      {/* Guide Cards */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides.map((guide) => {
            const Icon = guide.icon
            return (
              <Link
                key={guide.href}
                href={guide.href}
                className="group block bg-white border border-brand-100 rounded-2xl p-6 hover:border-emerald-500 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
                    <Icon className="w-5 h-5 text-brand-700 group-hover:text-emerald-600 transition-colors" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand-500">
                    {guide.tag}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-brand-900 mb-2 group-hover:text-emerald-700 transition-colors">
                  {guide.title}
                </h2>
                <p className="text-sm text-brand-600 mb-4 leading-relaxed">
                  {guide.description}
                </p>
                <span className="inline-flex items-center text-sm font-medium text-emerald-600 group-hover:text-emerald-700">
                  Read guide
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-950 text-white py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Fight Your Chargeback?
          </h2>
          <p className="text-brand-200 mb-8 text-lg">
            ChargebackKit builds your complete evidence package in minutes — not hours.
            Upload your data, and we handle the rest.
          </p>
          <Link
            href="/#pricing"
            className="inline-flex items-center px-8 py-4 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-colors text-lg"
          >
            Build Your Evidence Pack — \$19
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>
    </main>
  )
}
