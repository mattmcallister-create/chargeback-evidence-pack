# Page Blueprints — Chargeback Evidence Pack Builder

Version: 1.0  Phase: 3 — Design System  Date: 2026-03-30  Owner: Matt McAllister

---

## Information Architecture Overview

### Marketing Site (public, unauthenticated)

| Path | Page | Primary Goal |
|---|---|---|
| / | Home | Convert visitor to signup |
| /how-it-works | How It Works | Explain the product, overcome skepticism |
| /pricing | Pricing | Remove pricing friction, drive purchase intent |
| /faq | FAQ | Pre-handle objections before support contact |
| /login | Login | Return user access |
| /signup | Signup | New account creation |
| /terms | Terms of Service | Legal compliance |
| /privacy | Privacy Policy | Trust + legal compliance |
| /refund | Refund Policy | Trust signal, pre-purchase reassurance |

### App (authenticated)

| Path | Screen | Primary Goal |
|---|---|---|
| /dashboard | Dashboard | Overview of packs + deadlines, entry to new pack |
| /packs/new | New Dispute Pack | Create pack, complete intake, upload exhibits |
| /packs/[id] | Pack Detail | Review pack, generate PDF, download |
| /packs/[id]/exhibits | Exhibit Manager | Upload, label, and manage exhibit files |
| /packs/[id]/preview | PDF Preview | Preview and download generated PDF |
| /settings | Billing & Settings | Manage account, view purchase history |

---

## Marketing Site Pages

---

### Page: Home (/)

**Purpose:** Convert first-time visitors from search or referral into signups. Establish trust, explain the product clearly, pre-handle core objections, drive to "Create Your First Pack."

**Primary CTA:** "Create Your First Pack" (primary button, xl size, brand-800)

**Secondary CTA:** "See how it works" (ghost button, scroll-anchor to How It Works section)

**Page hierarchy:**
1. Nav (sticky)
2. Hero section
3. Problem statement
4. How It Works (3-step summary)
5. What You Get (features)
6. Trust block
7. Pricing teaser
8. Final CTA

**Core sections:**

HERO
- H1: "Submit Dispute Evidence That Card Networks Actually Accept"
- H2: "Answer a few structured questions. Upload your exhibits. Get a fully assembled, labeled PDF evidence pack — built specifically for your dispute reason."
- Two CTAs: "Create Your First Pack" (primary xl) + "See how it works" (ghost)
- Trust line below CTAs: "No subscription. $39 per pack. Files deleted after 72 hours."
- Visual: mockup or illustration of a clean evidence pack PDF (right side, desktop)

PROBLEM STATEMENT
- H2: "Most merchants lose chargebacks — not because they lack evidence, but because they submit it wrong."
- 3 pain points in cards: "Wrong order" / "Missing documents" / "No rebuttal narrative"
- Each card: amber warning icon + 1-line explanation

HOW IT WORKS
- H2: "A submission-ready evidence pack in 30 minutes"
- 3 numbered steps:
  1. Choose your dispute category (6 categories shown as chips)
  2. Answer structured intake questions (category-specific — not a generic form)
  3. Download your labeled PDF evidence pack
- Link: "See full walkthrough" → /how-it-works

WHAT YOU GET
- H2: "Everything your evidence pack needs"
- Feature grid (2×3 on desktop, 1-col mobile):
  - Category-specific evidence checklist
  - AI-generated rebuttal narrative
  - Labeled exhibit assembly
  - Cover page + structured PDF
  - Deadline tracking
  - 72-hour secure download
- Each: icon + name + 1-line description

TRUST BLOCK
- H2: "Built for merchants, not lawyers"
- 3 trust items:
  - "No guaranteed win language" — we set honest expectations
  - "Files deleted after 72 hours" — minimum data retention
  - "Payments secured by Stripe" — Stripe badge shown
- Pre-launch social proof placeholder: "Built with the evidence logic that dispute specialists use."

PRICING TEASER
- H2: "$39 per pack. No subscription."
- Anchor: "A lawyer letter costs $300–$500. This is $39."
- Link: "See full pricing" → /pricing

