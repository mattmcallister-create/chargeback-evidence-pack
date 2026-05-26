import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Square Chargeback Response Guide — How to Fight Square Disputes',
  description: 'Complete guide to responding to Square chargebacks and payment disputes. Learn Square\'s dispute process, deadlines, evidence requirements, and how to win.',
  alternates: {
    canonical: 'https://chargebackkit.app/guides/square-chargeback-response',
  },
  openGraph: {
    title: 'Square Chargeback Response Guide — How to Fight Square Disputes',
    description: 'Complete guide to responding to Square chargebacks and payment disputes. Learn Square\'s dispute process, deadlines, evidence requirements, and how to win.',
    url: 'https://chargebackkit.app/guides/square-chargeback-response',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long do I have to respond to a Square chargeback?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Square gives you 7 days to respond to a chargeback dispute after notification. If you don\'t respond within this window, you automatically lose the dispute. Square recommends responding as quickly as possible with all relevant evidence.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Square charge a chargeback fee?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Square does not charge a chargeback fee to merchants. This is a significant advantage over other processors like Stripe ($15) and PayPal ($20). However, the disputed amount is still held during the review process.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Square\'s chargeback protection program?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Square offers chargeback protection for eligible transactions up to $250 per month. This covers disputes on qualifying chip-read, contactless, or swiped transactions. Online and manually keyed transactions are not covered by this protection.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I submit evidence for a Square dispute?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You submit evidence through the Square Dashboard or Square app. Go to Transactions, find the disputed payment, and click Respond to Dispute. Upload relevant documents including receipts, shipping tracking, customer communications, and proof of delivery.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens if I lose a Square chargeback?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If you lose a Square chargeback, the disputed amount is deducted from your Square balance. Unlike some processors, Square does not charge an additional chargeback fee. Excessive chargebacks may affect your account standing and processing eligibility.',
      },
    },
  ],
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Respond to a Square Chargeback',
  description: 'Step-by-step process for responding to chargebacks on Square to maximize your win rate.',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Check Your Dispute Notification',
      text: 'When you receive a chargeback, Square notifies you via email and in the Dashboard. Go to Transactions in your Square Dashboard and locate the disputed payment. Review the dispute reason and amount.',
    },
    {
      '@type': 'HowToStep',
      name: 'Gather Evidence',
      text: 'Collect all relevant documentation including transaction receipts, signed contracts or invoices, shipping tracking with delivery confirmation, photos of the product or service, and any email or text communication with the customer.',
    },
    {
      '@type': 'HowToStep',
      name: 'Submit Your Response',
      text: 'Click Respond to Dispute in your Square Dashboard. Upload your evidence and write a clear explanation addressing the specific dispute reason. Submit within 7 days of notification.',
    },
    {
      '@type': 'HowToStep',
      name: 'Wait for Resolution',
      text: 'After submission, the card issuer reviews the evidence. This process typically takes 60-90 days. Square will notify you of the outcome via email and update the transaction status in your Dashboard.',
    },
  ],
}

