import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, FileText, CheckCircle, Clock, Download, Shield, AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Submit Chargeback Evidence That Card Networks Accept',
  description:
    'Stop submitting weak chargeback evidence. Build a submission-ready, category-specific evidence pack in 30 minutes — $39, no subscription.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Submit Chargeback Evidence That Card Networks Accept',
    description:
      'Stop submitting weak chargeback evidence. Build a submission-ready, category-specific evidence pack in 30 minutes — $39, no subscription.',
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
    body: 'The builder organises your inputs, labels each exhibit, and structures the rebuttal narrative to match Visa, Mastercard, and Amex submission requirements for your specific dispute type.',
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
    a: 'The builder tells you exactly what\'s needed for your dispute type and what you can include even if some evidence is partial or missing.',
  },
  {
    q: 'Is $39 worth it for a smaller dispute?',
    a: 'If the disputed amount exceeds your cost of goods, a correctly formatted submission often recovers more than it costs. A chargeback consultant charges $300–$500 for the same work.',
  },
  {
    q: 'Why not just use ChatGPT?',
    a: 'ChatGPT doesn\'t know Stripe\'s evidence format, your specific reason code requirements, or which exhibit fields carry the most weight for your dispute type. This builder does.',
  },
]

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Chargeback Evidence Pack Builder',
  applicationCategory: 'BusinessApplication',
  description:
    'Submission-ready, dispute-category-specific chargeback evidence packs for Stripe merchants. $39 per pack. No subscription.',
  offers: {
    '@type': 'Offer',
    price: '39.00',
    priceCurrency: 'USD',
    priceValidUntil: '2027-12-31',
  },
  operatingSystem: 'Web',
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
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
              href="/signup/"
              className="inline-flex items-center gap-2 bg-white text-brand-900 font-bold text-base px-8 py-4 rounded-lg hover:bg-brand-50 transition-colors shadow-lg"
            >
              Build My Evidence Pack
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
            $39 · No subscription · Files deleted after 72 hours
          </p>
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

      {/* ─── PRICING ANCHOR ───────────────────────────────────────────────── */}
      <section className="section bg-slate-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              $39 per pack. No subscription.
            </h2>
            <p className="text-lg text-slate-600">
              One payment. One submission-ready evidence pack. No recurring charges.
            </p>
          </div>

          {/* Comparison table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
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
                    Chargeback Evidence Pack Builder
                  </td>
                  <td className="px-6 py-4 font-bold text-brand-800">$39</td>
                  <td className="px-6 py-4 text-brand-800 font-medium">30 minutes</td>
                  <td className="px-6 py-4 text-brand-800 font-medium">Submission-ready format</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/pricing/"
              className="inline-flex items-center gap-2 bg-brand-800 text-white font-bold text-base px-8 py-4 rounded-lg hover:bg-brand-700 transition-colors shadow-sm"
            >
              Build My Evidence Pack — $39
              <ArrowRight size={18} />
            </Link>
            <p className="mt-3 text-sm text-slate-500">Secure checkout via Stripe · No subscription</p>
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
              <h3 className="font-semibold text-slate-900 mb-2">One payment, no subscription</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                $39 per pack. No monthly fees. No recurring charges. Buy when you have a dispute
                that needs a response.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
              <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center mb-4">
                <AlertCircle size={20} className="text-brand-800" strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">No outcome guarantee — and that&apos;s honest</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                No product can guarantee a chargeback outcome. Card networks make the final decision.
                What this builder does is ensure your evidence is structured correctly — that&apos;s
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
            href="/signup/"
            className="inline-flex items-center gap-2 bg-white text-brand-900 font-bold text-base px-8 py-4 rounded-lg hover:bg-brand-50 transition-colors shadow-lg"
          >
            Build My Evidence Pack
            <ArrowRight size={18} />
          </Link>
          <p className="mt-4 text-sm text-slate-400">
            $39 · Instant download · 72-hour access to your pack
          </p>
        </div>
      </section>
    </>
  )
}
