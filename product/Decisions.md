# Architecture and Product Decisions Log
**Project:** Chargeback Evidence Pack Builder
**Last Updated:** 2026-03-30

This file is append-only. Do not delete past decisions. Mark superseded decisions as [SUPERSEDED] and add the new decision below.

---

## Decision Format

**DEC-[number]**
- **Date:**
- **Status:** Decided / Superseded / Under Review
- **Question:**
- **Decision:**
- **Rationale:**
- **Consequences:**
- **Alternatives Rejected:**

---

## Decisions

---

**DEC-001**
- **Date:** 2026-03-30
- **Status:** Decided
- **Question:** What hosting platform should v1 launch on?
- **Decision:** Render (free tier initially, upgrade on traction)
- **Rationale:** Free tier removes cost barrier for launch. Render supports Next.js well. Upgradeable without migration. Vercel free tier has serverless cold starts that would hurt PDF generation latency.
- **Consequences:** Free tier has spin-down delay on inactivity. Acceptable for v1 with low traffic.
- **Alternatives Rejected:** Vercel (cold start issues for PDF generation), Railway (slightly more complex for solo founder), Fly.io (overkill for v1).

---

**DEC-002**
- **Date:** 2026-03-30
- **Status:** Decided
- **Question:** How should billing and plan provisioning work?
- **Decision:** Stripe Checkout for payment, Stripe webhooks for provisioning (checkout.session.completed), Stripe Customer Portal for receipt management. No custom billing UI.
- **Rationale:** Stripe-hosted Checkout removes PCI scope from the app. Webhook-driven provisioning means server-side trust only — no client-side state can be manipulated to grant free access. Customer Portal removes the need to build receipt/invoice UI.
- **Consequences:** We must handle webhook signature verification with raw body (not parsed JSON) and use STRIPE_WEBHOOK_SECRET. We must handle idempotency to prevent duplicate credit grants.
- **Alternatives Rejected:** Custom payment form (adds PCI scope, adds UI build cost), client-side trust on checkout success redirect (insecure, easy to bypass).

---

**DEC-003**
- **Date:** 2026-03-30
- **Status:** Decided
- **Question:** What is the evidence file retention policy?
- **Decision:** Evidence files (exhibits and generated PDFs) deleted 72 hours after PDF generation. Intake answers retained for 90 days to allow re-generation. Both purged on account deletion request.
- **Rationale:** Minimize stored sensitive merchant data. Reduce data liability. Simple to communicate to users. Aligns with principle of least data retention.
- **Consequences:** Users must download their pack within 72 hours. Must build expiry job (cron or background worker). Must surface countdown timer in UI.
- **Alternatives Rejected:** 30-day retention (adds data liability), permanent retention (legally and ethically unacceptable for sensitive documents), no retention at all (breaks re-generation feature).

---

**DEC-004**
- **Date:** 2026-03-30
- **Status:** Decided
- **Question:** Should we offer a free tier?
- **Decision:** No free tier in v1. Consider a watermarked demo pack preview post-launch as a conversion test.
- **Rationale:** Free tier trains users to expect free, increases support burden, reduces conversion urgency. The product solves a high-stakes problem where paying $39 is clearly justified. A free tier would attract merchants who are not serious buyers.
- **Consequences:** No growth via free-to-paid conversion funnel in v1. Must rely on direct search/SEO and paid channels.
- **Alternatives Rejected:** Freemium with limited features (adds complexity), free first pack (too much abuse potential).

---

