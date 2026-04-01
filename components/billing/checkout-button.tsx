'use client';

import { useState } from 'react';

/**
 * CheckoutButton — standalone button that initiates Stripe Checkout.
 *
 * Used as a CTA on the dashboard when user has no credits.
 * Accepts a priceId prop or defaults to the single pack price.
 */
interface CheckoutButtonProps {
  priceId?: string;
  label?: string;
  className?: string;
}

export function CheckoutButton({
  priceId,
  label = 'Buy Evidence Pack',
  className = '',
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    try {
      const resolvedPriceId =
        priceId || process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_SINGLE_PACK || '';

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: resolvedPriceId }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = '/login?redirect=/pricing';
          return;
        }
        throw new Error('Checkout failed');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`bg-gray-900 text-white rounded-md py-2 px-4 font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 ${className}`}
    >
      {loading ? 'Redirecting...' : label}
    </button>
  );
}

export default CheckoutButton;
