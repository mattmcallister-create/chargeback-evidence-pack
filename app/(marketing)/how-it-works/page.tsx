import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MessageSquare, Layers, FileDown, AlertTriangle, Lock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How It Works — Dispute to PDF in 30 Minutes',
  description:
    'How the ChargebackKit works: structured intake, category-specific evidence assembly, labeled PDF output. 5 steps from dispute notification to submission.',
  alternates: {
    canonical: '/how-it-works/',
  },
  openGraph: {
    title: 'How It Works — Dispute to PDF in 30 Minutes',
    description:
      'How the ChargebackKit works: structured intake, category-specific evidence assembly, labeled PDF output.',
    url: '/how-it-works/',
  },
}

const categories = [
  {
    name: 'Fraudulent / Unauthorized',
    href: '/chargeback/fraudulent/',
    desc: 'Card used without cardholder authorization',
    evidence: ['AVS/CVV match result', 'IP address at purchase', 'Signed Terms of Service', 'Delivery confirmation with signature'],
  },
  {
    name: 'Subscription Cancelled',
    href: '/chargeback/subscription-cancelled/',
    desc: 'Cardholder claims they cancelled before the charge',
    evidence: ['Cancellation policy at signup', 'No cancellation request on file', 'Login activity logs', 'Terms of service with cancellation terms'],
  },
  {
    name: 'Product Not Received',
    href: '/chargeback/product-not-received/',
    desc: 'Cardholder claims product was never delivered',
    evidence: ['Carrier tracking with delivery confirmation', 'Proof of shipment date', 'Buyer communication log', 'Confirmed delivery address'],
  },
  {
    name: 'Product Not as Described',
    href: '/chargeback/product-not-as-described/',
    desc: 'Cardholder claims product differed from listing',
    evidence: ['Original product listing screenshots', 'Delivery confirmation', 'Return/refund policy', 'Customer communication log'],
  },
  {
    name: 'Duplicate Charge',
    href: '/chargeback/duplicate-charge/',
    desc: 'Two charges for the same transaction',
    evidence: ['Transaction logs showing unique orders', 'Order confirmation emails', 'Shipment records for each order'],
  },
  {
    name: 'Credit Not Processed',
    href: '/chargeback/credit-not-processed/',
    desc: 'Cardholder claims an issued refund was not received',
    evidence: ['Refund transaction record', 'Refund policy displayed at purchase', 'Customer communication acknowledging refund'],
  },
]

const steps = [
  {
    number: '01',
    title: 'Select your dispute category',
    body: 'Choose your dispute type from the six categories ChargebackKit covers. The category maps to the reason code on your Stripe dispute notification. If you\'re unsure, check the "Reason" field in your Stripe Dashboard.',
    icon: Layers,
  },
  {
    number: '02',
    title: 'Answer structured questions about the transaction',
    body: 'ChargebackKit asks targeted questions based on your dispute category: order details, delivery method, customer communication history, policy acceptance, and timeline. Takes 5–10 minutes.',
    icon: MessageSquare,
  },
  {
    number: '03',
    title: 'Upload your exhibits',
    body: 'Upload screenshots, shipping confirmations, terms of service documents, customer emails, and any other supporting evidence. ChargebackKit prompts you for exactly what each dispute type requires — and flags what\'s missing.',
    icon: FileDown,
  },
  {
    number: '04',
    title: 'ChargebackKit structures your evidence pack',
    body: 'Your inputs are assembled into a structured rebuttal narrative, labeled exhibits, and evidence checklist — in the format Visa, Mastercard, and Amex expect to see for your specific dispute type.',
    icon: Layers,
  },
  {
    number: '05',
    title: 'Download and submit your PDF',
    body: 'Download your complete evidence pack as a single labeled PDF with a cover page, narrative, and organised exhibits. Upload it directly to Stripe\'s evidence submission portal before your deadline.',
    icon: FileDown,
  },
]

