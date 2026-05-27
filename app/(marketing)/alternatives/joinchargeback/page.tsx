import type { Metadata } from 'next';
import Link from 'next/link';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chargebackkit.app';

export const metadata: Metadata = {
  title: 'JoinChargeback Alternative: Build Your Evidence Pack for $19',
  description:
    'JoinChargeback is shutting down. ChargebackKit builds a submission-ready chargeback evidence pack &mdash; rebuttal narrative, evidence checklist, formatted PDF &mdash; in 30 minutes for $19. No subscription. No success fee.',
  alternates: {
    canonical: `${siteUrl}/alternatives/joinchargeback`,
  },
  openGraph: {
    title: 'JoinChargeback Alternative: Build Your Evidence Pack for $19',
    description:
      'JoinChargeback is shutting down. Build a submission-ready chargeback evidence pack in 30 minutes for $19.',
    url: `${siteUrl}/alternatives/joinchargeback`,
    type: 'article',
  },
};

export default function JoinChargebackAlternativePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Why is JoinChargeback shutting down?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'JoinChargeback announced that the service is winding down. The product no longer accepts new customers, and existing users are looking for a replacement that can produce a complete chargeback response package on demand.',
        },
      },
      {
        '@type': 'Question',
        name: 'How is ChargebackKit different from JoinChargeback?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ChargebackKit is built around a single deliverable &mdash; a submission-ready evidence pack PDF &mdash; for a flat $19 per pack. There is no monthly subscription, no per-dispute success fee, and no integration required. You answer a short set of questions about the dispute and download the pack.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is included in a ChargebackKit evidence pack?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A category-specific evidence structure organized around the exact fields that matter for your dispute type, a rebuttal narrative, an evidence checklist that distinguishes critical vs supplementary exhibits, and a single formatted PDF ready to upload to your processor.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does it take to build a pack?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most users finish a pack in about 30 minutes. The guided intake surfaces the right evidence for your dispute type and flags missing items as you go.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need an account or to change processors to use ChargebackKit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No account is required to begin building a pack &mdash; you can sign up afterward if you want to save your pack reference. The pack is a PDF you upload through your existing processor; ChargebackKit is built for Stripe submission first and the format works for any major processor.',
        },
      },
      {
        '@type': 'Question',
        name: 'What if I have an active dispute right now?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Response windows are tight (Visa 30 days, Mastercard 45 days, American Express and Discover 20 days, and acquirers often shorten these further). Build your pack today and submit it through your processor.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <Link href="/" className="text-brand-700 hover:text-brand-800 font-medium">
            Home
          </Link>
          <span className="mx-2 text-slate-400">/</span>
          <span className="text-slate-600">JoinChargeback alternative</span>
        </nav>

        <h1 className="text-4xl font-bold mb-6 text-gray-900">
          JoinChargeback is shutting down. Build your evidence pack for $19 instead.
        </h1>

        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          ChargebackKit builds a submission-ready chargeback evidence pack &mdash; rebuttal narrative,
          evidence checklist, and a formatted PDF organized around your specific dispute type &mdash;
          in about 30 minutes. Flat $19 per pack. No subscription. No success fee.
        </p>

        <div className="mb-12">
          <a
            href="https://buy.stripe.com/5kQaEY83P3f02Hdf0l3Nm02"
            className="inline-block bg-emerald-500 text-white font-semibold py-3 px-8 rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Build My Evidence Pack &mdash; $19
          </a>
          <p className="mt-3 text-sm text-slate-600">
            Secure checkout via Stripe &middot; No subscription &middot; No account required
          </p>
          <Link href="/preview" className="inline-block mt-3 text-sm text-emerald-600 font-medium hover:text-emerald-700 underline underline-offset-2">
            See a sample evidence pack &rarr;
          </Link>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Side-by-side comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Feature</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">JoinChargeback</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">ChargebackKit</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900 font-medium">Status</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Shutting down</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Active, fully supported</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900 font-medium">Pricing model</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Subscription</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Flat $19 per pack</td>
                </tr>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900 font-medium">Success fee</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">&mdash;</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">None</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900 font-medium">Category-specific evidence structure</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Limited</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Tailored to each dispute type</td>
                </tr>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900 font-medium">Output format</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Varies</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Single labeled PDF</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900 font-medium">Time to first pack</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Hours to days</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">About 30 minutes</td>
                </tr>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900 font-medium">Account required upfront</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Yes</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">No</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Moving over from JoinChargeback in three steps</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-emerald-500 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Step 1: Note your open disputes</h3>
              <p className="text-gray-700">
                Before access to JoinChargeback ends, jot down the dispute IDs, reason codes,
                transaction amounts, and customer emails for any open cases. ChargebackKit does
                not require historical data to start.
              </p>
            </div>
            <div className="border-l-4 border-emerald-500 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Step 2: Build a pack for each active dispute</h3>
              <p className="text-gray-700">
                Open ChargebackKit, answer the guided questions for the dispute type, and
                download the pack. Each pack is $19 &mdash; pay only for the disputes you
                actually fight.
              </p>
            </div>
            <div className="border-l-4 border-emerald-500 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Step 3: Submit through your processor</h3>
              <p className="text-gray-700">
                Upload the PDF through your processor&apos;s dispute portal. Watch the response
                deadline (Visa 30 days, Mastercard 45 days, American Express and Discover 20
                days; acquirers often shorten these further).
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqSchema.mainEntity.map((q) => (
              <div key={q.name}>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{q.name}</h3>
                <p className="text-gray-700">{q.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-brand-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Don&apos;t miss your response deadline</h2>
          <p className="text-gray-700 mb-6">
            Build a submission-ready chargeback evidence pack in about 30 minutes. Flat $19 per
            pack. No subscription. No success fee.
          </p>
          <a
            href="https://buy.stripe.com/5kQaEY83P3f02Hdf0l3Nm02"
            className="inline-block bg-emerald-500 text-white font-semibold py-3 px-8 rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Build My Evidence Pack &mdash; $19
          </a>
          <p className="mt-4">
            <Link href="/preview" className="text-sm text-emerald-600 font-medium hover:text-emerald-700 underline underline-offset-2">
              Or see a sample pack first &rarr;
            </Link>
          </p>
        </section>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Resources</h3>
          <ul className="space-y-2 text-brand-700">
            <li><Link href="/guides/how-to-win-a-chargeback" className="hover:underline">How to Win a Chargeback as a Merchant</Link></li>
            <li><Link href="/guides/chargeback-response-deadlines" className="hover:underline">Chargeback Response Deadlines by Card Network</Link></li>
            <li><Link href="/guides/chargeback-rebuttal-letter" className="hover:underline">Chargeback Rebuttal Letter: How to Write One That Wins</Link></li>
            <li><Link href="/chargeback-evidence-checklist" className="hover:underline">Chargeback Evidence Checklist by Dispute Type</Link></li>
            <li><Link href="/pricing" className="hover:underline">Evidence Pack Pricing</Link></li>
            <li><Link href="/preview" className="hover:underline">Preview a Sample Evidence Pack</Link></li>
          </ul>
        </div>
      </div>
    </>
  );
}
