import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Friendly Fraud Prevention Guide — Stop Illegitimate Chargebacks',
  description: 'Learn how to identify, prevent, and fight friendly fraud chargebacks. Strategies for merchants to reduce first-party fraud, build evidence, and protect revenue.',
  alternates: {
    canonical: 'https://chargebackkit.app/guides/friendly-fraud-prevention',
  },
  openGraph: {
    title: 'Friendly Fraud Prevention Guide — Stop Illegitimate Chargebacks',
    description: 'Learn how to identify, prevent, and fight friendly fraud chargebacks. Strategies for merchants to reduce first-party fraud, build evidence, and protect revenue.',
    url: 'https://chargebackkit.app/guides/friendly-fraud-prevention',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is friendly fraud?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Friendly fraud (also called first-party fraud or chargeback fraud) occurs when a legitimate cardholder makes a purchase and then disputes the charge with their bank instead of requesting a refund from the merchant. The customer received the product or service but claims otherwise to get their money back while keeping the item.',
      },
    },
    {
      '@type': 'Question',
      name: 'How common is friendly fraud?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Friendly fraud accounts for an estimated 60-80% of all chargebacks according to industry research. It costs merchants over $50 billion annually worldwide. The problem has grown significantly with the rise of e-commerce and digital subscriptions, as consumers have learned how easy it is to dispute charges.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I tell if a chargeback is friendly fraud?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Key indicators of friendly fraud include: the customer has a history of successful purchases, tracking shows delivery was confirmed, the customer continued using a digital service after the disputed charge, the customer did not contact you for a refund before filing a dispute, or the customer disputes only one charge in a series of recurring payments.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I win a friendly fraud chargeback?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, friendly fraud chargebacks are winnable with proper evidence. You need to prove the customer authorized the transaction, received the product/service, and did not attempt to resolve the issue directly. Key evidence includes delivery confirmation, usage logs, IP address matching, prior purchase history, and communication records.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is friendly fraud illegal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Friendly fraud can constitute wire fraud or theft of services, which are illegal. However, prosecution is rare because individual amounts are typically small, intent is difficult to prove, and the legal system has not kept pace with e-commerce fraud. Some states have begun passing specific chargeback fraud laws.',
      },
    },
  ],
}

export default function FriendlyFraudPreventionPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <nav className="text-sm text-gray-500 mb-8">
        <Link href="/guides" className="hover:underline">Guides</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Friendly Fraud Prevention</span>
      </nav>

      <h1 className="text-4xl font-bold text-gray-900 mb-6">Friendly Fraud Prevention: How to Stop Illegitimate Chargebacks</h1>
      <p className="text-xl text-gray-700 mb-10">Friendly fraud — when legitimate customers dispute valid charges — is the single biggest chargeback problem merchants face. It accounts for 60–80% of all chargebacks and costs businesses over $50 billion annually. Unlike true fraud, these customers actually received your product or service. This guide covers how to identify, prevent, and fight back against friendly fraud.</p>
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Types of Friendly Fraud</h2>
        <p className="text-gray-700 mb-4">Not all friendly fraud is intentional. Understanding the different types helps you tailor your prevention and response strategy.</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 mb-6">
            <thead>
              <tr className="bg-brand-50">
                <th className="border border-gray-300 px-4 py-3 text-left text-brand-800 font-semibold">Type</th>
                <th className="border border-gray-300 px-4 py-3 text-left text-brand-800 font-semibold">Description</th>
                <th className="border border-gray-300 px-4 py-3 text-left text-brand-800 font-semibold">Prevention</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-medium">Buyer's remorse</td>
                <td className="border border-gray-300 px-4 py-3">Customer regrets purchase and disputes instead of returning</td>
                <td className="border border-gray-300 px-4 py-3">Easy return/refund process, clear product descriptions</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-3 font-medium">Family fraud</td>
                <td className="border border-gray-300 px-4 py-3">Family member makes purchase without cardholder knowledge</td>
                <td className="border border-gray-300 px-4 py-3">CVV verification, 3D Secure, delivery confirmation</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-medium">Forgotten subscription</td>
                <td className="border border-gray-300 px-4 py-3">Customer doesn't recognize recurring charge on statement</td>
                <td className="border border-gray-300 px-4 py-3">Pre-billing reminders, clear billing descriptors</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-3 font-medium">Cyber-shoplifting</td>
                <td className="border border-gray-300 px-4 py-3">Intentional fraud — customer keeps product and gets refund</td>
                <td className="border border-gray-300 px-4 py-3">Delivery confirmation, photos, signed receipts</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-medium">Unrecognized charge</td>
                <td className="border border-gray-300 px-4 py-3">Billing descriptor doesn't match brand name</td>
                <td className="border border-gray-300 px-4 py-3">Match billing descriptor to your brand name exactly</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Prevention Strategies That Work</h2>
        <div className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-6 py-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Make Refunds Easier Than Disputes</h3>
            <p className="text-gray-700">The most effective prevention: make it so easy to get a refund that customers never think to call their bank. One-click refund requests, prominent refund policy, and fast processing. A refund costs you the sale; a chargeback costs you the sale plus $15–$25 in fees and damages your processor ratio.</p>
          </div>
          <div className="border-l-4 border-emerald-500 pl-6 py-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Clear Billing Descriptors</h3>
            <p className="text-gray-700">Unrecognized charges are the top trigger for friendly fraud. Your billing descriptor should match your brand name exactly. If your customers know you as "FreshMeals" but your legal entity is "Green Fork Inc," the statement should show "FRESHMEALS" not "GREEN FORK." Include a customer service phone number in the descriptor when possible.</p>
          </div>
          <div className="border-l-4 border-emerald-500 pl-6 py-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Order Confirmation and Receipts</h3>
            <p className="text-gray-700">Send immediate order confirmations with the exact amount, your brand name, a description of what was purchased, and the billing descriptor they will see on their statement. This creates a paper trail and helps customers recognize the charge when it appears.</p>
          </div>
          <div className="border-l-4 border-emerald-500 pl-6 py-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">4. Delivery Confirmation and Tracking</h3>
            <p className="text-gray-700">Ship with tracking on every order. Require signature confirmation for high-value items. Take photos of packages before shipping. Use GPS-verified delivery confirmation when available. This evidence is your strongest defense against "item not received" friendly fraud claims.</p>
          </div>
          <div className="border-l-4 border-emerald-500 pl-6 py-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">5. Customer Communication Logging</h3>
            <p className="text-gray-700">Log every customer interaction — emails, chats, phone calls, support tickets. When a customer claims they "tried to contact you" or "never received a response," your communication logs prove otherwise. Use a CRM or helpdesk system that timestamps everything automatically.</p>
          </div>
        </div>
      </section>
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Fight Friendly Fraud Chargebacks</h2>
        <p className="text-gray-700 mb-6">When friendly fraud happens despite your prevention efforts, you have a strong case to win — because the customer actually received what they paid for. Here is the evidence you need.</p>
        <div className="space-y-6">
          <div className="border-l-4 border-brand-800 pl-6 py-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Proof of Authorization</h3>
            <p className="text-gray-700">AVS (Address Verification Service) match results. CVV verification match. 3D Secure authentication record. IP address at time of purchase matching the customer's known location. Device fingerprint data. Signed order forms or digital acceptance records.</p>
          </div>
          <div className="border-l-4 border-brand-800 pl-6 py-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Proof of Delivery</h3>
            <p className="text-gray-700">Shipping tracking number with carrier confirmation. Delivery confirmation with date, time, and GPS coordinates. Signature confirmation for high-value orders. Photos of the delivered package. For digital goods: download logs, access logs, usage activity after the purchase date.</p>
          </div>
          <div className="border-l-4 border-brand-800 pl-6 py-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Relationship Evidence</h3>
            <p className="text-gray-700">Prior successful transactions with the same customer. Previous purchases that were not disputed. Customer support interactions showing no complaint was filed. Communication records showing the customer acknowledged receiving the product. Social media posts showing the customer using/enjoying the product.</p>
          </div>
          <div className="border-l-4 border-brand-800 pl-6 py-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Policy Documentation</h3>
            <p className="text-gray-700">Your refund/return policy as displayed at checkout. Terms of service accepted by the customer. Cancellation policy for subscriptions. Evidence that the customer did not follow your refund process before filing a dispute. Screenshots showing the refund option was available and accessible.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div><h3 className="text-lg font-semibold text-gray-900 mb-2">What is friendly fraud?</h3><p className="text-gray-700">Friendly fraud (also called first-party fraud or chargeback fraud) occurs when a legitimate cardholder makes a purchase and then disputes the charge with their bank instead of requesting a refund from the merchant. The customer received the product or service but claims otherwise to get their money back while keeping the item.</p></div>
          <div><h3 className="text-lg font-semibold text-gray-900 mb-2">How common is friendly fraud?</h3><p className="text-gray-700">Friendly fraud accounts for an estimated 60-80% of all chargebacks according to industry research. It costs merchants over $50 billion annually worldwide. The problem has grown significantly with the rise of e-commerce and digital subscriptions.</p></div>
          <div><h3 className="text-lg font-semibold text-gray-900 mb-2">How can I tell if a chargeback is friendly fraud?</h3><p className="text-gray-700">Key indicators include: the customer has a history of successful purchases, tracking shows delivery was confirmed, the customer continued using a digital service after the disputed charge, the customer did not contact you for a refund before filing a dispute, or the customer disputes only one charge in a series of recurring payments.</p></div>
          <div><h3 className="text-lg font-semibold text-gray-900 mb-2">Can I win a friendly fraud chargeback?</h3><p className="text-gray-700">Yes, friendly fraud chargebacks are winnable with proper evidence. You need to prove the customer authorized the transaction, received the product/service, and did not attempt to resolve the issue directly. Key evidence includes delivery confirmation, usage logs, IP address matching, and communication records.</p></div>
          <div><h3 className="text-lg font-semibold text-gray-900 mb-2">Is friendly fraud illegal?</h3><p className="text-gray-700">Friendly fraud can constitute wire fraud or theft of services, which are illegal. However, prosecution is rare because individual amounts are typically small, intent is difficult to prove, and the legal system has not kept pace with e-commerce fraud. Some states have begun passing specific chargeback fraud laws.</p></div>
        </div>
      </section>

      <section className="bg-brand-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Fight Back Against Friendly Fraud</h2>
        <p className="text-gray-700 mb-6">ChargebackKit generates a complete, organized evidence package to fight friendly fraud disputes. Rebuttal letters, evidence summaries, and everything you need to prove the customer received what they paid for — ready in minutes.</p>
        <a href="https://buy.stripe.com/5kQaEY83P3f02Hdf0l3Nm02" className="inline-block bg-emerald-500 text-white font-semibold py-3 px-8 rounded-lg hover:bg-emerald-600 transition-colors">Get Your Evidence Pack — $19</a>
      </section>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Resources</h3>
        <ul className="space-y-2 text-brand-700">
          <li><Link href="/guides/chargeback-prevention" className="hover:underline">Chargeback Prevention Strategies for All Businesses</Link></li>
          <li><Link href="/guides/saas-chargeback-prevention" className="hover:underline">SaaS Chargeback Prevention Guide</Link></li>
          <li><Link href="/guides/how-to-win-a-chargeback" className="hover:underline">How to Win a Chargeback as a Merchant</Link></li>
          <li><Link href="/guides/chargeback-rebuttal-letter" className="hover:underline">How to Write a Chargeback Rebuttal Letter</Link></li>
          <li><Link href="/guides/chargeback-response-deadlines" className="hover:underline">Chargeback Response Deadlines by Card Network</Link></li>
          <li><Link href="/chargeback-evidence-checklist" className="hover:underline">Chargeback Evidence Checklist by Dispute Type</Link></li>
        </ul>
      </div>
    </div>
  )
}
