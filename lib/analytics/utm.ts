// lib/analytics/utm.ts
// UTM parameter capture and persistence for ChargebackKit.
// Reads UTM params from the URL on first visit, stores in sessionStorage,
// and provides them as properties to attach to PostHog events.

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;
const STORAGE_KEY = 'ck_utm';

export type UTMParams = Partial<Record<typeof UTM_KEYS[number], string>>;

/**
 * Capture UTM parameters from the current URL.
 * Only captures on the first page load that has UTM params -- subsequent
 * navigations within the SPA won't overwrite the original attribution.
 */
export function captureUTMParams(): UTMParams | null {
  if (typeof window === 'undefined') return null;

  // If we already have stored UTMs, return those (first-touch attribution)
  const stored = getStoredUTMs();
  if (stored) return stored;

  const params = new URLSearchParams(window.location.search);
  const utms: UTMParams = {};
  let hasAny = false;

  for (const key of UTM_KEYS) {
    const val = params.get(key);
    if (val) {
      utms[key] = val;
      hasAny = true;
    }
  }

  if (!hasAny) return null;

  // Persist for the session
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utms));
  } catch {
    // sessionStorage unavailable -- silently continue
  }

  return utms;
}

/**
 * Retrieve stored UTM params (first-touch from this session).
 */
export function getStoredUTMs(): UTMParams | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UTMParams) : null;
  } catch {
    return null;
  }
}

/**
 * Get UTM params as flat properties suitable for PostHog event properties.
 * Returns an empty object if no UTMs are present.
 */
export function getUTMProperties(): Record<string, string> {
  const utms = getStoredUTMs() ?? captureUTMParams();
  if (!utms) return {};

  const props: Record<string, string> = {};
  for (const [key, value] of Object.entries(utms)) {
    if (value) props[key] = value;
  }
  return props;
}