**DEC-005**
- **Date:** 2026-03-30
- **Status:** Decided
- **Question:** What AI model and prompting approach for rebuttal narrative generation?
- **Decision:** OpenAI GPT-4o via server-side API with category-specific structured prompts. Never expose API key client-side. Never trust user-provided content without sanitization.
- **Rationale:** GPT-4o provides best narrative quality for the use case. Server-side ensures key security. Structured prompts (not open-ended) constrain output to professional dispute language and prevent off-topic generation.
- **Consequences:** Per-generation cost (~$0.05–$0.15 at current GPT-4o pricing). Must monitor cost per pack. If costs rise, consider GPT-4o-mini fallback for draft pass.
- **Alternatives Rejected:** Claude API (also viable, switch if cost/quality dictates), local models (too slow for v1), open-ended prompting (produces inconsistent quality).

---

**DEC-006**
- **Date:** 2026-03-30
- **Status:** Under Review
- **Question:** pdf-lib or Puppeteer for PDF generation?
- **Decision:** TBD — evaluate in architecture phase.
- **Rationale pending evaluation:** pdf-lib is pure JS, no headless browser, simpler deployment. Puppeteer enables HTML→PDF with full styling control but adds Chromium dependency to server.
- **Consequences:** Impacts deployment size, render quality, and maintenance burden.
- **Alternatives:** React-pdf (component-based, strong typing), jsPDF (lighter but less control).

---

**DEC-007**
- **Date:** 2026-03-30
- **Status:** Decided
- **Question:** What is the primary product category framing?
- **Decision:** "Dispute evidence assembly platform" NOT "AI rebuttal letter writer."
- **Rationale:** "AI rebuttal letter writer" is easily commoditized. "Evidence assembly platform" owns the structured intake + exhibit labeling + PDF formatting step. This framing is defensible, premium, and differentiates from generic AI tools.
- **Consequences:** All marketing copy, headlines, and in-product language must reflect this. "Letter" is a kill word. "Pack," "evidence," and "submission-ready" are power words.
- **Alternatives Rejected:** "AI dispute tool" (too generic), "chargeback management" (too enterprise), "dispute software" (too vague).

---

**DEC-008**
- **Date:** 2026-03-30
- **Status:** Decided
- **Question:** What are the top 3 onboarding moments that must feel magical in the first 5 minutes?
- **Decision:**
  1. **Category selection → instant checklist reveal.** The moment a merchant selects "Subscription Cancelled," they immediately see the exact evidence list for that category. This is the "aha" moment — they realize this is not a generic tool.
  2. **First intake question answered → narrative preview snippet.** After answering 2-3 intake questions, show a partial preview of the rebuttal narrative forming. The merchant sees their own words transformed into professional dispute language in real time.
  3. **PDF download — first open.** The downloaded PDF must look polished, professional, and formatted exactly as if a lawyer produced it. Cover page, labeled sections, clear exhibit references. The first visual impression of the output must justify the $39 price immediately.
- **Rationale:** These three moments carry disproportionate weight for trust, conversion, and word-of-mouth. If any of the three fails, the product feels like a commodity.
- **Consequences:** Design and engineering must prioritize these three moments above all other UX work in v1.

---

**DEC-009**
- **Date:** 2026-03-30
- **Status:** Decided
- **Question:** Should we use Stripe least-privilege key separation?
- **Decision:** Yes. Use separate restricted keys for client-side (publishable key only), server-side payment intent creation, and webhook verification. Never use the full secret key for webhook verification — use STRIPE_WEBHOOK_SECRET and raw body signature check.
- **Rationale:** Least-privilege prevents a compromised key from having full account access. Raw body webhook verification prevents replay attacks.
- **Consequences:** Slightly more setup complexity at launch. Required for production security.
- **Alternatives Rejected:** Single secret key for all operations (too broad), client-side secret key usage (critical security error).

---

