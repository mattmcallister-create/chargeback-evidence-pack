'use client';

/**
 * PortalButton — links to the Stripe Customer Portal.
 *
 * GET /api/billing/portal creates a portal session and redirects.
 * Portal shows: payment history, PDF receipts, subscription management.
 *
 * Only shown when user has a Stripe customer ID (has made at least one purchase).
 */
interface PortalButtonProps {
  label?: string;
  className?: string;
}

export function PortalButton({
  label = 'Manage Billing',
  className = '',
}: PortalButtonProps) {
  return (
    <a
      href="/api/billing/portal"
      className={`inline-block bg-gray-100 text-gray-700 rounded-md py-2 px-4 text-sm font-medium hover:bg-gray-200 transition-colors ${className}`}
    >
      {label}
    </a>
  );
}

export default PortalButton;