FINAL CTA
- H2: "Your deadline is real. Your evidence should be too."
- CTA: "Create Your First Pack" (primary xl, centered)
- Sub-line: "No account required to preview. Pay only when you generate."

**Trust components:** Stripe badge in trust block, data retention in hero sub-line, no-guarantee framing throughout.

**Edge states:**
- If user is already logged in: CTA becomes "Go to Dashboard"
- Mobile: hero is single-column, mockup moved below text

**Mobile behavior:** Single column. H1 drops to text-3xl. CTA stacks vertically. Feature grid is 1 column.

---

### Page: How It Works (/how-it-works)

**Purpose:** Detailed walkthrough of the product experience. Target: visitor who wants to understand before committing.

**Primary CTA:** "Create Your First Pack"

**Page hierarchy:**
1. Hero (brief)
2. 6 dispute categories explained
3. Detailed step walkthrough (with UI callouts)
4. Evidence assembly explanation
5. Delivery and retention policy
6. CTA

**Core sections:**

HERO
- H1: "Built for your dispute reason, not a generic template"
- H2: "Every dispute category has different evidence requirements. We know which ones matter for yours."

DISPUTE CATEGORIES
- H2: "6 dispute categories. Each with its own intake logic."
- 6 cards (2-col on desktop): Fraudulent / Product Not Received / Product Not as Described / Subscription Cancelled / Duplicate Charge / Credit Not Processed
- Each card: category name + 2-line summary of what evidence is required + "Most common evidence: X, Y, Z"

STEP WALKTHROUGH
- H2: "Here is what happens when you create a pack"
- 5 steps with visual timeline:
  1. Create your pack — enter dispute amount, reason, deadline
  2. Choose your dispute category — checklist appears immediately
  3. Answer the intake questionnaire — structured questions, not open text
  4. Upload your labeled exhibits — drag and drop, 10MB each, 20 max
  5. Generate and download your PDF — cover page + narrative + exhibits

EVIDENCE ASSEMBLY
- H2: "Your pack is assembled the way card networks want to see it"
- Describe PDF structure: Cover Page / Evidence Checklist / Rebuttal Narrative / Labeled Exhibits
- Callout: "Not a letter. A complete submission package."

RETENTION POLICY
- H2: "Your files are deleted after 72 hours"
- Explain: generates PDF → 72-hour window → files deleted automatically
- "Your intake answers are retained for 90 days so you can re-generate if needed."

CTA
- "Ready to build your pack?" + "Create Your First Pack" (primary)

**Trust components:** Retention policy section, explicit category-specific framing throughout.

**Edge states:** None special.

**Mobile behavior:** Step timeline collapses to vertical stacked cards. Category grid goes 1-col.

---

### Page: Pricing (/pricing)

**Purpose:** Remove pricing friction. Anchor $39 against lawyer cost. Present bundle option.

**Primary CTA:** "Get Started — $39"

**Page hierarchy:**
1. H1 + pricing cards
2. Pricing psychology block
3. What is included
4. FAQ (3–4 items)
5. CTA

**Core sections:**

PRICING CARDS (2-col, equal weight)
- Pack 1: "$39 / pack" — Single evidence pack — CTA: "Get Started"
- Bundle: "$99 / 3 packs" — Save $18 — "Best for merchants who know they will dispute again" — CTA: "Buy 3 Packs"

PRICING PSYCHOLOGY
- "A lawyer letter costs $300–$500. This builds the entire pack for $39."
- "A $200 dispute you win pays for the pack 5x over. A $200 dispute you lose costs $200 plus the chargeback fee."

WHAT IS INCLUDED
- Bullet list: Category-specific evidence checklist / AI rebuttal narrative / Labeled PDF / Deadline tracking / 72-hour download window / Intake answers saved 90 days for re-generation

FAQ (short form, 3–4 questions)
- "Is there a subscription?" — No. Pay per pack, no recurring charges.
- "What if I lose the dispute anyway?" — No product can guarantee a win. This pack gives you the strongest possible submission.
- "Can I re-generate?" — Yes, within 90 days of creating the pack, using saved intake answers.
- "What payment methods are accepted?" — Cards via Stripe. No PayPal or bank transfer.

