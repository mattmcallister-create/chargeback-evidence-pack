/**
 * Critical tests for the Stripe webhook handler.
 *
 * These tests validate the core payment processing pipeline:
 * - Signature verification
 * - Idempotency (duplicate event rejection)
 * - Credit granting on checkout.session.completed
 * - Graceful handling of missing user_id
 *
 * Uses Vitest with mocked Stripe and Supabase dependencies.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

// âââ Mock Setup ââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

// Mock Stripe
const mockConstructEvent = vi.fn();
vi.mock('@/lib/stripe', () => ({
  stripe: {
    webhooks: { constructEvent: (...args: unknown[]) => mockConstructEvent(...args) },
    subscriptions: { retrieve: vi.fn() },
  },
}));

// Mock Supabase admin
const mockSupabaseFrom = vi.fn();
vi.mock('@/lib/supabase-admin', () => ({
  supabaseAdmin: {
    from: (...args: unknown[]) => mockSupabaseFrom(...args),
  },
}));

// Mock billing entitlements
const mockGrantCredits = vi.fn();
const mockUpsertSubscription = vi.fn();
vi.mock('@/lib/billing/entitlements', () => ({
  grantCredits: (...args: unknown[]) => mockGrantCredits(...args),
  upsertSubscription: (...args: unknown[]) => mockUpsertSubscription(...args),
}));

// Mock billing types
vi.mock('@/lib/billing/types', () => ({
  HANDLED_WEBHOOK_EVENTS: [
    'checkout.session.completed',
    'customer.subscription.created',
    'customer.subscription.updated',
    'customer.subscription.deleted',
    'invoice.payment_succeeded',
    'invoice.payment_failed',
  ],
}));

// Import AFTER mocks are set up
import { POST } from '@/app/api/webhooks/stripe/route';
import { NextRequest } from 'next/server';

// âââ Helpers âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

function makeRequest(body: string, signature = 'sig_valid'): NextRequest {
  return new NextRequest('http://localhost:3000/api/webhooks/stripe', {
    method: 'POST',
    body,
    headers: {
      'stripe-signature': signature,
      'content-type': 'application/json',
    },
  });
}

function makeCheckoutEvent(overrides: Record<string, unknown> = {}) {
  return {
    id: 'evt_test_' + Math.random().toString(36).slice(2),
    type: 'checkout.session.completed',
    data: {
      object: {
        mode: 'payment',
        metadata: { user_id: 'user-123', credits: '5' },
        ...overrides,
      },
    },
  };
}

function setupIdempotencyMocks(existingEvent: unknown = null, insertError: unknown = null) {
  mockSupabaseFrom.mockImplementation((table: string) => {
    if (table === 'webhook_events') {
      return {
        select: () => ({
          eq: () => ({
            single: () => Promise.resolve({ data: existingEvent, error: null }),
          }),
        }),
        insert: () => Promise.resolve({ error: insertError }),
      };
    }
    return {};
  });
}

// âââ Tests âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

describe('Stripe Webhook Handler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Signature Verification', () => {
    it('returns 400 when stripe-signature header is missing', async () => {
      const req = new NextRequest('http://localhost:3000/api/webhooks/stripe', {
        method: 'POST',
        body: '{}',
      });

      const res = await POST(req);
      expect(res.status).toBe(400);
      const text = await res.text();
      expect(text).toContain('Missing signature');
    });

    it('returns 400 when signature verification fails', async () => {
      mockConstructEvent.mockImplementation(() => {
        throw new Error('Invalid signature');
      });

      const req = makeRequest('{}', 'sig_invalid');
      const res = await POST(req);
      expect(res.status).toBe(400);
      const text = await res.text();
      expect(text).toContain('Invalid signature');
    });
  });

  describe('Idempotency', () => {
    it('returns 200 and skips processing for duplicate events', async () => {
      const event = makeCheckoutEvent();
      mockConstructEvent.mockReturnValue(event);

      // Simulate existing event found in database
      setupIdempotencyMocks({ id: 'existing-uuid' });

      const req = makeRequest(JSON.stringify(event));
      const res = await POST(req);

      expect(res.status).toBe(200);
      const text = await res.text();
      expect(text).toContain('Already processed');
      // grantCredits should NOT have been called
      expect(mockGrantCredits).not.toHaveBeenCalled();
    });

    it('returns 200 on unique constraint violation (race condition)', async () => {
      const event = makeCheckoutEvent();
      mockConstructEvent.mockReturnValue(event);

      // No existing event, but insert fails with unique constraint
      setupIdempotencyMocks(null, { code: '23505', message: 'duplicate key' });

      const req = makeRequest(JSON.stringify(event));
      const res = await POST(req);

      expect(res.status).toBe(200);
      const text = await res.text();
      expect(text).toContain('Already processing');
    });
  });

  describe('Credit Granting', () => {
    it('grants correct number of credits on checkout.session.completed', async () => {
      const event = makeCheckoutEvent();
      mockConstructEvent.mockReturnValue(event);

      // No existing event, insert succeeds
      setupIdempotencyMocks(null, null);

      const req = makeRequest(JSON.stringify(event));
      const res = await POST(req);

      expect(res.status).toBe(200);
      expect(mockGrantCredits).toHaveBeenCalledWith('user-123', 5);
    });

    it('defaults to 1 credit when metadata.credits is missing', async () => {
      const event = makeCheckoutEvent({ metadata: { user_id: 'user-456' } });
      mockConstructEvent.mockReturnValue(event);
      setupIdempotencyMocks(null, null);

      const req = makeRequest(JSON.stringify(event));
      const res = await POST(req);

      expect(res.status).toBe(200);
      expect(mockGrantCredits).toHaveBeenCalledWith('user-456', 1);
    });
  });

  describe('Missing user_id Handling', () => {
    it('returns 500 when checkout event has no user_id in metadata', async () => {
      const event = makeCheckoutEvent({ metadata: {} });
      mockConstructEvent.mockReturnValue(event);
      setupIdempotencyMocks(null, null);

      const req = makeRequest(JSON.stringify(event));
      const res = await POST(req);

      expect(res.status).toBe(500);
      expect(mockGrantCredits).not.toHaveBeenCalled();
    });
  });

  describe('Unhandled Event Types', () => {
    it('returns 200 and ignores unhandled event types', async () => {
      const event = {
        id: 'evt_unhandled',
        type: 'payment_intent.created',
        data: { object: {} },
      };
      mockConstructEvent.mockReturnValue(event);

      const req = makeRequest(JSON.stringify(event));
      const res = await POST(req);

      expect(res.status).toBe(200);
      const text = await res.text();
      expect(text).toContain('not handled');
      // No database interaction should occur
      expect(mockSupabaseFrom).not.toHaveBeenCalled();
    });
  });
});
