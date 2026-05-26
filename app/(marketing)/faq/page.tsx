import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Answers to common questions about the ChargebackKit: pricing, dispute categories, evidence requirements, file handling, and refund policy.',
  alternates: {
    canonical: '/faq/',
  },
  openGraph: {
    title: 'Frequently Asked Questions | ChargebackKit',
    description:
      'Common questions about pricing, dispute categories, evidence requirements, and how ChargebackKit works.',
    url: '/faq/',
  },
}

const faqGroups = [
  {
    title: 'About the product',
    faqs: [
      {
        q: 'What is the ChargebackKit?',
        a: 'It is a structured web tool that guides Stripe merchants through the chargeback response process. You answer questions about your dispute, upload your supporting documents, and ChargebackKit assembles a fully labeled, submission-ready PDF evidence pack — structured for your specific dispute type and reason code.',
      },
      {
        q: 'Is this a template or a builder?',
        a: 'It is a builder, not a template. A template gives you a blank document to fill in. ChargebackKit asks structured questions based on your dispute category, identifies the right evidence requirements for your reason code, labels your exhibits, and assembles the narrative and evidence into a submission-ready PDF.',
      },
      {
        q: 'Which dispute categories are covered?',
        a: 'Six categories: Fraudulent/Unauthorized, Subscription Cancelled, Product Not Received, Product Not as Described, Duplicate Charge, and Credit Not Processed. These map to the most common reason codes issued through Stripe for Visa, Mastercard, and Amex disputes.',
      },
      {
        q: 'Is this specific to Stripe?',
        a: 'ChargebackKit is built for Stripe merchants. It is structured around Stripe\'s evidence submission portal and the reason codes Stripe surfaces. The underlying evidence rules come from Visa, Mastercard, and Amex — so the evidence structure is correct regardless of processor, but the workflow references Stripe directly.',
      },
      {
        q: 'Is this legal advice?',
        a: 'No. This is not legal advice and this is not a law firm. ChargebackKit organises evidence based on card network submission guidelines. For legal advice specific to your situation, consult a licensed attorney.',
      },
    ],
  },
  {
    title: 'Pricing and payment',
    faqs: [
      {
        q: 'How much does a pack cost?',
        a: 'Evidence packs start at $19. Volume packs available: 5-Pack ($79), 10-Pack ($129), and 25-Pack ($269). No subscription required.',
      },
      {
        q: 'Is there a subscription?',
        a: 'No. This is a one-time purchase per pack. There are no monthly fees, no recurring charges, and no free trial. You purchase a pack when you have a dispute that needs a response.',
      },
      {
        q: 'Are there multi-pack options?',
        a: 'Yes. Volume pricing is available: 5-Pack for $79, 10-Pack for $129, and 25-Pack for $269 — for merchants handling multiple simultaneous disputes. These are one-time purchases, not subscriptions.',
      },
      {
        q: 'How is payment processed?',
        a: 'All payments are processed via Stripe Checkout. No card details are stored by this product.',
      },
      {
        q: 'Do I need an account to purchase?',
        a: 'No account is required. You can purchase and complete ChargebackKit as a guest. Creating an account allows you to access your pack reference and download history.',
      },
    ],
  },
  {
    title: 'Evidence and pack contents',
    faqs: [
      {
        q: 'What is included in the evidence pack?',
        a: 'Your pack includes: a cover page identifying the dispute, a rebuttal narrative structured for your dispute type, labeled exhibits (your uploaded files), and an evidence checklist. Everything is compiled into a single PDF ready for Stripe\'s evidence submission portal.',
      },
      {
        q: 'What if I don\'t have all the evidence items?',
        a: 'Include what you have. ChargebackKit distinguishes required evidence from supplementary evidence for your dispute type, and flags which items are missing. An incomplete but correctly structured submission is better than a complete but incorrectly formatted one.',
      },
      {
        q: 'Will this guarantee I win my chargeback?',
        a: 'No. No product can guarantee a chargeback outcome. Card networks — Visa, Mastercard, Amex — make the final determination. What ChargebackKit does is ensure your evidence is structured correctly for your dispute type. That is the part in your control.',
      },
      {
        q: 'How long does it take to build a pack?',
        a: 'Most merchants complete intake and receive a finished pack in 20–35 minutes. Disputes with extensive customer communication history take slightly longer.',
      },
      {
        q: 'I don\'t know which category my dispute falls under. How do I find out?',
        a: 'Check the "Reason" field in your Stripe dispute notification. Stripe surfaces a reason code for every dispute (e.g., "fraudulent," "subscription_cancelled," "product_not_received"). Each reason code maps to one of the six categories ChargebackKit covers.',
      },
    ],
  },
  {
    title: 'Files, security, and refunds',
    faqs: [
      {
        q: 'What happens to my uploaded files?',
        a: 'Files you upload during pack creation are used only to generate your evidence pack. They are not stored, shared, or used for any other purpose. All uploads and your pack are deleted 72 hours after creation.',
      },
      {
        q: 'How long do I have to download my pack?',
        a: 'Your pack is available to download for 72 hours after creation. Download it before that window closes — files are permanently deleted after 72 hours.',
      },
      {
        q: 'Can I regenerate my pack after the 72-hour window?',
        a: 'Once the 72-hour window closes, the pack and all associated files are deleted. If you need a new pack, that is a separate purchase.',
      },
      {
        q: 'What is your refund policy?',
        a: 'We offer a refund within 30 minutes of purchase if you have not started the intake process. Once intake begins, a refund is not available. See the full Refund Policy for details.',
      },
    ],
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqGroups.flatMap(({ faqs }) =>
    faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    }))
  ),
}

