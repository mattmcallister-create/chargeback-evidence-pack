import type { Metadata } from 'next';
import Link from 'next/link';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chargebackkit.app';

export const metadata: Metadata = {
  title: 'Stripe Chargeback Evidence: What to Submit & How | ChargebackKit',
  description:
    'Learn what Stripe requires for chargeback evidence and how to submit a winning response. Includes evidence checklist, common mistakes, and step-by-step guide.',
  alternates: {
    canonical: `${siteUrl}/stripe-chargeback-evidence`,
  },
  openGraph: {
    title: 'Stripe Chargeback Evidence: What to Submit & How | ChargebackKit',
    description:
      'Learn what Stripe requires for chargeback evidence and how to submit a winning response.',
    url: `${siteUrl}/stripe-chargeback-evidence`,
    type: 'article',
  },
};

export default function StripeChargebackEvidencePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What evidence does Stripe require for chargebacks?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Stripe requires evidence such as transaction records, delivery proof, customer communication logs, terms of service/refund policy, product description records, IP/device information, and any other documentation proving the legitimacy of the transaction.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long do I have to respond to a Stripe chargeback?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The response deadline depends on the card network. Visa typically allows 30 days, Mastercard 45 days, and American Express 20 days. Your Stripe dashboard will show the specific deadline for your dispute.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I include screenshots as evidence in Stripe chargebacks?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, screenshots of customer communication, delivery confirmations, and transaction records are accepted evidence. However, they should be clear, unedited, and directly relevant to the dispute. Combining multiple evidence types strengthens your response.',
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
        {/* Header */}
        <h1 className="text-4xl font-bold mb-6 text-gray-900">
          Stripe Chargeback Evidence: What to Submit and How to Win
        </h1>

        {/* Definition Paragraph */}
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          Stripe chargeback evidence is documentation you submit to prove the legitimacy of a
          disputed transaction. Strong evidence directly addresses the chargeback reason code and
          convinces the cardholder&apos;s bank that the transaction was legitimate.
        </p>

        {/* What Stripe Requires Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">What Stripe Requires</h2>
          <p className="text-gray-700 mb-6">
            Stripe accepts multiple evidence types. The weight of your response depends on how
            comprehensively you address the cardholder&apos;s claim. Below are the core evidence types:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Evidence Type</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">What It Proves</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Priority</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">Delivery/Tracking Proof</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Product was delivered to the customer&apos;s address</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Critical</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">Customer Communication</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Customer confirmation of purchase, receipt, or acceptance</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Critical</td>
                </tr>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">Refund Policy / Terms of Service</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Customer agreed to terms prior to purchase</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">High</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">Transaction Records</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Order details, timestamps, amounts, and customer information</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">High</td>
                </tr>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">Product Description Records</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Product matches what customer purchased</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">High</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">IP / Device Information</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Transaction matches customer&apos;s known location/device</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Medium</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Step by Step Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Step by Step: How to Respond</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Review the Claim</h3>
              <p className="text-gray-700">Read the chargeback reason code carefully. This tells you exactly what the customer claims and guides which evidence to prioritize.</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Gather Critical Evidence</h3>
              <p className="text-gray-700">Collect delivery proof, customer communication, and transaction records. Prioritize evidence that directly addresses the reason code.</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Organize and Annotate</h3>
              <p className="text-gray-700">Create a clear narrative. Label each document with dates and explanations. Show the bank timeline of the transaction, delivery, and any customer interactions.</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">4. Submit via Stripe</h3>
              <p className="text-gray-700">Upload all evidence to your Stripe dispute dashboard before the deadline. Use clear file names and ensure all documents are legible and complete.</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">5. Wait for Resolution</h3>
              <p className="text-gray-700">The bank will review your evidence and make a decision. This typically takes 2-4 weeks after submission. Stripe will notify you of the outcome.</p>
            </div>
          </div>
        </section>

        {/* Common Mistakes Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Common Mistakes to Avoid</h2>
          <div className="space-y-4">
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Submitting Generic Evidence</h3>
              <p className="text-gray-700">Banks want proof directly addressing the reason code. Sending everything without context weakens your case.</p>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Missing Delivery Proof</h3>
              <p className="text-gray-700">For &quot;Product Not Received&quot; claims, tracking with signature confirmation is critical. Without it, the dispute is difficult to win.</p>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Ignoring the Deadline</h3>
              <p className="text-gray-700">Missing your response deadline results in an automatic loss. Check your Stripe dashboard immediately upon receiving a dispute.</p>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Submitting Unclear Documents</h3>
              <p className="text-gray-700">Make sure all screenshots and scans are legible, complete, and properly oriented.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
      <section className="section bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details key="What evidence does Stripe require for chargebacks?" className="group bg-slate-50 rounded-lg border border-slate-200">
              <summary className="flex items-start justify-between gap-4 px-5 py-4 cursor-pointer list-none font-semibold text-slate-900 text-sm">
                <span>What evidence does Stripe require for chargebacks?</span>
                <span className="shrink-0 text-slate-400 mt-0.5 group-open:rotate-180 transition-transform text-base leading-none">&darr;</span>
              </summary>
              <div className="px-5 pb-4 pt-2 text-sm text-slate-600 leading-relaxed border-t border-slate-200">
                Stripe requires evidence such as transaction records, delivery proof, customer communication logs, terms of service/refund policy, product description records, IP/device information, and any other documentation proving the legitimacy of the transaction.
              </div>
            </details>
            <details key="How long do I have to respond to a Stripe chargeback?" className="group bg-slate-50 rounded-lg border border-slate-200">
              <summary className="flex items-start justify-between gap-4 px-5 py-4 cursor-pointer list-none font-semibold text-slate-900 text-sm">
                <span>How long do I have to respond to a Stripe chargeback?</span>
                <span className="shrink-0 text-slate-400 mt-0.5 group-open:rotate-180 transition-transform text-base leading-none">&darr;</span>
              </summary>
              <div className="px-5 pb-4 pt-2 text-sm text-slate-600 leading-relaxed border-t border-slate-200">
                The response deadline depends on the card network. Visa typically allows 30 days, Mastercard 45 days, and American Express 20 days. Your Stripe dashboard will show the specific deadline for your dispute.
              </div>
            </details>
            <details key="Can I include screenshots as evidence in Stripe chargebacks?" className="group bg-slate-50 rounded-lg border border-slate-200">
              <summary className="flex items-start justify-between gap-4 px-5 py-4 cursor-pointer list-none font-semibold text-slate-900 text-sm">
                <span>Can I include screenshots as evidence in Stripe chargebacks?</span>
                <span className="shrink-0 text-slate-400 mt-0.5 group-open:rotate-180 transition-transform text-base leading-none">&darr;</span>
              </summary>
              <div className="px-5 pb-4 pt-2 text-sm text-slate-600 leading-relaxed border-t border-slate-200">
                Yes, screenshots of customer communication, delivery confirmations, and transaction records are accepted evidence. They should be clear, unedited, and directly relevant to the dispute.
              </div>
            </details>
          </div>
        </div>
      </section>

        {/* CTA Section */}
        <section className="bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Automate Your Evidence Collection</h2>
          <p className="text-gray-700 mb-6">ChargebackKit compiles your evidence into a submission-ready PDF. Respond faster and win more disputes.</p>
          <Link href="/pricing" className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors">
            Start Building Your Evidence Pack
          </Link>
        </section>

        {/* Internal Links Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Resources</h3>
          <ul className="space-y-2 text-blue-600">
            <li><Link href="/chargeback-evidence-checklist" className="hover:underline">Chargeback Evidence Checklist: Complete Guide by Dispute Type</Link></li>
            <li><Link href="/guides/chargeback-response-deadlines" className="hover:underline">Chargeback Response Deadlines: Complete Guide by Card Network</Link></li>
            <li><Link href="/how-it-works" className="hover:underline">How ChargebackKit Works</Link></li>
          </ul>
        </div>
      </div>
    </>
  );
}
