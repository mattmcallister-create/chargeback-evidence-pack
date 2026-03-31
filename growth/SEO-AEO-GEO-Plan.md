# SEO · AEO · GEO Plan — Chargeback Evidence Pack Builder

Version: 1.0
Phase: 4 — Growth
Date: 2026-03-31
Owner: Matt McAllister

## Objective

Rank for high-intent searches from Stripe merchants facing chargebacks, be cited by AI assistants answering chargeback questions, and convert that traffic into paying customers. The content moat is identical to the product moat: category-specific, submission-grade specificity that generic AI cannot replicate.

---

## 1. SEO Architecture

### 1.1 Page Clusters

Three clusters serve distinct intent stages. Do not blend them.

**Cluster A — Transactional Core (launch-critical)**

| URL | Purpose | Primary keyword target |
|-----|---------|------------------------|
| / | Homepage — signup conversion | chargeback evidence builder |
| /pricing | Remove pricing friction, drive purchase | chargeback response tool pricing |
| /how-it-works | Consideration stage, trust building | how chargeback evidence pack works |
| /faq | Objection pre-handling | chargeback evidence pack FAQ |

**Cluster B — Category Landing Pages (primary SEO + AEO drivers)**

One page per dispute type. Each page is a self-contained, authoritative answer to "how do I fight a [type] chargeback?" with evidence requirements, a checklist, and a direct CTA to build a pack.

| URL | Dispute type | Primary keyword |
|-----|-------------|-----------------|
| /chargeback/fraudulent | Fraudulent / unauthorized | fraudulent chargeback response |
| /chargeback/product-not-received | Product not received | product not received chargeback evidence |
| /chargeback/product-not-as-described | Product not as described | product not as described chargeback response |
| /chargeback/subscription-cancelled | Subscription cancelled | subscription cancelled chargeback response |
| /chargeback/duplicate-charge | Duplicate charge | duplicate charge dispute response |
| /chargeback/credit-not-processed | Credit not processed | credit not processed chargeback |

**Cluster C — Guide Pages (TOFU/MOFU, AEO primary targets)**

Informational pages that capture the 11pm searches. Build category authority. Link back into category pages and the product.

| URL | Topic | Primary keyword |
|-----|-------|----------------|
| /guide/chargeback-rebuttal-letter | How to write a rebuttal letter | chargeback rebuttal letter |
| /guide/chargeback-evidence-requirements | Complete evidence guide (hub) | chargeback evidence requirements |
| /guide/stripe-chargeback-response | Stripe-specific response guide | stripe chargeback response |
| /guide/chargeback-reason-codes | Reason code reference | chargeback reason codes explained |
| /guide/chargeback-deadlines | Deadline rules + urgency | chargeback response deadline |

### 1.2 Primary Keyword Themes

**Theme 1: Chargeback response mechanics** (broadest reach, TOFU–MOFU)
- chargeback rebuttal letter (high volume, informational-commercial)
- how to respond to a chargeback (very high volume)
- chargeback evidence (high volume)
- chargeback response template (medium, commercial intent)

**Theme 2: Stripe-specific** (targeted ICP match, high conversion probability)
- stripe chargeback response (medium, very high relevance to ICP)
- stripe dispute evidence (medium)
- stripe chargeback deadline (medium)
- how to respond to stripe dispute (medium)

**Theme 3: Category-specific** (long-tail, high intent — each one is its own content cluster)
- fraudulent chargeback evidence / how to fight fraudulent chargeback
- product not received chargeback response
- subscription cancelled chargeback evidence
- product not as described chargeback requirements
- duplicate charge dispute response
- credit not processed chargeback response

**Theme 4: Evidence-quality specific** (highly citable, AEO-priority)
- chargeback evidence requirements
- what evidence do i need to fight a chargeback
- visa chargeback evidence rules 2026
- mastercard chargeback evidence requirements

**Theme 5: Comparison / alternative-aware** (BOFU)
- chargeback software for small business
- chargeback response without a lawyer
- chargeback management tool solo founder

### 1.3 Metadata Strategy

**Title tag formula:** [Category/Topic Keyword — Outcome or Differentiator] | Chargeback Evidence Pack Builder

