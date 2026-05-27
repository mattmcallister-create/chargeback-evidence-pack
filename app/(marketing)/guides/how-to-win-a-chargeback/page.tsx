import type { Metadata } from 'next';
import Link from 'next/link';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chargebackkit.app';

export const metadata: Metadata = {
  title: 'How to Win a Chargeback as a Merchant (2026 Guide) | ChargebackKit',
  description:
    'Step-by-step guide for merchants on how to win chargeback disputes. Learn which evidence wins, how to structure your response, and the mistakes that cost you money.',
  alternates: {
    canonical: `${siteUrl}/guides/how-to-win-a-chargeback`,
  },
  openGraph: {
    title: 'How to Win a Chargeback as a Merchant (2026 Guide) | ChargebackKit',
    description:
      'Step-by-step guide for merchants on how to win chargeback disputes. Evidence, structure, and strategy.',
    url: `${siteUrl}/guides/how-to-win-a-chargeback`,
    type: 'article',
  },
};

export default function HowToWinChargebackPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the average chargeback win rate for merchants?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The average merchant chargeback win rate is approximately 45%. However, merchants who submit well-organized evidence that directly addresses the reason code can achieve win rates of 60-80% depending on the dispute type.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I fight a chargeback on Stripe?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To fight a chargeback on Stripe, go to your Stripe Dashboard, find the dispute, review the reason code, gather evidence that directly addresses the claim, organize it into a clear submission package, and upload it before the deadline. Stripe will submit your evidence to the card network.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is it worth fighting a chargeback?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, if the disputed amount exceeds your cost of goods and you have evidence to support your case. Beyond recovering revenue, fighting chargebacks protects your chargeback ratio, which affects your ability to process payments. Letting chargebacks go unchallenged increases your ratio and can lead to account restrictions.',
        },
      },
      {
        '@type': 'Question',
        name: 'What evidence do I need to win a chargeback?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The evidence you need depends on the reason code. For fraud disputes, you need AVS/CVV match data, device fingerprints, and transaction history. For product not received claims, you need delivery tracking with confirmation. For subscription disputes, you need proof of consent to recurring billing and usage logs.',
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
          <Link href="/guides" className="text-brand-700 hover:text-brand-800 font-medium">
            Guides
          </Link>
          <span className="mx-2 text-slate-400">/</span>
          <span className="text-slate-600">How to Win a Chargeback</span>
        </nav>

        <h1 className="text-4xl font-bold mb-6 text-gray-900">
          How to Win a Chargeback as a Merchant
        </h1>

        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          Winning a chargeback dispute requires submitting the right evidence, in the right format,
          before the deadline. The average merchant win rate is roughly 45%, but merchants who
          respond with organized, reason-code-specific evidence regularly achieve 60-80% win rates.
          This guide covers exactly what you need to do.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Step 1: Understand What You Are Fighting</h2>
          <p className="text-gray-700 mb-4">
            Every chargeback has a reason code assigned by the card network (Visa, Mastercard, Amex,
            or Discover). The reason code tells you exactly what the cardholder is claiming and
            dictates what evidence the bank wants to see.
          </p>
          <p className="text-gray-700 mb-4">
            Do not submit a generic response. A fraud dispute requires completely different evidence
            than a &quot;product not received&quot; dispute. Read the reason code, understand the claim, and
            build your response around disproving that specific claim.
          </p>
          <div className="bg-brand-50 border-l-4 border-brand-800 p-4 mt-4">
            <p className="text-gray-700"><strong>Key principle:</strong> The bank reviewer is not investigating your business. They are checking whether your evidence disproves the specific claim made by the cardholder. Give them exactly that.</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Step 2: Gather Evidence That Matches the Reason Code</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Reason Code Category</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">What to Prove</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Critical Evidence</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">Fraudulent / Unauthorized</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">The real cardholder made the purchase</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">AVS/CVV match, IP address, device fingerprint, prior order history</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">Product Not Received</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">The product was delivered</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Tracking number, carrier delivery confirmation, signature</td>
                </tr>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">Product Not as Described</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">The product matched the listing</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Product page screenshots, shipping photos, no return request filed</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">Subscription Cancelled</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Customer consented to recurring billing</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Checkout flow, terms accepted, renewal reminders, post-charge usage</td>
                </tr>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">Duplicate Charge</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Each charge is for a separate item or service</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Separate order IDs, itemized receipts, distinct fulfillment records</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">Credit Not Processed</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Refund was issued or not owed</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Refund receipt, refund policy, terms customer accepted</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Step 3: Organize Your Submission</h2>
          <p className="text-gray-700 mb-4">
            Evidence quality matters more than evidence quantity. A well-organized submission with
            five relevant documents beats a dump of twenty unrelated files. Structure your response
            as follows:
          </p>
          <div className="space-y-4">
            <div className="border-l-4 border-brand-800 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Cover Page</h3>
              <p className="text-gray-700">Business name, dispute ID, transaction details, and a one-paragraph summary of your case.</p>
            </div>
            <div className="border-l-4 border-brand-800 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Rebuttal Narrative</h3>
              <p className="text-gray-700">A concise, point-by-point response to the cardholder&apos;s claim with references to specific exhibits.</p>
            </div>
            <div className="border-l-4 border-brand-800 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Labeled Exhibits</h3>
              <p className="text-gray-700">Each piece of evidence labeled (Exhibit A, B, C) with a brief description of what it proves.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Step 4: Submit Before the Deadline</h2>
          <p className="text-gray-700 mb-4">
            Missing your response deadline is an automatic loss. Deadlines vary by card network:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Card Network</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Response Deadline</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Recommended Submit By</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">Visa</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">30 days</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Day 7-10</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">Mastercard</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">45 days</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Day 14-21</td>
                </tr>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">American Express</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">20 days</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Day 5-7</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">Discover</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">30 days</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Day 10-14</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">What Loses Disputes</h2>
          <div className="space-y-4">
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Submitting Everything You Have</h3>
              <p className="text-gray-700">More evidence is not better evidence. Irrelevant documents dilute your case and make the reviewer&apos;s job harder. Only include what directly disproves the cardholder&apos;s specific claim.</p>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Not Responding at All</h3>
              <p className="text-gray-700">Many merchants ignore chargebacks, especially for small amounts. This guarantees a loss and increases your chargeback ratio, which can eventually lead to payment processing restrictions or account termination.</p>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Generic Responses</h3>
              <p className="text-gray-700">A copy-paste response that does not mention the reason code, transaction details, or specific evidence tells the reviewer you are not taking the dispute seriously.</p>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Missing the Deadline</h3>
              <p className="text-gray-700">No amount of evidence matters if you submit it late. The chargeback is automatically upheld and funds are deducted permanently.</p>
            </div>
          </div>
        </section>

              <section className="section bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="group bg-slate-50 rounded-lg border border-slate-200">
              <summary className="flex items-start justify-between gap-4 px-5 py-4 cursor-pointer list-none font-semibold text-slate-900 text-sm">
                <span>What is the average chargeback win rate for merchants?</span>
                <span className="shrink-0 text-slate-400 mt-0.5 group-open:rotate-180 transition-transform text-base leading-none">&darr;</span>
              </summary>
              <div className="px-5 pb-4 pt-2 text-sm text-slate-600 leading-relaxed border-t border-slate-200">
                The average merchant chargeback win rate is approximately 45%. However, merchants who submit well-organized evidence that directly addresses the reason code can achieve win rates of 60-80% depending on the dispute type.
              </div>
            </details>
            <details className="group bg-slate-50 rounded-lg border border-slate-200">
              <summary className="flex items-start justify-between gap-4 px-5 py-4 cursor-pointer list-none font-semibold text-slate-900 text-sm">
                <span>How do I fight a chargeback on Stripe?</span>
                <span className="shrink-0 text-slate-400 mt-0.5 group-open:rotate-180 transition-transform text-base leading-none">&darr;</span>
              </summary>
              <div className="px-5 pb-4 pt-2 text-sm text-slate-600 leading-relaxed border-t border-slate-200">
                Go to your Stripe Dashboard, find the dispute, review the reason code, gather evidence that directly addresses the claim, organize it into a clear submission package, and upload it before the deadline. Stripe submits your evidence to the card network on your behalf.
              </div>
            </details>
            <details className="group bg-slate-50 rounded-lg border border-slate-200">
              <summary className="flex items-start justify-between gap-4 px-5 py-4 cursor-pointer list-none font-semibold text-slate-900 text-sm">
                <span>Is it worth fighting a chargeback?</span>
                <span className="shrink-0 text-slate-400 mt-0.5 group-open:rotate-180 transition-transform text-base leading-none">&darr;</span>
              </summary>
              <div className="px-5 pb-4 pt-2 text-sm text-slate-600 leading-relaxed border-t border-slate-200">
                Yes, if the disputed amount exceeds your cost of goods and you have evidence to support your case. Beyond recovering revenue, fighting chargebacks protects your chargeback ratio, which affects your ability to process payments.
              </div>
            </details>
            <details className="group bg-slate-50 rounded-lg border border-slate-200">
              <summary className="flex items-start justify-between gap-4 px-5 py-4 cursor-pointer list-none font-semibold text-slate-900 text-sm">
                <span>What evidence do I need to win a chargeback?</span>
                <span className="shrink-0 text-slate-400 mt-0.5 group-open:rotate-180 transition-transform text-base leading-none">&darr;</span>
              </summary>
              <div className="px-5 pb-4 pt-2 text-sm text-slate-600 leading-relaxed border-t border-slate-200">
                The evidence depends on the reason code. Fraud disputes need AVS/CVV data and device fingerprints. Product not received claims need delivery tracking. Subscription disputes need proof of consent and usage logs.
              </div>
            </details>
          </div>
        </div>
      </section>

        <section className="bg-brand-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Build a Winning Evidence Pack in 30 Minutes</h2>
          <p className="text-gray-700 mb-6">ChargebackKit structures your evidence the way card networks expect to see it. Answer questions about your dispute, upload your exhibits, and get a submission-ready PDF.</p>
          <a href="https://buy.stripe.com/5kQaEY83P3f02Hdf0l3Nm02" className="inline-block bg-emerald-500 text-white font-semibold py-3 px-8 rounded-lg hover:bg-emerald-600 transition-colors">
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
            <li><Link href="/guides/chargeback-rebuttal-letter" className="hover:underline">Chargeback Rebuttal Letter: How to Write One That Wins</Link></li>
            <li><Link href="/stripe-chargeback-evidence" className="hover:underline">Stripe Chargeback Evidence: What to Submit &amp; How</Link></li>
            <li><Link href="/chargeback-evidence-checklist" className="hover:underline">Chargeback Evidence Checklist: Complete Guide by Dispute Type</Link></li>
            <li><Link href="/guides/chargeback-response-deadlines" className="hover:underline">Chargeback Response Deadlines: Complete Guide by Card Network</Link></li>
            <li><Link href="/preview" className="hover:underline">Preview a Sample Evidence Pack</Link></li>
          </ul>
        </div>
      </div>
    </>
  );
}
