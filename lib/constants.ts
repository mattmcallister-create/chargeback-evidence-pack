// ─── Brand & Site Configuration ─────────────────────────────────────────────
export const APP_NAME = 'ChargebackKit';
export const APP_DESCRIPTION = 'Build submission-ready chargeback evidence packs';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://chargebackkit.app';
export const SUPPORT_EMAIL = 'support@chargebackkit.app';
export const FORWARDING_EMAIL = 'mattmcallistermarketing@gmail.com';

// ─── Routes ────────────────────────────────────────────────────────────────
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  PRICING: '/pricing',
  DASHBOARD: '/app',
  NEW_PACK: '/app/packs/new',
  PACK_DETAIL: '/app/packs',
  DEADLINES: '/app/deadlines',
  SETTINGS: '/app/settings',
  CHECKOUT_SUCCESS: '/checkout/success',
  CHECKOUT_CANCEL: '/checkout/cancel',
  AUTH_CALLBACK: '/auth/callback',
} as const;

// ─── Dispute Categories ───────────────────────────────────────────────
// Based on Stripe's dispute reason taxonomy.
// Each category drives the intake question flow and rebuttal strategy.

export const DISPUTE_CATEGORIES = [
  {
    id: 'fraudulent',
    label: 'Fraudulent',
    description: 'The cardholder claims they did not authorize the transaction.',
    icon: 'ShieldAlert',
    color: 'red',
  },
  {
    id: 'product_not_received',
    label: 'Product Not Received',
    description: 'The cardholder claims they never received the purchased product or service.',
    icon: 'PackageX',
    color: 'orange',
  },
  {
    id: 'not_as_described',
    label: 'Not As Described',
    description: 'The cardholder claims the product or service differs from what was described.',
    icon: 'FileWarning',
    color: 'yellow',
  },
  {
    id: 'subscription_canceled',
    label: 'Subscription Canceled',
    description: 'The cardholder claims they canceled a subscription but were still charged.',
    icon: 'CalendarX',
    color: 'purple',
  },
  {
    id: 'duplicate',
    label: 'Duplicate Charge',
    description: 'The cardholder claims they were charged more than once for the same transaction.',
    icon: 'Copy',
    color: 'blue',
  },
  {
    id: 'credit_not_processed',
    label: 'Credit Not Processed',
    description: 'The cardholder claims a promised refund or credit was never applied.',
    icon: 'CreditCard',
    color: 'teal',
  },
] as const;

export type DisputeCategory = (typeof DISPUTE_CATEGORIES)[number]['id'];

// ─── Pack Status ──────────────────────────────────────────────────────

export const PACK_STATUSES = [
  'draft',
  'submitted',
  'generating',
  'ready',
  'failed',
] as const;

export type PackStatus = (typeof PACK_STATUSES)[number];

// ─── File Upload Limits ───────────────────────────────────────────────

export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB per file
export const MAX_PACK_STORAGE_BYTES = 50 * 1024 * 1024; // 50 MB total per pack
export const MAX_EXHIBITS_PER_PACK = 25;

export const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'application/pdf',
  'text/plain',
  'text/csv',
] as const;

// ─── Storage Buckets ──────────────────────────────────────────────────

export const STORAGE_BUCKET_EXHIBITS = 'pack-exhibits';
export const STORAGE_BUCKET_PDFS = 'pack-pdfs';

// ─── Generation ───────────────────────────────────────────────────────

export const GENERATION_TIMEOUT_MS = 60_000; // 60 seconds
export const GENERATION_POLL_INTERVAL_MS = 3_000; // 3 seconds

// ─── Deadline Urgency ─────────────────────────────────────────────────

export const DEADLINE_URGENCY = {
  GREEN: 14, // > 14 days remaining
  YELLOW: 7, // 7-14 days remaining
  RED: 0, // < 7 days remaining
} as const;

export type UrgencyLevel = 'green' | 'yellow' | 'red';

// ─── App Routes ───────────────────────────────────────────────────────

export const ROUTES = {
  // Public
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  PRICING: '/pricing',

  // Protected
  DASHBOARD: '/app',
  NEW_PACK: '/app/packs/new',
  PACK_DETAIL: (id: string) => `/app/packs/${id}`,
  PACK_EDIT: (id: string) => `/app/packs/${id}/edit`,
  DEADLINES: '/app/deadlines',
  SETTINGS: '/app/settings',
} as const;
