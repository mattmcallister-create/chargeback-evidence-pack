import type { Metadata } from 'next';
import Link from 'next/link';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chargebackkit.app';

export const metadata: Metadata = {
  title: 'Mastercard Reason Code 4853: Complete Cardholder Dispute Guide | ChargebackKit',
  description:
    'Complete guide to Mastercard chargeback reason code 4853 (Cardholder Dispute). Learn sub-types, evidence requirements, the 45-day response deadline, and how to win.',
  alternates: {
    canonical: `${siteUrl}/guides/mastercard-reason-code-4853`,
  },
  openGraph: {
    title: 'Mastercard Reason Code 4853: Cardholder Dispute Guide | ChargebackKit',
    description: 'Step-by-step guide to responding to Mastercard 4853 chargebacks with the right evidence.',
    url: `${siteUrl}/guides/mastercard-reason-code-4853`,
    type: 'article',
  },
};

export default function MastercardReasonCode4853Page() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Mastercard reason code 4853?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Mastercard reason code 4853 is the broad Cardholder Dispute category that covers nearly every non-fraud chargeback a cardholder can file. It includes goods not received, goods not as described, cancelled recurring transactions, defective merchandise, counterfeit goods, and addendum disputes. It consolidated several legacy codes including 4841, 4850, 4855, and 4859.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long do I have to respond to a Mastercard 4853 chargeback?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Merchants have 45 days to respond to a Mastercard 4853 chargeback. This is a strict deadline with no extensions. Missing it results in automatic loss of funds, even if you have perfect evidence to win the dispute.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the sub-types of Mastercard reason code 4853?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Mastercard 4853 has multiple sub-types: Goods or Services Not Provided (formerly 4855), Not as Described or Defective, Cancelled Recurring Transaction (formerly 4841), Counterfeit Merchandise, Digital Goods under $25, Addendum Disputes (formerly 4859), and No-Show charges. Each sub-type requires different evidence to win.',
        },
      },
      {
        '@type': 'Question',
        name: 'What evidence do I need for a Mastercard 4853 dispute?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Evidence requirements depend on the specific sub-type. For goods not received, you need delivery proof. For not as described, you need product documentation matching what was delivered. For cancelled recurring, you need proof no cancellation was received. For digital goods under $25, you need proof of delivery controls and terms acceptance.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between Mastercard 4853 and Visa 13.1?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Visa 13.1 specifically covers merchandise not received, while Mastercard 4853 is a broader umbrella code covering multiple dispute types. Mastercard gives merchants 45 days to respond (vs Visa 30 days). The evidence requirements are similar for comparable sub-types but the submission process differs by card network.',
        },
      },
    ],
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Respond to Mastercard Reason Code 4853 Chargebacks',
    description: 'Step-by-step process for fighting a Mastercard 4853 cardholder dispute chargeback.',
    step: [
      { '@type': 'HowToStep', name: 'Identify the sub-type', text: 'Review the chargeback notification to determine which 4853 sub-type applies. The required evidence differs significantly between goods not received, not as described, cancelled recurring, and other sub-types.' },
      { '@type': 'HowToStep', name: 'Gather sub-type-specific evidence', text: 'Collect evidence that directly addresses the specific sub-type claim. For delivery disputes: tracking and confirmation. For quality disputes: product specs and photos. For recurring: subscription terms and cancellation policy.' },
      { '@type': 'HowToStep', name: 'Write a targeted rebuttal', text: 'Draft a rebuttal letter that identifies the case ID, references Mastercard reason code 4853 and the specific sub-type, and maps each exhibit to the claim being contested.' },
      { '@type': 'HowToStep', name: 'Submit within 45 days', text: 'Upload all evidence through your payment processor before the 45-day deadline. Organize exhibits clearly and ensure every required document is included since you cannot supplement after submission.' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <nav className="mb-8 text-sm">
          <Link href="/guides" className="text-brand-700 hover:text-brand-800 font-medium">Guides</Link>
          <span className="mx-2 text-slate-400">/</span>
          <span className="text-slate-600">Mastercard Reason Code 4853</span>
        </nav>

        <h1 className="text-4xl font-bold mb-6 text-gray-900">
          Mastercard Reason Code 4853: Complete Cardholder Dispute Guide for Merchants
        </h1>

        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          Mastercard reason code 4853 is the broad &ldquo;Cardholder Dispute&rdquo; category that covers
          nearly every non-fraud chargeback. It consolidated several legacy reason codes (4841, 4850, 4855,
          4859) into a single umbrella code with multiple sub-types. Understanding which sub-type you are
          facing is critical because each requires different evidence to win.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">4853 Sub-Types and Evidence Requirements</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Sub-Type</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Legacy Code</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Required Evidence</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900 font-medium">Goods/Services Not Provided</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">4855</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Delivery proof, tracking records, signed confirmation</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900 font-medium">Not as Described / Defective</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">&mdash;</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Product specs, photos, listing accuracy proof, return policy</td>
                </tr>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900 font-medium">Cancelled Recurring</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">4841</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Subscription terms, no cancellation received proof, usage logs</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900 font-medium">Digital Goods ($25 or less)</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">&mdash;</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Delivery controls, terms acceptance, download/access logs</td>
                </tr>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900 font-medium">Counterfeit Merchandise</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">&mdash;</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Authenticity certificates, supply chain documentation, brand authorization</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900 font-medium">Addendum / No-Show</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">4859</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Signed agreement to additional charges, cancellation policy acknowledgment</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Response Deadline: 45 Days</h2>
          <p className="text-gray-700 mb-4">
            Mastercard gives merchants <strong>45 days</strong> to respond to a 4853 chargeback. This is
            longer than Visa&apos;s 30-day window, but the deadline is equally strict. Missing it means
            automatic loss of funds regardless of the strength of your evidence.
          </p>
          <p className="text-gray-700">
            Start gathering evidence immediately when you receive the chargeback notification. Do not wait
            until close to the deadline, as some processors require additional processing time before your
            response reaches Mastercard.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">How to Respond: Step by Step</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-emerald-500 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Identify the Exact Sub-Type</h3>
              <p className="text-gray-700">Review the chargeback notification carefully. The sub-type determines what evidence you need. A &ldquo;goods not received&rdquo; dispute requires completely different proof than a &ldquo;cancelled recurring&rdquo; dispute. Submitting irrelevant evidence wastes your one chance to respond.</p>
            </div>
            <div className="border-l-4 border-emerald-500 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Gather Sub-Type-Specific Evidence</h3>
              <p className="text-gray-700">Collect every relevant document for your specific sub-type. For delivery disputes: tracking, carrier confirmation, GPS photos. For quality disputes: product photos, specs, listing screenshots. For recurring: subscription agreement, usage logs, cancellation policy.</p>
            </div>
            <div className="border-l-4 border-emerald-500 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Write a Targeted Rebuttal Letter</h3>
              <p className="text-gray-700">Your rebuttal should reference the case ID, state you are contesting Mastercard reason code 4853 with the specific sub-type, and clearly label each exhibit. Keep it factual and direct. Address the cardholder&apos;s specific claim, not generic defenses.</p>
            </div>
            <div className="border-l-4 border-emerald-500 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">4. Submit Through Your Processor</h3>
              <p className="text-gray-700">Upload your complete evidence package through Stripe, PayPal, Shopify, Square, or your processor&apos;s dispute dashboard. Ensure all documents are legible, properly labeled, and directly address the sub-type. You cannot add evidence after submission.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What is Mastercard reason code 4853?</h3>
              <p className="text-gray-700">Mastercard reason code 4853 is the broad Cardholder Dispute category covering nearly every non-fraud chargeback: goods not received, not as described, cancelled recurring transactions, defective merchandise, counterfeit goods, and addendum disputes. It consolidated legacy codes 4841, 4850, 4855, and 4859.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long do I have to respond to a Mastercard 4853 chargeback?</h3>
              <p className="text-gray-700">You have 45 days to respond. This is a strict deadline with no extensions. Missing it results in automatic loss of funds even if you have strong evidence.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What are the sub-types of Mastercard reason code 4853?</h3>
              <p className="text-gray-700">The main sub-types are: Goods or Services Not Provided (formerly 4855), Not as Described or Defective, Cancelled Recurring Transaction (formerly 4841), Digital Goods under $25, Counterfeit Merchandise, and Addendum/No-Show Disputes (formerly 4859). Each requires different evidence.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What evidence do I need for a Mastercard 4853 dispute?</h3>
              <p className="text-gray-700">Evidence depends on the sub-type. Delivery disputes need tracking proof. Quality disputes need product documentation. Recurring disputes need subscription terms and proof no cancellation was received. Digital goods disputes need delivery controls and terms acceptance proof.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the difference between Mastercard 4853 and Visa 13.1?</h3>
              <p className="text-gray-700">Visa 13.1 specifically covers merchandise not received, while Mastercard 4853 is a broader umbrella covering multiple dispute types. Mastercard gives 45 days to respond versus Visa&apos;s 30 days. Evidence requirements are similar for comparable sub-types.</p>
            </div>
          </div>
        </section>

        <section className="bg-brand-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Build Your Mastercard 4853 Evidence Pack</h2>
          <p className="text-gray-700 mb-6">ChargebackKit generates a complete evidence package tailored to your specific Mastercard 4853 sub-type. Rebuttal letter, evidence checklist, timeline, and submission notes included.</p>
          <a href="https://buy.stripe.com/eVq8wQ83Pg1M95B3hD3Nm00" className="inline-block bg-emerald-500 text-white font-semibold py-3 px-8 rounded-lg hover:bg-emerald-600 transition-colors">
            Build My Evidence Pack &mdash; $39
          </a>
        </section>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Resources</h3>
          <ul className="space-y-2 text-brand-700">
            <li><Link href="/guides/visa-reason-code-13-1" className="hover:underline">Visa Reason Code 13.1: Merchandise Not Received Guide</Link></li>
            <li><Link href="/guides/how-to-win-a-chargeback" className="hover:underline">How to Win a Chargeback as a Merchant</Link></li>
            <li><Link href="/guides/chargeback-response-deadlines" className="hover:underline">Chargeback Response Deadlines by Card Network</Link></li>
            <li><Link href="/guides/chargeback-rebuttal-letter" className="hover:underline">Chargeback Rebuttal Letter: How to Write One That Wins</Link></li>
            <li><Link href="/chargeback-evidence-checklist" className="hover:underline">Chargeback Evidence Checklist by Dispute Type</Link></li>
            <li><Link href="/guides/shopify-chargeback-response" className="hover:underline">Shopify Chargeback Response Guide</Link></li>
          </ul>
        </div>
      </div>
    </>
  );
}