CTA: "Ready to build your strongest case?" + "Get Started — $39"

**Trust components:** Explicit no-subscription line, Stripe badge on CTA, no-guarantee framing in FAQ.

**Edge states:** Logged-in user: CTAs navigate directly to /packs/new (pack credit already loaded).

**Mobile behavior:** Pricing cards stack vertically, bundle card second.

---

### Page: FAQ (/faq)

**Purpose:** Pre-handle objections. Reduce support tickets. Last stop before decision.

**Primary CTA:** "Create Your Pack"

**Structure:** Accordion-style Q&A, grouped by topic.

**Groups and questions:**

About the product:
- What exactly do I get?
- Is this a template or does it customize to my dispute?
- What dispute categories do you support?
- Does this work for Mastercard disputes, not just Visa?

About results:
- Will this guarantee I win my dispute?
- What if I already submitted weak evidence?
- How do I know the checklist is current?

About my data:
- What happens to my uploaded files?
- Do you see my evidence or financial data?
- Is my intake information stored securely?

About payment:
- Is there a subscription?
- Can I get a refund?
- What if generation fails?

**Trust components:** Data handling section explicitly addresses security. No-guarantee framing reinforced.

**Edge states:** Accordion is closed by default. First item in each group auto-opens on page load.

**Mobile behavior:** Full-width accordion, no change from desktop pattern.

---

### Page: Login (/login)

**Purpose:** Return user access. Fast path back to dashboard.

**Primary CTA:** "Sign In"

**Layout:** Centered card (480px max), vertically centered on page.

**Form fields:**
- Email address (required)
- Password (required)
- "Forgot your password?" link below password field → /reset-password

**Below form:**
- "Sign In" (primary button, full width, lg)
- "Don't have an account? Create one" → /signup

**Trust components:** None required on this page. Keep it clean.

**Edge states:**
- Invalid credentials: Alert (error) above form: "Email or password is incorrect."
- Already logged in: redirect to /dashboard
- Email not confirmed: Alert (warning): "Please confirm your email address. Resend confirmation?"

**Mobile behavior:** Card fills 90% width on mobile.

---

### Page: Signup (/signup)

**Purpose:** New account creation. Low friction, single step.

**Primary CTA:** "Create Account"

**Layout:** Centered card (480px max), vertically centered.

**Form fields:**
- Email address (required)
- Password (required, 8+ chars, helper text: "8 characters minimum")
- Confirm password (required)

**Below form:**
- "Create Account" (primary, full width, lg)
- "By creating an account, you agree to our Terms of Service and Privacy Policy." (text-xs, slate-500, links)
- "Already have an account? Sign in" → /login

**Post-submit:**
- Show success Alert: "Check your email to confirm your account."
- Do not auto-navigate. Prevent re-submission.

**Trust components:** Privacy policy link, no upsell on this page.

**Edge states:**
- Email already registered: Alert (error): "An account with this email already exists. Sign in instead?"
- Password mismatch: inline error on confirm field
- Weak password: inline error "Password must be at least 8 characters"

**Mobile behavior:** Card fills 90% width.

---

### Page: Terms of Service (/terms)

**Purpose:** Legal compliance. Trust signal for privacy-conscious users.

**Layout:** Marketing-width prose column (720px), full typography treatment.

**Structure:** Standard ToS sections — Acceptance, Service Description, Payments, Refunds, Data Retention, Limitations of Liability, Dispute Resolution, Governing Law.

**Key callouts (highlighted):**
- "This product is a document assembly tool, not legal representation."
- "Generated PDFs are available for download for 72 hours after generation."
- "Intake answers are retained for 90 days to allow re-generation."

**Trust components:** Explicit "not legal advice" framing.

**Mobile behavior:** Readable prose, no structural change needed.

---

### Page: Privacy Policy (/privacy)

**Purpose:** Regulatory compliance. Merchant-trust priority (they upload sensitive order data).

**Layout:** Same as Terms.