export default function FAQPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="bg-brand-900 pt-16 pb-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-100 text-sm font-medium uppercase tracking-widest mb-4">FAQ</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Frequently asked questions
          </h1>
          <p className="text-xl text-slate-300">
            Answers to common questions about ChargebackKit, pricing, evidence requirements, and file handling.
          </p>
        </div>
      </section>

      {/* FAQ content */}
      <section className="section bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-12">
            {faqGroups.map(({ title, faqs }) => (
              <div key={title}>
                <h2 className="text-xl font-bold text-slate-900 mb-5 pb-3 border-b border-slate-200">
                  {title}
                </h2>
                <div className="space-y-4">
                  {faqs.map(({ q, a }) => (
                    <details key={q} className="group bg-slate-50 rounded-lg border border-slate-200">
                      <summary className="flex items-start justify-between gap-4 px-5 py-4 cursor-pointer list-none font-semibold text-slate-900 text-sm">
                        <span>{q}</span>
                        <span className="shrink-0 text-slate-400 mt-0.5 group-open:rotate-180 transition-transform text-base leading-none">
                          ↓
                        </span>
                      </summary>
                      <div className="px-5 pb-4 pt-2 text-sm text-slate-600 leading-relaxed border-t border-slate-200">
                        {a}
                        {q.toLowerCase().includes('refund') && (
                          <span>
                            {' '}
                            <Link href="/refund/" className="text-brand-700 underline hover:text-brand-800">
                              Read the full Refund Policy.
                            </Link>
                          </span>
                        )}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Cross-links */}
          <div className="mt-12 bg-slate-50 rounded-xl p-6 border border-slate-200">
            <p className="text-sm font-semibold text-slate-900 mb-3">More detail on specific topics:</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/how-it-works/" className="text-sm text-brand-700 underline hover:text-brand-800">
                How ChargebackKit works →
              </Link>
              <Link href="/pricing/" className="text-sm text-brand-700 underline hover:text-brand-800">
                Pricing details →
              </Link>
              <Link href="/refund/" className="text-sm text-brand-700 underline hover:text-brand-800">
                Refund policy→
              </Link>
              <Link href="/privacy/" className="text-sm text-brand-700 underline hover:text-brand-800">
                Privacy policy 
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-800 py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to build your evidence pack?
          </h2>
          <p className="text-slate-300 mb-6">$19. No subscription. Submission-ready in 30 minutes.</p>
          <Link
            href="https://buy.stripe.com/5kQaEY83P3f02Hdf0l3Nm02"
            className="inline-flex items-center gap-2 bg-white text-brand-900 font-bold text-base px-8 py-4 rounded-lg hover:bg-brand-50 transition-colors"
          >
            Create Your Pack
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  )
}
