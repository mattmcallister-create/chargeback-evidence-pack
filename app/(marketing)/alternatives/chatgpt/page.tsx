import type { Metadata } from 'next';
import Link from 'next/link';

const title = 'ChatGPT vs ChargebackKit for Chargeback Responses';
const description = 'Compare using ChatGPT versus ChargebackKit for writing chargeback dispute responses. See why a purpose-built evidence pack builder wins disputes more effectively than general AI.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: 'https://chargebackkit.app/alternatives/chatgpt' },
  openGraph: { title, description, url: 'https://chargebackkit.app/alternatives/chatgpt', type: 'website' },
};

const comparisons = [
  { feature: 'Knows card network dispute rules (Visa CE 3.0, Mastercard)', chatgpt: false, ck: true },
  { feature: 'Matches reason codes to defense strategies', chatgpt: false, ck: true },
  { feature: 'Produces bank-ready PDF with labeled exhibits', chatgpt: false, ck: true },
  { feature: 'Generates evidence checklist per dispute type', chatgpt: false, ck: true },
  { feature: 'Includes professional cover page', chatgpt: false, ck: true },
  { feature: 'Organizes uploaded evidence files', chatgpt: false, ck: true },
  { feature: 'Guided step-by-step intake flow', chatgpt: false, ck: true },
  { feature: 'Time to complete a response', chatgpt: '3-5 hours', ck: '30 minutes' },
  { feature: 'Cost', chatgpt: '$20/mo subscription', ck: '$19 one-time' },
  { feature: 'Requires chargeback expertise', chatgpt: true, ck: false },
];

export default function ChatGPTAlternativePage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-brand-950 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-emerald-400 font-semibold text-sm uppercase tracking-wide mb-4">Comparison</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">ChatGPT vs ChargebackKit for Dispute Responses</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            ChatGPT is a powerful general-purpose AI. But writing a winning chargeback response requires specialized knowledge that general AI does not have.
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Feature-by-feature comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 pr-4 text-sm font-medium text-gray-500 w-1/2">Feature</th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-gray-500">ChatGPT</th>
                  <th className="text-center py-4 pl-4 text-sm font-medium text-emerald-600">ChargebackKit</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="py-4 pr-4 text-sm text-gray-700">{row.feature}</td>
                    <td className="text-center py-4 px-4">
                      {typeof row.chatgpt === 'boolean' ? (
                        row.chatgpt ? <span className="text-emerald-500">Yes</span> : <span className="text-red-400">No</span>
                      ) : (
                        <span className="text-sm text-gray-600">{row.chatgpt}</span>
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

      {/* Why ChatGPT Falls Short */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why ChatGPT is not built for chargeback responses</h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>
              ChatGPT is an excellent general-purpose AI assistant. It can draft emails, summarize documents, and help with research. But chargeback dispute responses have very specific requirements that general AI cannot meet out of the box.
            </p>
            <p>
              Card networks like Visa and Mastercard have detailed rules about what evidence is required for each dispute reason code. Visa&apos;s Compelling Evidence 3.0 framework, for example, requires specific data points organized in a specific way. ChatGPT does not know these rules and cannot structure evidence to match them.
            </p>
            <p>
              A chargeback response is not just a letter. It is a structured evidence package that includes a cover page, a rebuttal narrative matched to the reason code, an evidence checklist, and labeled exhibits. ChatGPT can write text, but it cannot assemble a submission-ready PDF with organized exhibits and proper formatting.
            </p>
            <p>
              Most critically, using ChatGPT for a chargeback response requires you to already know what to include. You need to research the specific reason code, understand what evidence the card network expects, and then prompt ChatGPT correctly. This research alone takes 3-5 hours. ChargebackKit guides you through the process in about 30 minutes.
            </p>
          </div>
        </div>
      </section>

      {/* When ChatGPT is Fine */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">When ChatGPT might be enough</h2>
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>
              If you are a chargeback professional who already knows the card network rules and just needs help drafting narrative text, ChatGPT can be a useful writing assistant. If you handle hundreds of disputes and have your own evidence organization system, you may not need a guided tool.
            </p>
            <p>
              But if you are a merchant facing a dispute for the first time, or if you handle disputes occasionally and do not have a formal process, ChargebackKit saves significant time and produces a more complete, professional submission.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-brand-950 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Build your evidence pack in 30 minutes</h2>
          <p className="text-gray-300 text-lg mb-8">
            Skip the hours of research and prompting. Get a submission-ready PDF evidence pack built specifically for your dispute type.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://buy.stripe.com/5kQaEY83P3f02Hdf0l3Nm02"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-8 py-4 text-lg font-semibold text-white hover:bg-emerald-400 transition-colors"
            >
              Build My Evidence Pack &mdash; $19
            </Link>
            <Link
              href="/preview"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/30 px-8 py-4 text-lg font-medium text-white hover:bg-white/10 transition-colors"
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
                name: 'Can I use ChatGPT to write a chargeback response?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'You can use ChatGPT to draft text for a chargeback response, but it does not know card network dispute rules, cannot match reason codes to defense strategies, and cannot produce a formatted PDF evidence pack with labeled exhibits. You would need to do extensive research first and organize the evidence yourself.',
                },
              },
              {
                '@type': 'Question',
                name: 'How is ChargebackKit different from ChatGPT for chargebacks?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'ChargebackKit is purpose-built for chargeback dispute responses. It guides you through a structured intake, matches your dispute to the right defense strategy based on the reason code, organizes your evidence with labeled exhibits, and produces a submission-ready PDF. ChatGPT is a general AI that requires you to already know what evidence to include.',
                },
              },
              {
                '@type': 'Question',
                name: 'How long does it take to write a chargeback response with ChatGPT vs ChargebackKit?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Using ChatGPT typically takes 3-5 hours because you need to research the specific reason code, understand card network requirements, prompt the AI correctly, and then format everything yourself. ChargebackKit takes about 30 minutes because it handles the research, structuring, and formatting automatically.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