**Key sections:** What we collect, How we use it, Data retention (72-hour file deletion explicitly stated), Third-party services (Supabase, OpenAI, Stripe), User rights, Contact.

**Trust components:** Explicit file deletion timeline, explicit list of third parties, no advertising language.

---

### Page: Refund Policy (/refund)

**Purpose:** Remove pre-purchase hesitation. Reduce support tickets.

**Layout:** Short, centered prose. Max 400 words.

**Content:** Explain credit-based model. No refunds after PDF generation (digital delivery). Refund available if generation fails and credit cannot be re-applied. Contact email for disputes.

**Trust components:** Transparency about the no-refund boundary before generation.

---

## App Screens

---

### Screen: Dashboard (/dashboard)

**Purpose:** Central hub. Shows all dispute packs with status and deadline urgency. Entry point to create new packs.

**Primary CTA:** "New Dispute Pack" (top-right, primary button)

**Layout:** App shell (sidebar + main content)

**Hierarchy:**
1. Page header: "Dashboard" + "New Dispute Pack" button
2. Summary stat cards (row of 3)
3. Pack list (card or table)
4. Empty state if no packs

**Core sections:**

SUMMARY STATS (3 cards, horizontal row)
- "Active Packs" (count) — today
- "Packs Due This Week" (count with amber if >0)
- "Packs Generated" (count total)

PACK LIST
- Header row: filter by status (All / Draft / Ready / Submitted) + sort (Deadline / Created / Status)
- Pack cards: per pack: [Shield icon + pack title + dispute category] | [deadline — amber if <7 days, red if <48h] | [status badge] | [action: View / Generate / Download]
- Pagination if >10 packs

EMPTY STATE
- Shield icon, "No dispute packs yet", "Create your first pack in under 30 minutes.", "Create Your First Pack" (primary)

**Trust components:** Deadline urgency coloring (amber/red) as a functional trust signal — shows product understands their actual stress.

**Edge states:**
- Loading: 3 shimmer pack cards
- API error: Alert (error) above pack list
- All packs expired: show expired state prominently, "Re-generate from saved answers" links visible

**Mobile behavior:** Stat cards stack. Pack list becomes single-column card stack. Actions move to context menu (…).

---

### Screen: New Dispute Pack — Multi-Step (/packs/new)

**Purpose:** Guide user from zero to a fully completed intake ready for generation. Single most critical flow in the product.

**Primary CTA:** "Continue" (each step) → "Review & Generate" (final step)

**Step structure (5 steps, progress bar at top):**
1. Pack Basics (dispute amount, cardholder name, card last 4, Stripe dispute ID optional, deadline)
2. Dispute Category (select 1 of 6 — checklist shown immediately on selection)
3. Intake Questionnaire (category-specific questions, 8–15 questions)
4. Upload Exhibits (file upload, label each file)
5. Review + Generate (summary of all answers, checklist status, generate button or pay gate)

**Magic Moment #1 (Step 2):** On category selection, the evidence checklist appears immediately below the selection — before the user proceeds. Headline: "Here is exactly what you need for [Category]." This is the first trust-building moment.

**Magic Moment #2 (Step 3):** As user answers intake questions, a "narrative preview" section shows a 2–3 sentence fragment updating in real-time. Label: "Your rebuttal narrative is taking shape." This demonstrates value mid-flow.

**Per-step spec:**

STEP 1 — Pack Basics
- Fields: Dispute amount (currency input), Cardholder name, Card last 4 digits, Stripe dispute ID (optional, with help text), Response deadline (date picker)
- Validation: amount required, deadline required and must be future date
- Trust: deadline field explanation: "This is the date Stripe shows as your response deadline. Missing it forfeits your right to respond."

STEP 2 — Dispute Category
- 6 category cards (2-col grid): icon + name + 1-line description
- On select: card highlights (brand-800 border), checklist panel slides in below
- Checklist: all evidence items for this category, pre-checked/unchecked based on required/optional
- "Not sure which category? Check your Stripe dispute reason." (help link)

