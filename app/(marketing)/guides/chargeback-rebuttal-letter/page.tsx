import type { Metadata } from 'next';
import Link from 'next/link';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chargebackkit.app';

export const metadata: Metadata = {
  title: 'Chargeback Rebuttal Letter: How to Write One That Wins | ChargebackKit',
  description:
    'Learn how to write a chargeback rebuttal letter that wins disputes. Includes structure, key components, tips by dispute type, and common mistakes to avoid.',
  alternates: {
    canonical: `${siteUrl}/guides/chargeback-rebuttal-letter`,
  },
  openGraph: {
    title: 'Chargeback Rebuttal Letter: How to Write One That Wins | ChargebackKit',
    description:
      'Learn how to write a chargeback rebuttal letter that wins disputes. Structure, components, and tips by dispute type.',
    url: `${siteUrl}/guides/chargeback-rebuttal-letter`,
    type: 'article',
  },
};

export default function ChargebackRebuttalLetterPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is a chargeback rebuttal letter?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A chargeback rebuttal letter is a formal document submitted by a merchant to the acquiring bank that summarizes the case against a chargeback and references all supporting evidence. It serves as the cover letter for your representment package.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long should a chargeback rebuttal letter be?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A chargeback rebuttal letter should be one page whenever possible. For complex cases requiring more supporting evidence, it may extend to two pages, but conciseness is critical. Banks review hundreds of disputes and favor clear, well-organized letters.',
        },
      },
      {
        '@type': 'Question',
        name: 'What should I include in a chargeback rebuttal letter?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Include the chargeback reason code, transaction details (amount, date, order ID), acquirer reference number, a point-by-point refutation of the claim, references to attached evidence exhibits, and a professional closing statement.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I use a template for my chargeback rebuttal letter?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Templates provide a starting structure, but every rebuttal letter should be customized for the specific dispute. Generic letters that do not address the exact reason code and transaction details are significantly less effective.',
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
          <span className="text-slate-600">Rebuttal Letter Guide</span>
        </nav>

        <h1 className="text-4xl font-bold mb-6 text-gray-900">
          Chargeback Rebuttal Letter: How to Write One That Wins
        </h1>

        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          A chargeback rebuttal letter is a formal document you submit to your acquiring bank that
          summarizes why a disputed transaction was legitimate. It serves as the cover letter for
          your representment package &mdash; the single document that frames all your evidence and
          tells the reviewer exactly why the chargeback should be reversed.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Why Your Rebuttal Letter Matters</h2>
          <p className="text-gray-700 mb-4">
            Banks process hundreds of chargeback disputes. Your rebuttal letter is the first thing
            the reviewer reads. A disorganized or generic letter signals a weak case, even if your
            evidence is strong. A clear, structured letter that directly addresses the reason code
            increases your odds of reversal significantly.
          </p>
          <p className="text-gray-700">
            The rebuttal letter is not a place to express frustration. It is a professional summary
            that references specific exhibits and makes it easy for the reviewer to rule in your
            favor.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Essential Components of a Winning Rebuttal Letter</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-brand-800 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Header and Identifiers</h3>
              <p className="text-gray-700">Include your business name, merchant ID (MID), the acquirer reference number (ARN), chargeback case number, and dispute ID. These identifiers ensure your response is matched to the correct case.</p>
            </div>
            <div className="border-l-4 border-brand-800 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Transaction Summary</h3>
              <p className="text-gray-700">State the customer name, transaction date, amount, order ID, and a brief description of what was purchased. Keep this factual and concise.</p>
            </div>
            <div className="border-l-4 border-brand-800 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Reason Code Reference</h3>
              <p className="text-gray-700">Explicitly state the chargeback reason code and what the cardholder is claiming. This shows the reviewer you understand the specific dispute and are responding to the actual claim, not a generic scenario.</p>
            </div>
            <div className="border-l-4 border-brand-800 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">4. Point-by-Point Refutation</h3>
              <p className="text-gray-700">Address each element of the cardholder&apos;s claim with specific evidence references. For example: &quot;The cardholder claims the product was not received. Exhibit A shows USPS tracking confirming delivery on [date] with signature confirmation.&quot;</p>
            </div>
            <div className="border-l-4 border-brand-800 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">5. Evidence Exhibit List</h3>
              <p className="text-gray-700">List every exhibit attached to your response with a brief description of what each proves. Label them clearly (Exhibit A, B, C) so the reviewer can cross-reference your narrative with the documentation.</p>
            </div>
            <div className="border-l-4 border-brand-800 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">6. Professional Closing</h3>
              <p className="text-gray-700">End with a clear statement requesting reversal of the chargeback, your name, title, and business contact information. Sign the letter if submitting physically.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Rebuttal Letter Tips by Dispute Type</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Dispute Type</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Key Points to Address</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Strongest Evidence</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">Fraudulent / Unauthorized</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Customer authorized the transaction; device/IP matches prior purchases</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">AVS/CVV match, device fingerprint, login history</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">Product Not Received</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Product was delivered to the correct address</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Tracking with delivery confirmation, signature proof</td>
                </tr>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">Subscription Cancelled</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Customer agreed to recurring terms; no valid cancellation request received</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Signup flow screenshot, renewal emails, usage after charge</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">Product Not as Described</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Product matches the listing shown at time of purchase</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Product listing screenshots, shipping photos, no return request</td>
                </tr>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">Duplicate Charge</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Each charge corresponds to a separate order or service</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Separate order IDs, distinct delivery records, itemized receipts</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">Credit Not Processed</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Refund was issued, or customer was not entitled to a refund</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Refund confirmation, refund policy, terms accepted at checkout</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Common Rebuttal Letter Mistakes</h2>
          <div className="space-y-4">
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Writing an Emotional Response</h3>
              <p className="text-gray-700">The reviewer is a bank employee processing disputes. Emotional language, accusations against the customer, or complaints about the chargeback process work against you. Stick to facts and evidence references.</p>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Not Addressing the Specific Reason Code</h3>
              <p className="text-gray-700">A generic letter that does not reference the reason code tells the reviewer you did not read the dispute. Tailor every letter to the specific claim being made.</p>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Failing to Reference Evidence</h3>
              <p className="text-gray-700">Your letter should point the reviewer to specific exhibits. Saying &quot;see attached&quot; without labeling exhibits forces the reviewer to hunt for relevant documents.</p>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Exceeding Two Pages</h3>
              <p className="text-gray-700">Longer is not better. If your letter exceeds two pages, the reviewer may skim or skip sections. Be concise and let the evidence speak for itself.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What is a chargeback rebuttal letter?</h3>
              <p className="text-gray-700">A chargeback rebuttal letter is a formal document submitted by a merchant to the acquiring bank that summarizes the case against a chargeback and references all supporting evidence. It serves as the cover letter for your representment package.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long should a chargeback rebuttal letter be?</h3>
              <p className="text-gray-700">A chargeback rebuttal letter should be one page whenever possible. For complex cases requiring more supporting evidence, it may extend to two pages, but conciseness is critical. Banks review hundreds of disputes and favor clear, well-organized letters.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What should I include in a chargeback rebuttal letter?</h3>
              <p className="text-gray-700">Include the chargeback reason code, transaction details (amount, date, order ID), acquirer reference number, a point-by-point refutation of the claim, references to attached evidence exhibits, and a professional closing statement.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I use a template for my chargeback rebuttal letter?</h3>
              <p className="text-gray-700">Templates provide a starting structure, but every rebuttal letter should be customized for the specific dispute. Generic letters that do not address the exact reason code and transaction details are significantly less effective.</p>
            </div>
          </div>
        </section>

        <section className="bg-brand-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Skip the Blank Page</h2>
          <p className="text-gray-700 mb-6">ChargebackKit generates a complete rebuttal narrative, labeled exhibits, and a cover page structured for your specific dispute type. No templates needed.</p>
          <a href="https://buy.stripe.com/eVq8wQ83Pg1M95B3hD3Nm00" className="inline-block bg-emerald-500 text-white font-semibold py-3 px-8 rounded-lg hover:bg-emerald-600 transition-colors">
            Build My Evidence Pack &mdash; $39
          </a>
        </section>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Resources</h3>
          <ul className="space-y-2 text-brand-700">
            <li><Link href="/stripe-chargeback-evidence" className="hover:underline">Stripe Chargeback Evidence: What to Submit &amp; How</Link></li>
            <li><Link href="/chargeback-evidence-checklist" className="hover:underline">Chargeback Evidence Checklist: Complete Guide by Dispute Type</Link></li>
            <li><Link href="/guides/chargeback-response-deadlines" className="hover:underline">Chargeback Response Deadlines: Complete Guide by Card Network</Link></li>
          </ul>
        </div>
      </div>
    </>
  );
}
