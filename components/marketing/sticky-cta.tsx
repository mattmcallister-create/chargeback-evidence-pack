'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, X } from 'lucide-react';

/**
 * Sticky bottom CTA bar that appears after scrolling past the hero.
 * Shows on all marketing pages. Dismissable.
 */
export function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 600px (past hero)
      setVisible(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (dismissed || !visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 lg:hidden animate-slide-up">
      <div className="bg-brand-900/95 backdrop-blur-sm border-t border-brand-800 px-4 py-3 safe-area-bottom">
        <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-semibold truncate">
              Build your evidence pack
            </p>
            <p className="text-slate-400 text-xs">
              From $19 &middot; No subscription
            </p>
          </div>
          <Link
            href="https://buy.stripe.com/5kQaEY83P3f02Hdf0l3Nm02"
            className="shrink-0 inline-flex items-center gap-1.5 bg-emerald-500 text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Start
            <ArrowRight size={14} />
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="shrink-0 p-1 text-slate-500 hover:text-white transition-colors"
            aria-label="Dismiss"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
