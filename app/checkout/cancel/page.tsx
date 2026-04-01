import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Checkout Canceled — ChargebackKit',
  robots: { index: false, follow: false },
};

/**
 * /checkout/cancel
 *
 * Shown if the user clicks "Back" on the Stripe Checkout page.
 * No payment was made. No state changes.
 * Redirects users back to pricing to try again.
 *
 * Note: The default cancel_url is /pricing, so this page is a fallback.
 * It exists in case cancel_url is explicitly set to /checkout/cancel.
 */
export default function CheckoutCancelPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        {/* Info icon */}
        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <svg
            className="w-8 h-8 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Checkout canceled
        </h1>

        <p className="text-gray-600 mb-6">
          No payment was made. Your account has not been charged.
          You can return to pricing whenever you&apos;re ready.
        </p>

        <Link
          href="/pricing"
          className="inline-block w-full bg-gray-900 text-white rounded-md py-3 px-4 font-medium hover:bg-gray-800 transition-colors mb-3"
        >
          Back to Pricing
        </Link>

        <Link
          href="/dashboard"
          className="inline-block text-sm text-gray-500 hover:text-gray-700"
        >
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}
