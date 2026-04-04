# Test Plan — Chargeback Evidence Pack Builder v1
**Version:** 1.0
**Last Updated:** 2026-03-30
**Status:** Pre-build (acceptance criteria defined; tests to be written during build)

---

## 1. Testing Philosophy

This product handles financial tPage_DownPage_DownPage_DownPage_DownPage_Downransactions and sensitive merchant 

## Phase 8 — Billing Tests

### Unit Tests (__tests__/billing/checkout.test.ts)
- [x] Price configuration correctness (3 tiers, correct amounts, credits)
- [ ] - [x] deriveAccessState returns correct state for all 6 combinations
- [ ] - [x] deriveCanGenerate blocks restricted states, allows active states
- [ ] - [x] Domain and URL constants are correct
- [ ] - [x] Webhook event types are correctly defined
- [ ] - [x] Brand name is "ChargebackKit"
- [ ]
- [ ] ### Integration Tests (Manual — Stripe Test Mode)
- [ ] - [ ] One-time checkout creates session, redirects to Stripe
- [ ] - [ ] Subscription checkout creates session with mode: subscription
- [ ] - [ ] Webhook processes checkout.session.completed and grants credits
- [ ] - [ ] Webhook processes invoice.payment_succeeded for subscription renewal
- [ ] - [ ] Webhook deduplicates repeated events (idempotency)
- [ ] - [ ] Customer Portal link opens Stripe portal
- [ ] - [ ] Billing status API returns correct access state
- [ ] - [ ] Unauthorized access returns 401
- [ ]
- [ ] ### E2E Tests (Manual — Before Launch)
- [ ] - [ ] Full one-time purchase flow: pricing page → checkout → success page → credits visible
- [ ] - [ ] Full subscription flow: pricing page → checkout → success → monthly credits
- [ ] - [ ] Subscription cancellation via portal → subscription_canceling state
- [ ] - [ ] Failed payment → subscription_past_due → blocks generation
- [ ] - [ ] Receipt email received from Stripe after purchasedocuments. Testing is not optional.

**Priority order:**
1. Security (webhook verification, auth, access control)
2. Payment correctness (no free packs, no double-charges, no duplicate credits)
3. PDF output quality (the core product deliverable)
4. Acceptance criteria from features.json
5. UX and edge cases

**Test types used:**
- Unit tests (business logic, prompt construction, evidence mapping)
- Integration tests (Stripe webhook, Supabase operations, file storage)
- End-to-end tests (full pack creation flow, payment flow, PDF download)
- Manual QA (PDF visual quality, onboarding magic moments, copy review)
- Security tests (webhook spoofing, auth bypass attempts, file access)

---

## 2. Pre-Launch Mandatory Test Checklist

These items must all pass before any production traffic. Failing any one is a launch blocker.