const howItWorksFaqs = [
  {
    q: 'How long does it take to build a pack?',
    a: 'Most merchants complete the intake and build a pack in 20–35 minutes. Disputes with extensive communication history take slightly longer.',
  },
  {
    q: 'What dispute categories are supported?',
    a: 'Six categories: Fraudulent/Unauthorized, Subscription Cancelled, Product Not Received, Product Not as Described, Duplicate Charge, and Credit Not Processed.',
  },
  {
    q: 'What if I don\'t have all the evidence items?',
    a: 'Include what you have. ChargebackKit distinguishes between required evidence and supplementary evidence for your dispute type, and notes which items are missing.',
  },
  {
    q: 'Is this specific to Stripe?',
    a: 'ChargebackKit is built for Stripe merchants. It references Stripe\'s evidence submission portal and the reason codes Stripe surfaces. The underlying card network rules (Visa, Mastercard, Amex) apply regardless of processor.',
  },
]

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Build a Chargeback Evidence Pack',
  description: 'Submit a structured, category-specific chargeback evidence pack using the Evidence Pack Builder.',
  totalTime: 'PT30M',
  step: steps.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: s.title,
    text: s.body,
  })),
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: howItWorksFaqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

export default function HowItWorksPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="bg-brand-900 pt-16 pb-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-100 text-sm font-medium uppercase tracking-widest mb-4">How It Works</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
            From dispute notification to submission-ready PDF in 30 minutes
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed mb-8">
            Not a template. A structured assembly process built around your specific dispute
            type and the evidence requirements card networks use to evaluate your response.
          </p>
          <Link
            href="https://buy.stripe.com/5kQaEY83P3f02Hdf0l3Nm02"
            className="inline-flex items-center gap-2 bg-white text-brand-900 font-bold text-base px-8 py-4 rounded-lg hover:bg-brand-50 transition-colors"
          >
            Create Your First Pack
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Step walkthrough */}
      <section className="section bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            The five-step process
          </h2>
          <div className="space-y-10">
            {steps.map(({ number, title, body, icon: Icon }) => (
              <div key={number} className="flex gap-6 items-start">
                <div className="shrink-0 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center">
                    <Icon size={20} className="text-brand-800" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs font-mono text-slate-400 mt-2">{number}</span>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
                  <p className="text-slate-600 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dispute categories */}
      <section className="section bg-slate-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Six dispute categories. Each with its own evidence structure.
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              What you need to prove a fraudulent chargeback is different from what you need for
              a subscription cancellation dispute. ChargebackKit handles this for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {categories.map(({ name, href, desc, evidence }) => (
              <Link
                key={href}
                href={href}
                className="bg-white rounded-xl p-6 border border-slate-200 hover:border-brand-300 hover:shadow-sm transition-all group"
              >
                <h3 className="text-base font-semibold text-slate-900 mb-1 group-hover:text-brand-800 transition-colors">
                  {name}
                </h3>
                <p className="text-sm text-slate-500 mb-3">{desc}</p>
                <ul className="space-y-1">
                  {evidence.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-slate-600">
                      <span className="mt-0.5 shrink-0 text-brand-700">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-brand-700 font-medium group-hover:text-brand-800">
                  View evidence requirements →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Retention policy callout */}
      <section className="bg-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 flex gap-4">
            <div className="shrink-0 mt-0.5">
              <Lock size={20} className="text-slate-500" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-1.5">About your uploaded files</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Files you upload during pack creation are used only to generate your evidence pack.
                They are not stored, shared, or used for any other purpose. Your pack and all
                associated uploads are deleted 72 hours after creation. Download your PDF before
                that window closes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-slate-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Frequently asked questions</h2>
          <div className="space-y-6">
            {howItWorksFaqs.map(({ q, a }) => (
              <div key={q} className="bg-white rounded-lg p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">{q}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-brand-800 py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to build your pack?</h2>
          <p className="text-slate-300 text-lg mb-8">
            $19. No subscription. Submission-ready in 30 minutes.
          </p>
          <Link
            href="https://buy.stripe.com/5kQaEY83P3f02Hdf0l3Nm02"
            className="inline-flex items-center gap-2 bg-white text-brand-900 font-bold text-base px-8 py-4 rounded-lg hover:bg-brand-50 transition-colors"
          >
            Create Your First Pack
            <ArrowRight size={18} />
          </Link>
          <p className="mt-4 text-sm text-slate-400">
            <Link href="/pricing/" className="underline hover:text-white transition-colors">
              See what&apos;s included →
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
