import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, CheckCircle, FileText, Shield, Clock } from 'lucide-react'

type Slug =
  | 'fraudulent'
  | 'subscription-cancelled'
  | 'product-not-received'
  | 'product-not-as-described'
  | 'duplicate-charge'
  | 'credit-not-processed'

type CategoryContent = {
  slug: Slug
  label: string
  reasonCode: string
  h1: string
  subhead: string
  intro: string
  evidenceItems: string[]
  tips: string[]
  seoTitle: string
  seoDescription: string
}

const CATEGORIES: Record<Slug, CategoryContent> = {
  fraudulent: {
    slug: 'fraudulent',
    label: 'Fraudulent / Unauthorized',
    reasonCode: 'Stripe reason: fraudulent',
    h1: 'Fraudulent or Unauthorized Chargeback Evidence Pack',
    subhead: 'Submit the exhibits card networks expect for "cardholder did not authorize" disputes.',
    intro:
      'When a cardholder claims they never authorized the transaction, your rebuttal has to prove the customer received value and that the charge matches their purchase intent. ChargebackKit assembles the right exhibits in the exact structure Stripe and the card networks expect.',
    evidenceItems: [
      'AVS and CVV match results from the original authorization',
      'Device fingerprint and IP address matching the customer profile',
      'Shipping address match to cardholder billing address',
      'Signed delivery confirmation or digital access log',
      'Customer service history showing normal account activity',
      'Previous successful orders from the same cardholder',
    ],
    tips: [
      'Fraud disputes have the shortest response window — most processors give you 7 to 14 days.',
      'Match results (AVS/CVV) carry more weight than narrative. Lead with the data.',
      'If the device fingerprint matches a prior successful transaction, include it as Exhibit A.',
    ],
    seoTitle: 'Fraudulent Chargeback Evidence Pack — Dispute Unauthorized Claims',
    seoDescription:
      'Build a submission-ready evidence pack for fraudulent chargebacks. AVS/CVV proof, device match, delivery confirmation — assembled the way Stripe expects. Starting at $19. Volume packs available.',
  },
  'subscription-cancelled': {
    slug: 'subscription-cancelled',
    label: 'Subscription Cancelled',
    reasonCode: 'Stripe reason: subscription_canceled',
    h1: 'Subscription Cancelled Chargeback Evidence Pack',
    subhead: 'Prove the customer agreed to recurring terms and that cancellations were honored.',
    intro:
      'Subscription disputes hinge on whether the customer clearly consented to recurring billing and whether any cancellation request was processed on time. ChargebackKit structures the exact exhibits needed to rebut "I cancelled" or "I never agreed to recurring charges" claims.',
    evidenceItems: [
      'Signup screenshot or recording showing the recurring terms check-out flow',
      'Terms of service version the customer accepted, with timestamp',
      'Welcome email and any renewal reminder emails sent to the customer',
      'Login and usage activity after the disputed billing date',
      'Cancellation request history (or absence of one) from support tickets',
      'Billing history showing prior successful renewals accepted by the customer',
    ],
    tips: [
      'A screenshot of the checkout page showing "You will be billed $X every month" is your strongest single exhibit.',
      'If the customer used the product AFTER the disputed charge, include login timestamps — that alone often wins the dispute.',
      'Cite Stripe\'s requirement that merchants notify customers of upcoming renewals if the subscription is annual or > $50/month.',
    ],
    seoTitle: 'Subscription Chargeback Evidence Pack — Dispute Cancelled Recurring Claims',
    seoDescription:
      'Submission-ready evidence pack for subscription chargebacks. Signup proof, terms, usage logs, and billing history — assembled for Stripe in 30 minutes. Starting at $19. Volume packs available.',
  },
  'product-not-received': {
    slug: 'product-not-received',
    label: 'Product Not Received',
    reasonCode: 'Stripe reason: product_not_received',
    h1: 'Product Not Received Chargeback Evidence Pack',
    subhead: 'Prove delivery with the exhibits card networks weight most heavily.',
    intro:
      'For "product not received" disputes, the burden is on you to show proof of delivery — and for digital goods, proof of access. ChargebackKit structures physical delivery confirmations, access logs, and customer communication into a single submission-ready pack.',
    evidenceItems: [
      'Carrier tracking number and delivery confirmation (signed if available)',
      'Shipping label with recipient name and address matching the order',
      'For digital goods: download logs, license activation timestamps, or access credentials',
      'Order confirmation email with delivery ETA sent to the customer',
      'Any customer communication acknowledging receipt or asking about the item',
      'Photo of the packed item or warehouse pick confirmation',
    ],
    tips: [
      'A signed delivery confirmation from the carrier beats almost every other exhibit. Always include it if you have it.',
      'For digital goods, an access/download log with the customer IP is the equivalent of a signed delivery.',
      'If the tracking shows "delivered" to the cardholder\'s billing address, highlight that match in your narrative.',
    ],
    seoTitle: 'Product Not Received Chargeback Evidence Pack — Prove Delivery',
    seoDescription:
      'Build a chargeback evidence pack for "product not received" disputes. Tracking, delivery proof, digital access logs — structured for Stripe submission. Starting at $19. Volume packs available.',
  },
  'product-not-as-described': {
    slug: 'product-not-as-described',
    label: 'Product Not as Described',
    reasonCode: 'Stripe reason: product_unacceptable',
    h1: 'Product Not as Described Chargeback Evidence Pack',
    subhead: 'Show the product matched the listing and any return policy was honored.',
    intro:
      '"Product not as described" disputes are won by matching your listing copy, photos, and specs against the customer\'s claim — then showing you offered a reasonable path to resolution. ChargebackKit assembles the exhibits that make that case clearly.',
    evidenceItems: [
      'Original product listing (page, PDP, or landing page) with photos and specifications',
      'Terms of service or return policy the customer agreed to at checkout',
      'All customer service messages — including any refund or replacement offers',
      'Photos of the actual item shipped, if available from fulfillment',
      'Third-party reviews or manufacturer specs that corroborate the listing',
      'Industry standards or spec sheets if the dispute is about technical claims',
    ],
    tips: [
      'If you offered a refund or replacement and the customer declined, that alone often defeats the dispute.',
      'Archive your product listing at the time of sale — Wayback Machine snapshots work as third-party evidence.',
      'Address the specific claim in the customer\'s dispute. Generic rebuttals lose.',
    ],
    seoTitle: 'Product Not as Described Chargeback Evidence Pack — Stripe Submission',
    seoDescription:
      'Assemble an evidence pack for "product not as described" chargebacks. Listing proof, return policy, customer communications — submission-ready. Starting at $19. Volume packs available.',
  },
  'duplicate-charge': {
    slug: 'duplicate-charge',
    label: 'Duplicate Charge',
    reasonCode: 'Stripe reason: duplicate',
    h1: 'Duplicate Charge Chargeback Evidence Pack',
    subhead: 'Prove the two charges were for distinct transactions.',
    intro:
      'Duplicate charge disputes are won with clean transaction data: different timestamps, order IDs, line items, or IP sessions. ChargebackKit assembles the side-by-side proof that the charges represent separate purchases.',
    evidenceItems: [
      'Both transaction receipts side-by-side with distinct order IDs and timestamps',
      'Line items showing different products, quantities, or customizations',
      'Session logs (IP, device fingerprint, user agent) for each transaction',
      'Customer confirmation emails for each separate purchase',
      'Any return or refund history for one of the charges (if applicable)',
      'A timeline showing customer activity between the two charges',
    ],
    tips: [
      'If the order IDs are sequential, the "duplicate" is usually a customer misreading their statement — lead with that.',
      'Different line items or product SKUs on each order is the fastest win.',
      'Include a 60-day transaction history to show this customer normally places multiple orders.',
    ],
    seoTitle: 'Duplicate Charge Chargeback Evidence Pack — Prove Separate Transactions',
    seoDescription:
      'Evidence pack for duplicate chargeback disputes. Side-by-side transaction proof, distinct order IDs, session logs — Stripe submission-ready. Starting at $19. Volume packs available.',
  },
  'credit-not-processed': {
    slug: 'credit-not-processed',
    label: 'Credit Not Processed',
    reasonCode: 'Stripe reason: credit_not_processed',
    h1: 'Credit Not Processed Chargeback Evidence Pack',
    subhead: 'Show that any promised refund was issued — or that no refund was owed.',
    intro:
      'For "credit not processed" disputes, you either prove the refund was issued (with the Stripe credit note and timestamp) or prove the customer never qualified for one under your posted return policy. ChargebackKit structures both paths.',
    evidenceItems: [
      'Stripe credit note or refund receipt with transaction ID and timestamp',
      'Customer service history showing the refund request and resolution',
      'Return policy the customer agreed to at checkout',
      'If no refund was owed: the specific policy clause that applies',
      'Proof the returned item (if any) was received at your warehouse',
      'Any communication where the customer acknowledged the refund',
    ],
    tips: [
      'If you already refunded the charge in Stripe, the dispute is usually an error — submit the credit note as Exhibit A.',
      'Refunds can take 5–10 business days to clear. If the customer filed prematurely, explain the timing.',
      'Attach your return policy with the exact clause that governs the request highlighted.',
    ],
    seoTitle: 'Credit Not Processed Chargeback Evidence Pack — Refund Dispute',
    seoDescription:
      'Evidence pack for "credit not processed" chargebacks. Stripe credit notes, return policy, refund history — submission-ready in 30 minutes. Starting at $19. Volume packs available.',
  },
}

