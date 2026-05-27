import type { Metadata } from 'next';
import Link from 'next/link';

const title = 'Stripe Smart Disputes vs ChargebackKit: Which Is Right for You?';
const description = 'Compare Stripe Smart Disputes and ChargebackKit for chargeback management. Smart Disputes is basic and Stripe-only. ChargebackKit builds comprehensive evidence packs for any processor at $19 flat.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: 'https://chargebackkit.app/alternatives/stripe-smart-disputes' },
  openGraph: { title, description, url: 'https://chargebackkit.app/alternatives/stripe-smart-disputes', type: 'website' },
};

const comparisons = [
  { feature: 'Pricing', stripe: 'Included with Stripe', ck: 'Flat $19 per pack' },
  { feature: 'Works with any processor', stripe: false, ck: true },
  { feature: 'Evidence customization', stripe: 'Minimal - auto-generated', ck: 'Full control over every field' },
  { feature: 'Supports all reason codes', stripe: false, ck: true },
  { feature: 'Custom evidence documents', stripe: false, ck: true },
  { feature: 'Processor-specific formatting', stripe: false, ck: true },
  { feature: 'Time to submit response', stripe: 'Automatic (limited evidence)', ck: '30 minutes (comprehensive)' },
  { feature: 'Win rate optimization', stripe: 'Generic responses', ck: 'Tailored to reason code' },
  { feature: 'Works for PayPal disputes', stripe: false, ck: true },
  { feature: 'Works for Square disputes', stripe: false, ck: true },
  { feature: 'Works for Shopify disputes', stripe: false, ck: true },
  { feature: 'Includes rebuttal letter', stripe: false, ck: true },
];

export default function StripeSmartDisputesAlternativePage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-brand-950 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-emerald-400 font-semibold text-sm uppercase tracking-wide mb-4">Comparison</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Stripe Smart Disputes vs ChargebackKit</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Stripe Smart Disputes auto-responds with basic evidence from your Stripe data. ChargebackKit builds comprehensive, submission-ready evidence packs with custom documents for any processor.
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Side-by-side comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 pr-4 text-sm font-medium text-gray-500 w-1/2">Feature</th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-gray-500">Smart Disputes</th>
                  <th className="text-center py-4 pl-4 text-sm font-medium text-emerald-600">ChargebackKit</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="py-4 pr-4 text-sm text-gray-700">{row.feature}</td>
                    <td className="text-center py-4 px-4">
                      {typeof row.stripe === 'boolean' ? (
                        row.stripe ? <span className="text-emerald-500">Yes</span> : <span className="text-red-400">No</span>
                      ) : (
                        <span className="text-sm text-gray-600">{row.stripe}</span>
                      )}
                    </td>
                    <td className="text-center py-4 pl-4">
                      {typeof row.ck === 'boolean' ? (
                        row.ck ? <span className="text-emerald-500 font-semibold">Yes</span> : <span className="text-red-400">No</span>
                      ) : (
                        <span className="text-sm font-semibold text-emerald-600">{row.ck}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* The Limitation */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">The limitation of Smart Disputes</h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>
              Stripe Smart Disputes is a convenience feature, not a dispute-winning tool. It automatically submits basic transaction data that Stripe already has on file: shipping tracking, customer email, IP address, and purchase details.
            </p>
            <p>
              The problem is that card networks expect more. A compelling dispute response includes a detailed rebuttal letter addressing the specific reason code, screenshots of terms of service and refund policy, communication logs with the customer, delivery confirmation with signatures, and product descriptions that match what the customer received.
            </p>
            <p>
              Smart Disputes cannot include documents it does not have. It cannot write a custom rebuttal letter. It cannot tailor the response to the specific reason code. And it only works for disputes filed through Stripe. If you also process payments through PayPal, Square, or Shopify Payments, you are on your own.
            </p>
          </div>
        </div>
      </section>

      {/* When Smart Disputes is Fine */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">When Smart Disputes might be enough</h2>
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>
              If you only process through Stripe, your disputes are infrequent, and the amounts are small, Smart Disputes is a reasonable default. It costs nothing extra and provides some level of automated response.
            </p>
            <p>
              For low-value disputes where the effort of building a comprehensive evidence pack outweighs the recovery amount, letting Smart Disputes handle it automatically can make sense.
            </p>
          </div>
        </div>
      </section>

      {/* When ChargebackKit is Better */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">When ChargebackKit is the better choice</h2>
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>
              ChargebackKit is built for merchants who want to maximize their win rate. Every evidence pack includes a professional rebuttal letter tailored to the specific reason code, organized evidence sections that match what card networks expect, and a submission-ready format that works with any payment processor.
            </p>
            <p>
              If your disputes involve amounts over $100, if you use multiple payment processors, or if your current win rate with Smart Disputes is below 40%, ChargebackKit gives you the comprehensive evidence that actually wins disputes.
            </p>
            <p>
              At $19 per pack, even recovering a single $100 dispute pays for itself five times over. Volume packs reduce it further: a 25-pack costs $269, bringing the per-pack price to $10.76.
            </p>
          </div>
        </div>
      </section>

      {/* Use Both */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">You can use both</h2>
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>
              Smart Disputes and ChargebackKit are not mutually exclusive. Many merchants leave Smart Disputes enabled as a safety net for minor disputes while using ChargebackKit for higher-value disputes where a comprehensive evidence pack dramatically increases the chance of winning.
            </p>
            <p>
              For disputes over $200, the $19 cost of a ChargebackKit evidence pack is a small investment compared to the revenue at stake. And for non-Stripe disputes, ChargebackKit is the only option.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-brand-950 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Build stronger evidence than Smart Disputes</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Comprehensive evidence packs with custom rebuttal letters, organized for any processor. Flat $19 per pack.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://buy.stripe.com/5kQaEY83P3f02Hdf0l3Nm02"
              className="inline-block rounded-lg bg-emerald-500 px-8 py-3.5 text-sm font-semibold text-white hover:bg-emerald-400 transition-colors"
            >
              Get your first evidence pack - $19
            </a>
            <Link
              href="/preview"
              className="inline-block rounded-lg border border-gray-600 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              See a sample pack
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is Stripe Smart Disputes?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Stripe Smart Disputes is a built-in Stripe feature that automatically submits basic transaction evidence when a dispute is filed. It uses data Stripe already has, such as shipping tracking and customer details, to generate a response without merchant intervention.',
                },
              },
              {
                '@type': 'Question',
                name: 'How is ChargebackKit different from Stripe Smart Disputes?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'ChargebackKit builds comprehensive, submission-ready evidence packs with custom rebuttal letters tailored to specific reason codes. Unlike Smart Disputes, ChargebackKit works with any payment processor and allows merchants to include custom documents, screenshots, and detailed evidence that card networks expect.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I use ChargebackKit and Smart Disputes together?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Many merchants leave Smart Disputes enabled for low-value Stripe disputes while using ChargebackKit for higher-value disputes and disputes from other processors like PayPal, Square, and Shopify Payments.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does ChargebackKit work with non-Stripe processors?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. ChargebackKit builds evidence packs that work with any payment processor, including Stripe, PayPal, Square, Shopify Payments, and traditional merchant accounts. Smart Disputes only works within the Stripe ecosystem.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
