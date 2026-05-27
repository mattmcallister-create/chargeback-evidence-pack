// lib/analytics/posthog.tsx
// PostHog client + provider for ChargebackKit.
// Loaded once at the root layout. Safe to import in client and server
// components - the server import is a no-op.

'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { captureUTMParams, getUTMProperties } from './utm';

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

let initialized = false;

export function initPostHog() {
  if (initialized || typeof window === 'undefined' || !KEY) return;
  posthog.init(KEY, {
    api_host: HOST,
    capture_pageview: false, // we capture manually on route change
    capture_pageleave: true,
    autocapture: true,
    persistence: 'localStorage+cookie',
    person_profiles: 'identified_only',
  });
  initialized = true;

  // Capture UTM params on first load and register as super properties
  const utms = captureUTMParams();
  if (utms) {
    posthog.register(utms);
  }
}

function PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    if (!pathname || !initialized) return;
    const url = window.location.origin + pathname + (searchParams?.toString() ? '?' + searchParams.toString() : '');
    // Include UTM properties in every pageview for attribution
    const utmProps = getUTMProperties();
    posthog.capture('$pageview', { $current_url: url, ...utmProps });
  }, [pathname, searchParams]);
  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => { initPostHog(); }, []);
  if (!KEY) return <>{children}</>;
  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PageviewTracker />
      </Suspense>
      {children}
    </PHProvider>
  );
}

// Typed capture helper. Import and call from any client component.
export function track<T extends Record<string, unknown>>(event: string, props?: T) {
  if (typeof window === 'undefined' || !initialized) return;
  posthog.capture(event, props as any);
}

// Identify a user once they sign in. Call from your auth callback.
export function identify(userId: string, traits?: Record<string, unknown>) {
  if (typeof window === 'undefined' || !initialized) return;
  // Merge UTM properties into user traits for first-touch attribution
  const utmTraits = getUTMProperties();
  const mergedTraits = { ...utmTraits, ...traits };
  posthog.identify(userId, mergedTraits as any);
}

// Reset on logout to avoid cross-user contamination.
export function reset() {
  if (typeof window === 'undefined' || !initialized) return;
  posthog.reset();
}
