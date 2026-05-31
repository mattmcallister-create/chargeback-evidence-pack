import type { Metadata } from 'next';
import Link from 'next/link';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chargebackkit.app';

export const metadata: Metadata = {
  title: 'Visa Reason Code 13.1: How to Fight "Merchandise Not Received" Chargebacks',
  description:
    'Complete guide to Visa chargeback reason code 13.1 (Merchandise/Services Not Received). Learn evidence requirements, response deadlines, and how to win disputes.',
  alternates: {
    canonical: `${siteUrl}/guides/visa-reason-code-13-1`,
  },
  openGraph: {
    title: 'Visa Reason Code 13.1: Fight "Not Received" Chargebacks',
    description:
      'Step-by-step guide to responding to Visa 13.1 chargebacks with the right evidence to win.',
    url: `${siteUrl}/guides/visa-reason-code-13-1`,
    type: 'article',
  },
};

export default function VisaReasonCode131Page() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    dateModified: '2026-05-30',
    author: {
      '@type': 'Organization',
      name: 'ChargebackKit',
      url: 'https://chargebackkit.app',
    },
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Visa reason code 13.1?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Visa reason code 13.1 covers disputes where the cardholder claims they never received the merchandise or services they purchased. It replaced the legacy reason code 30 under Visa Claims Resolution (VCR). This is one of the most common non-fraud chargeback reason codes.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long do I have to respond to a Visa 13.1 chargeback?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Merchants typically have 30 days from receipt of the chargeback to submit compelling evidence. The cardholder has up to 120 days from the transaction date or expected delivery date to file, with an absolute limit of 540 days from the transaction processing date.',
        },
      },
      {
        '@type': 'Question',
        name: 'What evidence do I need to win a Visa 13.1 dispute?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The strongest evidence for a 13.1 dispute includes carrier tracking showing delivery to the cardholder address, signed delivery confirmation, GPS delivery verification, proof the item was shipped to the AVS-verified address, and any post-delivery communication from the customer confirming receipt or usage.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I win a Visa 13.1 chargeback without proof of delivery?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Winning without delivery proof is very difficult. If you shipped a digital product, you need server logs showing the customer accessed or downloaded the product. For physical goods, signed delivery confirmation or GPS-verified delivery photos are your strongest evidence. Without any delivery proof, consider accepting the chargeback.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between Visa reason codes 13.1 and 13.2?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Visa 13.1 covers merchandise or services not received at all, while 13.2 covers merchandise received but not as described or defective. The evidence requirements differ significantly: 13.1 requires delivery proof, while 13.2 requires evidence that the product matched its description.',
        },
      },
    ],
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Respond to Visa Reason Code 13.1 Chargebacks',
    description: 'Step-by-step process for fighting a Visa 13.1 merchandise not received chargeback with compelling evidence.',
    dateModified: '2026-05-30',
    author: {
      '@type': 'Organization',
      name: 'ChargebackKit',
      url: 'https://chargebackkit.app',
    },
    step: [
      {
        '@type': 'HowToStep',
        name: 'Review the chargeback details',
        text: 'Check the transaction date, amount, card number (last 4), and the specific claim. Verify whether this is a legitimate delivery issue or potential friendly fraud.',
      },
      {
        '@type': 'HowToStep',
        name: 'Gather delivery evidence',
        text: 'Collect carrier tracking records showing delivery status, signed delivery confirmation, GPS delivery photos, and proof the shipping address matches the billing address.',
      },
      {
        '@type': 'HowToStep',
        name: 'Compile transaction documentation',
        text: 'Pull together the original order details, payment confirmation, customer communication, shipping notifications sent, and any customer service interactions.',
      },
      {
        '@type': 'HowToStep',
        name: 'Write your rebuttal letter',
        text: 'Draft a clear, factual rebuttal that states you are contesting Visa reason code 13.1, summarizes the evidence, and references each exhibit by label.',
      },
      {
        '@type': 'HowToStep',
        name: 'Submit through your processor',
        text: 'Upload all evidence and your rebuttal letter through your payment processor dashboard (Stripe, Square, PayPal, etc.) before the 30-day deadline.',
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
      <div className="max-w-4xl mx-auto px-4 py-16">

        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <Link href="/guides" className="text-brand-700 hover:text-brand-800 font-medium">
            Guides
          </Link>
          <span className="mx-2 text-slate-400">/</span>
          <span className="text-slate-600">Visa Reason Code 13.1</span>
        </nav>

        <h1 className="text-4xl font-bold mb-6 text-gray-900">
          Visa Reason Code 13.1: How to Fight &ldquo;Merchandise Not Received&rdquo; Chargebacks
        </h1>

        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          Visa reason code 13.1 is filed when a cardholder claims they never received the goods or
          services they purchased. It is one of the most common non-fraud chargeback reason codes and
          replaced the legacy reason code 30 under Visa Claims Resolution (VCR). This guide covers
          everything merchants need to know to respond effectively and win these disputes.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">What Triggers a 13.1 Chargeback</h2>
          <p className="text-gray-700 mb-4">
            A cardholder can file a 13.1 dispute when they claim merchandise or services were not
            received. This covers several scenarios: the package was genuinely lost in transit,
            the package was delivered to the wrong address, the package was stolen after delivery,
            a digital product was not accessible, or the customer is committing friendly fraud and
            claiming non-receipt despite having received the item.
          </p>
          <p className="text-gray-700">
            The issuing bank does not investigate the claim before filing the chargeback. The burden
            of proof falls on the merchant to demonstrate that delivery occurred.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Response Deadlines</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Timeline</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Details</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900 font-medium">Cardholder filing window</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">120 days from transaction date or expected delivery date</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900 font-medium">Absolute filing limit</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">540 days from transaction processing date</td>
                </tr>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900 font-medium">Merchant response deadline</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">30 days from chargeback receipt</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-3 text-gray-900 font-medium">Minimum wait (no delivery date set)</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Issuer must wait 15 days after transaction before filing</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Evidence Required to Win</h2>
          <p className="text-gray-700 mb-6">
            The key to winning a 13.1 dispute is proving that the merchandise or service was delivered.
            Organize your evidence package with these categories:
          </p>
          <div className="space-y-6">
            <div className="border-l-4 border-brand-800 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Delivery Proof (Most Critical)</h3>
              <p className="text-gray-700">Carrier tracking records showing delivered status, signed delivery confirmation, GPS-verified delivery photos, and proof that the shipping address matches the AVS-verified billing address. This is the single most important piece of evidence for 13.1 disputes.</p>
            </div>
            <div className="border-l-4 border-brand-800 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Order and Transaction Records</h3>
              <p className="text-gray-700">Original order confirmation, itemized receipt, payment authorization showing AVS/CVV match, IP address and device information from the order, and timestamps for order placement and fulfillment.</p>
            </div>
            <div className="border-l-4 border-brand-800 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Shipping Documentation</h3>
              <p className="text-gray-700">Shipping label with tracking number, carrier pickup scan, transit history, and delivery scan. If the package was insured, include insurance documentation.</p>
            </div>
            <div className="border-l-4 border-brand-800 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Communication</h3>
              <p className="text-gray-700">Shipping confirmation email sent to customer, tracking number notification, any customer service correspondence before or after the chargeback, and any messages where the customer acknowledged receipt or product usage.</p>
            </div>
            <div className="border-l-4 border-brand-800 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Digital Product Evidence</h3>
              <p className="text-gray-700">For digital goods: server logs showing the customer accessed or downloaded the product, login timestamps, usage analytics, IP addresses matching the cardholder, and screenshots of the delivery or access confirmation page.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Step-by-Step Response Process</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-emerald-500 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Step 1: Review the Chargeback Details</h3>
              <p className="text-gray-700">Check the transaction date, amount, card number (last 4 digits), and the specific claim. Verify whether this is a legitimate delivery issue or potential friendly fraud. Pull the original order to confirm what was purchased and where it was shipped.</p>
            </div>
            <div className="border-l-4 border-emerald-500 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Step 2: Gather Delivery Evidence</h3>
              <p className="text-gray-700">Collect carrier tracking records showing delivery status, signed delivery confirmation if available, GPS delivery verification photos, and proof the shipping address matches the billing address. For digital products, gather server access logs and download records.</p>
            </div>
            <div className="border-l-4 border-emerald-500 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Step 3: Compile Transaction Documentation</h3>
              <p className="text-gray-700">Pull together the original order confirmation, payment authorization details (AVS/CVV results), shipping notifications sent to the customer, and any customer service interactions before or after the dispute.</p>
            </div>
            <div className="border-l-4 border-emerald-500 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Step 4: Write Your Rebuttal Letter</h3>
              <p className="text-gray-700">Draft a clear, factual rebuttal letter that states you are contesting Visa reason code 13.1, summarizes each piece of evidence, and references each exhibit by label (Exhibit A, B, C). Keep it professional and factual; emotional arguments weaken your case.</p>
            </div>
            <div className="border-l-4 border-emerald-500 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Step 5: Submit Before the Deadline</h3>
              <p className="text-gray-700">Upload all evidence and your rebuttal letter through your payment processor (Stripe, Square, PayPal, Shopify) before the 30-day deadline. Once submitted, you cannot add additional evidence, so ensure everything is included.</p>
            </div>
          </div>
        </section>

        <section className="section bg-white px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="group bg-slate-50 rounded-lg border border-slate-200">
                <summary className="flex items-start justify-between gap-4 px-5 py-4 cursor-pointer list-none font-semibold text-slate-900 text-sm">
                  <span>What is Visa reason code 13.1?</span>
                  <span className="shrink-0 text-slate-400 mt-0.5 group-open:rotate-180 transition-transform text-base leading-none">&darr;</span>
                </summary>
                <div className="px-5 pb-4 pt-2 text-sm text-slate-600 leading-relaxed border-t border-slate-200">
                  Visa reason code 13.1 covers disputes where the cardholder claims they never received the merchandise or services they purchased. It replaced the legacy reason code 30 under Visa Claims Resolution (VCR). This is one of the most common non-fraud chargeback reason codes.
                </div>
              </details>
              <details className="group bg-slate-50 rounded-lg border border-slate-200">
                <summary className="flex items-start justify-between gap-4 px-5 py-4 cursor-pointer list-none font-semibold text-slate-900 text-sm">
                  <span>How long do I have to respond to a Visa 13.1 chargeback?</span>
                  <span className="shrink-0 text-slate-400 mt-0.5 group-open:rotate-180 transition-transform text-base leading-none">&darr;</span>
                </summary>
                <div className="px-5 pb-4 pt-2 text-sm text-slate-600 leading-relaxed border-t border-slate-200">
                  Merchants typically have 30 days from receipt of the chargeback to submit compelling evidence. The cardholder has up to 120 days from the transaction date or expected delivery date to file, with an absolute limit of 540 days from the transaction processing date.
                </div>
              </details>
              <details className="group bg-slate-50 rounded-lg border border-slate-200">
                <summary className="flex items-start justify-between gap-4 px-5 py-4 cursor-pointer list-none font-semibold text-slate-900 text-sm">
                  <span>What evidence do I need to win a Visa 13.1 dispute?</span>
                  <span className="shrink-0 text-slate-400 mt-0.5 group-open:rotate-180 transition-transform text-base leading-none">&darr;</span>
                </summary>
                <div className="px-5 pb-4 pt-2 text-sm text-slate-600 leading-relaxed border-t border-slate-200">
                  The strongest evidence includes carrier tracking showing delivery to the cardholder address, signed delivery confirmation, GPS delivery verification, proof the item was shipped to the AVS-verified address, and any post-delivery communication from the customer confirming receipt or usage.
                </div>
              </details>
              <details className="group bg-slate-50 rounded-lg border border-slate-200">
                <summary className="flex items-start justify-between gap-4 px-5 py-4 cursor-pointer list-none font-semibold text-slate-900 text-sm">
                  <span>Can I win a Visa 13.1 chargeback without proof of delivery?</span>
                  <span className="shrink-0 text-slate-400 mt-0.5 group-open:rotate-180 transition-transform text-base leading-none">&darr;</span>
                </summary>
                <div className="px-5 pb-4 pt-2 text-sm text-slate-600 leading-relaxed border-t border-slate-200">
                  Winning without delivery proof is very difficult. If you shipped a digital product, you need server logs showing the customer accessed or downloaded the product. For physical goods, signed delivery confirmation or GPS-verified delivery photos are your strongest evidence.
                </div>
              </details>
              <details className="group bg-slate-50 rounded-lg border border-slate-200">
                <summary className="flex items-start justify-between gap-4 px-5 py-4 cursor-pointer list-none font-semibold text-slate-900 text-sm">
                  <span>What is the difference between Visa reason codes 13.1 and 13.2?</span>
                  <span className="shrink-0 text-slate-400 mt-0.5 group-open:rotate-180 transition-transform text-base leading-none">&darr;</span>
                </summary>
                <div className="px-5 pb-4 pt-2 text-sm text-slate-600 leading-relaxed border-t border-slate-200">
                  Visa 13.1 covers merchandise or services not received at all, while 13.2 covers merchandise received but not as described or defective. The evidence requirements differ significantly: 13.1 requires delivery proof, while 13.2 requires evidence that the product matched its description.
                </div>
              </details>
            </div>
          </div>
        </section>

        <section className="bg-brand-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Build Your Visa 13.1 Evidence Pack in Minutes</h2>
          <p className="text-gray-700 mb-6">ChargebackKit generates a complete, structured evidence package tailored to Visa reason code 13.1 disputes. Rebuttal letter, evidence checklist, timeline, and submission notes included.</p>
          <a href="https://buy.stripe.com/5kQaEY83P3f02Hdf0l3Nm02" className="inline-block bg-emerald-500 text-white font-semibold py-3 px-8 rounded-lg hover:bg-emerald-600 transition-colors">
            Build My Evidence Pack &mdash; $39
          </a>
        </section>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Resources</h3>
          <ul className="space-y-2 text-brand-700">
            <li><Link href="/guides/mastercard-reason-code-4853" className="hover:underline">Mastercard Reason Code 4853: Cardholder Dispute Guide</Link></li>
            <li><Link href="/guides/how-to-win-a-chargeback" className="hover:underline">How to Win a Chargeback as a Merchant</Link></li>
            <li><Link href="/guides/chargeback-response-deadlines" className="hover:underline">Chargeback Response Deadlines by Card Network</Link></li>
            <li><Link href="/guides/chargeback-rebuttal-letter" className="hover:underline">Chargeback Rebuttal Letter: How to Write One That Wins</Link></li>
            <li><Link href="/chargeback-evidence-checklist" className="hover:underline">Chargeback Evidence Checklist by Dispute Type</Link></li>
            <li><Link href="/stripe-chargeback-evidence" className="hover:underline">Stripe Chargeback Evidence Guide</Link></li>
          </ul>
        </div>
      </div>
    </>
  );
      }
