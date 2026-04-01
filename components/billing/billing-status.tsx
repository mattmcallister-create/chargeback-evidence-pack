'use client';

import { useEffect, useState } from 'react';
import type { BillingStatus } from '@/lib/billing/types';

/**
 * BillingStatusDisplay — shows the user's current billing state.
 *
 * Used in the dashboard sidebar or settings page.
 * Fetches billing status from /api/billing/status on mount.
 *
 * Displays:
 * - Credit count
 * - Subscription status (if any)
 * - Link to Customer Portal
 * - Prompt to purchase if unpaid
 */
export function BillingStatusDisplay() {
  const [status, setStatus] = useState<BillingStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const response = await fetch('/api/billing/status');
        if (!response.ok) throw new Error('Failed to load billing status');
        const data = await response.json();
        setStatus(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }
    fetchStatus();
  }, []);

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-3 bg-gray-100 rounded w-3/4" />
        </div>
      </div>
    );
  }

  if (error || !status) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <p className="text-sm text-gray-500">Unable to load billing status.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
      <h3 className="text-sm font-medium text-gray-900">Billing</h3>

      {/* Credits */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">Pack credits</span>
        <span className="text-sm font-semibold text-gray-900">
          {status.credits}
        </span>
      </div>

      {/* Access state badge */}
      <AccessStateBadge state={status.accessState} />

      {/* Subscription info */}
      {status.subscription && (
        <SubscriptionDetail subscription={status.subscription} />
      )}

      {/* Actions */}
      <div className="pt-2 space-y-2">
        {status.accessState === 'unpaid' && (
          <a
            href="/pricing"
            className="block w-full text-center bg-gray-900 text-white rounded-md py-2 px-3 text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Get Credits
          </a>
        )}

        {status.stripeCustomerId && (
          <a
            href="/api/billing/portal"
            className="block w-full text-center bg-gray-100 text-gray-700 rounded-md py-2 px-3 text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            Manage Billing
          </a>
        )}
      </div>
    </div>
  );
}

function AccessStateBadge({ state }: { state: string }) {
  const config: Record<string, { label: string; color: string }> = {
    unpaid: { label: 'No active plan', color: 'bg-gray-100 text-gray-600' },
    one_time_active: { label: 'Credits available', color: 'bg-green-100 text-green-700' },
    subscription_active: { label: 'Subscription active', color: 'bg-green-100 text-green-700' },
    subscription_canceling: { label: 'Cancels at period end', color: 'bg-yellow-100 text-yellow-700' },
    subscription_past_due: { label: 'Payment failed', color: 'bg-red-100 text-red-700' },
    subscription_expired: { label: 'Subscription ended', color: 'bg-gray-100 text-gray-600' },
  };

  const { label, color } = config[state] ?? config.unpaid;

  return (
    <span
      className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${color}`}
    >
      {label}
    </span>
  );
}

function SubscriptionDetail({
  subscription,
}: {
  subscription: NonNullable<BillingStatus['subscription']>;
}) {
  const endDate = new Date(subscription.currentPeriodEnd).toLocaleDateString(
    'en-US',
    { month: 'short', day: 'numeric', year: 'numeric' }
  );

  return (
    <div className="text-xs text-gray-500 space-y-1">
      {subscription.cancelAtPeriodEnd ? (
        <p>Access until {endDate}</p>
      ) : (
        <p>Renews {endDate}</p>
      )}
    </div>
  );
}

export default BillingStatusDisplay;
