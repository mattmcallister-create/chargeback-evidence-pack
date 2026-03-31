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
