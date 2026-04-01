'use client';

import { useState } from 'react';
import { getPriceConfigs, type PriceConfig } from '@/lib/billing/types';

/**
 * PricingCards — displays all available pricing options.
 *
 * Used on /pricing page and as the generation paywall gate.
 * Calls POST /api/checkout and redirects to Stripe-hosted Checkout.
 *
 * No payment data touches this component. Stripe handles all PCI concerns.
 */
export function PricingCards() {
  const prices = getPriceConfigs();

  return (
    <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
      {prices.map((price) => (
        <PricingCard key={price.id} price={price} />
      ))}
    </div>
  );
}

function PricingCard({ price }: { price: PriceConfig }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: price.id }),
      });

      if (!response.ok) {
        const data = await response.json();
        if (response.status === 401) {
          // Not logged in — redirect to login with return URL
          window.location.href = '/login?redirect=/pricing';
          return;
        }
        throw new Error(data.error || 'Checkout failed');
      }

      const { url } = await response.json();
      // Redirect to Stripe-hosted Checkout
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false);
    }
  };

  const displayPrice = (price.amount / 100).toFixed(0);
  const isSubscription = price.mode === 'subscription';
  const isPopular = price.label === '3-Pack Bundle';

  return (
    <div
      className={`relative bg-white rounded-lg border p-6 flex flex-col ${
        isPopular
          ? 'border-gray-900 ring-1 ring-gray-900'
          : 'border-gray-200'
      }`}
    >
      {isPopular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-medium px-3 py-1 rounded-full">
          Most Popular
        </span>
      )}

      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        {price.label}
      </h3>

      <p className="text-sm text-gray-500 mb-4">{price.description}</p>

      <div className="mb-6">
        <span className="text-3xl font-bold text-gray-900">
          ${displayPrice}
        </span>
        {isSubscription && (
          <span className="text-gray-500 text-sm">/month</span>
        )}
      </div>

      <ul className="text-sm text-gray-600 space-y-2 mb-6 flex-1">
        <li className="flex items-start gap-2">
          <CheckIcon />
          <span>
            {price.credits} evidence pack{price.credits > 1 ? 's' : ''}
            {isSubscription ? ' per month' : ''}
          </span>
        </li>
        <li className="flex items-start gap-2">
          <CheckIcon />
          <span>AI-generated rebuttal narrative</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckIcon />
          <span>Submission-ready PDF format</span>
        </li>
        {isSubscription && (
          <li className="flex items-start gap-2">
            <CheckIcon />
            <span>Cancel anytime</span>
          </li>
        )}
      </ul>

      <button
        onClick={handleCheckout}
        disabled={loading}
        className={`w-full rounded-md py-3 px-4 font-medium transition-colors ${
          isPopular
            ? 'bg-gray-900 text-white hover:bg-gray-800'
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {loading ? 'Redirecting...' : isSubscription ? 'Subscribe' : 'Buy Now'}
      </button>

      {error && (
        <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
      )}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0"
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
  );
}

export default PricingCards;