STEP 3 — Intake Questionnaire
- Questions rendered per category from evidence-matrix logic
- Each question: label + input (text, select, or checkbox group)
- Narrative preview panel (brand-50 background, right side on desktop, below on mobile): updates as questions answered
- Progress: "Question X of Y" indicator
- Save: "Your answers are saved" shown after each answer (debounced 500ms)

STEP 4 — Upload Exhibits
- File upload zone (2px dashed, full width)
- Below zone: evidence checklist with checkboxes — user marks which items they have uploaded
- Each uploaded file: filename chip with Label field + remove button
- Limit info: "PDF, PNG, JPG — max 10MB per file, 20 files max"
- Evidence gap warnings: if critical evidence not uploaded, Alert (warning) appears: "Missing: Delivery confirmation — disputes without this lose at a much higher rate."

STEP 5 — Review + Generate
- Summary panel: all intake answers displayed (read-only, edit links per section)
- Checklist status: full evidence checklist with green/amber/red per item
- Gap detection: any missing critical items shown as Alert (warning) — user can go back or proceed anyway
- No-guarantee disclosure (required): Alert (info) — "AI-generated narrative is based on your answers. Final submission decisions are yours."
- Generate button: "Generate My Evidence Pack" (primary, lg)
  - If no credit: becomes "Buy and Generate — $39" → triggers Stripe Checkout
  - If credit available: shows "1 pack credit available" badge next to button

**Trust components:** Category checklist on step 2, save indicator on step 3, gap detection on step 4, no-guarantee disclosure on step 5.

**Edge states:**
- User abandons mid-step: answers saved to draft pack, shown on dashboard as "Draft"
- Payment fails: return to step 5 with Alert (error): "Payment was not completed. Your answers are saved."
- Generation fails: see generation failure error state

**Mobile behavior:** Steps are full-width. Progress bar stays at top. Narrative preview moves below questions (collapsed by default, "Show preview" toggle).

---

### Screen: Pack Detail (/packs/[id])

**Purpose:** Single source of truth for a dispute pack. Shows status, allows generation, shows deadline urgency, provides download.

**Primary CTA:** Depends on pack status:
- Draft: "Complete Intake" (→ /packs/new step 3)
- Ready to generate: "Generate Evidence Pack" (primary)
- Generated/Ready: "Download PDF" (primary, emerald-600)
- Expired: "Re-generate" (secondary)
- Submitted: "View Details" only (no action needed)

**Layout:** Two-column on desktop — main panel (left 65%) + sidebar (right 35%)

**Main panel:**
- Pack title + dispute category badge
- Status badge (prominent, top of content)
- Intake answers summary (collapsible sections per step)
- Evidence checklist (with upload status per item)
- Generation section: generate button + no-guarantee disclosure

**Sidebar:**
- Deadline card: countdown + urgency coloring
- Pack credit status (if not yet generated)
- File retention notice: "PDF available until [datetime]" (shown after generation)
- Edit exhibits button → /packs/[id]/exhibits

**Trust components:** Deadline urgency coloring, no-guarantee disclosure on generate button, retention countdown.

**Edge states:**
- Expired pack: full-width Alert (warning) at top: "This pack has expired. Re-generate to get a new PDF."
- Missing exhibits: Alert (warning) in generation section
- Loading: skeleton for both panels

**Mobile behavior:** Two columns collapse to single column. Sidebar content moves below main panel. Deadline card remains prominent (top of stacked content).

---

### Screen: Exhibit Manager (/packs/[id]/exhibits)

**Purpose:** Dedicated screen for managing uploaded exhibit files — upload new, re-label, remove, check evidence completeness.

**Primary CTA:** "Upload More Exhibits" (secondary button, top-right)

**Layout:** Single column within app shell.

**Sections:**
1. Evidence checklist (with uploaded/missing status per item)
2. Uploaded files list (table view: filename / label / size / uploaded date / actions)
3. Upload zone (below list)
4. Evidence gap alerts (if any critical items missing)

**File table columns:** # / File name / Exhibit label / Size / Uploaded / Actions (re-label, remove)
- Remove: Trash2 icon, confirmation required: "Remove this exhibit? This cannot be undone."
- Re-label: inline edit

