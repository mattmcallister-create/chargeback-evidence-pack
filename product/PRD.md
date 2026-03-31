# Product Requirements Document — Chargeback Evidence Pack Builder
**Version:** 1.0
**Status:** Draft
**Last Updated:** 2026-03-30
**Owner:** Matt McAllister

---

## 1. Product Promise

Chargeback Evidence Pack Builder gives Stripe-first merchants a structured, submission-grade evidence pack — a properly formatted, claim-specific PDF — in under 30 minutes, without hiring a lawyer or guessing what evidence a card network wants to see.

The product does not promise to win disputes. It promises to submit the strongest possible evidence package for the dispute category at hand.

---

## 2. Ideal Customer Profile

**Primary:** Solo founders and small e-commerce teams (1–10 people) processing $10k–$500k/month on Stripe who lose chargebacks because they submit weak or poorly organized evidence, not because they have a bad case.

**Secondary:** Freelancers and SaaS operators who regularly face "product not as described" or "subscription cancelled" disputes.

**Negative ICP:** Enterprise merchants with dedicated risk teams. Large platforms that need bulk/API processing. Merchants who want legal representation.

---

## 3. Jobs to Be Done

| Job | Severity | v1? |
|-----|----------|-----|
| Know which evidence documents are required for MY dispute category | Critical | Yes |
| Stop guessing what to write in the rebuttal letter | Critical | Yes |
| Assemble all exhibits in one labeled, ordered PDF | Critical | Yes |
| Track the response deadline so I do not miss it | High | Yes |
| Pay only when I need a pack, not a monthly retainer | High | Yes |
| Understand why I lost so I can prevent future chargebacks | Medium | No |
| Batch-process multiple disputes at once | Low | No |

---

## 4. V1 Workflows

### 4.1 Create Dispute Pack
1. Merchant creates account (email + password).
2. Merchant clicks "New Dispute Pack."
3. Merchant enters: dispute amount, Stripe dispute ID (optional), response deadline, cardholder name, last 4 digits of card.
4. Merchant selects the Stripe dispute reason category from a structured dropdown.
5. System presents category-specific intake questionnaire (structured fields, not open text).
6. Merchant answers questions and uploads labeled exhibit files (PDF, PNG, JPG; max 10MB each, max 20 files).
7. Merchant previews structured data before generating.

### 4.2 Generate Evidence Pack
1. Merchant clicks "Generate Pack."
2. System checks that merchant has an active paid session or prepaid pack credit.
3. AI generates rebuttal narrative using category-specific prompt and merchant answers.
4. System assembles: cover page, category checklist (checked/unchecked), rebuttal narrative, labeled exhibits, in that order.
5. PDF is generated and stored temporarily (72-hour retention window).
6. Merchant downloads the pack.

### 4.3 Pay Self-Serve
1. Merchant clicks "Buy Pack" or is gated at generation time.
2. Stripe Checkout session is created server-side.
3. Merchant completes payment on Stripe-hosted page.
4. Stripe webhook checkout.session.completed provisions one pack credit.
5. Merchant is redirected to dashboard with credit available.
6. Stripe Customer Portal available for receipts and subscription management (future).

### 4.4 Track Deadlines
1. Each dispute pack shows: creation date, response deadline, status (Draft / Generated / Submitted).
2. Merchant can mark pack as Submitted manually.
3. Future: email reminders at 7 days and 48 hours before deadline.

---

## 5. Stripe Dispute Reason Categories (V1 Support)

- Fraudulent (unauthorized transaction)
- Product not received
- Product unacceptable / not as described
- Subscription cancelled
- Duplicate charge
- Credit not processed

---

## 6. Category-Specific Evidence Mapping (Summary)

Each category maps to a structured checklist. Full matrix in product/evidence-matrix.md (Phase 2).

**Fraudulent:** AVS/CVV match, IP address at transaction time, signed ToS with timestamp, delivery confirmation with signature, prior purchase history from same card/device.

**Subscription Cancelled:** Cancellation policy shown at signup, proof subscriber did NOT cancel before charge, login activity logs, service usage logs, email correspondence.

**Product Not Received:** Carrier tracking with delivery confirmation, proof of shipment, order details with shipping address, communication with buyer about delivery.

**Product Not as Described:** Product description at time of purchase, photos/screenshots of product, communication with buyer about product, return/refund policy.

---

## 7. V1 Non-Goals

- No guaranteed win language anywhere in the product or marketing.
- No legal advice. Product is a document assembly tool, not legal representation.
- No bulk/batch dispute processing.
- No direct Stripe API integration to auto-pull dispute data.
- No white-labeling for agencies.
- No mobile app (responsive web only).
- No saved templates per merchant — each pack is fresh.
- No email reminders in v1 (tracked deadline only).
- No analytics dashboard.

---

## 8. Evidence Retention Policy

**Recommendation:** Stored evidence (exhibits and generated PDFs) should be deleted automatically 72 hours after the PDF is generated and made available for download.

**Implementation requirements:**
- On PDF generation: set expires_at = now + 72h on the pack record.
- Scheduled job deletes files and marks pack as expired.
- User is warned at generation time: "Your pack will be available to download for 72 hours."
- User can re-generate from saved intake answers (retained 90 days).
- Intake answers purged after 90 days.
- No evidence files stored beyond 72 hours under any plan.

---

## 9. Tech Stack Targets (V1)

- **Frontend:** Next.js (App Router), Tailwind CSS, shadcn/ui
- **Backend:** Next.js API routes + server actions
- **Database:** Supabase (Postgres + Auth + Storage)
- **AI:** OpenAI API (GPT-4o) via structured prompts
- **PDF Generation:** pdf-lib or Puppeteer (TBD in architecture phase)
- **Payments:** Stripe Checkout + Webhooks
- **Hosting:** Render (free tier initially)
- **File Storage:** Supabase Storage with signed URLs

---

## 10. Pricing (V1)

- **Pay-per-pack:** $39 per evidence pack
- **Bundle:** $99 for 3 packs (~15% savings)
- No subscription in v1. Customer Portal for receipts.
- Pricing rationale: A lawyer letter costs $200–$500. $39 is a clear value anchor with room to raise.

---

## 11. Launch Success Criteria

| Metric | Target (30 days post-launch) |
|--------|------------------------------|
| First paying customer | Day 1 |
| Packs generated | 10 |
| Revenue | $390+ (10 packs @ $39) |
| Crash-free PDF export rate | >95% |
| Support tickets about confusing UX | <3 |
| Evidence checklist accuracy complaints | 0 |
| Stripe webhook delivery failures | 0 |

---

## 12. Open Questions

| # | Question | Owner | Due |
|---|----------|-------|-----|
| 1 | Use pdf-lib or Puppeteer for PDF generation? | Architect | Phase 2 |
| 2 | Store intake answers in Supabase or encrypted local? | Architect | Phase 2 |
| 3 | Add email reminders in v1 or push to v2? | PM | Before build |
| 4 | Offer a free demo pack (watermarked)? | Growth | Before launch |