export function generateStaticParams() {
  return (Object.keys(CATEGORIES) as Slug[]).map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const data = CATEGORIES[params.slug as Slug]
  if (!data) {
    return { title: 'Chargeback Evidence Pack' }
  }
  return {
    title: data.seoTitle,
    description: data.seoDescription,
    alternates: {
      canonical: `/chargeback/${data.slug}/`,
    },
    openGraph: {
      title: data.seoTitle,
      description: data.seoDescription,
      url: `/chargeback/${data.slug}/`,
      type: 'article',
    },
  }
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const data = CATEGORIES[params.slug as Slug]
  if (!data) notFound()

  return (
    <>
      {/* ─── HERO ───────────────────────────────────────────────────────────── */}
      <section className="bg-brand-900 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs text-slate-400 uppercase tracking-widest font-medium mb-4">
            {data.reasonCode}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
            {data.h1}
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
            {data.subhead}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link
              href="https://buy.stripe.com/5kQaEY83P3f02Hdf0l3Nm02"
              className="inline-flex items-center gap-2 bg-white text-brand-900 font-bold text-base px-8 py-4 rounded-lg hover:bg-brand-50 transition-colors shadow-lg"
            >
              Build My {data.label} Pack — $19
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/preview"
              className="inline-flex items-center gap-2 text-slate-300 border border-white/20 font-medium text-base px-8 py-4 rounded-lg hover:bg-white/5 hover:border-white/40 transition-colors"
            >
              See a sample pack
            </Link>
          </div>
          <p className="text-sm text-slate-400">
            $19 per pack · Volume discounts available · 7-day access
          </p>
        </div>
      </section>

      {/* ─── INTRO ──────────────────────────────────────────────────────────── */}
      <section className="section bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-slate-700 leading-relaxed">{data.intro}</p>
        </div>
      </section>

      {/* ─── EVIDENCE CHECKLIST ────────────────────────────────────────────── */}
      <section className="section bg-slate-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-start gap-4 mb-10">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center">
              <FileText size={22} className="text-brand-800" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                What your evidence pack will include
              </h2>
              <p className="text-slate-600">
                Every exhibit a {data.label.toLowerCase()} dispute needs, structured for Stripe submission.
              </p>
            </div>
          </div>
          <ul className="space-y-4">
            {data.evidenceItems.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle
                  size={20}
                  className="text-brand-700 shrink-0 mt-0.5"
                  strokeWidth={2}
                />
                <span className="text-slate-700 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── TIPS ──────────────────────────────────────────────────────────── */}
      <section className="section bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-start gap-4 mb-10">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center">
              <Shield size={22} className="text-brand-800" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                What wins this dispute type
              </h2>
              <p className="text-slate-600">
                Patterns from successful {data.label.toLowerCase()} rebuttals.
              </p>
            </div>
          </div>
          <ul className="space-y-5">
            {data.tips.map((tip) => (
              <li
                key={tip}
                className="bg-slate-50 rounded-xl p-5 border border-slate-100 text-slate-700 leading-relaxed"
              >
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── RELATED CATEGORIES ─────────────────────────────────────────────── */}
      <section className="section bg-slate-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-semibold text-slate-900 text-center mb-6">
            Other chargeback categories
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {(Object.values(CATEGORIES) as CategoryContent[])
              .filter((c) => c.slug !== data.slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/chargeback/${c.slug}/`}
                  className="inline-block bg-white hover:bg-brand-50 text-slate-700 hover:text-brand-900 text-sm font-medium px-4 py-2 rounded-full border border-slate-200 hover:border-brand-200 transition-colors"
                >
                  {c.label}
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ──────────────────────────────────────────────────────── */}
      <section className="bg-brand-800 py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-slate-300 text-sm mb-4">
            <Clock size={16} strokeWidth={1.5} />
            <span>30 minutes · 7-day download access</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to build your {data.label.toLowerCase()} evidence pack?
          </h2>
          <p className="text-slate-300 text-lg mb-8">
            Submission-grade. Category-specific. Built the way card networks want to see it.
          </p>
          <Link
            href="https://buy.stripe.com/5kQaEY83P3f02Hdf0l3Nm02"
            className="inline-flex items-center gap-2 bg-white text-brand-900 font-bold text-base px-8 py-4 rounded-lg hover:bg-brand-50 transition-colors shadow-lg"
          >
            Build My Evidence Pack — $19
            <ArrowRight size={18} />
          </Link>
          <p className="mt-4 text-sm text-slate-400">
            $19 per pack · Volume discounts available · 7-day access
          </p>
          <p className="mt-3">
            <Link
              href="/preview"
              className="text-sm text-slate-400 hover:text-white underline underline-offset-2 transition-colors"
            >
              Or see a sample pack first →
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
