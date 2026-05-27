import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'PayPal Dispute Response Guide — How to Win PayPal Chargebacks',
  description: 'Step-by-step guide to responding to PayPal disputes and chargebacks. Learn deadlines, evidence requirements, and strategies to win PayPal seller protection claims.',
  alternates: {
    canonical: 'https://chargebackkit.app/guides/paypal-dispute-response',
  },
  openGraph: {
    title: 'PayPal Dispute Response Guide — How to Win PayPal Chargebacks',
    description: 'Step-by-step guide to responding to PayPal disputes and chargebacks. Learn deadlines, evidence requirements, and strategies to win PayPal seller protection claims.',
    url: 'https://chargebackkit.app/guides/paypal-dispute-response',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long do I have to respond to a PayPal dispute?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You have 10 days to respond to a PayPal dispute before it automatically escalates to a claim. Once escalated to a claim, you have 10 additional days to provide evidence. Missing these deadlines means PayPal will decide in the buyer\'s favor.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is PayPal Seller Protection?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PayPal Seller Protection covers eligible transactions against unauthorized payment claims and item-not-received disputes. To qualify, you must ship to the confirmed address, use trackable shipping for items over $750, and respond to disputes within PayPal\'s deadlines.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between a PayPal dispute and a claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A dispute is the initial stage where the buyer contacts you through PayPal\'s Resolution Center. A claim occurs when the dispute escalates and PayPal steps in to make a decision. You can resolve disputes directly with buyers, but claims require formal evidence submission.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I appeal a PayPal chargeback decision?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, you can appeal a PayPal claim decision within 10 days if you have new evidence. For bank-initiated chargebacks processed through PayPal, you can submit evidence through PayPal\'s Resolution Center, and PayPal will forward it to the card issuer.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does a PayPal chargeback cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PayPal charges a $20 chargeback fee per dispute (varies by currency and region). This fee is charged regardless of the outcome. If you qualify for Seller Protection, PayPal may waive the fee and cover the full transaction amount.',
      },
    },
  ],
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Respond to a PayPal Dispute',
  description: 'Step-by-step process for responding to PayPal disputes and chargebacks to maximize your win rate.',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Review the Dispute in Resolution Center',
      text: 'Log into PayPal and navigate to the Resolution Center. Review the dispute details including the reason code, transaction details, and buyer\'s complaint. Determine if this is a dispute, claim, or bank-initiated chargeback.',
    },
    {
      '@type': 'HowToStep',
      name: 'Gather Your Evidence',
      text: 'Collect all relevant documentation: shipping tracking with delivery confirmation, order details, customer communications, product descriptions, and any proof of service delivery. Organize evidence clearly.',
    },
    {
      '@type': 'HowToStep',
      name: 'Submit Your Response',
      text: 'In the Resolution Center, select the dispute and click Respond. Upload your evidence package including tracking information, screenshots, and correspondence. Provide a clear written explanation addressing the buyer\'s specific complaint.',
    },
    {
      '@type': 'HowToStep',
      name: 'Monitor and Follow Up',
      text: 'Track the dispute status in your Resolution Center. Respond promptly to any requests for additional information from PayPal. If the decision is unfavorable, consider filing an appeal within the 10-day window with new evidence.',
    },
  ],
}