**Trust components:** Evidence checklist shows completeness, gap alerts with specific missing items.

**Edge states:**
- No files yet: empty state (Upload icon, "No exhibits uploaded yet", "Upload Exhibits")
- Max files reached (20): upload zone disabled, Alert (info): "Maximum 20 files uploaded. Remove a file to add another."
- File too large: inline error per file: "File exceeds 10MB limit."

**Mobile behavior:** Table collapses to card list. Each file becomes a card with label + actions.

---

### Screen: PDF Preview / Download (/packs/[id]/preview)

**Purpose:** Show the user what they are about to download. Allow download. Show retention window.

**Primary CTA:** "Download PDF" (primary, lg, emerald-600)

**Layout:** Centered content (max 800px). PDF preview panel + download sidebar.

**Sections:**
- PDF preview panel (iframe or image thumbnails of generated PDF pages, page navigation if multi-page)
- Download sidebar:
  - "Download PDF" button (primary, lg)
  - File size: "2.4 MB · 12 pages"
  - Retention warning: Alert (warning): "This file will be deleted on [date + time]. Download before then."
  - "Mark as Submitted" button (secondary)

**Trust components:** Explicit retention deadline with timestamp, Stripe-level clean presentation of the final output.

**Edge states:**
- PDF expired: Alert (error): "This pack has expired. Go back to re-generate from saved answers." + "Re-generate" button
- PDF still generating: show progress indicator (same as generation loading state)
- Download failed: Alert (error): "Download failed. Try again." + retry button

**Mobile behavior:** PDF preview full-width, scrollable. Download sidebar becomes fixed bottom bar: [Download PDF button] + [file info].

---

### Screen: Billing & Settings (/settings)

**Purpose:** Manage account, view pack credits, review purchase history.

**Primary CTA:** "Buy Pack Credit" (if credit balance is 0)

**Layout:** Tabbed sections: Account / Pack Credits / Purchase History

**Account tab:**
- Email address (read-only + "Change email" link)
- Password: "Change password" button → email reset flow
- Account created date

**Pack Credits tab:**
- Current balance: large number + "pack credits available"
- "Buy Pack Credit" button ($39) or "Buy Bundle" ($99)
- Stripe Customer Portal link: "Manage receipts and billing" (links to Stripe portal)

**Purchase History tab:**
- Table: Date / Type / Amount / Pack # / Status
- If no history: empty state (CreditCard icon, "No purchase history yet")
- Each row links to Stripe receipt (external link, opens new tab)

**Trust components:** Stripe badge near purchase buttons. No stored card data message: "Your payment details are managed securely by Stripe."

**Edge states:**
- Loading: skeleton for each tab
- Stripe checkout redirect: "Redirecting to secure payment page..." with Stripe badge
- Payment failed on return: Alert (error): "Payment was not completed. Your pack credit was not added."

**Mobile behavior:** Tabs become full-width. Table collapses to card list.

---

## Page/Screen Cross-Cutting Rules

1. **Deadline urgency hierarchy:** Deadlines are colored amber (≤7 days), red (≤48 hours), and default slate otherwise. This rule applies to every surface where a deadline appears.

2. **No-guarantee disclosure placement:** Must appear on: Step 5 of new pack flow, Pack Detail generate section, PDF Preview page, and anywhere AI-generated content is rendered.

3. **Retention notice placement:** Must appear on: every exhibit upload screen, PDF Preview, Pack Detail sidebar after generation.

4. **Empty states:** Every list, table, or pack-display surface must have a defined empty state. No blank white space.

5. **Loading states:** Every async operation must show a loading indicator. Buttons must disable during loading to prevent double-submit.

6. **Mobile-first breakpoints:** 
   - Mobile: < 640px — single column, full-width cards
   - Tablet: 640px–1024px — two column where applicable
   - Desktop: > 1024px — full sidebar + multi-column layout

7. **Back navigation:** Every inner app screen must have a breadcrumb or back link. Users should never be stranded.

8. **External links:** Stripe portal and receipt links always open in new tab. All external links include rel="noopener noreferrer".
