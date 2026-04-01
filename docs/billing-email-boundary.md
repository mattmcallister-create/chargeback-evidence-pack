# Billing-Email Boundary — ChargebackKit

**Last Updated:** 2026-04-01
**Status:** Decided
**Owner:** Matt McAllister

---

## Purpose

This document defines exactly which emails are sent by Stripe and which are
sent by the ChargebackKit application. The goal is zero duplication, zero
confusion, and a clear operational boundary a solo founder can maintain.

---

## The Rule

**Stripe owns all billing communication. The product owns all product communication. They never overlap.**

---

## Stripe Sends (automatically, no product code required)

| Email Type | Trigger | Stripe Setting |
|---|---|---|
| Payment receipt | Successful one-time payment | Dashboard → Settings → Emails → Successful payments ✅ |
| Subscription receipt | Each subscription invoice paid | Dashboard → Settings → Emails → Successful payments ✅ |
| Failed payment notice | Invoice payment fails | Dashboard → Settings → Emails → Failed payments ✅ |
| Upcoming renewal reminder | 3 days before subscription renewal | Dashboard → Billing → Customer emails → Upcoming renewals ✅ |
| Subscription canceled confirmation | User cancels via Customer Portal | Automatic via Portal |
| Refund confirmation | Manual refund issued in Stripe Dashboard | Automatic |
| Invoice PDF | Attached to receipt emails | Automatic |

### Stripe Dashboard Configuration Required

1. Go to **Stripe Dashboard → Settings → Emails**
2. Enable: **Successful payments** (sends receipt with PDF invoice)
3. Enable: **Failed payments** (notifies customer of payment issues)
4. Go to **Stripe Dashboard → Settings → Billing → Customer emails**
5. Enable: **Upcoming renewals** (3-day advance notice)

---

## ChargebackKit Sends (via Resend)

| Email Type | Trigger | Sent By |
|---|---|---|
| Purchase confirmation + next steps | First successful checkout (one-time or subscription) | Resend |
| Welcome email | New account signup | Supabase Auth (built-in) |
| Email verification | Account creation | Supabase Auth (built-in) |
| Password reset | User requests reset | Supabase Auth (built-in) |

### What the Purchase Confirmation Contains

The product sends ONE email after the first successful purchase. This email is
**not a receipt** — Stripe already sends the receipt. This email contains:

- "Welcome to ChargebackKit" (or "Your credits are ready" for returning buyers)
- How to create your first evidence pack (link to /dashboard)
- A note: "Stripe sent your receipt separately — check your inbox"
- Support contact info

### What the Product Does NOT Send

- Payment receipts (Stripe sends these)
- Invoice PDFs (Stripe attaches these to receipts)
- Failed payment alerts (Stripe sends these)
- Subscription renewal reminders (Stripe sends these)
- Refund confirmations (Stripe sends these)

---

## In-App Display When Stripe Sends the Email

If the user looks for billing information in the app:

1. **Dashboard sidebar** → `BillingStatusDisplay` component shows credits + subscription status
2. **"Manage Billing" button** → Links to Stripe Customer Portal where they can:
   - View all payment history
   - Download invoice PDFs
   - Update payment method
   - Cancel subscription
3. **Checkout success page** → Text says: "Stripe will email your receipt automatically."

The product never tries to replicate what the Portal already shows.

---

## Why This Boundary Matters

1. **No duplicate receipts**: Customer does not receive two emails about the same payment.
2. **No maintenance burden**: Stripe receipt templates are maintained by Stripe. No custom email templates to build or debug.
3. **Clear audit trail**: All financial communication is in Stripe. All product communication is in Resend. A solo founder can check either system independently.
4. **Compliance**: Stripe receipts include legally required information (business address, tax details) that we don't need to replicate.

---

## Failure Modes and Mitigations

| Scenario | What Happens | Mitigation |
|---|---|---|
| Stripe receipt email is delayed | User sees success page + credits in app, receipt arrives later | Success page says "Stripe will email your receipt" |
| Stripe receipt email goes to spam | User has credits, no receipt visible | Customer Portal has full history; in-app "Manage Billing" link |
| Resend purchase confirmation fails | User still has credits (provisioned by webhook, not email). Missing welcome email only. | Log error in Sentry. Non-critical. |
| Both Stripe and Resend fail simultaneously | User has credits (webhook succeeded). No emails at all. | Dashboard shows credits. User can proceed. |

---

## Environment Variables Required

```
# Stripe email settings: configured in Stripe Dashboard, not in env vars.
# Resend: RESEND_API_KEY (already in .env)
```

No additional env vars needed. The boundary is enforced by Stripe Dashboard
settings and the Resend integration in the purchase confirmation handler.