### 2.1 Security
- [ ] Stripe webhook with invalid signature returns 400 and takes no action
- [ ] Stripe webhook with valid signature processes correctly
- [ ] Webhook handler uses raw body for signature verification (not parsed JSON)
- [ ] STRIPE_WEBHOOK_SECRET is not hardcoded anywhere in codebase
- [ ] Unauthenticated user cannot access any /app/* routes
- [ ] User A cannot view, edit, or download packs belonging to User B
- [ ] Exhibit files are not publicly accessible via direct URL
- [ ] Supabase Storage rules enforce per-user isolation
- [ ] No Stripe secret key exposed in client-side code or browser network tab
- [ ] API keys not present in any git commit (scan with git-secrets or equivalent)

### 2.2 Payment Correctness
- [ ] User with 0 credits cannot generate a pack (server enforces, not just UI)
- [ ] Paying $39 provisions exactly 1 credit (not 0, not 2)
- [ ] Paying $99 provisions exactly 3 credits
- [ ] Duplicate webhook delivery does not provision duplicate credits (idempotency)
- [ ] Failed generation returns credit to user
- [ ] User with 1 credit who generates a pack ends with 0 credits
- [ ] Stripe Checkout creates session server-side with correct price ID
- [ ] No payment amount can be modified client-side

### 2.3 PDF Output Quality
- [ ] PDF generates successfully for all 6 dispute categories
- [ ] PDF cover page contains: merchant name, dispute amount, category, deadline, generation date
- [ ] PDF checklist section shows correct items for category with checked/unchecked state
- [ ] PDF narrative section contains merchant-specific content (not boilerplate)
- [ ] PDF exhibits section contains all uploaded files in correct order with labels
- [ ] PDF contains no "guaranteed win" language
- [ ] PDF contains disclaimer about card network decisions
- [ ] PDF file opens without error in: Adobe Reader, macOS Preview, Chrome PDF viewer
- [ ] PDF under 20MB for typical pack (4-6 exhibits)
- [ ] PDF visual quality passes "looks like a lawyer made it" test (manual QA)

### 2.4 Data Retention
- [ ] Files deleted from storage after 72 hours (test with shortened expiry in staging)
- [ ] Intake answers retained for 90 days
- [ ] Expired packs show correct status in UI
- [ ] Re-generation from retained answers produces new PDF

### 2.5 Core Flow
- [ ] New user can complete full flow: signup → create pack → pay → generate → download
- [ ] Pack deadline deadline visible on dashboard
- [ ] Category selection immediately shows specific checklist (< 300ms)
- [ ] Partial narrative preview appears after 2 questions answered
- [ ] All 6 dispute categories have complete intake questionnaires
- [ ] Evidence gap detection fires for missing critical items
- [ ] User can mark pack as Submitted

---

## 3. Test Suites (To Be Written)

### 3.1 Unit Tests

**File: `lib/evidence-matrix.test.ts`**
- getChecklistForCategory(category) returns correct items for each of 6 categories
- getChecklistForCategory with invalid category throws error
- isEvidenceComplete(category, uploadedItems) returns correct gap analysis

**File: `lib/prompts.test.ts`**
- buildNarrativePrompt(category, answers) returns prompt with all answer fields interpolated
- buildNarrativePrompt does not include guaranteed win language in prompt or instructions
- buildNarrativePrompt handles missing optional fields gracefully

**File: `lib/stripe.test.ts`**
- verifyWebhookSignature(rawBody, sig, secret) returns event for valid signature
- verifyWebhookSignature throws for invalid signature
- getCreditsForProduct(priceId) returns 1 for single pack, 3 for bundle
- getCreditsForProduct throws for unknown price ID

**File: `lib/packs.test.ts`**
- createPack(userId, metadata) creates record with Draft status
- deductCredit(userId) is atomic and fails if credits = 0
- restoreCredit(userId) increments on generation failure
- setPdfExpiry(packId) sets expires_at to now + 72h

### 3.2 Integration Tests

**File: `tests/integration/webhook.test.ts`**
- POST /api/webhooks/stripe with valid checkout.session.completed provisions correct credits
- POST /api/webhooks/stripe with invalid signature returns 400
- POST /api/webhooks/stripe with duplicate event ID is idempotent

**File: `tests/integration/generation.test.ts`**
- POST /api/generate with valid pack ID and credit generates PDF and stores it
- POST /api/generate with 0 credits returns 402
- POST /api/generate with another user's pack ID returns 403
- POST /api/generate failure restores credit

**File: `tests/integration/storage.test.ts`**
- uploadExhibit(userId, packId, file) stores file in correct path
- getSignedUrl(userId, packId, filename) returns time-limited URL
- deletePackFiles(packId) removes all files for pack

### 3.3 End-to-End Tests (Playwright or Cypress)

**File: `tests/e2e/auth.test.ts`**
- Signup → email verification → login → dashboard
- Login with wrong password shows error without revealing field
- Password reset flow

**File: `tests/e2e/pack-creation.test.ts`**
- Full pack creation: metadata → category → intake → exhibits → preview
- Category change updates checklist instantly
- Partial save on blur

**File: `tests/e2e/payment.test.ts`**
- Stripe test mode: $39 purchase → webhook → credit visible → generate → download
- Stripe test mode: $99 purchase → 3 credits visible
- Blocked generation with 0 credits

**File: `tests/e2e/pdf-output.test.ts`**
- Download PDF for each of 6 categories
- Verify PDF structure programmatically (page count, section presence)

---

## 4. Manual QA Checklist (Pre-Launch)

Run by a human reviewer against staging environment.

### 4.1 Onboarding Magic Moments
- [ ] Category selection → checklist reveal feels instant and specific (not generic)
- [ ] After 2 intake questions → partial narrative preview is visible and professional
- [ ] PDF download → opened PDF looks like a lawyer produced it

### 4.2 Copy and Trust Review
- [ ] No guaranteed win language anywhere in UI, emails, or PDF
- [ ] Retention policy disclosure visible at generation time
- [ ] Pricing clearly shown before any payment step
- [ ] No dark patterns at checkout (no pre-selected upgrades, no surprise fees)
- [ ] Stripe "Powered by Stripe" badge visible at checkout

### 4.3 Edge Case Review
- [ ] Upload rejected file type shows friendly error
- [ ] Upload oversized file shows friendly error
- [ ] Missing required intake field shows specific validation error
- [ ] Expired pack shows clear UI status with re-generate option
- [ ] User with no packs sees useful empty state on dashboard

### 4.4 Cross-Browser / Cross-Device
- [ ] Chrome desktop
- [ ] Safari desktop
- [ ] Chrome mobile (responsive layout)
- [ ] Firefox desktop

---

## 5. Staging Environment Requirements

Before running tests:
- Supabase project in staging mode
- Stripe in test mode (use Stripe test card: 4242 4242 4242 4242)
- STRIPE_WEBHOOK_SECRET set for test webhook endpoint
- OpenAI API key with rate limit headroom for test generation
- File retention job testable with short expiry window (e.g., 5 minutes instead of 72 hours)

---

## 6. Known Test Gaps (To Resolve Before Launch)

| Gap | Risk | Owner | Due |
|-----|------|-------|-----|
| PDF visual quality has no automated check | High | QA | Before launch |
| Network-specific evidence rule accuracy not tested | Medium | PM/QA | Before launch |
| Rate limiting on webhook endpoint not verified | High | Security | Before launch |
| File upload virus/malware scanning not implemented | Medium | Arch | v2 |


---

## Phase 9 — Core Application Test Plan (2026-04-04)

### 1. Auth & Protected Routes

| Test | Type | Expected |
|------|------|----------|
| Unauthenticated access to /app/* | Integration | Redirect to /login |
| getAuthenticatedUser() with valid JWT | Unit | Returns user object |
| getAuthenticatedUser() with no JWT | Unit | Throws 401 |
| Middleware redirects preserve return URL | Integration | ?redirect=/app/packs/123 |

### 2. Pack CRUD

| Test | Type | Expected |
|------|------|----------|
| POST /api/packs creates draft pack | Integration | 201, pack in DB |
| GET /api/packs lists only user's packs | Integration | No other user's packs |
| GET /api/packs/[id] with wrong user | Integration | 403 Forbidden |
| PUT /api/packs/[id] updates merchant info | Integration | 200, fields updated |

### 3. Intake Wizard

| Test | Type | Expected |
|------|------|----------|
| Category selection renders 6 options | Unit | All categories visible |
| Question validation rejects empty required fields | Unit | Validation errors shown |
| Wizard submit creates pack via API | E2E | Pack appears in dashboard |
| Edit page pre-populates existing answers | E2E | Fields filled correctly |

### 4. Evidence Upload

| Test | Type | Expected |
|------|------|----------|
| Upload file under 10MB | Integration | 201, exhibit in DB |
| Upload file over 10MB | Integration | 400, error message |
| Upload when pack exceeds 50MB total | Integration | 400, quota error |
| Delete exhibit removes from storage | Integration | File deleted, exhibit removed |
| Reorder exhibits updates display_order | Integration | New order persisted |

### 5. PDF Generation (Critical Path)

| Test | Type | Expected |
|------|------|----------|
| POST /generate deducts credit | Integration | Credit count decremented |
| POST /generate returns 202 | Integration | Async job started |
| GET /generate/status returns pending/ready/failed | Integration | Correct status |
| Generation failure restores credit | Integration | Credit count restored |
| Generated PDF has cover page, summary, rebuttal, exhibits | E2E | All sections present |
| Download returns signed URL | Integration | Valid 1hr URL |

### 6. Email

| Test | Type | Expected |
|------|------|----------|
| Pack-ready email sent after generation | Integration | Resend API called |
| Email contains download link | Unit | Link present in template |
| Email failure doesn't fail generation | Integration | Pack still marked ready |

### 7. Deadlines

| Test | Type | Expected |
|------|------|----------|
| POST deadline with valid date | Integration | 201, deadline created |
| Urgency badge green for >14 days | Unit | Green color |
| Urgency badge yellow for 7-14 days | Unit | Yellow color |
| Urgency badge red for <7 days | Unit | Red color |
| Aggregated view shows all user deadlines | E2E | Cross-pack deadlines |

### 8. Error Handling & Loading States

| Test | Type | Expected |
|------|------|----------|
| ErrorBoundary catches render error | Unit | Recovery UI shown |
| ErrorBoundary Try Again resets state | Unit | Children re-rendered |
| NotFoundError returns 404 status | Unit | statusCode === 404 |
| Loading skeletons render with animate-pulse | Unit | Correct CSS classes |
