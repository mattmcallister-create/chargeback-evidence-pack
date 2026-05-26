import type { Metadata } from 'next';
import Link from 'next/link';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chargebackkit.app';

export const metadata: Metadata = {
  title: 'Shopify Chargeback Response: Complete Guide to Winning Disputes | ChargebackKit',
  description: 'Step-by-step guide to responding to Shopify chargebacks. Learn evidence requirements, response deadlines, fees, and how to win disputes on Shopify Payments.',
  alternates: { canonical: `${siteUrl}/guides/shopify-chargeback-response` },
  openGraph: {
    title: 'Shopify Chargeback Response Guide | ChargebackKit',
    description: 'Everything Shopify merchants need to fight and win chargebacks on Shopify Payments.',
    url: `${siteUrl}/guides/shopify-chargeback-response`,
    type: 'article',
  },
};

export default function ShopifyChargebackResponsePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'How do I respond to a chargeback on Shopify?', acceptedAnswer: { '@type': 'Answer', text: 'To respond to a Shopify chargeback, go to Orders in your Shopify admin, find the disputed order (marked with a chargeback alert), review the reason code, gather relevant evidence (delivery proof, customer communication, order details), and submit your response through the dispute management section before the deadline. Shopify provides a structured form to upload evidence.' } },
      { '@type': 'Question', name: 'How much does a Shopify chargeback cost?', acceptedAnswer: { '@type': 'Answer', text: 'Shopify charges a $15 chargeback fee (USD) for each dispute filed through Shopify Payments. This fee is in addition to the disputed transaction amount being held. If you win the dispute, the held funds are returned to you, but in most regions the $15 fee is not refunded.' } },
      { '@type': 'Question', name: 'How long do I have to respond to a Shopify chargeback?', acceptedAnswer: { '@type': 'Answer', text: 'The response deadline depends on the card network: Visa gives 30 days, Mastercard gives 45 days, and American Express gives 20 days. Shopify displays the exact deadline in your admin. You should respond as early as possible since Shopify needs processing time before forwarding to the card network.' } },
      { '@type': 'Question', name: 'Can I prevent chargebacks on Shopify?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Key prevention strategies for Shopify stores include using clear billing descriptors, enabling Shopify Protect or fraud analysis tools, requiring signature confirmation for high-value orders, sending proactive shipping notifications, making your refund policy prominent at checkout, and responding quickly to customer inquiries.' } },
      { '@type': 'Question', name: 'What is the Shopify chargeback win rate?', acceptedAnswer: { '@type': 'Answer', text: 'Industry-wide chargeback win rates average around 30-40% for merchants who respond with evidence. Shopify merchants who submit organized, comprehensive evidence packages with delivery proof, customer communication, and clear documentation tend to win at higher rates than those who submit minimal responses.' } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <nav className="mb-8 text-sm">
          <Link href="/guides" className="text-brand-700 hover:text-brand-800 font-medium">Guides</Link>
          <span className="mx-2 text-slate-400">/</span>
          <span className="text-slate-600">Shopify Chargeback Response</span>
        </nav>

        <h1 className="text-4xl font-bold mb-6 text-gray-900">Shopify Chargeback Response: Complete Guide to Winning Disputes</h1>

        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          Shopify chargebacks are a reality for every ecommerce merchant. When a customer disputes a charge through their bank, Shopify holds the transaction amount plus a $15 fee while you build your response. This guide walks you through exactly how to respond to Shopify Payments chargebacks, what evidence to submit, and how to maximize your win rate.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">How Shopify Chargebacks Work</h2>
          <p className="text-gray-700 mb-4">When a cardholder disputes a Shopify Payments transaction, the process follows these stages: the cardholder contacts their bank, the bank files a chargeback with the card network, Shopify is notified and holds the disputed funds plus the $15 fee, you receive an alert in your Shopify admin, you gather evidence and submit your response, the card network reviews and issues a decision.</p>
          <p className="text-gray-700">Shopify provides a built-in dispute management interface that guides you through submitting evidence. However, the quality and organization of your evidence determines whether you win or lose.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Response Deadlines by Card Network</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead><tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Card Network</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Response Deadline</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Decision Timeline</th>
              </tr></thead>
              <tbody>
                <tr className="bg-white hover:bg-gray-50"><td className="border border-gray-300 px-4 py-3 text-gray-900">Visa</td><td className="border border-gray-300 px-4 py-3 text-gray-700">30 days</td><td className="border border-gray-300 px-4 py-3 text-gray-700">60-75 days after submission</td></tr>
                <tr className="bg-gray-50 hover:bg-gray-100"><td className="border border-gray-300 px-4 py-3 text-gray-900">Mastercard</td><td className="border border-gray-300 px-4 py-3 text-gray-700">45 days</td><td className="border border-gray-300 px-4 py-3 text-gray-700">60-75 days after submission</td></tr>
                <tr className="bg-white hover:bg-gray-50"><td className="border border-gray-300 px-4 py-3 text-gray-900">American Express</td><td className="border border-gray-300 px-4 py-3 text-gray-700">20 days</td><td className="border border-gray-300 px-4 py-3 text-gray-700">60-75 days after submission</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">What Evidence to Submit</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-brand-800 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Delivery and Fulfillment Proof</h3>
              <p className="text-gray-700">Carrier tracking showing delivered status, delivery confirmation with signature (for high-value orders), screenshots of tracking page, and proof the delivery address matches the billing address.</p>
            </div>
            <div className="border-l-4 border-brand-800 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Order and Payment Details</h3>
              <p className="text-gray-700">Shopify order confirmation page, payment details showing AVS and CVV match, customer account information (if they created an account), IP address from checkout, and itemized order receipt.</p>
            </div>
            <div className="border-l-4 border-brand-800 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Communication</h3>
              <p className="text-gray-700">Email correspondence with the customer, shipping notification emails, any customer service chat logs, and refund policy acknowledgment at checkout. Messages where the customer confirmed receipt are especially valuable.</p>
            </div>
            <div className="border-l-4 border-brand-800 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Store Policies</h3>
              <p className="text-gray-700">Your refund and return policy as displayed at checkout, terms of service, cancellation policy (for subscriptions), and proof that the customer acknowledged these policies before completing their purchase.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Step-by-Step Response Process</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-emerald-500 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Review the Dispute in Shopify Admin</h3>
              <p className="text-gray-700">Go to Orders, find the flagged order, and review the reason code, disputed amount, and deadline. Understanding the specific reason helps you target your evidence.</p>
            </div>
            <div className="border-l-4 border-emerald-500 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Gather All Relevant Evidence</h3>
              <p className="text-gray-700">Collect delivery tracking, order details, customer emails, and policy screenshots. Format documents for readability since many banks review evidence via fax or low-resolution printouts.</p>
            </div>
            <div className="border-l-4 border-emerald-500 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Write a Clear Rebuttal</h3>
              <p className="text-gray-700">Draft a concise rebuttal that directly addresses the dispute reason, references each piece of evidence, and presents a clear timeline of the transaction from order to delivery.</p>
            </div>
            <div className="border-l-4 border-emerald-500 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">4. Submit Through Shopify</h3>
              <p className="text-gray-700">Upload everything through the dispute section in your Shopify admin. Submit well before the deadline to allow processing time. Once submitted, you cannot add additional evidence.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div><h3 className="text-lg font-semibold text-gray-900 mb-2">How do I respond to a chargeback on Shopify?</h3><p className="text-gray-700">Go to Orders in your Shopify admin, find the disputed order, review the reason code, gather evidence (delivery proof, customer communication, order details), and submit through the dispute management section before the deadline.</p></div>
            <div><h3 className="text-lg font-semibold text-gray-900 mb-2">How much does a Shopify chargeback cost?</h3><p className="text-gray-700">Shopify charges a $15 chargeback fee per dispute through Shopify Payments, in addition to the held transaction amount. The fee is generally not refunded even if you win.</p></div>
            <div><h3 className="text-lg font-semibold text-gray-900 mb-2">How long do I have to respond?</h3><p className="text-gray-700">Visa: 30 days, Mastercard: 45 days, American Express: 20 days. The exact deadline is shown in your Shopify admin.</p></div>
            <div><h3 className="text-lg font-semibold text-gray-900 mb-2">Can I prevent chargebacks on Shopify?</h3><p className="text-gray-700">Yes. Use clear billing descriptors, enable fraud analysis tools, require signature for high-value orders, send shipping notifications, make refund policies prominent, and respond quickly to customer inquiries.</p></div>
          </div>
        </section>

        <section className="bg-brand-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Build Your Shopify Chargeback Evidence Pack</h2>
          <p className="text-gray-700 mb-6">ChargebackKit generates a complete, organized evidence package for your Shopify dispute. Rebuttal letter, evidence checklist, timeline, and submission notes tailored to your reason code.</p>
          <a href="https://buy.stripe.com/eVq8wQ83Pg1M95B3hD3Nm00" className="inline-block bg-emerald-500 text-white font-semibold py-3 px-8 rounded-lg hover:bg-emerald-600 transition-colors">Build My Evidence Pack &mdash; $39</a>
        </section>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Resources</h3>
          <ul className="space-y-2 text-brand-700">
            <li><Link href="/stripe-chargeback-evidence" className="hover:underline">Stripe Chargeback Evidence Guide</Link></li>
            <li><Link href="/guides/visa-reason-code-13-1" className="hover:underline">Visa Reason Code 13.1: Merchandise Not Received</Link></li>
            <li><Link href="/guides/mastercard-reason-code-4853" className="hover:underline">Mastercard Reason Code 4853: Cardholder Dispute Guide</Link></li>
            <li><Link href="/guides/chargeback-response-deadlines" className="hover:underline">Chargeback Response Deadlines by Card Network</Link></li>
            <li><Link href="/guides/how-to-win-a-chargeback" className="hover:underline">How to Win a Chargeback as a Merchant</Link></li>
            <li><Link href="/chargeback-evidence-checklist" className="hover:underline">Chargeback Evidence Checklist by Dispute Type</Link></li>
          </ul>
        </div>
      </div>
    </>
  );
}