No keyword stuffing. Every title must be readable and click-worthy.

| Page | Title tag |
|------|-----------|
| / | Submit Chargeback Evidence That Card Networks Accept | Chargeback Evidence Pack Builder |
| /pricing | Evidence Pack Pricing — $39, No Subscription | Chargeback Evidence Pack Builder |
| /how-it-works | How It Works — Dispute to PDF in 30 Minutes | Chargeback Evidence Pack Builder |
| /faq | Frequently Asked Questions | Chargeback Evidence Pack Builder |
| /chargeback/fraudulent | Fraudulent Chargeback Evidence Requirements + Response Guide | Chargeback Evidence Pack Builder |
| /chargeback/subscription-cancelled | Subscription Cancelled Chargeback Response — Evidence Guide | Chargeback Evidence Pack Builder |
| /chargeback/product-not-received | Product Not Received Chargeback Evidence Requirements | Chargeback Evidence Pack Builder |
| /chargeback/product-not-as-described | Product Not as Described Chargeback Evidence + Response | Chargeback Evidence Pack Builder |
| /chargeback/duplicate-charge | Duplicate Charge Dispute Response Guide | Chargeback Evidence Pack Builder |
| /chargeback/credit-not-processed | Credit Not Processed Chargeback Response Guide | Chargeback Evidence Pack Builder |
| /guide/chargeback-rebuttal-letter | How to Write a Chargeback Rebuttal Letter (2026 Guide) | Chargeback Evidence Pack Builder |
| /guide/chargeback-evidence-requirements | Complete Chargeback Evidence Requirements Guide (2026) | Chargeback Evidence Pack Builder |
| /guide/stripe-chargeback-response | How to Respond to a Stripe Chargeback — Step by Step | Chargeback Evidence Pack Builder |
| /guide/chargeback-reason-codes | Stripe Chargeback Reason Codes Explained | Chargeback Evidence Pack Builder |
| /guide/chargeback-deadlines | Chargeback Response Deadlines — Stripe Dispute Timeline | Chargeback Evidence Pack Builder |

**Meta description formula:** [Pain point stated] + [Specific solution] + [Trust or differentiator signal]. Max 155 characters.

| Page | Meta description |
|------|-----------------|
| / | Stop submitting weak chargeback evidence. Build a submission-ready, category-specific evidence pack in 30 minutes — $39, no subscription. |
| /chargeback/fraudulent | Required evidence for a fraudulent chargeback response: AVS/CVV match, signed ToS, delivery confirmation. Build a complete pack in 30 minutes for $39. |
| /chargeback/subscription-cancelled | What evidence proves a subscriber did not cancel before the charge. Full checklist + response guide for Stripe merchants. Pack for $39. |
| /guide/chargeback-rebuttal-letter | What to write in a chargeback rebuttal letter, what evidence to attach, and how to structure it for the card network — step-by-step guide. |
| /guide/stripe-chargeback-response | How to respond to a Stripe chargeback: what evidence to submit, the deadline, and how to structure your submission package. |

**OG / social metadata rules:**
- og:title: Match title tag exactly
- og:description: Match meta description
- og:image: Product mockup showing clean PDF cover + visible checklist
- og:type: website
- Twitter card: summary_large_image

**Canonical tags:** Self-referencing canonical on every page. No duplicate content across category pages.

### 1.4 Internal Linking Strategy

**Model: Hub-and-spoke**

Two hubs: the homepage (/) and /guide/chargeback-evidence-requirements. All other pages link to these and receive links back.

**Linking rules:**

1. Every category page links to: homepage, /pricing, /guide/chargeback-evidence-requirements, and 2–3 related category pages using inline text links, not just "Related" widgets.
2. Every guide page links to: all 6 category pages as inline text links (not footer links), homepage, and /pricing.
3. /faq links to: /pricing, /how-it-works, /guide/chargeback-rebuttal-letter, /refund.
4. /pricing links to: /how-it-works, /faq, and all 6 category pages via an "Evidence packs available for:" section.
5. No orphan pages — every page must receive at least 2 inbound internal links.

