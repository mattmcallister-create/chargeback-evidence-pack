# Bug Log — ChargebackKit v1

**Version:** 1.0
**Last Updated:** 2026-04-04
**Reviewer:** Claude (Phase 10 Hardening Pass)

---

## Summary

| Severity | Total | Fixed | Open |
|----------|-------|-------|------|
| CRITICAL | 5     | 5     | 0    |
| HIGH     | 5     | 2     | 3    |
| MEDIUM   | 9     | 0     | 9    |
| LOW      | 5     | 0     | 5    |
| **Total**| **24**| **7** | **17**|

---

## CRITICAL

| ID | File | Issue | Status | Fix |
|----|------|-------|--------|-----|
| BUG-001 | (missing) app/(auth)/login/page.tsx | No login page exists. Users clicking Sign In get 404. | FIXED | Created login page with password + magic link support |
| BUG-002 | (missing) app/auth/callback/route.ts | No auth callback route. OAuth and magic link flows fail completely. | FIXED | Created auth callback route handler |
| BUG-003 | middleware.ts | Middleware doesn't exclude /auth/callback. Auth callback blocked by redirect loop. | FIXED | Rewrote middleware with PUBLIC_ROUTES array including /auth/callback |
| BUG-004 | middleware.ts | No token refresh in middleware. Sessions expire silently. | FIXED | Middleware now calls supabase.auth.getUser() and refreshes cookies |
| BUG-005 | (missing) app/app/packs/new/page.tsx | Pack creation page doesn't exist. ROUTES.NEW_PACK points to 404. | FIXED | Created page wrapping DisputeWizard with access check |

## HIGH

| ID | File | Issue | Status | Fix |
|----|------|-------|--------|-----|
| BUG-006 | app/api/packs/route.ts | POST route accepts JSON without any schema validation. | OPEN | Add Zod schema validation |
| BUG-007 | webhooks/stripe/route.ts, settings/page.tsx | Credit operations use read-then-write without transactions. Race condition. | OPEN | Use Supabase RPC for atomic credit operations |
| BUG-011 | lib/constants.ts | No APP_NAME, SITE_URL, or SUPPORT_EMAIL constants. Brand scattered. | FIXED | Added centralized brand constants block |
| BUG-012 | marketing pages | Marketing uses "Evidence Pack" not "ChargebackKit". Email templates use "ChargebackKit". | FIXED | Standardized: ChargebackKit = brand, Evidence Pack = product noun |
| BUG-025 | (missing) app/(auth)/signup/page.tsx | No signup page exists. Users clicking Sign Up get 404. | FIXED | Created signup page with email + password flow |

## MEDIUM

