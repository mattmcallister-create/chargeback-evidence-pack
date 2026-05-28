import type { Metadata } from 'next';
import Link from 'next/link';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chargebackkit.app';

export const metadata: Metadata = {
  title: 'Chargeback Evidence Checklist: Complete Guide by Dispute Type',
  description:
    'Complete chargeback evidence checklist covering all dispute types including fraud, product not received, subscriptions, and product not as described.',
  alternates: {
    canonical: `${siteUrl}/chargeback-evidence-checklist`,
  },
  openGraph: {
    title: 'Chargeback Evidence Checklist: Complete Guide by Dispute Type',
    description: 'Complete checklist of evidence needed for all chargeback dispute types.',
    url: `${siteUrl}/chargeback-evidence-checklist`,
    type: 'article',
  },
};

function CheckboxItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 py-2">
      <div className="flex-shrink-0 mt-1">
        <input type="checkbox" disabled className="w-5 h-5 text-blue-600 rounded cursor-not-allowed" />
      </div>
      <span className="text-gray-700">{text}</span>
    </div>
  );
}

export default function ChargebackEvidenceChecklistPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is chargeback evidence and why do I need a checklist?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Chargeback evidence is documentation that proves a transaction was legitimate. A checklist ensures you gather all necessary documents before submitting your response, preventing delays and missed deadlines.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is the evidence the same for all chargeback types?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Some evidence applies to all disputes (like transaction records), but specific types vary by dispute category. A Product Not Received dispute requires delivery proof, while a fraud dispute requires identity verification and communication logs.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I organize evidence for submission?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use a clear folder structure, name files by date and type, and create a summary document that references each piece of evidence. Many payment processors allow batch uploads, so organization matters for fast submission.',
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Chargeback Evidence Checklist</h1>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          Chargeback evidence is documentation that proves a transaction was legitimate and addresses
          the cardholder&apos;s specific claim. Using this checklist, you&apos;ll organize all necessary evidence
          before submission, ensuring nothing is missed and deadlines are met.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Master Checklist: Essential for ALL Disputes</h2>
          <p className="text-gray-700 mb-6">These items apply to every chargeback, regardless of dispute type.</p>
          <div className="bg-gray-50 rounded-lg p-6">
            <CheckboxItem text="Transaction records (order ID, amount, date, time)" />
            <CheckboxItem text="Customer communication logs (emails, chat history, support tickets)" />
            <CheckboxItem text="Merchant terms of service and refund policy (dated at time of purchase)" />
            <CheckboxItem text="Delivery or fulfillment confirmation (tracking, receipt, timestamp)" />
            <CheckboxItem text="Product description records (screenshots, product catalog entry)" />
            <CheckboxItem text="IP address and device information from the transaction" />
            <CheckboxItem text="Customer account history (previous purchases, account age)" />
            <CheckboxItem text="Any customer acknowledgment or acceptance of terms" />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Fraudulent / Unauthorized Transaction Disputes</h2>
          <p className="text-gray-700 mb-6">Use when the cardholder claims they did not authorize the transaction.</p>
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Master Checklist Items (above) PLUS:</h3>
            <CheckboxItem text="Proof of customer authorization (consent form, agreement signature)" />
            <CheckboxItem text="Customer login history showing transaction from their account" />
            <CheckboxItem text="Email confirmation sent to customer&apos;s registered email" />
            <CheckboxItem text="Billing and shipping address match customer&apos;s known details" />
            <CheckboxItem text="Previous transaction history with this customer" />
            <CheckboxItem text="Customer account security (2FA enabled, no suspicious access)" />
            <CheckboxItem text="Evidence customer accessed their account on the transaction date" />
            <CheckboxItem text="Communication where customer confirmed awareness of the charge" />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Product Not Received Disputes</h2>
          <p className="text-gray-700 mb-6">Use when the cardholder claims they never received the product.</p>
          <div className="bg-green-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Master Checklist Items (above) PLUS:</h3>
            <CheckboxItem text="Shipping/tracking number with carrier confirmation" />
            <CheckboxItem text="Delivery confirmation showing product delivered to customer address" />
            <CheckboxItem text="Signature confirmation (if available)" />
            <CheckboxItem text="Photos of the package before shipment" />
            <CheckboxItem text="Shipping label matching customer&apos;s provided address" />
            <CheckboxItem text="Proof customer received delivery notifications from carrier" />
            <CheckboxItem text="Insurance or signature receipt (if applicable)" />
            <CheckboxItem text="Any customer communication about delivery" />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Subscription / Recurring Billing Disputes</h2>
          <p className="text-gray-700 mb-6">Use when the cardholder disputes a recurring charge or claims they canceled.</p>
          <div className="bg-purple-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Master Checklist Items (above) PLUS:</h3>
            <CheckboxItem text="Subscription agreement or terms signed by customer" />
            <CheckboxItem text="Clear cancellation policy displayed at signup" />
            <CheckboxItem text="Proof customer was notified of recurring charges" />
            <CheckboxItem text="Invoice or statement sent before each charge" />
            <CheckboxItem text="Email confirmation of subscription activation" />
            <CheckboxItem text="Record showing customer was given cancellation instructions" />
            <CheckboxItem text="Proof customer received renewal reminders (if applicable)" />
            <CheckboxItem text="Account history showing all charges and dates" />
            <CheckboxItem text="Proof customer continued using the service after dispute date" />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Product Not as Described Disputes</h2>
          <p className="text-gray-700 mb-6">Use when the cardholder claims the product differed from what was advertised.</p>
          <div className="bg-orange-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Master Checklist Items (above) PLUS:</h3>
            <CheckboxItem text="Product description or listing at the time of purchase" />
            <CheckboxItem text="Product images and specifications shown to customer" />
            <CheckboxItem text="Photos of the actual product shipped" />
            <CheckboxItem text="Comparison showing product matches description" />
            <CheckboxItem text="Quality certifications or specifications (if applicable)" />
            <CheckboxItem text="Customer communication showing they received the product" />
            <CheckboxItem text="Return or refund policy offered to customer" />
            <CheckboxItem text="Proof customer never requested a return or refund" />
          </div>
        </section>

        <section className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-12 rounded">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Important: Deadlines Matter</h3>
          <p className="text-gray-700 mb-4">Response deadlines vary by card network. Missing your deadline results in an automatic loss.</p>
          <Link href="/guides/chargeback-response-deadlines" className="text-blue-600 hover:underline font-semibold">View Card Network Deadlines &rarr;</Link>
        </section>

      <section className="section bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details key="What is chargeback evidence and why do I need a checklist?" className="group bg-slate-50 rounded-lg border border-slate-200">
              <summary className="flex items-start justify-between gap-4 px-5 py-4 cursor-pointer list-none font-semibold text-slate-900 text-sm">
                <span>What is chargeback evidence and why do I need a checklist?</span>
                <span className="shrink-0 text-slate-400 mt-0.5 group-open:rotate-180 transition-transform text-base leading-none">&darr;</span>
              </summary>
              <div className="px-5 pb-4 pt-2 text-sm text-slate-600 leading-relaxed border-t border-slate-200">
                Chargeback evidence is documentation that proves a transaction was legitimate. A checklist ensures you gather all necessary documents before submitting your response, preventing delays and missed deadlines.
              </div>
            </details>
            <details key="Is the evidence the same for all chargeback types?" className="group bg-slate-50 rounded-lg border border-slate-200">
              <summary className="flex items-start justify-between gap-4 px-5 py-4 cursor-pointer list-none font-semibold text-slate-900 text-sm">
                <span>Is the evidence the same for all chargeback types?</span>
                <span className="shrink-0 text-slate-400 mt-0.5 group-open:rotate-180 transition-transform text-base leading-none">&darr;</span>
              </summary>
              <div className="px-5 pb-4 pt-2 text-sm text-slate-600 leading-relaxed border-t border-slate-200">
                Some evidence applies to all disputes (like transaction records), but specific types vary by dispute category. A Product Not Received dispute requires delivery proof, while a fraud dispute requires identity verification.
              </div>
            </details>
            <details key="How do I organize evidence for submission?" className="group bg-slate-50 rounded-lg border border-slate-200">
              <summary className="flex items-start justify-between gap-4 px-5 py-4 cursor-pointer list-none font-semibold text-slate-900 text-sm">
                <span>How do I organize evidence for submission?</span>
                <span className="shrink-0 text-slate-400 mt-0.5 group-open:rotate-180 transition-transform text-base leading-none">&darr;</span>
              </summary>
              <div className="px-5 pb-4 pt-2 text-sm text-slate-600 leading-relaxed border-t border-slate-200">
                Use a clear folder structure, name files by date and type, and create a summary document that references each piece of evidence.
              </div>
            </details>
          </div>
        </div>
      </section>

        <section className="bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Automate Your Checklist</h2>
          <p className="text-gray-700 mb-6">ChargebackKit auto-generates this checklist based on your dispute type and payment processor.</p>
          <Link href="/pricing" className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors">Try ChargebackKit</Link>
        </section>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Resources</h3>
          <ul className="space-y-2 text-blue-600">
            <li><Link href="/stripe-chargeback-evidence" className="hover:underline">Stripe Chargeback Evidence: What to Submit &amp; How</Link></li>
            <li><Link href="/guides/chargeback-response-deadlines" className="hover:underline">Chargeback Response Deadlines: Complete Guide by Card Network</Link></li>
            <li><Link href="/how-it-works" className="hover:underline">How ChargebackKit Works</Link></li>
          </ul>
        </div>
      </div>
    </>
  );
}
