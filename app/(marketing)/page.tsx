import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, FileText, CheckCircle, Clock, Download, Shield, AlertCircle, Zap, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Submit Chargeback Evidence That Card Networks Accept',
  description:
    'Stop submitting weak chargeback evidence. Build a submission-ready, category-specific evidence pack in 30 minutes — starting at $19, no subscription.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Submit Chargeback Evidence That Card Networks Accept',
    description:
      'Stop submitting weak chargeback evidence. Build a submission-ready, category-specific evidence pack in 30 minutes — starting at $19, no subscription.',
    url: '/',
  },
}

const categories = [
  { label: 'Fraudulent / Unauthorized', href: '/chargeback/fraudulent/' },
  { label: 'Subscription Cancelled', href: '/chargeback/subscription-cancelled/' },
  { label: 'Product Not Received', href: '/chargeback/product-not-received/' },
  { label: 'Product Not as Described', href: '/chargeback/product-not-as-described/' },
  { label: 'Duplicate Charge', href: '/chargeback/duplicate-charge/' },
  { label: 'Credit Not Processed', href: '/chargeback/credit-not-processed/' },
]

const steps = [
  {
    number: '01',
    title: 'Answer questions about your dispute',
    body: 'Select your dispute category and reason code. Answer structured questions about the transaction, delivery, and your customer communications. Takes 5–10 minutes.',
    icon: FileText,
  },
  {
    number: '02',
    title: 'We structure your evidence the way card networks expect',
    body: 'ChargebackKit organises your inputs, labels each exhibit, and structures the rebuttal narrative to match Visa, Mastercard, and Amex submission requirements for your specific dispute type.',
    icon: CheckCircle,
  },
  {
    number: '03',
    title: 'Download your submission-ready PDF',
    body: 'Your evidence pack is compiled into a single, labeled PDF with a cover page, rebuttal narrative, and organised exhibits — ready to upload directly to Stripe\'s dispute portal.',
    icon: Download,
  },
]

const objections = [
  {
    q: "What if I don't have all the evidence?",
    a: 'ChargebackKit tells you exactly what\'s needed for your dispute type and what you can include even if some evidence is partial or missing.',
  },
  {
    q: 'Is $19 worth it for a smaller dispute?',
    a: 'If the disputed amount exceeds your cost of goods, a correctly formatted submission often recovers more than it costs. A chargeback consultant charges $300–$500 for the same work.',
  },
  {
    q: 'Why not just use ChatGPT?',
    a: 'ChatGPT doesn\'t know Stripe\'s evidence format, your specific reason code requirements, or which exhibit fields carry the most weight for your dispute type. ChargebackKit does.',
  },
]

