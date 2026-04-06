import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Payment Successful — ChargebackKit',
  robots: { index: false, follow: false },
};

/**
 * /checkout/success
 *
 * Display-only confirmation page shown after Stripe redirects back.
 *
 * IMPORTANT: This page does NOT provision credits or change entitlements.
 * Provisioning happens exclusively via the Stripe webhook handler.
 * This page exists only to confirm the redirect and guide the user's next step.
 *
 * The ?session_id param is available for display purposes (e.g., showing
 * order details) but is never used for provisioning logic.
 */
export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        {/* Success icon */}
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Payment confirmed
        </h1>

        <p className="text-gray-600 mb-6">
          Your ChargebackKit credits are ready. You can start building your
          evidence pack now.
        </p>

        {/* Primary CTA */}
        <Link
          href="/app"
          className="inline-block w-full bg-gray-900 text-white rounded-md py-3 px-4 font-medium hover:bg-gray-800 transition-colors mb-3"
        >
          Go to Dashboard
        </Link>

        {/* Secondary */}
        <p className="text-sm text-gray-500">
          Stripe will email your receipt automatically.{' '}
          <Link href="/api/billing/portal" className="text-gray-700 underline">
            View billing history
          </Link>
        </p>
      </div>
    </main>
  );
}
