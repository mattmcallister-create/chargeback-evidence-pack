// lib/analytics/events.ts
// Event taxonomy for ChargebackKit. Import EVENTS and call track(EVENTS.X, props)
// from your client components so misspellings cannot drift over time.

import { track } from './posthog';
import { getUTMProperties } from './utm';

export const EVENTS = {
  CTA_CLICK: 'cta_click',
  PRICING_VIEW: 'pricing_view',
  CHECKOUT_START: 'checkout_start',
  CHECKOUT_COMPLETE: 'checkout_complete',
  SIGNUP_START: 'signup_start',
  SIGNUP_COMPLETE: 'signup_complete',
  PACK_CREATE_START: 'pack_create_start',
  PACK_QUESTION_ANSWERED: 'pack_question_answered',
  EVIDENCE_UPLOADED: 'evidence_uploaded',
  PACK_CREATE_COMPLETE: 'pack_create_complete',
  PDF_GENERATE_START: 'pdf_generate_start',
  PDF_GENERATE_COMPLETE: 'pdf_generate_complete',
  PDF_GENERATE_FAILED: 'pdf_generate_failed',
  PDF_DOWNLOAD: 'pdf_download',
  PACK_EMAIL_SENT: 'pack_email_sent',
  BILLING_PORTAL_OPEN: 'billing_portal_open',
  ERROR: 'error',
} as const;

export type EventName = typeof EVENTS[keyof typeof EVENTS];

// Helper: merge UTM properties into every tracked event for attribution
function withUTM<T extends Record<string, unknown>>(props?: T): T & Record<string, string> {
  return { ...getUTMProperties(), ...(props as any) } as T & Record<string, string>;
}

// Convenience wrappers - keep call sites short and self-documenting.
export const trackCtaClick = (location: string, label: string, href?: string) =>
  track(EVENTS.CTA_CLICK, withUTM({ location, label, href }));

export const trackPricingView = (props?: { plan_visible?: string }) =>
  track(EVENTS.PRICING_VIEW, withUTM(props));

export const trackCheckoutStart = (plan: string, price_id: string) =>
  track(EVENTS.CHECKOUT_START, withUTM({ plan, price_id }));

export const trackCheckoutComplete = (plan: string, amount: number, currency = 'usd') =>
  track(EVENTS.CHECKOUT_COMPLETE, withUTM({ plan, amount, currency }));

export const trackPackCreateStart = (reason_code: string) =>
  track(EVENTS.PACK_CREATE_START, withUTM({ reason_code }));

export const trackPackQuestionAnswered = (step: number, question_id: string) =>
  track(EVENTS.PACK_QUESTION_ANSWERED, withUTM({ step, question_id }));

export const trackEvidenceUploaded = (file_count: number, total_bytes?: number) =>
  track(EVENTS.EVIDENCE_UPLOADED, withUTM({ file_count, total_bytes }));

export const trackPackCreateComplete = (pack_id: string, reason_code: string, duration_ms: number) =>
  track(EVENTS.PACK_CREATE_COMPLETE, withUTM({ pack_id, reason_code, duration_ms }));

export const trackPdfGenerateStart = (pack_id: string) =>
  track(EVENTS.PDF_GENERATE_START, withUTM({ pack_id }));

export const trackPdfGenerateComplete = (pack_id: string, pages: number, bytes: number, duration_ms: number) =>
  track(EVENTS.PDF_GENERATE_COMPLETE, withUTM({ pack_id, pages, bytes, duration_ms }));

export const trackPdfGenerateFailed = (pack_id: string, error: string) =>
  track(EVENTS.PDF_GENERATE_FAILED, withUTM({ pack_id, error }));

export const trackPdfDownload = (pack_id: string) =>
  track(EVENTS.PDF_DOWNLOAD, withUTM({ pack_id }));

export const trackBillingPortalOpen = () => track(EVENTS.BILLING_PORTAL_OPEN, withUTM());

export const trackError = (scope: string, message: string) =>
  track(EVENTS.ERROR, withUTM({ scope, message }));