const pricingTiers = [
  {
    name: 'Single Pack',
    subtitle: 'One-off dispute',
    price: 19,
    badge: null,
    features: ['1 case credit', 'Full PDF response pack', '7-day re-download access'],
    href: 'https://buy.stripe.com/5kQaEY83P3f02Hdf0l3Nm02',
    cta: 'Buy Single Pack',
    highlighted: false,
  },
  {
    name: '5-Pack',
    subtitle: 'Regular disputes',
    price: 79,
    badge: 'Most popular',
    features: ['5 case credits', 'Full PDF response pack', '30-day re-download access', 'Credits never expire'],
    href: 'https://buy.stripe.com/00w5kE2JvdTE5Tp05r3Nm03',
    cta: 'Buy 5-Pack',
    highlighted: true,
  },
  {
    name: '10-Pack',
    subtitle: 'Growing business',
    price: 129,
    badge: 'Best value',
    features: ['10 case credits', 'Full PDF response pack', '30-day re-download access', 'Credits never expire'],
    href: 'https://buy.stripe.com/14A00k97TbLw2Hd3hD3Nm04',
    cta: 'Buy 10-Pack',
    highlighted: false,
  },
  {
    name: '25-Pack',
    subtitle: 'High volume',
    price: 269,
    badge: null,
    features: ['25 case credits', 'Full PDF response pack', '30-day re-download access', 'Credits never expire', 'Priority support'],
    href: 'https://buy.stripe.com/3cIdRa97TbLwa9FdWh3Nm05',
    cta: 'Buy 25-Pack',
    highlighted: false,
  },
]

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'ChargebackKit',
  applicationCategory: 'BusinessApplication',
  description:
    'ChargebackKit builds submission-ready, dispute-category-specific chargeback evidence packs for Stripe merchants.',
  offers: {
    '@type': 'Offer',
    price: '19.00',
    priceCurrency: 'USD',
    priceValidUntil: '2027-12-31',
  },
  operatingSystem: 'Web',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a chargeback evidence pack?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A chargeback evidence pack is a structured collection of documents, transaction records, and supporting evidence formatted specifically for submission to card networks like Visa and Mastercard. It includes a rebuttal letter, labeled exhibits, and a cover page organized to match the requirements of your specific dispute reason code.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to build a chargeback evidence pack?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'With ChargebackKit, you can build a submission-ready evidence pack in about 30 minutes. Without a tool, merchants typically spend 3 to 5 hours gathering evidence, formatting documents, and writing rebuttal letters for a single dispute.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the average chargeback win rate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The average merchant wins about 30 percent of chargeback disputes. However, merchants who submit properly formatted, category-specific evidence with compelling rebuttal narratives can achieve win rates of 60 to 80 percent depending on the dispute type.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does ChargebackKit work with Stripe, Shopify, and PayPal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ChargebackKit generates evidence packs formatted for all major payment processors including Stripe, Shopify Payments, PayPal, Square, and direct merchant accounts. The output PDF can be uploaded directly to any processor dispute portal.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does ChargebackKit cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ChargebackKit starts at 19 dollars per evidence pack with no subscription required. Volume packs are available: 5-pack for 79 dollars, 10-pack for 129 dollars, and 25-pack for 269 dollars. Credits never expire. This is a fraction of the 300 to 500 dollars that chargeback consultants typically charge.',
      },
    },
    {
      '@type': 'Question',
      name: 'What types of chargebacks can I fight with ChargebackKit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ChargebackKit supports all major dispute categories including fraudulent or unauthorized transactions, product not received, product not as described, subscription cancellation disputes, duplicate charges, and credit not processed. Each category has tailored evidence requirements and rebuttal templates.',
      },
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section className="bg-brand-900 pt-20 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
            Submit Dispute Evidence That<br className="hidden sm:block" />{' '}
            Card Networks Actually Accept
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
            Answer a few structured questions. Upload your exhibits. Get a fully assembled,
            labeled PDF evidence pack — built specifically for your dispute reason.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link
              href="https://buy.stripe.com/5kQaEY83P3f02Hdf0l3Nm02"
              className="inline-flex items-center gap-2 bg-emerald-500 text-white font-bold text-base px-8 py-4 rounded-lg hover:bg-emerald-600 transition-colors shadow-lg"
            >
              Build My Evidence Pack — $19
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/how-it-works/"
              className="inline-flex items-center gap-2 text-slate-300 border border-white/20 font-medium text-base px-8 py-4 rounded-lg hover:bg-white/5 hover:border-white/40 transition-colors"
            >
              See how it works
            </Link>
          </div>

          {/* Trust line */}
          <p className="text-sm text-slate-400">
            Starting at $19 · No subscription · Credits never expire
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.479 9.883c-1.626-.604-2.512-1.067-2.512-1.803 0-.622.511-.977 1.423-.977 1.667 0 3.379.642 4.558 1.22l.666-4.111c-.935-.446-2.847-1.177-5.49-1.177-1.87 0-3.425.489-4.536 1.401-1.155.96-1.757 2.344-1.757 4.025 0 3.049 1.865 4.358 4.906 5.46 1.958.702 2.613 1.204 2.613 1.976 0 .754-.648 1.184-1.81 1.184-1.469 0-3.89-.717-5.488-1.65l-.674 4.157c1.364.777 3.892 1.564 6.514 1.564 1.976 0 3.624-.467 4.736-1.35 1.244-.982 1.89-2.427 1.89-4.297 0-3.102-1.891-4.396-4.969-5.522z"/></svg>
            <span>Secure checkout via Stripe · PCI-compliant</span>
          </div>
        </div>
      </section>

      {/* ─── CATEGORY STRIP ───────────────────────────────────────────────── */}
      <section className="bg-brand-800 py-5 px-4 sm:px-6 lg:px-8 border-b border-brand-900/40">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs text-slate-300 uppercase tracking-widest font-medium mb-3 text-center">
            Evidence packs available for
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="inline-block bg-brand-900/60 hover:bg-brand-900 text-slate-200 text-sm font-medium px-4 py-2 rounded-full border border-white/10 hover:border-white/20 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="section bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              From dispute notification to submission-ready pack in 30 minutes
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Not a template. A structured assembly built for your specific dispute type and
              reason code — the way card networks want to see it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map(({ number, title, body, icon: Icon }) => (
              <div key={number} className="relative">
                <div className="flex items-start gap-4">
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center">
                      <Icon size={22} className="text-brand-800" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 font-medium">{number}</span>
                    <h3 className="text-lg font-semibold text-slate-900 mt-1 mb-2">{title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/how-it-works/"
              className="text-sm text-brand-700 font-medium hover:text-brand-800 underline underline-offset-2"
            >
              See the full walkthrough →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── PRICING ────────────────────────────────────────────────────── */}
      <section id="pricing" className="section bg-slate-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Simple packs. No subscriptions.
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Buy credits once, use them whenever you need. 1 credit = 1 response pack download. Credits never expire.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative bg-white rounded-2xl border-2 p-6 flex flex-col ${
                  tier.highlighted
                    ? 'border-emerald-500 shadow-lg shadow-emerald-500/10'
                    : 'border-slate-200'
                }`}
              >
                {tier.badge && (
                  <span
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full ${
                      tier.badge === 'Most popular'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-amber-400 text-amber-900'
                    }`}
                  >
                    {tier.badge}
                  </span>
                )}
                <h3 className="text-lg font-bold text-slate-900">{tier.name}</h3>
                <p className="text-sm text-slate-500 mb-4">{tier.subtitle}</p>
                <div className="mb-1">
                  <span className="text-4xl font-bold text-slate-900">${tier.price}</span>
                  <span className="text-sm text-slate-500 ml-1">one-time</span>
                </div>
                {tier.price > 19 && (
                  <p className="text-xs text-emerald-600 font-medium mb-4">
                    Save ${(tier.features[0].match(/\d+/) ? parseInt(tier.features[0].match(/\d+/)![0]) * 19 - tier.price : 0)}
                  </p>
                )}
                {tier.price === 19 && <div className="mb-4" />}
                <ul className="space-y-2 mb-6 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={tier.href}
                  className={`w-full text-center py-3 px-4 rounded-lg font-semibold text-sm transition-colors ${
                    tier.highlighted
                      ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {tier.cta} →
                </Link>
                <p className="text-xs text-slate-400 text-center mt-2">Secure checkout</p>
              </div>
            ))}
          </div>

          {/* Comparison row */}
          <div className="mt-12 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left px-6 py-4 font-semibold text-slate-700">Option</th>
                  <th className="text-left px-6 py-4 font-semibold text-slate-700">Cost</th>
                  <th className="text-left px-6 py-4 font-semibold text-slate-700">Time</th>
                  <th className="text-left px-6 py-4 font-semibold text-slate-700">Risk</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="px-6 py-4 text-slate-700">Hire a chargeback consultant</td>
                  <td className="px-6 py-4 text-slate-700">$300–$500</td>
                  <td className="px-6 py-4 text-slate-700">Days</td>
                  <td className="px-6 py-4 text-slate-500">No outcome guarantee</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="px-6 py-4 text-slate-700">Build it yourself</td>
                  <td className="px-6 py-4 text-slate-700">$0</td>
                  <td className="px-6 py-4 text-slate-700">Hours of research</td>
                  <td className="px-6 py-4 text-slate-500">Wrong format, missing evidence</td>
                </tr>
                <tr className="bg-brand-50">
                  <td className="px-6 py-4 font-semibold text-brand-900">
                    ChargebackKit
                  </td>
                  <td className="px-6 py-4 font-bold text-brand-800">From $19</td>
                  <td className="px-6 py-4 text-brand-800 font-medium">30 minutes</td>
                  <td className="px-6 py-4 text-brand-800 font-medium">Submission-ready format</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── TRUST SIGNALS ────────────────────────────────────────────────── */}
      <section className="section bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-12">
            Built for Stripe merchants who need to get this right
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
              <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center mb-4">
                <Shield size={20} className="text-brand-800" strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Built for Stripe merchants</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Evidence packs are structured around Stripe&apos;s dispute submission portal and the
                reason codes Stripe surfaces from Visa, Mastercard, and Amex.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
              <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center mb-4">
                <FileText size={20} className="text-brand-800" strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Category-specific structure</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Evidence requirements differ by dispute type. Fraudulent dispute evidence is not the
                same as subscription cancellation evidence. Each pack is structured for your exact
                reason code.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
              <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center mb-4">
                <Clock size={20} className="text-brand-800" strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">72-hour file access</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Uploaded files are used only to generate your pack. They are not stored after 72
                hours. Download and re-download your PDF within that window.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
              <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center mb-4">
                <CheckCircle size={20} className="text-brand-800" strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">No subscription — just packs</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Starting at $19 per pack. No monthly fees. No recurring charges. Buy credits when you have disputes
                that need a response. Credits never expire.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
              <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center mb-4">
                <AlertCircle size={20} className="text-brand-800" strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">No outcome guarantee — and that&apos;s honest</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                No product can guarantee a chargeback outcome. Card networks make the final decision.
                What ChargebackKit does is ensure your evidence is structured correctly — that&apos;s
                the part in your control.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
              <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center mb-4">
                <Download size={20} className="text-brand-800" strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Complete, labeled PDF output</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Your pack includes a cover page, rebuttal narrative, labeled exhibits, and an
                evidence checklist — assembled as a single PDF ready for upload.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── OBJECTION STRIP ──────────────────────────────────────────────── */}
      <section className="bg-slate-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-10">
            Common questions before you start
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {objections.map(({ q, a }) => (
              <div key={q} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <p className="text-white font-semibold text-sm mb-3">&ldquo;{q}&rdquo;</p>
                <p className="text-slate-400 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-6">
            <Link
              href="/faq/"
              className="text-sm text-slate-400 hover:text-white underline underline-offset-2 transition-colors"
            >
              See all frequently asked questions →
            </Link>
          </p>
        </div>
      </section>      {/* ─── FAQ ──────────────────────────────────────────────────────────── */}
      <section id="faq" className="section bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Frequently asked questions</h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((item, i) => (
              <details key={i} className="group bg-slate-50 rounded-lg border border-slate-200">
                <summary className="flex items-start justify-between gap-4 px-5 py-4 cursor-pointer list-none font-semibold text-slate-900 text-sm">
                  <span>{item.name}</span>
                  <span className="shrink-0 text-slate-400 mt-0.5 group-open:rotate-180 transition-transform text-base leading-none">
                    ↓
                  </span>
                </summary>
                <div className="px-5 pb-4 pt-2 text-sm text-slate-600 leading-relaxed border-t border-slate-200">
                  {item.acceptedAnswer.text}
                  {item.name.toLowerCase().includes('refund') && (
                    <span>{' '}<Link href="/refund/" className="text-brand-700 underline hover:text-brand-800">Read the full Refund Policy.</Link></span>
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="bg-brand-800 py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            30 minutes to a complete evidence pack
          </h2>
          <p className="text-slate-300 text-lg mb-8">
            Submission-grade. Category-specific. Built the way card networks want to see it.
          </p>
          <Link
            href="https://buy.stripe.com/5kQaEY83P3f02Hdf0l3Nm02"
            className="inline-flex items-center gap-2 bg-emerald-500 text-white font-bold text-base px-8 py-4 rounded-lg hover:bg-emerald-600 transition-colors shadow-lg"
          >
            Build My Evidence Pack — $19
            <ArrowRight size={18} />
          </Link>
          <p className="mt-4 text-sm text-slate-400">
            Starting at $19 · Credits never expire · Secure checkout via Stripe
          </p>
        </div>
      </section>
    </>
  )
}