**Anchor text rules:**
- Good: "fraudulent chargeback evidence requirements" → links to /chargeback/fraudulent
- Bad: "click here" / "learn more" / "see our guide"

**Breadcrumb implementation:**
- Home > Chargeback Types > Fraudulent Chargeback Evidence
- Home > Guides > How to Write a Rebuttal Letter

### 1.5 FAQ and Structured Data Schema Opportunities

Implement JSON-LD schema markup on the following pages. Schema increases likelihood of featured snippets and AEO citation retrieval.

| Page | Schema types | Key FAQ items |
|------|-------------|---------------|
| /faq | FAQPage (all accordion items) | Full 12–16 Q&A set |
| /pricing | FAQPage + SoftwareApplication | Is there a subscription? / Can I get a refund? / Can I re-generate? |
| /how-it-works | HowTo (5-step walkthrough) + FAQPage | What categories are supported? / How long does it take? |
| /chargeback/fraudulent | FAQPage + Article | What evidence do I need? / What is the response deadline? |
| /chargeback/subscription-cancelled | FAQPage + Article | What proves a subscription was not cancelled? / How do I respond on Stripe? |
| /guide/chargeback-rebuttal-letter | FAQPage + Article | What should a rebuttal letter include? / How long should it be? |
| /guide/stripe-chargeback-response | HowTo + FAQPage | How long do I have to respond? / Where do I submit? |

Also implement on all inner pages:
- BreadcrumbList schema
- Article schema on all /guide/* pages with dateModified to signal freshness

### 1.6 Page Intent Mapping

| Page | Search intent | Funnel stage | Conversion goal |
|------|--------------|--------------|-----------------|
| / | Commercial / Navigational | BOFU | Signup |
| /pricing | Transactional | BOFU | Purchase or signup |
| /how-it-works | Informational / Commercial | MOFU | Signup or download |
| /faq | Informational / Commercial | MOFU | Signup or objection removal |
| /chargeback/[type] | Informational / Commercial | MOFU to BOFU | CTA to signup with intent |
| /guide/chargeback-rebuttal-letter | Informational | TOFU | CTA to product |
| /guide/chargeback-evidence-requirements | Informational | TOFU / MOFU | Internal link to category pages |
| /guide/stripe-chargeback-response | Informational | MOFU | CTA to signup |
| /guide/chargeback-reason-codes | Informational | TOFU | Internal link to category pages |
| /guide/chargeback-deadlines | Informational | MOFU | CTA — "Don't miss your deadline" |

---

## 2. AEO / GEO Strategy

The goal: when a merchant asks ChatGPT, Perplexity, Claude, or Google AI Overviews "what evidence do I need for a subscription cancelled chargeback on Stripe?", our category pages and guide pages are retrieved and cited. This requires structuring pages as factual reference documents, not marketing copy.

### 2.1 Target Pages for Answer Engine Citation (Priority Order)

1. **/chargeback/fraudulent** — most common dispute type globally, most searched
2. **/chargeback/subscription-cancelled** — primary pain point for SaaS and digital product ICP
3. **/guide/chargeback-rebuttal-letter** — highest-volume informational keyword in this space
4. **/guide/chargeback-evidence-requirements** — hub page for all evidence questions
5. **/chargeback/product-not-received** — extremely common for physical goods merchants
6. **/guide/stripe-chargeback-response** — Stripe-specific, narrow but highly targeted
7. **/guide/chargeback-reason-codes** — definitional, referenced frequently by AI in dispute answers

### 2.2 Required Citable Sections on Every Category Page

Every /chargeback/[type] page must include these sections in this sequence:

**Section 1: Concise definition (citable anchor)**
2–3 sentences. Define the dispute type. Name the exact card network terminology. State the response deadline.

Example for /chargeback/fraudulent: "A fraudulent chargeback — also called an unauthorized transaction dispute — occurs when a cardholder claims they did not authorize a charge. Under Visa Dispute Resolution rules, merchants have 20 calendar days from the dispute notification date to submit a response. This is the most common chargeback type and typically requires the strongest evidence package."

**Section 2: Evidence requirements table**
Columns: Evidence Item / Required or Optional / Why It Matters. This is the highest-value section for AEO citation. Tables are retrieved and reproduced in AI answers at a far higher rate than prose.