**DEC-010**
- **Date:** 2026-03-30
- **Status:** Decided
- **Question:** What is the v1 pricing model?
- **Decision:** $39 per pack, $99 for 3-pack bundle. No subscription. Stripe Customer Portal for receipts.
- **Rationale:** Episodic pricing matches episodic use (merchants don't have disputes every month). $39 is anchored against $300–$500 lawyer letter cost. Bundle encourages larger purchase from buyers who anticipate future disputes.
- **Consequences:** No recurring revenue in v1. Must convert on each dispute event. May introduce subscription for high-frequency users in v2.
- **Alternatives Rejected:** Monthly subscription (wrong fit for episodic use), annual plan (too much commitment for unknown product), free + premium (adds complexity, signals low value).

---

## Phase 2 — Architecture Decisions

---

**DEC-011**
- **Date:** 2026-03-31
- **Status:** Decided
- **Question:** Which PDF generation library should we use?
- **Decision:** Puppeteer (headless Chrome, HTML/CSS → PDF)
- **Rationale:** Render is always-on; no cold start penalty. HTML/CSS → PDF gives maximum design control. Most likely path to "looks like a lawyer produced it." Template changes require only HTML/CSS edits.
- **Consequences:** Server requires Chromium binary. Render plan must support the memory footprint. Not suitable for serverless/edge deployment.
- **Alternatives Rejected:** pdf-lib (pure JS but limited layout control), react-pdf (JSX-based, stronger typing but harder to achieve design fidelity).

---

**DEC-012**
- **Date:** 2026-03-31
- **Status:** Decided
- **Question:** What is the Postgres database schema for the dispute pack lifecycle?
- **Decision:** 7-table schema: `profiles`, `user_credits`, `webhook_events`, `packs`, `pack_exhibits`, `pack_generations`, `pack_deadlines`. Full schema in `architecture/db-schema.md`.
- **Rationale:** Atomic credit deduction via `deduct_credit()` SECURITY DEFINER function prevents race conditions. `webhook_events` UNIQUE `event_id` ensures Stripe webhook idempotency. `pack_generations` audit table preserves cost and credit restoration history. Separate `pack_deadlines` allows dismissal without mutating the pack record.
- **Consequences:** Migration must run in the order specified in db-schema.md. `deduct_credit()` and `restore_credit()` must be called server-side only.
- **Alternatives Rejected:** Single credits column on profiles (no audit trail), inline idempotency check without dedicated table (fragile).

---

**DEC-013**
- **Date:** 2026-03-31
- **Status:** Decided
- **Question:** What is the API route structure and async generation pattern?
- **Decision:** Next.js App Router API routes as documented in `architecture/api-routes.md`. Generation is async (202 Accepted); client polls every 3 seconds. `/api/webhooks/stripe` must have body parsing disabled (`export const dynamic = 'force-dynamic'`).
- **Rationale:** Polling is simpler than WebSockets for v1. Raw body required for Stripe signature verification. 202 Accepted cleanly separates submission from completion.
- **Consequences:** Client must implement a polling loop. If generation exceeds 30s OpenAI timeout, pack status is set to `failed` and credit is restored via `restore_credit()`.
- **Alternatives Rejected:** WebSockets (over-engineered for v1), synchronous generation endpoint (blocks connection, timeout risk).

---

**DEC-014**
- **Date:** 2026-03-31
- **Status:** Decided
- **Question:** How should Supabase Storage buckets be structured and secured?
- **Decision:** Two private buckets: `pack-exhibits` (10MB, user-uploadable) and `pack-pdfs` (50MB, server-write only). Path convention: `{bucket}/{user_id}/{pack_id}/...`. RLS policies enforce user_id ownership. Full spec in `architecture/storage-rls.md`.
- **Rationale:** Separate buckets allow different size limits and MIME type whitelists. No client INSERT on `pack-pdfs` prevents injecting arbitrary PDFs. Path-based RLS is the Supabase-recommended pattern. `SUPABASE_SERVICE_ROLE_KEY` server-side only.
- **Consequences:** PDF downloads require server-generated signed URLs (15-min expiry). Client cannot directly upload to pack-pdfs.
- **Alternatives Rejected:** Single bucket (harder to enforce size/MIME limits per type), public bucket (exposes files without auth).

---

**DEC-015**
- **Date:** 2026-03-31
- **Status:** Decided
- **Question:** What is the OpenAI prompt architecture for dispute narrative generation?
- **Decision:** GPT-4o with shared system prompt + per-category user prompt templates. JSON output via `response_format: { type: 'json_object' }`. Temperature 0.3, max_tokens 1000, 30s timeout. Full spec in `architecture/openai-prompts.md`.
- **Rationale:** Shared system prompt enforces no-win-guarantee guardrails across all categories. Temperature 0.3 reduces hallucination risk. Structured JSON (`GenerationResult` interface) enables reliable downstream processing. `win_assessment` surfaces honest signal without guaranteeing outcome.
- **Consequences:** Prompt templates use `{{variable}}` handlebars notation; runtime substitution must happen before API call. `evidence_gaps` array must be surfaced in UI if non-empty.
- **Alternatives Rejected:** Unstructured text output (fragile parsing), temperature 1.0 (too much hallucination risk), per-request system prompt (loses consistency guarantees).

---

**DEC-016**
- **Date:** 2026-03-31
- **Status:** Decided
- **Question:** What is the authoritative source of truth for supported dispute categories and evidence requirements?
- **Decision:** `product/evidence-matrix.md` is the authoritative reference. Category slug values in `packs.dispute_category` CHECK constraint must match slugs defined in the matrix. Intake question bank in the matrix defines all UI questions.
- **Rationale:** Single source of truth prevents drift between product spec, DB schema, and UI. Evidence gap detection rules feed directly into `evidence_gaps` generation output. Win/lose conditions inform `win_assessment` calibration.
- **Consequences:** Any new dispute category requires atomic updates to: evidence-matrix.md, the DB CHECK constraint, prompt templates, and intake UI.
- **Alternatives Rejected:** Hardcoding categories in DB schema only (creates drift), defining in UI code only (loses traceability).


---

## Phase 3 Architecture Decisions (Session 005)

**DEC-017**
- **Date:** 2026-03-31
- **Status:** Decided
- **Question:** What authentication method should be used for user accounts?
- **Decision:** Email/password auth via Supabase Auth built-in. Standard signup/login flow. Password reset via email (Supabase handles).
- **Rationale:** Most reliable login method — no email dependency per login session. Supabase Auth built-in means zero custom auth code. Matches B2B merchant expectations (they expect to set a password for a business tool).
- **Consequences:** Users must remember a password. One-time email required for password reset (acceptable). No passwordless convenience.
- **Alternatives Rejected:** Magic link (email delivery required on every login — any email outage locks all users out), Stripe-linked account creation (complex webhook-to-account flow, race conditions at registration, no clear recovery path).

---

**DEC-018**
- **Date:** 2026-03-31
- **Status:** Decided
- **Question:** How should transactional and auth email be delivered?
- **Decision:** Two-provider approach: (1) Supabase built-in SMTP for auth flows (email verification, password reset — triggered by Supabase automatically). (2) Resend free tier (100/day) for transactional emails (purchase confirmation only in V1).
- **Rationale:** Supabase handles auth emails natively with no extra setup. Resend provides reliable delivery for business emails with a simple Node.js SDK. Both free tiers are more than sufficient for V1 volume.
- **Consequences:** Two email providers in env vars (RESEND_API_KEY). Auth email templates are Supabase-managed. Resend usage must stay under 100/day on free tier.
- **Alternatives Rejected:** Single Resend provider for all email (requires custom auth email templates replacing Supabase defaults), SendGrid (higher complexity, no meaningful free tier), Postmark (no free tier), Mailgun (complex setup).

---

**DEC-019**
- **Date:** 2026-03-31
- **Status:** Decided
- **Question:** How should scheduled background jobs run?
- **Decision:** cron-job.org (free external cron service) calls secured Next.js API routes at `/api/cron/*` with `Authorization: Bearer CRON_SECRET` header. Two jobs: retention (hourly, deletes expired pack files from storage) and purge-answers (daily, nulls intake_answers older than 90 days).
- **Rationale:** Render free tier has no built-in cron. External cron is simpler than Supabase pg_cron (Postgres-only, harder to test, requires extension). API route cron is testable via curl, observable in Sentry, and version-controlled. cron-job.org is free and reliable.
- **Consequences:** CRON_SECRET env var required. API routes must validate CRON_SECRET before executing. External dependency on cron-job.org availability.
- **Alternatives Rejected:** Supabase pg_cron (Postgres extension required, logic in SQL not TypeScript, harder to test end-to-end), separate Render cron worker (second service, additional cost, deployment complexity), Vercel cron (not using Vercel).

---

**DEC-020**
- **Date:** 2026-03-31
- **Status:** Decided
- **Question:** How should application errors and uptime be monitored?
- **Decision:** Sentry (`@sentry/nextjs`) free tier (5K errors/month) for error capture with source maps. UptimeRobot free tier for uptime monitoring on `/api/admin/health` endpoint. OpenAI cost monitored via usage dashboard with $5/day email alert.
- **Rationale:** Sentry is the standard Next.js error monitoring integration. UptimeRobot provides email alerts on downtime with 5-minute check intervals. Both free tiers are adequate for V1 volume. Health endpoint provides a single observable signal for uptime tools.
- **Consequences:** SENTRY_DSN and NEXT_PUBLIC_SENTRY_DSN env vars required. Health endpoint must return 200 when DB connection is healthy. Sentry error budget is 5K/month — must not let uncaught errors run unchecked.
- **Alternatives Rejected:** Datadog (expensive at scale), LogRocket (frontend-session focused, not server errors), Honeybadger (less Next.js-native), no monitoring (blind to production errors and outages).

---

**DEC-021**
- **Date:** 2026-03-31
- **Status:** Decided
- **Question:** Should the application be a unified monolith or split into separate services?
- **Decision:** Option A — unified monolith. Single Next.js App Router service deployed to Render + Supabase (Auth + Postgres + Storage). Puppeteer runs in the same Node.js process. One codebase, one deploy target, one provider relationship. Full spec in `docs/ARCHITECTURE.md`.
- **Rationale:** Minimum viable operational surface for a solo founder. No cross-service JWT passing, no inter-service latency, no second deploy pipeline. Chromium memory overhead (~300MB) is acceptable given Render RAM headroom. Every component speaks directly to Supabase.
- **Consequences:** Chromium adds ~300MB to Render instance memory. PDF generation is async in Node.js (not a separate worker thread) — must not block the event loop synchronously. Monitor Render memory usage as PDF queue grows.
- **Alternatives Rejected:** Option B — split services (Next.js + separate Express PDF worker + Neon Postgres + AWS S3): two services, cross-service JWT passing, S3 IAM complexity, two deploy targets, added latency, no measurable user benefit at V1 volume.


---

**DEC-022**
- **Date:** 2026-03-30
- **Status:** Decided
- **Question:** Should we run antivirus scanning on uploaded exhibit files at V1?
- **Decision:** No AV scanning at V1. Validate file type via magic bytes check only.
- **Rationale:** AV scanning adds 2–5s latency per file, requires a third-party service (added cost and dependency), and the attack surface is limited: files are never served inline — only via signed URLs to the owning user. Magic bytes validation blocks the most likely vector (masquerading file type). Revisit if serving model changes to allow inline rendering.
- **Consequences:** Malicious file content (e.g., embedded macros in PDFs) passes through the upload gate. Acceptable because files are only downloaded by the authenticated owner, never executed server-side.
- **Alternatives Rejected:** VirusTotal API (latency, cost, third-party dependency); ClamAV sidecar (infrastructure overhead at V1 scale)

---

**DEC-023**
- **Date:** 2026-03-30
- **Status:** Decided
- **Question:** What Content Security Policy directives should the application send?
- **Decision:** `default-src 'none'` baseline with explicit allowlist for Stripe (`js.stripe.com`), Supabase (`*.supabase.co`), and Sentry (`*.sentry.io`, `browser.sentry-cdn.com`). No `unsafe-eval`. `unsafe-inline` permitted for styles only.
- **Rationale:** `default-src 'none'` forces every allowed source to be declared explicitly, preventing unexpected resource loading. Removing `unsafe-eval` blocks eval-based XSS escalation. `unsafe-inline` for styles is low-risk as CSS does not enable JS execution.
- **Consequences:** Any new external service requires a CSP update before its assets will load. New third-party integrations must be explicitly evaluated and allowlisted.
- **Alternatives Rejected:** `default-src 'self'` (too permissive); no CSP (leaves XSS fully exploitable)

---

**DEC-024**
- **Date:** 2026-03-30
- **Status:** Decided
- **Question:** How should rate limiting be implemented on auth and generation endpoints?
- **Decision:** Upstash Redis with `@upstash/ratelimit` sliding window algorithm. Auth endpoints: 10 req / 15 min / IP. Generation endpoint: 5 req / hour / user_id.
- **Rationale:** Upstash Redis is serverless-compatible (no persistent connection required), has a free tier sufficient for V1, and `@upstash/ratelimit` provides a clean API. Sliding window prevents burst exploitation at boundary conditions vs. fixed window.
- **Consequences:** Adds `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` to required env vars. Each rate-limited request incurs one additional network hop to Upstash.
- **Alternatives Rejected:** In-memory rate limiting (lost on redeploy); Render/Vercel built-in (not portable); Cloudflare Workers (over-engineered for current scale)

---

**DEC-025**
- **Date:** 2026-03-30
- **Status:** Decided
- **Question:** How do we prevent Puppeteer from making SSRF requests to internal cloud infrastructure during PDF generation?
- **Decision:** Enable `page.setRequestInterception(true)` and abort all requests that are not `data:` URI scheme.
- **Rationale:** Chromium can be directed to fetch internal cloud metadata endpoints (e.g., `169.254.169.254/latest/meta-data/`) via crafted intake field content. Intercepting and aborting all non-`data:` requests is the simplest and most complete mitigation. All exhibit content is already inlined as base64 data URIs before render time.
- **Consequences:** PDF templates cannot load external images, fonts, or stylesheets at render time — all assets must be inlined at build time.
- **Alternatives Rejected:** URL allowlist (fragile, cloud metadata endpoint addresses vary by provider); no interception (leaves SSRF open)

---

**DEC-026**
- **Date:** 2026-03-30
- **Status:** Decided
- **Question:** How should Supabase auth tokens be stored on the client?
- **Decision:** Use `@supabase/ssr` `createServerClient` with `httpOnly: true`, `secure: true`, `sameSite: 'strict'` cookie options. Tokens must never be stored in localStorage.
- **Rationale:** localStorage is readable by any JavaScript running on the page — XSS immediately exposes the session token. HttpOnly cookies are inaccessible to JavaScript by design. `SameSite=Strict` prevents token exfiltration via cross-site requests.
- **Consequences:** Session state requires server-side cookie handling. All auth reads must go through server components or API routes — cannot use the Supabase client SDK in pure client components for auth state.
- **Alternatives Rejected:** Supabase default localStorage (XSS exposes tokens); sessionStorage (same XSS risk as localStorage)

---

**DEC-027**
- **Date:** 2026-03-30
- **Status:** Decided
- **Question:** How should API routes handle and surface errors to callers?
- **Decision:** All catch blocks send the full error to Sentry via `Sentry.captureException(error)`, then return `{ "error": "internal_error" }` with HTTP 500. No stack traces, error messages, or internal details exposed in API responses.
- **Rationale:** Verbose error messages leak implementation details (function names, library versions, schema) that assist attackers. Sentry retains the full error internally without exposing it externally. A consistent error format simplifies front-end error handling.
- **Consequences:** Debugging production issues requires Sentry access. API callers receive minimal error detail — intentional.
- **Alternatives Rejected:** Returning `error.message` to client (information disclosure); stdout-only logging without Sentry (no alerting or aggregation)

---

**DEC-028**
- **Date:** 2026-03-30
- **Status:** Decided
- **Question:** What events should be audit-logged, and in what format?
- **Decision:** Structured JSON to stdout. 18 event types covering auth, uploads, pack generation, credit operations, and webhook events. Each entry includes `event`, `user_id`, `pack_id` (where applicable), `timestamp`, and `metadata`. Key events: `auth.login`, `upload.success`, `upload.rejected`, `credits.deducted`, `credits.granted`, `webhook.received`, `webhook.duplicate`, `admin.credit.manual_adjustment`.
- **Rationale:** Stdout logging integrates with Render log aggregation without additional infrastructure. Structured JSON is queryable. Credit-event coverage provides a forensic trail for billing disputes and fraud investigation. `webhook.duplicate` specifically enables detection of replay attacks in production.
- **Consequences:** Log volume scales with usage. No log retention policy at V1 — Render retains logs per platform defaults. No search UI unless Render log streaming is configured to an external store.
- **Alternatives Rejected:** Database audit table (write amplification, RLS policy complexity); no audit logging (blind to security events post-incident)


---

## Phase 8 — Billing Implementation Decisions (Session 008)

### DEC-029

**Date:** 2026-04-01
**Status:** Decided
**Question:** Should subscriptions be added alongside one-time purchases?

**Decision:** Yes. Add a monthly subscription plan ($29/month for 3 packs/month) alongside existing one-time purchases ($39 single, $99 bundle). Both use Stripe Checkout. Subscription lifecycle tracked in a new user_subscriptions table written exclusively by webhooks.

**Rationale:** The task requirement explicitly requests subscription support. Monthly subscriptions serve high-frequency merchants (those with regular chargebacks) while one-time purchases serve episodic users. Both paths use the same credit system. This supersedes DEC-010's "no subscription in v1" constraint.

**Consequences:** New user_subscriptions table required. Webhook handler must process six event types instead of one. Stripe Customer Portal configuration must enable subscription management. Access state machine expands from 2 states to 6 states. Monthly revenue becomes possible alongside one-time revenue.

**Alternatives Rejected:** Subscription-only model (wrong for episodic users), credit-topup-only with auto-refill (more complex Stripe configuration with less user clarity).

### DEC-030

**Date:** 2026-04-01
**Status:** Decided
**Question:** Who sends billing emails — Stripe or the product?

**Decision:** Stripe sends all financial communication (receipts, invoices, failed payment notices, renewal reminders). ChargebackKit sends only product communication (purchase confirmation with next steps, via Resend). The two never overlap. Full boundary documented in docs/billing-email-boundary.md.

**Rationale:** Duplicate receipt emails confuse customers and create support burden. Stripe receipts include legally required information. Letting Stripe own financial email means zero custom receipt templates to build or maintain.

**Consequences:** Must enable receipt emails in Stripe Dashboard. Product must NOT send any email that looks like a receipt. Success page must say "Stripe will email your receipt." In-app billing display links to Customer Portal for all financial history.

**Alternatives Rejected:** Product sends all emails including receipts (duplicates Stripe), product sends nothing (user has no product onboarding after purchase).

### DEC-031

**Date:** 2026-04-01
**Status:** Decided
**Question:** What is the canonical domain for all billing URLs?

**Decision:** chargebackkit.app is the canonical production domain. All success URLs, cancel URLs, portal return URLs, and webhook endpoint URLs use this domain. NEXT_PUBLIC_APP_URL defaults to https://chargebackkit.app.

**Rationale:** The brand is ChargebackKit. All billing return flows must use the final domain to prevent redirect mismatches when Stripe sends users back after checkout.

**Consequences:** NEXT_PUBLIC_APP_URL must be set correctly in each environment. Stripe webhook endpoint must be registered at https://chargebackkit.app/api/webhooks/stripe.

**Alternatives Rejected:** Using a subdomain like app.chargebackkit.app (unnecessary complexity), leaving domain as old brand.

### DEC-032

**Date:** 2026-04-01
**Status:** Decided
**Question:** How should the entitlement access state machine work?

**Decision:** Six states derived server-side from user_credits.credits + user_subscriptions.status: unpaid, one_time_active, subscription_active, subscription_canceling, subscription_past_due, subscription_expired. Generation is gated on canGenerate = credits > 0 AND state is not restricted. Credits are the universal entitlement unit.

**Rationale:** Credits as the universal unit keeps the generation pipeline simple: it always checks deduct_credit(). The six states give clear UX signals. Subscription_canceling still allows generation. Subscription_past_due blocks generation (creates urgency to fix payment).

**Consequences:** BillingStatus API endpoint returns the full state for UI rendering. Dashboard and generation gate read this state. Credits are never manipulated client-side. The entitlement module (lib/billing/entitlements.ts) is the single authority.

**Alternatives Rejected:** Time-based access (fragile), separate entitlement table (adds sync complexity), client-side state derivation (insecure).
---

## DEC-033: Triple-Layer Authentication
**Date:** 2026-04-04 | **Status:** Accepted

Every protected resource uses three auth layers: JWT verification, Supabase Row-Level Security, and explicit code-level ownership checks (user_id match). Defense in depth.

## DEC-034: Six Dispute Categories with Tailored Intake
**Date:** 2026-04-04 | **Status:** Accepted

Categories: Fraudulent, Product Not Received, Not As Described, Subscription Cancelled, Duplicate Charge, Credit Not Processed. Each has category-specific intake questions.

## DEC-035: Async PDF Generation with Polling
**Date:** 2026-04-04 | **Status:** Accepted

POST /generate returns 202 Accepted. Client polls /status every 3 seconds. Avoids long-running HTTP connections and request timeouts.

## DEC-036: Credit Deduction Before Generation
**Date:** 2026-04-04 | **Status:** Accepted

Credits are deducted via deduct_credit() BEFORE PDF generation starts. If any pipeline step fails, restore_credit() is called automatically. Prevents credit leaks.

## DEC-037: OpenAI GPT-4o for Rebuttal Narratives
**Date:** 2026-04-04 | **Status:** Accepted

AI-generated rebuttal narratives (300-500 words) using GPT-4o. Professional, factual tone. Cached in pack_generations.rebuttal_text to avoid regeneration costs.

## DEC-038: Puppeteer for PDF Generation
**Date:** 2026-04-04 | **Status:** Accepted

HTML template rendered to PDF via Puppeteer with A4 format, professional typography (11pt body, 16pt headings), 1-inch margins. 60-second timeout.

## DEC-039: Supabase Storage for Evidence
**Date:** 2026-04-04 | **Status:** Accepted

Exhibits stored in Supabase Storage bucket. Limits: 10MB per file, 50MB per pack. Signed URLs for secure access (1hr expiry). Filenames sanitized.

## DEC-040: Resend for Pack-Ready Email Only
**Date:** 2026-04-04 | **Status:** Accepted

ChargebackKit sends only pack-ready notifications via Resend. All billing emails (receipts, renewals, failures) handled by Stripe per DEC-030. No overlap.

## DEC-041: Deadline Urgency Thresholds
**Date:** 2026-04-04 | **Status:** Accepted

Three urgency levels: green (>14 days), yellow (7-14 days), red (<7 days). Visual badges on deadline tracker. Aggregated view across all user packs.