export default function PayPalDisputeResponsePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <nav className="text-sm text-gray-500 mb-8">
        <Link href="/guides" className="hover:underline">Guides</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">PayPal Dispute Response</span>
      </nav>

      <h1 className="text-4xl font-bold text-gray-900 mb-6">PayPal Dispute Response Guide: How to Win PayPal Chargebacks</h1>
      <p className="text-xl text-gray-700 mb-10">PayPal processes over $1.5 trillion in payment volume annually. If you sell through PayPal, disputes are inevitable. This guide covers everything you need to know about responding to PayPal disputes, qualifying for Seller Protection, and building winning evidence packages.</p>
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding PayPal Dispute Types</h2>
        <p className="text-gray-700 mb-4">PayPal has three distinct dispute mechanisms, each with different processes and timelines. Understanding which type you are facing is the first step to building an effective response.</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 mb-6">
            <thead>
              <tr className="bg-brand-50">
                <th className="border border-gray-300 px-4 py-3 text-left text-brand-800 font-semibold">Type</th>
                <th className="border border-gray-300 px-4 py-3 text-left text-brand-800 font-semibold">Initiated By</th>
                <th className="border border-gray-300 px-4 py-3 text-left text-brand-800 font-semibold">Response Time</th>
                <th className="border border-gray-300 px-4 py-3 text-left text-brand-800 font-semibold">Fee</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-medium">Dispute</td>
                <td className="border border-gray-300 px-4 py-3">Buyer via Resolution Center</td>
                <td className="border border-gray-300 px-4 py-3">10 days before auto-escalation</td>
                <td className="border border-gray-300 px-4 py-3">No fee</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-3 font-medium">Claim</td>
                <td className="border border-gray-300 px-4 py-3">Buyer escalates or PayPal</td>
                <td className="border border-gray-300 px-4 py-3">10 days to submit evidence</td>
                <td className="border border-gray-300 px-4 py-3">No fee</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-medium">Chargeback</td>
                <td className="border border-gray-300 px-4 py-3">Buyer via card issuer</td>
                <td className="border border-gray-300 px-4 py-3">10 days to submit evidence</td>
                <td className="border border-gray-300 px-4 py-3">$20 fee</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">PayPal Seller Protection: Your First Line of Defense</h2>
        <p className="text-gray-700 mb-4">PayPal Seller Protection can cover you for unauthorized transaction claims and item-not-received disputes, but only if you meet specific requirements.</p>
        <div className="space-y-4">
          <div className="border-l-4 border-emerald-500 pl-6 py-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Eligibility Requirements</h3>
            <p className="text-gray-700">Ship to the address on the Transaction Details page. Use trackable shipping for all orders and require signature confirmation for items over $750. The item must be a physical, tangible good (digital goods have limited protection). Process the payment through PayPal and respond to documentation requests within the specified timeframe.</p>
          </div>
          <div className="border-l-4 border-brand-800 pl-6 py-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">What Seller Protection Covers</h3>
            <p className="text-gray-700">When eligible, PayPal will cover the full purchase amount plus the original shipping cost and waive the chargeback fee. This applies to unauthorized transaction claims and item-not-received disputes. Significantly-not-as-described claims are NOT covered by Seller Protection.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Evidence to Submit for PayPal Disputes</h2>
        <p className="text-gray-700 mb-6">The evidence you need depends on the dispute reason. Here is what to gather for each common scenario.</p>
        <div className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-6 py-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Item Not Received</h3>
            <p className="text-gray-700">Shipping tracking number with carrier name and delivery confirmation. Proof of delivery to the address on the Transaction Details page. Signature confirmation for items over $750. Correspondence with the buyer about delivery.</p>
          </div>
          <div className="border-l-4 border-emerald-500 pl-6 py-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Significantly Not as Described</h3>
            <p className="text-gray-700">Original product listing with full description and photos. Evidence the item matches the listing (photos, specifications). Customer communication showing the item was delivered as described. Return shipping label if you offered a return and the buyer refused.</p>
          </div>
          <div className="border-l-4 border-emerald-500 pl-6 py-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Unauthorized Transaction</h3>
            <p className="text-gray-700">Proof of delivery with tracking. Evidence linking the buyer to the transaction (IP address, shipping to known address, prior purchases). AVS and CVV match data. Records of any prior successful transactions with the same buyer.</p>
          </div>
        </div>
      </section>
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Step-by-Step: Responding to a PayPal Dispute</h2>
        <div className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-6 py-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Step 1: Review the Dispute Details</h3>
            <p className="text-gray-700">Log into PayPal and go to the Resolution Center. Click on the dispute to see the full details — the reason code, the buyer's complaint, and the transaction information. Identify whether this is a dispute (direct communication phase), a claim (PayPal is deciding), or a bank chargeback (card issuer is involved).</p>
          </div>
          <div className="border-l-4 border-emerald-500 pl-6 py-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Step 2: Try to Resolve During Dispute Phase</h3>
            <p className="text-gray-700">During the initial dispute phase, you can communicate directly with the buyer. This is your best opportunity for resolution — offer a partial refund, send a replacement, or provide additional information. If you resolve the dispute here, you avoid escalation, fees, and potential account impact.</p>
          </div>
          <div className="border-l-4 border-emerald-500 pl-6 py-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Step 3: Build Your Evidence Package</h3>
            <p className="text-gray-700">If the dispute escalates to a claim, gather all evidence systematically. Include shipping tracking with delivery confirmation, product descriptions matching what was sent, customer communications, refund or return policy, and any proof the buyer received value. Take screenshots of everything.</p>
          </div>
          <div className="border-l-4 border-emerald-500 pl-6 py-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Step 4: Submit Evidence in Resolution Center</h3>
            <p className="text-gray-700">Navigate to the claim in your Resolution Center, click Respond, and upload your evidence. Write a clear, factual narrative addressing the buyer's specific complaint point by point. Avoid emotional language. Let the evidence speak for itself. Submit before the 10-day deadline.</p>
          </div>
        </div>
      </section>

        <section className="section bg-white px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="group bg-slate-50 rounded-lg border border-slate-200">
                <summary className="flex items-start justify-between gap-4 px-5 py-4 cursor-pointer list-none font-semibold text-slate-900 text-sm">
                  <span>How long do I have to respond to a PayPal dispute?</span>
                  <span className="shrink-0 text-slate-400 mt-0.5 group-open:rotate-180 transition-transform text-base leading-none">&darr;</span>
                </summary>
                <div className="px-5 pb-4 pt-2 text-sm text-slate-600 leading-relaxed border-t border-slate-200">
                  You have 10 days to respond to a PayPal dispute before it automatically escalates to a claim. Once escalated to a claim, you have 10 additional days to provide evidence. Missing these deadlines means PayPal will decide in the buyer's favor.
                </div>
              </details>
              <details className="group bg-slate-50 rounded-lg border border-slate-200">
                <summary className="flex items-start justify-between gap-4 px-5 py-4 cursor-pointer list-none font-semibold text-slate-900 text-sm">
                  <span>What is PayPal Seller Protection?</span>
                  <span className="shrink-0 text-slate-400 mt-0.5 group-open:rotate-180 transition-transform text-base leading-none">&darr;</span>
                </summary>
                <div className="px-5 pb-4 pt-2 text-sm text-slate-600 leading-relaxed border-t border-slate-200">
                  PayPal Seller Protection covers eligible transactions against unauthorized payment claims and item-not-received disputes. To qualify, you must ship to the confirmed address, use trackable shipping for items over $750, and respond to disputes within PayPal's deadlines.
                </div>
              </details>
              <details className="group bg-slate-50 rounded-lg border border-slate-200">
                <summary className="flex items-start justify-between gap-4 px-5 py-4 cursor-pointer list-none font-semibold text-slate-900 text-sm">
                  <span>What is the difference between a PayPal dispute and a claim?</span>
                  <span className="shrink-0 text-slate-400 mt-0.5 group-open:rotate-180 transition-transform text-base leading-none">&darr;</span>
                </summary>
                <div className="px-5 pb-4 pt-2 text-sm text-slate-600 leading-relaxed border-t border-slate-200">
                  A dispute is the initial stage where the buyer contacts you through PayPal's Resolution Center. A claim occurs when the dispute escalates and PayPal steps in to make a decision. You can resolve disputes directly with buyers, but claims require formal evidence submission.
                </div>
              </details>
              <details className="group bg-slate-50 rounded-lg border border-slate-200">
                <summary className="flex items-start justify-between gap-4 px-5 py-4 cursor-pointer list-none font-semibold text-slate-900 text-sm">
                  <span>Can I appeal a PayPal chargeback decision?</span>
                  <span className="shrink-0 text-slate-400 mt-0.5 group-open:rotate-180 transition-transform text-base leading-none">&darr;</span>
                </summary>
                <div className="px-5 pb-4 pt-2 text-sm text-slate-600 leading-relaxed border-t border-slate-200">
                  Yes, you can appeal a PayPal claim decision within 10 days if you have new evidence. For bank-initiated chargebacks processed through PayPal, you can submit evidence through PayPal's Resolution Center, and PayPal will forward it to the card issuer.
                </div>
              </details>
              <details className="group bg-slate-50 rounded-lg border border-slate-200">
                <summary className="flex items-start justify-between gap-4 px-5 py-4 cursor-pointer list-none font-semibold text-slate-900 text-sm">
                  <span>How much does a PayPal chargeback cost?</span>
                  <span className="shrink-0 text-slate-400 mt-0.5 group-open:rotate-180 transition-transform text-base leading-none">&darr;</span>
                </summary>
                <div className="px-5 pb-4 pt-2 text-sm text-slate-600 leading-relaxed border-t border-slate-200">
                  PayPal charges a $20 chargeback fee per dispute (varies by currency and region). This fee is charged regardless of the outcome. If you qualify for Seller Protection, PayPal may waive the fee and cover the full transaction amount.
                </div>
              </details>
            </div>
          </div>
        </section>

      <section className="bg-brand-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Build Your PayPal Dispute Evidence Pack</h2>
        <p className="text-gray-700 mb-6">ChargebackKit generates a complete, organized evidence package for your PayPal dispute. Rebuttal letters, evidence summaries, and everything you need to win — ready in minutes.</p>
        <a href="https://buy.stripe.com/5kQaEY83P3f02Hdf0l3Nm02" className="inline-block bg-emerald-500 text-white font-semibold py-3 px-8 rounded-lg hover:bg-emerald-600 transition-colors">Get Your Evidence Pack — $39</a>
      </section>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Resources</h3>
        <ul className="space-y-2 text-brand-700">
          <li><Link href="/stripe-chargeback-evidence" className="hover:underline">Stripe Chargeback Evidence Guide</Link></li>
          <li><Link href="/guides/shopify-chargeback-response" className="hover:underline">Shopify Chargeback Response Guide</Link></li>
          <li><Link href="/guides/visa-reason-code-13-1" className="hover:underline">Visa Reason Code 13.1: Merchandise Not Received</Link></li>
          <li><Link href="/guides/chargeback-response-deadlines" className="hover:underline">Chargeback Response Deadlines by Card Network</Link></li>
          <li><Link href="/guides/how-to-win-a-chargeback" className="hover:underline">How to Win a Chargeback as a Merchant</Link></li>
          <li><Link href="/chargeback-evidence-checklist" className="hover:underline">Chargeback Evidence Checklist by Dispute Type</Link></li>
        </ul>
      </div>
    </div>
  )
}
