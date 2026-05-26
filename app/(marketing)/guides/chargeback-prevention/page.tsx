—import type { Metadata } from 'next';
import Link from 'next/link';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chargebackkit.app';

export const metadata: Metadata = {
  title: 'Chargeback Prevention: 12 Proven Strategies for Merchants | ChargebackKit',
  description:
    'Reduce chargebacks with proven prevention strategies. Learn fraud screening, clear billing descriptors, proactive customer service, and tools that stop disputes before they start.',
  alternates: {
    canonical: `${siteUrl}/guides/chargeback-prevention`,
  },
  openGraph: {
    title: 'Chargeback Prevention: 12 Proven Strategies for Merchants | ChargebackKit',
    description:
      'Reduce chargebacks with proven prevention strategies. Fraud screening, billing descriptors, and tools that stop disputes before they start.',
    url: `${siteUrl}/guides/chargeback-prevention`,
    type: 'article',
  },
};

export default function ChargebackPreventionPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the most effective way to prevent chargebacks?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The most effective chargeback prevention combines multiple layers: clear billing descriptors so customers recognize charges, proactive communication including shipping notifications and delivery confirmations, responsive customer service with easy refund policies, and fraud screening tools like AVS, CVV verification, and 3D Secure authentication.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is chargeback prevention?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Chargeback prevention refers to the strategies, tools, and processes merchants use to reduce the number of payment disputes filed by cardholders. It includes fraud detection, clear billing practices, responsive customer service, and use of network tools like Visa Compelling Evidence 3.0 and chargeback alert services.',
        },
      },
      {
        '@type': 'Question',
        name: 'What chargeback ratio is considered too high?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Visa flags merchants who exceed a 0.9% chargeback ratio (disputes to transactions) or 100 disputes per month for their Visa Dispute Monitoring Program (VDMP). Mastercard has similar thresholds through its Excessive Chargeback Merchant program. Exceeding these thresholds can lead to fines, increased processing fees, or account termination.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can chargebacks be prevented entirely?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No business can prevent 100% of chargebacks. Some disputes involve genuine fraud or legitimate customer complaints. However, merchants can reduce chargeback rates by 50-80% through proper prevention strategies, keeping their ratio well below card network thresholds.',
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
            <span className="text-slate-600">Chargeback Prevention</span>
          </nav>
          <h1 className="text-4xl font-bold mb-6 text-gray-900">
          Chargeback Prevention: 12 Proven Strategies for Merchants
        </h1>

        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          Chargebacks cost merchants far more than the disputed transaction amount. Between lost
          revenue, merchandise, shipping costs, and chargeback fees ($20&ndash;$100 per dispute),
          every chargeback can cost 2&ndash;3x the original transaction value. Prevention is
          significantly more cost-effective than fighting disputes after the fact.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Why Chargeback Prevention Matters</h2>
          <p className="text-gray-700 mb-4">
            Card networks monitor every merchant&apos;s chargeback ratio. Visa&apos;s Dispute
            Monitoring Program (VDMP) flags merchants who exceed a 0.9% ratio or 100 disputes per
            month. Mastercard&apos;s Excessive Chargeback Merchant (ECM) program has similar
            thresholds. Exceeding these limits triggers escalating consequences: increased processing
            fees, mandatory remediation plans, fines up to $25,000 per month, and ultimately account
            termination.
          </p>
          <p className="text-gray-700">
            Even if your chargeback rate is low, every dispute you prevent saves you the transaction
            amount, the chargeback fee, staff time spent on representment, and the risk of losing
            your processing account entirely.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">12 Proven Prevention Strategies</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-brand-800 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Use Clear Billing Descriptors</h3>
              <p className="text-gray-700">The most common reason customers file chargebacks is not recognizing a charge on their statement. Set your billing descriptor to your business name or website URL &mdash; not a parent company name, abbreviation, or payment processor name that customers will not recognize.</p>
            </div>
            <div className="border-l-4 border-brand-800 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Require AVS and CVV Verification</h3>
              <p className="text-gray-700">Address Verification Service (AVS) and Card Verification Value (CVV) checks confirm the buyer has physical possession of the card. Decline transactions where AVS returns a mismatch on both street address and ZIP code. Always require CVV for card-not-present transactions.</p>
            </div>
            <div className="border-l-4 border-brand-800 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Implement 3D Secure Authentication</h3>
              <p className="text-gray-700">3D Secure (Verified by Visa, Mastercard SecureCode) adds an authentication step where the cardholder verifies their identity with the issuing bank. This shifts fraud liability from the merchant to the issuer and provides strong evidence the cardholder authorized the transaction.</p>
            </div>
            <div className="border-l-4 border-brand-800 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">4. Send Order Confirmation Emails Immediately</h3>
              <p className="text-gray-700">Send a detailed order confirmation within minutes of purchase that includes the order total, itemized list, billing descriptor name, expected delivery date, and customer service contact information. This gives customers a reference point before they see the charge on their statement.</p>
            </div>
            <div className="border-l-4 border-brand-800 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">5. Provide Tracking and Delivery Confirmation</h3>
              <p className="text-gray-700">Ship with tracking and require delivery confirmation (signature for high-value items). Send the tracking number to the customer proactively. Delivery proof is the strongest evidence against &quot;product not received&quot; disputes, which account for a significant portion of all chargebacks.</p>
            </div>
            <div className="border-l-4 border-brand-800 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">6. Make Your Refund Policy Visible and Simple</h3>
              <p className="text-gray-700">Display your refund policy prominently at checkout and require customers to acknowledge it before completing their purchase. A customer who can easily get a refund is far less likely to file a chargeback. Make the refund process simpler than filing a dispute with their bank.</p>
            </div>
            <div className="border-l-4 border-brand-800 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">7. Offer Responsive Customer Service</h3>
              <p className="text-gray-700">Many chargebacks happen because customers cannot reach the merchant. Provide multiple contact channels (email, chat, phone) and respond within 24 hours. A customer who gets a fast, helpful response is unlikely to escalate to a bank dispute.</p>
            </div>
            <div className="border-l-4 border-brand-800 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">8. Use Fraud Screening Tools</h3>
              <p className="text-gray-700">Deploy fraud detection that analyzes device fingerprinting, IP geolocation, velocity checks (multiple orders from the same card in a short period), and behavioral patterns. Flag suspicious orders for manual review rather than auto-approving everything.</p>
            </div>
            <div className="border-l-4 border-brand-800 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">9. Be Transparent About Subscription Billing</h3>
              <p className="text-gray-700">For recurring charges, send reminder emails before each billing cycle. Clearly state the billing amount, next charge date, and how to cancel. Subscription chargebacks are among the most common &mdash; proactive communication prevents most of them.</p>
            </div>
            <div className="border-l-4 border-brand-800 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">10. Use Chargeback Alert Services</h3>
              <p className="text-gray-700">Services like Ethoca and Verifi CDRN notify you when a customer initiates a dispute, giving you a window to issue a refund before it becomes a formal chargeback. This keeps the dispute off your chargeback ratio while resolving the customer&apos;s concern.</p>
            </div>
            <div className="border-l-4 border-brand-800 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">11. Match Product Descriptions to Reality</h3>
              <p className="text-gray-700">Ensure product photos, descriptions, and specifications accurately represent what the customer will receive. &quot;Not as described&quot; chargebacks often result from misleading or exaggerated product listings. Include measurements, materials, and multiple photos from different angles.</p>
            </div>
            <div className="border-l-4 border-brand-800 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">12. Document Everything</h3>
              <p className="text-gray-700">Keep records of all customer interactions, delivery confirmations, signed terms of service, IP addresses, device data, and refund policy acknowledgments. If a chargeback does occur, thorough documentation is the foundation of a successful representment.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Prevention by Chargeback Type</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Chargeback Type</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Root Cause</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Prevention Strategy</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">True Fraud</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Stolen card used without cardholder knowledge</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">3D Secure, AVS/CVV, fraud screening, velocity checks</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">Friendly Fraud</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Customer disputes a legitimate purchase</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Clear descriptors, order confirmations, delivery proof, usage logs</td>
                </tr>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">Merchant Error</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Wrong item shipped, duplicate charge, processing mistake</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Quality control, order verification, duplicate payment detection</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">Unrecognized Charge</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Customer does not recognize the billing descriptor</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Clear billing descriptor, order confirmation with descriptor name</td>
                </tr>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">Subscription Dispute</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Customer forgot about or could not cancel recurring billing</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Pre-billing reminders, easy cancellation, transparent signup</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Chargeback Monitoring Thresholds</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Card Network</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Program Name</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Ratio Threshold</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Dispute Count Threshold</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">Visa</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">VDMP (Standard)</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">0.9%</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">100 per month</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">Visa</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">VDMP (Excessive)</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">1.8%</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">1,000 per month</td>
                </tr>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">Mastercard</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">ECM (Standard)</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">1.0%</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">100 per month</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900">Mastercard</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">ECM (Excessive)</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">1.5%</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">300 per month</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the most effective way to prevent chargebacks?</h3>
              <p className="text-gray-700">The most effective chargeback prevention combines multiple layers: clear billing descriptors so customers recognize charges, proactive communication including shipping notifications and delivery confirmations, responsive customer service with easy refund policies, and fraud screening tools like AVS, CVV verification, and 3D Secure authentication.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What is chargeback prevention?</h3>
              <p className="text-gray-700">Chargeback prevention refers to the strategies, tools, and processes merchants use to reduce the number of payment disputes filed by cardholders. It includes fraud detection, clear billing practices, responsive customer service, and use of network tools like Visa Compelling Evidence 3.0 and chargeback alert services.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What chargeback ratio is considered too high?</h3>
              <p className="text-gray-700">Visa flags merchants who exceed a 0.9% chargeback ratio (disputes to transactions) or 100 disputes per month for their Visa Dispute Monitoring Program (VDMP). Mastercard has similar thresholds through its Excessive Chargeback Merchant program. Exceeding these thresholds can lead to fines, increased processing fees, or account termination.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can chargebacks be prevented entirely?</h3>
              <p className="text-gray-700">No business can prevent 100% of chargebacks. Some disputes involve genuine fraud or legitimate customer complaints. However, merchants can reduce chargeback rates by 50&ndash;80% through proper prevention strategies, keeping their ratio well below card network thresholds.</p>
            </div>
          </div>
        </section>

        <section className="bg-brand-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">When Prevention Fails, Win the Dispute</h2>
          <p className="text-gray-700 mb-6">Even with the best prevention, some chargebacks are unavoidable. ChargebackKit builds a complete evidence package tailored to your specific dispute type, so you can fight back and recover revenue.</p>
          <a href="https://buy.stripe.com/eVq8wQ83Pg1M95B3hD3Nm00" className="inline-block bg-emerald-500 text-white font-semibold py-3 px-8 rounded-lg hover:bg-emerald-600 transition-colors">
            Build My Evidence Pack &mdash; $39
          </a>
        </section>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Resources</h3>
          <ul className="space-y-2 text-brand-700">
            <li><Link href="/guides/how-to-win-a-chargeback" className="hover:underline">How to Win a Chargeback as a Merchant</Link></li>
            <li><Link href="/guides/chargeback-rebuttal-letter" className="hover:underline">Chargeback Rebuttal Letter: How to Write One That Wins</Link></li>
            <li><Link href="/chargeback-evidence-checklist" className="hover:underline">Chargeback Evidence Checklist: Complete Guide by Dispute Type</Link></li>
            <li><Link href="/guides/chargeback-response-deadlines" className="hover:underline">Chargeback Response Deadlines: Complete Guide by Card Network</Link></li>
          </ul>
        </div>
      </div>
    </>
  );
}
