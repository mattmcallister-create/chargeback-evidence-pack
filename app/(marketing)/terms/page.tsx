import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for the Chargeback Evidence Pack Builder.',
  alternates: {
    canonical: '/terms/',
  },
}

export default function TermsPage() {
  const lastUpdated = 'March 31, 2026'

  return (
    <section className="section bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-[720px] mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Terms of Service</h1>
          <p className="text-sm text-slate-500">Last updated: {lastUpdated}</p>
        </div>

        <div className="prose-marketing">
          <p>
            These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the
            Chargeback Evidence Pack Builder (the &ldquo;Service&rdquo;). By using the Service,
            you agree to these Terms. If you do not agree, do not use the Service.
          </p>

          <h2>1. Description of Service</h2>
          <p>
            The Service is a structured web tool that guides merchants through the process of
            organising chargeback evidence into a submission-ready PDF pack. The Service is
            designed for use with Stripe and is structured around Visa, Mastercard, and American
            Express chargeback submission guidelines.
          </p>

          <h2>2. Not Legal Advice</h2>
          <p>
            The Service does not constitute legal advice. We are not a law firm and do not
            provide legal representation. Nothing produced by the Service — including the
            rebuttal narrative, evidence checklist, or assembled PDF — should be construed as
            legal advice. For legal advice specific to your dispute, consult a licensed attorney.
          </p>

          <h2>3. No Outcome Guarantee</h2>
          <p>
            We cannot guarantee any chargeback outcome. Card networks — Visa, Mastercard, American
            Express — make the final determination on all disputes. The Service structures your
            evidence correctly for submission. It does not influence or predict the card network&apos;s
            ruling.
          </p>

          <h2>4. Payment Terms</h2>
          <p>
            Access to a completed evidence pack requires a one-time payment of $19 USD per pack,
            or $79/$129/$269 USD for a volume packs (5-Pack, 10-Pack, 25-Pack). All payments are processed via Stripe. There is no
            subscription, no recurring billing, and no free tier. Your obligation to pay arises
            when you initiate checkout.
          </p>

          <h2>5. Refund Policy</h2>
          <p>
            Refunds are available within 30 minutes of purchase if you have not yet started the
            intake process. Once intake is started, no refund is available. See our{' '}
            <Link href="/refund/">Refund Policy</Link> for the complete terms.
          </p>

          <h2>6. File Handling and Data Retention</h2>
          <p>
            Files you upload during pack creation are used solely to generate your evidence pack.
            They are not stored, shared, or used for any other purpose. Your pack and all
            associated uploaded files are permanently deleted after your access window closes (7 days for single packs, 30 days for volume packs).
            It is your responsibility to download your pack before that window closes.
          </p>

          <h2>7. Acceptable Use</h2>
          <p>
            You may use the Service only for your own legitimate chargeback disputes. You may
            not use the Service to fabricate or misrepresent evidence, to harass or defraud
            card networks, banks, or cardholders, or in any manner that violates applicable law.
            We reserve the right to terminate access for violations of this section.
          </p>

          <h2>8. Intellectual Property</h2>
          <p>
            All content of the Service — including the intake flow, evidence structure logic,
            and underlying system — is owned by us and protected by applicable intellectual
            property laws. Your uploaded files and the assembled PDF you receive remain your
            property. You grant us a limited licence to use your uploads solely to generate
            your pack.
          </p>

          <h2>9. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, we are not liable for any indirect,
            incidental, consequential, or punitive damages arising from your use of the
            Service or any chargeback outcome. Our total liability for any claim arising from
            the Service is limited to the amount you paid for the specific pack at issue.
          </p>

          <h2>10. Disclaimer of Warranties</h2>
          <p>
            The Service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without
            warranties of any kind, express or implied, including warranties of merchantability,
            fitness for a particular purpose, or non-infringement. We do not warrant that the
            Service will be error-free or uninterrupted.
          </p>

          <h2>11. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the jurisdiction in which we operate,
            without regard to conflict of law provisions. Any disputes arising from these Terms
            shall be resolved exclusively in the courts of that jurisdiction.
          </p>

          <h2>12. Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time. We will update the &ldquo;Last
            updated&rdquo; date at the top of this page. Continued use of the Service after
            an update constitutes acceptance of the revised Terms.
          </p>

          <h2>13. Contact</h2>
          <p>
            Questions about these Terms? Contact us at the email address listed in your
            purchase confirmation, or via the contact information on our support page.
          </p>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-200 text-sm text-slate-500">
          <p>
            Related:{' '}
            <Link href="/privacy/" className="text-brand-700 underline hover:text-brand-800">Privacy Policy</Link>
            {' · '}
            <Link href="/refund/" className="text-brand-700 underline hover:text-brand-800">Refund Policy</Link>
          </p>
        </div>
      </div>
    </section>
  )
}