**Section 3: What card networks look for**
3–5 bullet points. Factual. Specific. No filler. Example: "For fraudulent disputes, Visa specifically requires evidence that the card was physically present or that the cardholder completed a verified authentication step."

**Section 4: Common reasons merchants lose this dispute type**
3–5 bullet points. Concrete failure modes. "Submitting delivery confirmation without a signature when order value exceeded $750" is citable. "Insufficient delivery evidence" is not.

**Section 5: How to structure your rebuttal narrative**
3–5 sentences. Practical. What to open with, what to include, what NOT to include (emotional language, outcome requests, speculative statements).

**Section 6: FAQ (2–4 questions)**
Marked up with FAQ schema. Each answer must be 50 words maximum. AI retrieves short, direct answers.

**Section 7: CTA**
"Build a [Category] Evidence Pack — $39" — product-led, category-specific (not generic "Get Started").

### 2.3 Tables and Checklists That Drive Citation

Build as dedicated sections on the relevant pages. All tables must be rendered as HTML or markdown — not images. AI systems retrieve structured text; images are not indexed or cited.

**Table 1: Fraudulent Chargeback Evidence Requirements** (on /chargeback/fraudulent)
Columns: Evidence Item / Required / Notes
Items: AVS/CVV match result at transaction time, IP address at purchase matching billing geography, signed terms of service with timestamp, delivery confirmation with signature, prior purchase history from same card or device, customer communication log.

**Table 2: Subscription Cancelled Evidence Requirements** (on /chargeback/subscription-cancelled)
Items: Cancellation policy displayed at signup, proof subscriber did NOT submit a cancellation before the charge date, login activity logs showing active use, service usage logs, email correspondence with subscriber, terms of service with cancellation terms explicitly stated.

**Table 3: Product Not Received Evidence Requirements** (on /chargeback/product-not-received)
Items: Carrier tracking with delivery confirmation, proof of shipment date, shipping address from order matching billing or confirmed delivery address, buyer communication log.

**Table 4: Stripe Chargeback Response Deadlines** (on /guide/chargeback-deadlines and /guide/stripe-chargeback-response)
Columns: Network / Standard response window / Notes
Rows: Visa (20 calendar days) / Mastercard (20 calendar days) / Stripe notification lag (typically 1–2 business days after card network notification) / Effective safe window (respond within 18 days of Stripe notification).

**Table 5: Evidence Strength by Dispute Type** (on /guide/chargeback-evidence-requirements)
Columns: Evidence Type / Dispute types it supports / Strength rating
This is the most AEO-ready table on the site — it answers "what is the most useful evidence for a chargeback?" in a single reference view.

### 2.4 Copy Structure Rules for AI Citation and Retrieval