export default function SquareChargebackResponsePage() {
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
        <span className="text-gray-900">Square Chargeback Response</span>
      </nav>

      <h1 className="text-4xl font-bold text-gray-900 mb-6">Square Chargeback Response Guide: How to Fight Square Disputes and Win</h1>
      <p className="text-xl text-gray-700 mb-10">Square processes payments for millions of businesses, and chargebacks are a growing concern for Square sellers. The good news: Square does not charge a chargeback fee and offers a protection program for eligible in-person transactions. This guide walks you through the entire Square dispute process, from notification to resolution.</p>
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How Square Chargebacks Work</h2>
        <p className="text-gray-700 mb-4">When a cardholder disputes a Square transaction, the card issuer notifies Square, which then holds the disputed amount and contacts you. Square's dispute process is more streamlined than many competitors, with a simple Dashboard interface for submitting evidence.</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 mb-6">
            <thead>
              <tr className="bg-brand-50">
                <th className="border border-gray-300 px-4 py-3 text-left text-brand-800 font-semibold">Stage</th>
                <th className="border border-gray-300 px-4 py-3 text-left text-brand-800 font-semibold">Timeline</th>
                <th className="border border-gray-300 px-4 py-3 text-left text-brand-800 font-semibold">Action Required</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-medium">Notification</td>
                <td className="border border-gray-300 px-4 py-3">Day 0</td>
                <td className="border border-gray-300 px-4 py-3">Review dispute details in Dashboard</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-3 font-medium">Response Window</td>
                <td className="border border-gray-300 px-4 py-3">7 days</td>
                <td className="border border-gray-300 px-4 py-3">Submit evidence via Dashboard</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-medium">Issuer Review</td>
                <td className="border border-gray-300 px-4 py-3">60–90 days</td>
                <td className="border border-gray-300 px-4 py-3">Wait for decision</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-3 font-medium">Resolution</td>
                <td className="border border-gray-300 px-4 py-3">Varies</td>
                <td className="border border-gray-300 px-4 py-3">Funds returned if won; deducted if lost</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Square Chargeback Protection Program</h2>
        <p className="text-gray-700 mb-4">Square offers a built-in chargeback protection program that covers eligible disputes up to $250 per month at no extra cost. Understanding what qualifies is key to leveraging this benefit.</p>
        <div className="space-y-4">
          <div className="border-l-4 border-emerald-500 pl-6 py-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Eligible Transactions</h3>
            <p className="text-gray-700">Chip-read (EMV dip), contactless (tap-to-pay), and swiped transactions are covered. The transaction must be processed in person using a Square hardware device. The total dispute amount must be $250 or less, and your total protected disputes must not exceed $250 per month.</p>
          </div>
          <div className="border-l-4 border-brand-800 pl-6 py-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Not Covered</h3>
            <p className="text-gray-700">Online payments, invoices, Virtual Terminal transactions, and manually keyed card entries are NOT covered by Square's chargeback protection. For these transaction types, you need to build your own evidence package and respond through the dispute process.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Evidence to Submit for Square Disputes</h2>
        <p className="text-gray-700 mb-6">The evidence you provide makes or breaks your case. Square allows you to upload documents and write a response directly in the Dashboard. Here is what to include based on the dispute reason.</p>
        <div className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-6 py-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Goods or Services Not Received</h3>
            <p className="text-gray-700">Shipping tracking number with carrier delivery confirmation. Signed delivery receipt or proof of pickup. Communication with the customer confirming receipt. Photos of the packaged items before shipping. For services, provide a signed contract, work completion records, and before/after documentation.</p>
          </div>
          <div className="border-l-4 border-emerald-500 pl-6 py-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Goods or Services Not as Described</h3>
            <p className="text-gray-700">Original product listing, menu, or service description. Photos matching the delivered product to the description. Customer communication where they acknowledged satisfaction. Your return/refund policy that was presented before purchase. Evidence the customer did not attempt to return the item.</p>
          </div>
          <div className="border-l-4 border-emerald-500 pl-6 py-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Fraudulent or Unauthorized</h3>
            <p className="text-gray-700">EMV chip read receipt showing the card was present. Customer signature (if applicable). Photo ID verification records. Previous successful transactions from the same customer. AVS and CVV verification data for online orders. IP address and device information for e-commerce transactions.</p>
          </div>
        </div>
      </section>
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Step-by-Step: Responding to a Square Chargeback</h2>
        <div className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-6 py-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Step 1: Review the Dispute Notification</h3>
            <p className="text-gray-700">Square sends an email when a dispute is filed. Log into your Square Dashboard and navigate to Transactions. Find the disputed transaction — it will be marked with a dispute indicator. Review the reason code, disputed amount, and response deadline (7 days from notification).</p>
          </div>
          <div className="border-l-4 border-emerald-500 pl-6 py-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Step 2: Check Protection Eligibility</h3>
            <p className="text-gray-700">Before preparing evidence, check if the transaction qualifies for Square's chargeback protection. If it was an in-person chip, tap, or swipe transaction under $250, it may be automatically covered. Square will indicate this in the dispute details.</p>
          </div>
          <div className="border-l-4 border-emerald-500 pl-6 py-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Step 3: Build Your Evidence Package</h3>
            <p className="text-gray-700">Gather all documentation relevant to the specific dispute reason. Include the transaction receipt, any signed documents, shipping/delivery proof, product photos, and customer communication. Organize everything clearly — card issuers review dozens of disputes and clear evidence wins.</p>
          </div>
          <div className="border-l-4 border-emerald-500 pl-6 py-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Step 4: Submit Through the Dashboard</h3>
            <p className="text-gray-700">In your Square Dashboard, click on the disputed transaction and select Respond to Dispute. Upload your documents (PDFs recommended for clarity), write a factual explanation addressing the cardholder's specific claim, and submit. You will receive email confirmation once submitted.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div><h3 className="text-lg font-semibold text-gray-900 mb-2">How long do I have to respond to a Square chargeback?</h3><p className="text-gray-700">Square gives you 7 days to respond to a chargeback dispute after notification. If you don't respond within this window, you automatically lose the dispute. Square recommends responding as quickly as possible with all relevant evidence.</p></div>
          <div><h3 className="text-lg font-semibold text-gray-900 mb-2">Does Square charge a chargeback fee?</h3><p className="text-gray-700">Square does not charge a chargeback fee to merchants. This is a significant advantage over other processors like Stripe ($15) and PayPal ($20). However, the disputed amount is still held during the review process.</p></div>
          <div><h3 className="text-lg font-semibold text-gray-900 mb-2">What is Square's chargeback protection program?</h3><p className="text-gray-700">Square offers chargeback protection for eligible transactions up to $250 per month. This covers disputes on qualifying chip-read, contactless, or swiped transactions. Online and manually keyed transactions are not covered by this protection.</p></div>
          <div><h3 className="text-lg font-semibold text-gray-900 mb-2">How do I submit evidence for a Square dispute?</h3><p className="text-gray-700">You submit evidence through the Square Dashboard or Square app. Go to Transactions, find the disputed payment, and click Respond to Dispute. Upload relevant documents including receipts, shipping tracking, customer communications, and proof of delivery.</p></div>
          <div><h3 className="text-lg font-semibold text-gray-900 mb-2">What happens if I lose a Square chargeback?</h3><p className="text-gray-700">If you lose a Square chargeback, the disputed amount is deducted from your Square balance. Unlike some processors, Square does not charge an additional chargeback fee. Excessive chargebacks may affect your account standing and processing eligibility.</p></div>
        </div>
      </section>

      <section className="bg-brand-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Build Your Square Dispute Evidence Pack</h2>
        <p className="text-gray-700 mb-6">ChargebackKit generates a complete, organized evidence package for your Square dispute. Rebuttal letters, evidence summaries, and everything you need to win — ready in minutes.</p>
        <a href="https://buy.stripe.com/eVq8wQ83Pg1M95B3hD3Nm00" className="inline-block bg-emerald-500 text-white font-semibold py-3 px-8 rounded-lg hover:bg-emerald-600 transition-colors">Get Your Evidence Pack — $39</a>
      </section>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Resources</h3>
        <ul className="space-y-2 text-brand-700">
          <li><Link href="/stripe-chargeback-evidence" className="hover:underline">Stripe Chargeback Evidence Guide</Link></li>
          <li><Link href="/guides/shopify-chargeback-response" className="hover:underline">Shopify Chargeback Response Guide</Link></li>
          <li><Link href="/guides/paypal-dispute-response" className="hover:underline">PayPal Dispute Response Guide</Link></li>
          <li><Link href="/guides/chargeback-response-deadlines" className="hover:underline">Chargeback Response Deadlines by Card Network</Link></li>
          <li><Link href="/guides/how-to-win-a-chargeback" className="hover:underline">How to Win a Chargeback as a Merchant</Link></li>
          <li><Link href="/chargeback-evidence-checklist" className="hover:underline">Chargeback Evidence Checklist by Dispute Type</Link></li>
        </ul>
      </div>
    </div>
  )
}