| ID | File | Issue | Status | Fix |
|----|------|-------|--------|-----|
| BUG-008 | app/api/webhooks/stripe/route.ts | Webhook switch has no default case. Unknown events silently ignored. | OPEN | Add default case with structured logging |
| BUG-009 | app/api/webhooks/stripe/route.ts | 5 console.log statements in production webhook handler. | OPEN | Replace with structured logging or remove |
| BUG-010 | app/app/page.tsx (line 40) | Hardcoded localhost reference. Breaks in production. | OPEN | Use env variable or relative URL |
| BUG-013 | lib/constants.ts | No chargebackkit.app domain references in codebase. | OPEN | Use SITE_URL constant everywhere |
| BUG-014 | components/packs/dispute-wizard.tsx | 482-line form with 18 inputs has no loading/submitting state. | OPEN | Add isSubmitting state with spinner |
| BUG-015 | components/packs/dispute-wizard.tsx | Zero aria-* or role attributes in 482-line form. | OPEN | Add accessibility attributes |
| BUG-016 | app/app/settings/page.tsx | No loading skeleton or error state. | OPEN | Add Suspense with skeleton |
| BUG-020 | app/checkout/success/page.tsx | No loading indicator during redirect. | OPEN | Add loading spinner |
| BUG-022 | lib/pdf/rebuttal-generator.ts | OpenAI call has no retry or timeout. Hangs indefinitely on failure. | OPEN | Add timeout + exponential backoff |
| BUG-023 | app/api/*.ts | No rate limiting on any API endpoint. | OPEN | Add per-route rate limits |

## LOW

| ID | File | Issue | Status | Fix |
|----|------|-------|--------|-----|
| BUG-017 | app/app/deadlines/page.tsx | No loading skeleton. | OPEN | Add skeleton |
| BUG-018 | components/packs/exhibit-uploader.tsx | No drag & drop support for file uploads. | OPEN | Add drag zone |
| BUG-019 | components/packs/exhibit-uploader.tsx | No thumbnail preview for uploaded images. | OPEN | Add preview |
| BUG-021 | lib/auth/get-user.ts | Creates Supabase client directly instead of using shared lib. | OPEN | Refactor to shared client |
| BUG-024 | generation-status.tsx, exhibit-uploader.tsx | Uses `: any` type annotations. | OPEN | Replace with proper types |

---

## Missing Dependencies (Not Installed)

| Package | Purpose | Required For |
|---------|---------|-------------|
| zod | Input validation | BUG-006 fix |
| puppeteer | PDF generation | Production PDF output |
| openai | AI rebuttals | Production rebuttal generation |

---

## Notes

- Fixes for BUG-001 through BUG-005, BUG-011, BUG-012, BUG-025 created in Phase 10 hardening pass
- MEDIUM and LOW bugs tracked for next sprint
- Missing npm dependencies (zod, puppeteer, openai) need to be installed before those features work in production
- Middleware rewrite (BUG-003/004) is the single highest-impact fix — prevents auth loops and session expiry

---

## CRO Issues (Session 012)

| ID | File | Issue | Status | Fix |
|----|------|-------|--------|-----|
| CRO-001 | app/(marketing)/pricing/page.tsx | Pricing page metadata still says "Chargeback Evidence Pack Builder" instead of "ChargebackKit" — brand mismatch in Google results | FIXED | Updated title, description, and openGraph metadata to ChargebackKit |
| CRO-002 | app/(marketing)/pricing/page.tsx | FAQ copy references "the builder" and "this builder" instead of brand name | FIXED | Replaced 3 instances with "ChargebackKit" |
| CRO-003 | app/(marketing)/pricing/page.tsx | "No account required" framing signals throwaway tool | FIXED | Reframed to "Start immediately — no signup required" |
| CRO-004 | app/(marketing)/pricing/page.tsx | "72-hour download access" with "Files deleted after" warning creates anxiety | FIXED | Reframed to "72-hour access to your pack" without deletion warning |
| CRO-005 | app/(marketing)/pricing/page.tsx | FAQ order doesn't match visitor anxiety sequence — guarantee buried at end | FIXED | Moved guarantee FAQ to position #1 (highest anxiety first) |
| CRO-006 | app/(marketing)/page.tsx | Hero and final CTAs missing $39 price — clicks not pre-qualified | FIXED | Added " — $39" to all 3 CTA buttons |
| CRO-007 | app/(marketing)/page.tsx | Trust line says "Files deleted after 72 hours" — negative framing | FIXED | Changed to "72-hour access to your pack" |
| CRO-008 | app/(marketing)/page.tsx | Homepage references "The builder" instead of brand name | FIXED | Replaced 2 instances with "ChargebackKit" |
| CRO-009 | app/(marketing)/page.tsx | Missing Stripe trust badge in hero area | OPEN | Sprint 2: Add visual Stripe badge per CRO-Plan Section 5 |
| CRO-010 | app/(marketing)/pricing/page.tsx | Comparison table may not be above the fold | OPEN | Sprint 2: Ensure price anchoring table appears early |
| CRO-011 | multiple | Category chips may not link to category pages | OPEN | Sprint 2: Make chips clickable per CRO-Plan Section 2 |
| CRO-012 | deployment | onrender.com URL may be visible/indexed — damages trust | OPEN | Sprint 2: Canonical URLs + noindex for render URLs |

## Phase 13 — Launch Readiness Closures (2026-04-06)

| ID | Area | Status | Resolution |
|----|------|--------|------------|
| QA-009 | ops/runbook.md | CLOSED | Appended Phase 13 launch playbook (Render service spec, env var matrix [R1]/[R2]/[O], 8-step deploy sequence, GoDaddy+Render+Resend+ImprovMX DNS plan, production readiness checklist, search/canonical readiness, PostHog event taxonomy, weekly founder report plan, rapid iteration triggers, founder launch checklist, safety gate) |
| QA-010 | lib/analytics/posthog.ts | CLOSED | New PostHog client + PostHogProvider + PageviewTracker (SPA pageviews via usePathname/useSearchParams), initPostHog/track/identify/reset helpers |
| QA-011 | lib/analytics/events.ts | CLOSED | Typed event taxonomy (CTA_CLICK, PRICING_VIEW, CHECKOUT_START/COMPLETE, SIGNUP_*, PACK_*, PDF_*, BILLING_PORTAL_OPEN, ERROR) + typed wrapper functions |
| QA-012 | app/api/health/route.ts | CLOSED | Render healthcheck endpoint returning {ok,service,timestamp}, runtime nodejs, force-dynamic |
| QA-013 | render.yaml | CLOSED | Render Blueprint: Node 20, starter plan, Oregon, autoDeploy main, build/start commands, healthCheckPath /api/health, full env var matrix with sync:false for secrets |

### Launch readiness gate
Nothing in production flips live (Stripe live keys, custom domain, Resend sending domain, Supabase production redirect URLs) without explicit founder confirmation per Phase 13 safety gate. See ops/runbook.md Section 11.