Apply to all /guide/* and /chargeback/* pages:

1. Lead every section with a declarative fact. "A fraudulent chargeback occurs when..." is retrieved. "If you've ever dealt with a fraudulent chargeback, you know how confusing it can be..." is not.

2. Write H2 and H3 headings as the exact question being answered. "What evidence do I need for a fraudulent chargeback?" as an H2 will be retrieved for that query. "Evidence Overview" will not.

3. Put the answer in the first sentence below the heading. "Merchants have 20 calendar days to respond to a Stripe chargeback" should be sentence 1, not sentence 4.

4. Every table must have a heading that names the table's contents. "Fraudulent Chargeback Evidence Requirements" — not just "Evidence."

5. Include specific numbers. "Merchants have 20 calendar days" is citable. "Merchants have a limited window" is not.

6. Keep informational sections neutral. Market-speak in informational content degrades citation probability. Facts first, CTA last.

7. Include the year in evidence guides. "2026 Visa Dispute Resolution rules" signals freshness to Google and AI retrieval systems that weight recency.

8. Do not pad. Every sentence must add information. A 1,500-word guide that is 100% information-dense will outperform a 3,000-word guide that is 50% padding.

---

## 3. First 15 Launch Pages

### Priority Tier P1 — Required at launch (9 pages)

**Page 1: Home (/)**
Type: Core product
Primary keyword: chargeback evidence builder / stripe chargeback response tool
SEO notes: Homepage ranks for branded and product-category head terms, not long-tail. Optimize for E-E-A-T: explicit "not legal advice," no guaranteed outcomes, visible author/product context. Category chips in How It Works section establish topical authority signals.
Schema: SiteLinks, Organization
CTA: "Create Your First Pack"

**Page 2: How It Works (/how-it-works)**
Type: Core product
Primary keyword: how does chargeback evidence pack work / what does chargeback evidence include
SEO notes: Implement HowTo schema on the 5-step walkthrough. Link to all 6 category pages from the dispute categories section. Ranks for "what is included in chargeback evidence" queries.
Schema: HowTo, FAQPage
CTA: "Create Your First Pack"

**Page 3: Pricing (/pricing)**
Type: Core product
Primary keyword: chargeback evidence pack price / chargeback response tool cost
SEO notes: Implement SoftwareApplication schema. FAQ schema on 4 pricing questions. Keep "$39" in the title tag.
Schema: SoftwareApplication, FAQPage
CTA: "Get Started — $39"

**Page 4: FAQ (/faq)**
Type: Authority / support
Primary keyword: chargeback evidence FAQ / various long-tail questions
SEO notes: Full FAQPage schema on all accordion items. Group by topic. Update quarterly. Every answer 50 words maximum. Direct answers go first, context second.
Schema: FAQPage
CTA: "Create Your Pack"

**Page 5: Fraudulent Chargeback (/chargeback/fraudulent)**
Type: Category landing
Primary keyword: fraudulent chargeback response / unauthorized transaction chargeback evidence
SEO notes: H1 must include "fraudulent chargeback." Include "2026" in page title. Evidence requirements table is the primary ranking asset. Link to /chargeback/subscription-cancelled and /chargeback/product-not-received as related types.
AEO: Evidence table + definition retrieved for "what evidence do I need for fraudulent chargeback" queries. FAQ schema on 3 category-specific questions.
Schema: Article, FAQPage, BreadcrumbList
CTA: "Build a Fraudulent Chargeback Evidence Pack"

**Page 6: Subscription Cancelled (/chargeback/subscription-cancelled)**
Type: Category landing
Primary keyword: subscription cancelled chargeback response / subscription chargeback evidence
SEO notes: Target "subscription chargeback," "cancel chargeback," and "recurring billing dispute" keyword variants. Must explicitly address "subscriber says they cancelled but didn't." Link to /chargeback/product-not-as-described as related type.
AEO: Evidence table + "what card networks look for" section cited for subscription dispute queries.
Schema: Article, FAQPage, BreadcrumbList
CTA: "Build a Subscription Chargeback Evidence Pack"

**Page 7: Product Not Received (/chargeback/product-not-received)**
Type: Category landing
Primary keyword: product not received chargeback / item not received dispute evidence
SEO notes: Focus on delivery evidence. Link to /chargeback/product-not-as-described as a commonly confused category.
AEO: Delivery evidence requirements table is the primary citation asset.
Schema: Article, FAQPage, BreadcrumbList
CTA: "Build a Product Not Received Evidence Pack"

**Page 8: Chargeback Rebuttal Letter Guide (/guide/chargeback-rebuttal-letter)**
Type: Guide / authority
Primary keyword: chargeback rebuttal letter / how to write chargeback rebuttal letter
SEO notes: Highest-volume informational keyword in the space. 1,500+ words minimum. Include a structural guide (not a fill-in-the-blank template). Link to all 6 category pages with inline text links. FAQ schema on 3–4 questions.
AEO: "What should a chargeback rebuttal letter include?" is extremely high-frequency in AI queries. Component list will be cited directly. Each component as a single-line bullet.
Schema: Article, FAQPage, BreadcrumbList
CTA: "Build Your Evidence Pack — Includes the Rebuttal Narrative"

**Page 9: Stripe Chargeback Response Guide (/guide/stripe-chargeback-response)**
Type: Guide / authority (Stripe-specific)
Primary keyword: stripe chargeback response / how to respond to stripe chargeback
SEO notes: Captures first-time Stripe merchants. Include Stripe Dashboard UI references. Deadline (20 days) must appear in the first 100 words. Link to all 6 category pages as inline anchors.
AEO: Step-by-step Stripe process will be retrieved for Stripe-specific dispute queries. Include specific steps, deadlines, evidence types.
Schema: HowTo, FAQPage, BreadcrumbList
CTA: "Build a Stripe Chargeback Evidence Pack — $39"

### Priority Tier P2 — Within 30 days of launch (6 pages)

**Page 10: Product Not as Described (/chargeback/product-not-as-described)**
Type: Category landing
Primary keyword: product not as described chargeback / item not as described dispute
SEO notes: Focus on product description evidence (screenshots, original listings, return policies). Include the digital products angle (courses, templates, SaaS features). Cross-link to /chargeback/product-not-received.
CTA: "Build a Product Not as Described Evidence Pack"

**Page 11: Duplicate Charge (/chargeback/duplicate-charge)**
Type: Category landing
Primary keyword: duplicate charge dispute / duplicate transaction chargeback response
SEO notes: Lower volume than other categories. Focus on transaction logs showing unique orders. Keep concise — 600 dense words is sufficient.
CTA: "Build a Duplicate Charge Evidence Pack"

**Page 12: Credit Not Processed (/chargeback/credit-not-processed)**
Type: Category landing
Primary keyword: credit not processed chargeback / refund not received dispute
SEO notes: Address both scenarios: when you DID issue the refund (prove it with transaction logs) and when you didn't (acknowledge + show credit was subsequently issued).
CTA: "Build a Credit Not Processed Evidence Pack"

**Page 13: Chargeback Evidence Requirements Hub (/guide/chargeback-evidence-requirements)**
Type: Guide / authority hub
Primary keyword: chargeback evidence requirements / what evidence do i need for chargeback
SEO notes: Links to all 6 category pages with inline text links and evidence summaries. Cross-category evidence comparison table required. 2,000+ words minimum. Every paragraph adds unique information.
AEO: Cross-category evidence comparison table is the highest-value AEO asset on the site. Retrieved for any broad "chargeback evidence" query.
Schema: Article, FAQPage, BreadcrumbList
CTA: "Select Your Dispute Category and Build Your Pack"

**Page 14: Chargeback Reason Codes (/guide/chargeback-reason-codes)**
Type: Reference / authority
Primary keyword: chargeback reason codes / stripe chargeback reason codes
SEO notes: Scannable reference table: Reason Code / Category / Plain-language description / Common evidence required. Map to the 6 dispute categories the product supports. Include "2026" in title tag. Update annually.
AEO: Reason code table cited for "what is chargeback reason code X" queries. Dictionary-style pages are reliably retrieved by AI.
Schema: Article, BreadcrumbList
CTA: Inline CTAs per category row

**Page 15: Chargeback Deadlines (/guide/chargeback-deadlines)**
Type: Guide / authority
Primary keyword: chargeback response deadline / how long to respond to stripe chargeback
SEO notes: Include Stripe deadline table (20 calendar days + Stripe notification lag). FAQ schema on "How long do I have to respond to a Stripe chargeback?" Include deadline calculation worked example. Urgency drives conversions from this page.
AEO: Response deadline facts appear in nearly every AI answer about chargebacks. Specific numbers must appear in the first paragraph.
Schema: Article, FAQPage, BreadcrumbList
CTA: "Start Your Pack Before the Deadline Closes — $39"

---

## Implementation Notes

**Technical SEO pre-launch checklist:**
- sitemap.xml includes all 15 launch pages
- robots.txt does not block /chargeback/* or /guide/*
- All marketing pages render with full HTML via Next.js SSR or SSG — not client-side-only rendering
- Core Web Vitals: LCP under 2.5s, CLS under 0.1, INP under 200ms on all marketing pages
- No soft 404s on /chargeback/* or /guide/* paths
- All internal links use absolute paths or clean relative paths

**Content update cadence:**
- Evidence requirement tables: review quarterly (Visa/Mastercard rule updates in January and July)
- Guide pages: add "Last updated: [Month Year]" and update schema dateModified
- FAQ page: review monthly — add questions raised in support tickets
- Reason codes page: update annually, note the update date in the title
