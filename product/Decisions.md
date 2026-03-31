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
