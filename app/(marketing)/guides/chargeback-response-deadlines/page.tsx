import type { Metadata } from 'next';
import Link from 'next/link';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chargebackkit.app';

export const metadata: Metadata = {
  title: 'Chargeback Response Deadlines by Card Network (2025-2026) | ChargebackKit',
  description:
    'Complete guide to chargeback response deadlines for Visa, Mastercard, American Express, and Discover. Includes timelines, consequences of missing deadlines, and best practices.',
  alternates: {
    canonical: `${siteUrl}/guides/chargeback-response-deadlines`,
  },
  openGraph: {
    title: 'Chargeback Response Deadlines by Card Network (2025-2026) | ChargebackKit',
    description: 'Complete guide to chargeback response deadlines for Visa, Mastercard, American Express, and Discover.',
    url: `${siteUrl}/guides/chargeback-response-deadlines`,
    type: 'article',
  },
};

export default function ChargebackResponseDeadlinesPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What happens if I miss a chargeback response deadline?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Missing a chargeback response deadline results in an automatic loss. The bank rules in the cardholder favor without reviewing your evidence. The chargeback is finalized and the funds are deducted from your account.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are chargeback deadlines the same for all card networks?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Visa allows 30 days, Mastercard 45 days, American Express 20 days, and Discover 30 days. Always check your payment processor dispute dashboard for your specific deadline.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I request an extension for a chargeback deadline?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Extensions are rarely granted. Some payment processors may allow a brief extension if you contact them before the deadline, but this is not guaranteed. The safest approach is to submit evidence as quickly as possible.',
        },
      },
      {
        '@type': 'Question',
        name: 'When does the chargeback deadline clock start?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The deadline typically starts when you are notified of the dispute through your payment processor. The cardholder filing window is 120 days from the transaction date. Your response deadline is measured from when you receive the dispute notice.',
        },
      },
    ],
  };

  const howtoSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Respond to a Chargeback Before the Deadline',
    step: [
      { '@type': 'HowToStep', position: '1', name: 'Monitor Your Dispute Dashboard', text: 'Check your payment processor daily for new disputes. Email notifications can be delayed.' },
      { '@type': 'HowToStep', position: '2', name: 'Note the Deadline Immediately', text: 'Check your card network deadline and set calendar reminders 5 days before.' },
      { '@type': 'HowToStep', position: '3', name: 'Gather Evidence by Reason Code', text: 'Read the dispute reason code and gather evidence that specifically addresses the claim.' },
      { '@type': 'HowToStep', position: '4', name: 'Organize and Label Evidence', text: 'Create a clear folder with dated, labeled files and a summary document.' },
      { '@type': 'HowToStep', position: '5', name: 'Submit Before the Deadline', text: 'Upload all evidence at least 24 hours before the deadline to avoid technical issues.' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howtoSchema) }} />

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <Link href="/guides" className="text-brand-700 hover:text-brand-800 font-medium">
            Guides
          </Link>
          <span className="mx-2 text-slate-400">/</span>
          <span className="text-slate-600">Response Deadlines</span>
        </nav>

        <h1 className="text-4xl font-bold mb-6 text-gray-900">
          Chargeback Response Deadlines: Complete Guide by Card Network
        </h1>

        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          A chargeback response deadline is the maximum time you have to submit evidence and
          documentation to dispute a chargeback. Missing this deadline results in an automatic loss
          and permanent fund deduction. Deadlines vary by card network and typically range from 20
          to 45 days from when you are notified.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Quick Reference: Deadlines by Network</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Card Network</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Merchant Response Deadline</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Customer Filing Window</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Arbitration Deadline</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-900">Visa</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">30 days</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">120 days from transaction</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">10 days after response</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-900">Mastercard</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">45 days</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">120 days from transaction</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">45 days after response</td>
                </tr>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-900">American Express</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">20 days</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">120 days from transaction</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Varies</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-900">Discover</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">30 days</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">120 days from transaction</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">30 days after response</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-600 text-sm mt-4">Last updated: April 2026. Deadlines are calculated from your notification date, not the transaction date.</p>
        </section>

        {/* Visa Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Visa</h2>
          <div className="bg-brand-50 border-l-4 border-brand-800 p-6 mb-6 rounded">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Response Deadline: 30 Days</h3>
            <p className="text-gray-700">Visa cardholders have 120 days from the transaction date to file a chargeback. Once you receive a dispute notification, you have 30 days to submit your evidence response.</p>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">What Happens If You Miss It</h3>
          <p className="text-gray-700 mb-4">Automatic loss without evidence review. Funds are immediately deducted from your merchant account. The chargeback becomes permanent with no further appeals possible, and it counts against your chargeback ratio.</p>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Best Practices for Visa</h3>
          <p className="text-gray-700">Submit evidence within 5-7 days of receiving notification. Use digital evidence (emails, screenshots) whenever possible. Address the specific reason code directly and include a merchant declaration signed with your name and title.</p>
        </section>

        {/* Mastercard Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Mastercard</h2>
          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mb-6 rounded">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Response Deadline: 45 Days</h3>
            <p className="text-gray-700">Mastercard gives merchants the longest response window: 45 days from notification. This extended timeline gives merchants more time to compile comprehensive evidence.</p>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">What Happens If You Miss It</h3>
          <p className="text-gray-700 mb-4">Automatic loss similar to Visa. Mastercard rules against you without evidence review. Funds deducted and chargeback becomes final, contributing to your chargeback/fraud ratio.</p>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Best Practices for Mastercard</h3>
          <p className="text-gray-700">Use the full 45-day window but submit by day 30 to be safe. Mastercard requires specific formatting. Provide evidence in the order matching their required fields. For recurring billing disputes, include all previous charges and customer consent proof.</p>
        </section>

        {/* American Express Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">American Express</h2>
          <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-6 rounded">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Response Deadline: 20 Days</h3>
            <p className="text-gray-700">American Express has the strictest timeline: only 20 days from notification. This shorter window requires rapid response and evidence gathering.</p>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">What Happens If You Miss It</h3>
          <p className="text-gray-700 mb-4">Immediate loss without evidence review. Funds deducted automatically. Chargeback is final and Amex does not accept appeals at this stage. Affects your merchant relationship.</p>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Best Practices for American Express</h3>
          <p className="text-gray-700">Set up immediate alerts for Amex disputes. Respond within 7-10 days to avoid deadline pressure. American Express prefers concise, well-organized submissions. Include a cover letter addressing each point.</p>
        </section>

        {/* Discover Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Discover</h2>
          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 mb-6 rounded">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Response Deadline: 30 Days</h3>
            <p className="text-gray-700">Discover allows 30 days, similar to Visa. Discover is stricter about evidence formatting than some networks, so clear organization is critical.</p>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">What Happens If You Miss It</h3>
          <p className="text-gray-700 mb-4">Automatic loss without review. Discover deducts funds immediately. Chargeback becomes final with limited appeal options. Contributes to your chargeback ratio.</p>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Best Practices for Discover</h3>
          <p className="text-gray-700">Respond within 10-14 days to ensure no delays. E-signatures and digital records are accepted. Submit all evidence in a single organized document when possible. Discover values clear timeline documentation.</p>
        </section>

        {/* Key Takeaways */}
        <section className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Key Takeaways</h2>
          <div className="space-y-4">
            <div className="flex gap-3"><span className="flex-shrink-0 text-brand-700 font-bold">1.</span><span className="text-gray-700">Deadlines are non-negotiable. Missing your deadline results in automatic loss and permanent fund deduction.</span></div>
            <div className="flex gap-3"><span className="flex-shrink-0 text-brand-700 font-bold">2.</span><span className="text-gray-700">American Express has the shortest deadline (20 days); Mastercard the longest (45 days).</span></div>
            <div className="flex gap-3"><span className="flex-shrink-0 text-brand-700 font-bold">3.</span><span className="text-gray-700">The clock starts when you are notified by your payment processor, not from the transaction date.</span></div>
            <div className="flex gap-3"><span className="flex-shrink-0 text-brand-700 font-bold">4.</span><span className="text-gray-700">Submit evidence early and often. Do not wait until the last day.</span></div>
            <div className="flex gap-3"><span className="flex-shrink-0 text-brand-700 font-bold">5.</span><span className="text-gray-700">Each card network has different preferences for evidence format and organization.</span></div>
          </div>
        </section>

        {/* How to Never Miss a Deadline */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">How to Never Miss a Deadline</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-brand-800 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Monitor Your Dashboard Daily</h3>
              <p className="text-gray-700">Check your payment processor for new disputes every morning. Email notifications can be delayed or missed.</p>
            </div>
            <div className="border-l-4 border-brand-800 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Set Calendar Reminders</h3>
              <p className="text-gray-700">When you see a dispute, immediately calculate your deadline and set reminders 5 days, 2 days, and 1 day before.</p>
            </div>
            <div className="border-l-4 border-brand-800 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Create a Response Template</h3>
              <p className="text-gray-700">Build a standard evidence organization template for your team. This speeds up response time.</p>
            </div>
            <div className="border-l-4 border-brand-800 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">4. Gather Evidence Immediately</h3>
              <p className="text-gray-700">The moment you see a dispute, start collecting transaction records, customer communications, and delivery proof.</p>
            </div>
            <div className="border-l-4 border-brand-800 pl-6 py-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">5. Submit Early</h3>
              <p className="text-gray-700">Submit your evidence by day 10-14 of your response window. This protects against technical issues.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What happens if I miss a chargeback response deadline?</h3>
              <p className="text-gray-700">Missing a chargeback response deadline results in an automatic loss. The bank rules in the cardholder&apos;s favor without reviewing your evidence. The chargeback is finalized and the funds are deducted from your account.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Are chargeback deadlines the same for all card networks?</h3>
              <p className="text-gray-700">No. Visa allows 30 days, Mastercard 45 days, American Express 20 days, and Discover 30 days. Always check your payment processor&apos;s dispute dashboard for your specific deadline.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I request an extension for a chargeback deadline?</h3>
              <p className="text-gray-700">Extensions are rarely granted. Some payment processors may allow a brief extension if you contact them before the deadline, but this is not guaranteed.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">When does the chargeback deadline clock start?</h3>
              <p className="text-gray-700">The deadline typically starts when you are notified of the dispute through your payment processor. Your response deadline is measured from when you receive the dispute notice.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-brand-50 rounded-lg p-8 text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Never Miss a Deadline Again</h2>
          <p className="text-gray-700 mb-6">ChargebackKit tracks your deadlines automatically and alerts you before they expire. Respond faster, stay organized, and win more disputes.</p>
          <Link href="/how-it-works" className="inline-block bg-emerald-500 text-white font-semibold py-3 px-8 rounded-lg hover:bg-emerald-600 transition-colors">See How It Works</Link>
        </section>

        {/* Internal Links Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Resources</h3>
          <ul className="space-y-2 text-brand-700">
            <li><Link href="/stripe-chargeback-evidence" className="hover:underline">Stripe Chargeback Evidence: What to Submit &amp; How</Link></li>
            <li><Link href="/chargeback-evidence-checklist" className="hover:underline">Chargeback Evidence Checklist: Complete Guide by Dispute Type</Link></li>
            <li><Link href="/pricing" className="hover:underline">ChargebackKit Pricing &amp; Plans</Link></li>
          </ul>
        </div>
      </div>
    </>
  );
}
