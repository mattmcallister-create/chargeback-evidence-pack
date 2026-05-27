import type { Metadata } from 'next';
import Link from 'next/link';

const title = 'Chargeflow vs ChargebackKit: Which Is Right for You?';
const description = 'Compare Chargeflow and ChargebackKit for chargeback management. Chargeflow charges 25% of recovered revenue. ChargebackKit is a flat $19 per evidence pack with no revenue share.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: 'https://chargebackkit.app/alternatives/chargeflow' },
  openGraph: { title, description, url: 'https://chargebackkit.app/alternatives/chargeflow', type: 'website' },
};

const comparisons = [
  { feature: 'Pricing model', chargeflow: '25% of recovered amount', ck: 'Flat $19 per pack' },
  { feature: 'Cost for a $200 dispute', chargeflow: '$50 if won', ck: '$19 regardless' },
  { feature: 'Cost for a $1,000 dispute', chargeflow: '$250 if won', ck: '$19 regardless' },
  { feature: 'Cost for a $5,000 dispute', chargeflow: '$1,250 if won', ck: '$19 regardless' },
  { feature: 'Requires integration', chargeflow: true, ck: false },
  { feature: 'Requires onboarding', chargeflow: true, ck: false },
  { feature: 'Time to first response', chargeflow: 'Days (setup required)', ck: '30 minutes' },
  { feature: 'Works with any processor', chargeflow: false, ck: true },
  { feature: 'You control the response', chargeflow: false, ck: true },
  { feature: 'No subscription required', chargeflow: false, ck: true },
  { feature: 'Fully automated', chargeflow: true, ck: false },
  { feature: 'Best for high volume (100+ disputes/mo)', chargeflow: true, ck: false },
];

export default function ChargeflowAlternativePage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-brand-950 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-emerald-400 font-semibold text-sm uppercase tracking-wide mb-4">Comparison</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Chargeflow vs ChargebackKit</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Chargeflow automates disputes for high-volume merchants at 25% of recovered revenue. ChargebackKit builds submission-ready evidence packs for a flat $19.
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
                  <th className="text-center py-4 px-4 text-sm font-medium text-gray-500">Chargeflow</th>
                  <th className="text-center py-4 pl-4 text-sm font-medium text-emerald-600">ChargebackKit</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="py-4 pr-4 text-sm text-gray-700">{row.feature}</td>
                    <td className="text-center py-4 px-4">
                      {typeof row.chargeflow === 'boolean' ? (
                        row.chargeflow ? <span className="text-emerald-500">Yes</span> : <span className="text-red-400">No</span>
                      ) : (
                        <span className="text-sm text-gray-600">{row.chargeflow}</span>
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

      {/* Cost Calculator */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">The real cost difference</h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>
              Chargeflow charges 25% of every dispute they successfully recover. For a $200 chargeback, that is $50. For a $1,000 chargeback, that is $250. For a $5,000 chargeback, that is $1,250.
            </p>
            <p>
              ChargebackKit charges a flat $19 per evidence pack, regardless of the dispute amount. Whether you are fighting a $50 dispute or a $10,000 dispute, the cost is the same. Volume packs reduce it further: a 25-pack costs $269, bringing the per-pack price to $10.76.
            </p>
            <p>
              For merchants handling fewer than 10 disputes per month, the savings are significant. A merchant fighting five $500 disputes would pay $625 with Chargeflow (assuming all five are won) versus $79 with a ChargebackKit 5-pack.
            </p>
          </div>
        </div>
      </section>

      {/* When Chargeflow is Better */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">When Chargeflow might be the better choice</h2>
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>
              Chargeflow is built for high-volume e-commerce merchants who handle dozens or hundreds of disputes every month. If you process thousands of transactions and disputes are a constant operational burden, full automation at a percentage of recovery can make sense.
            </p>
            <p>
              Chargeflow also handles the entire process end-to-end: they write the response, submit the evidence, and manage the timeline. If you want to be completely hands-off, that is their value proposition.
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
              ChargebackKit is built for merchants who handle a manageable number of disputes and want to keep costs predictable. If you fight 1-20 disputes per month, paying a percentage of each recovery adds up fast.
            </p>
            <p>
              ChargebackKit also gives you full control over the response. You provide the evidence, you review the rebuttal narrative, and you submit it to your processor. Many merchants prefer this because they understand their business better than any algorithm and want to ensure the response reflects their specific situation.
            </p>
            <p>
              There is no integration required, no onboarding process, and no monthly commitment. You pay once, build your evidence pack, and submit it.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-brand-950 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Build your evidence pack for $19</h2>
          <p className="text-gray-300 text-lg mb-8">
            No percentage of recovery. No integration. No subscription. Just a professional, submission-ready evidence pack.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://buy.stripe.com/5kQaEY83P3f02Hdf0l3Nm02"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-8 py-4 text-lg font-semibold text-white hover:bg-emerald-400 transition-colors"
            >
              Build My Evidence Pack &mdash; $19
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/30 px-8 py-4 text-lg font-medium text-white hover:bg-white/10 transition-colors"
            >
              See volume pricing
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
                name: 'How much does Chargeflow cost compared to ChargebackKit?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Chargeflow charges 25% of every successfully recovered dispute amount. For a $1,000 chargeback, that is $250. ChargebackKit charges a flat $19 per evidence pack regardless of dispute amount, with volume discounts available (5-pack for $79, 10-pack for $129, 25-pack for $269).',
                },
              },
              {
                '@type': 'Question',
                name: 'Is Chargeflow or ChargebackKit better for small businesses?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'For small businesses handling fewer than 20 disputes per month, ChargebackKit is typically more cost-effective because of its flat pricing. Chargeflow is designed for high-volume merchants who want full automation and are willing to pay a percentage of recovered amounts.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does ChargebackKit require integration like Chargeflow?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. ChargebackKit requires no integration, no onboarding, and no subscription. You answer questions about your dispute, upload evidence, and receive a submission-ready PDF evidence pack in about 30 minutes. Chargeflow requires connecting your payment processor and completing an onboarding process.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
