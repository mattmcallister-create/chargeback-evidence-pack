import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for the Chargeback Evidence Pack Builder. How we handle your data and uploaded files.',
  alternates: {
    canonical: '/privacy/',
  },
}

export default function PrivacyPage() {
  const lastUpdated = 'March 31, 2026'

  return (
    <section className="section bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-[720px] mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
          <p className="text-sm text-slate-500">Last updated: {lastUpdated}</p>
        </div>

        <div className="prose-marketing">
          <p>
            This Privacy Policy describes how the Chargeback Evidence Pack Builder
            (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collects, uses, and
            handles information when you use our Service. We take data handling seriously,
            particularly because the files you upload may contain sensitive business information.
          </p>

          <h2>1. Information We Collect</h2>

          <h3>Account information</h3>
          <p>
            If you create an account, we collect your email address and a hashed version of
            your password. We do not store payment card details — all payment processing is
            handled by Stripe.
          </p>

          <h3>Uploaded files</h3>
          <p>
            Files you upload during pack creation (shipping records, screenshots, communications,
            policies) are processed solely to generate your evidence pack. They are stored
            temporarily — for no longer than 72 hours after pack creation — and then permanently
            deleted. We do not use uploaded files for any purpose other than generating your pack.
          </p>

          <h3>Usage data</h3>
          <p>
            We may collect standard server log data such as IP addresses, browser type,
            and pages visited. This is used for security monitoring and product improvement,
            not for advertising or profiling.
          </p>

          <h3>Analytics</h3>
          <p>
            We use privacy-preserving analytics (not Google Analytics). Analytics data is
            aggregated and not tied to individual users. No tracking cookies are set for
            analytics purposes.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>
            We use the information we collect to: provide and operate the Service, process
            your payment via Stripe, generate your evidence pack, send purchase confirmation
            and pack-ready notifications to your email address, respond to support requests,
            and improve the Service.
          </p>
          <p>
            We do not sell your data. We do not use your data for advertising. We do not
            share your uploaded files with third parties.
          </p>

          <h2>3. File Retention and Deletion</h2>
          <p>
            This is our most important data commitment: all files you upload and your compiled
            evidence pack are permanently deleted 72 hours after pack creation. We do not
            archive, back up, or retain uploaded files beyond this window. If you need your
            pack after 72 hours, you will need to build a new one.
          </p>

          <h2>4. Payment Data</h2>
          <p>
            Payments are processed by Stripe. We do not store credit card numbers,
            bank account details, or any payment credentials. Stripe&apos;s privacy policy
            applies to data processed through their checkout. We receive confirmation of
            payment and your email address from Stripe.
          </p>

          <h2>5. Cookies</h2>
          <p>
            We use session cookies for authentication purposes only. We do not use advertising
            cookies, cross-site tracking cookies, or third-party analytics cookies that
            identify you across websites.
          </p>

          <h2>6. Data Security</h2>
          <p>
            We use encryption in transit (HTTPS/TLS) for all data. Uploaded files are stored
            in encrypted storage during the 72-hour window. Access to file storage is
            restricted to the generation process only. We maintain access logs for security
            monitoring.
          </p>

          <h2>7. Your Rights</h2>
          <p>
            Depending on your location, you may have the right to access, correct, or delete
            personal data we hold about you. To exercise these rights, contact us at the
            address below. Note: because uploaded files are automatically deleted after 72
            hours, there is typically no file data to retrieve after that window.
          </p>

          <h2>8. Third-Party Services</h2>
          <p>
            We use the following third-party services: Stripe (payment processing), our
            hosting provider (encrypted server infrastructure), and privacy-preserving
            analytics. Each third party operates under its own privacy policy. We do not
            share personal data with other third parties.
          </p>

          <h2>9. Children</h2>
          <p>
            This Service is intended for business use by adults. We do not knowingly collect
            personal information from anyone under the age of 18.
          </p>

          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will update the
            &ldquo;Last updated&rdquo; date and, for material changes, notify you by email
            if you have an account.
          </p>

          <h2>11. Contact</h2>
          <p>
            Questions about this Privacy Policy or data handling? Contact us at the email
            address in your purchase confirmation or via our support page.
          </p>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-200 text-sm text-slate-500">
          <p>
            Related:{' '}
            <Link href="/terms/" className="text-brand-700 underline hover:text-brand-800">Terms of Service</Link>
            {' · '}
            <Link href="/refund/" className="text-brand-700 underline hover:text-brand-800">Refund Policy</Link>
          </p>
        </div>
      </div>
    </section>
  )
}
