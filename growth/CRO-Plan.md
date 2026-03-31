# CRO Plan — Chargeback Evidence Pack Builder

_Last updated: 2026-03-31_

This document defines the full conversion rate optimisation strategy for the Chargeback Evidence Pack Builder. Every section maps to a specific anxiety, moment, or decision point in the merchant journey. No generic growth theory.

---

## 1. Homepage Conversion Path

### Entry Assumptions

The homepage visitor has an active or recent chargeback. They arrived from one of:
- A Google search for their specific dispute type (e.g. “stripe fraudulent chargeback response”)
- An AI answer engine that cited the site
- Word of mouth from another founder

They are NOT arriving to learn what a chargeback is. They know. They want to know if this tool is right for them and whether it is worth $39.

### Section-by-Section Conversion Path

**Section 1 — Hero (above the fold)**

Conversion objective: Confirm relevance in under 3 seconds.

The headline must signal category-specificity, not generic help. Correct: “Evidence packs built for your dispute type.” Incorrect: “Win your chargeback with AI.”

The hero must contain:
- A headline that names a dispute type or mentions Stripe specifically
- A sub-headline that states the output (submission-ready PDF, not “a better chance of winning”)
- A single CTA button: “Build My Evidence Pack” (not “Get Started” or “Try for Free”)
- A trust line below the CTA: “$39 · No subscription · Instant download”
- No hero image unless it shows the actual PDF output or a filing deadline countdown

**Section 2 — Category signal strip**

Conversion objective: Confirm the visitor’s dispute type is handled.

Display 6 category chips horizontally:
- Fraudulent / Unauthorized
- Subscription Cancelled
- Product Not Received
- Product Not as Described
- Duplicate Charge
- Credit Not Processed

Each chip should be clickable (anchors to the matching category landing page or scrolls to a relevant section). The mere presence of the visitor’s category is a conversion signal — it tells them “this tool was built for my situation.”

**Section 3 — How it works (3 steps)**

Conversion objective: Reduce perceived effort to near zero.

Three steps maximum:
1. Answer questions about your dispute (2–5 minutes)
2. We structure your evidence the way card networks expect to see it
3. Download your submission-ready PDF

Do NOT use the phrase “AI generates” or “our algorithm.” Use “we structure” or “the builder organises.” The merchant does not care how it works; they care that it produces the right output.

**Section 4 — Pricing anchor**

Conversion objective: Make $39 feel like a no-brainer relative to the alternative.

Do NOT just show the price. Show the anchor:

| Option | Cost | Time | Risk |
|---|---|---|---|
| Hire a chargeback consultant | $300–$500 | Days | Still might not win |
| Build it yourself | $0 | Hours of research | Wrong format, missing evidence |
| Chargeback Evidence Pack Builder | $39 | 10 minutes | Submission-ready format |

The table makes $39 obvious without saying “it’s cheap.” Price anchoring through comparison, not assertion.

**Section 5 — Trust signal block**

Conversion objective: Eliminate the “is this legitimate?” objection.

Required trust signals in this section:
- “Built for Stripe merchants” with Stripe badge (must be factually accurate — not “Stripe-certified”)
- “Evidence structured to Visa / Mastercard / Amex chargeback guidelines”
- “No subscription. One pack = one payment of $39. No recurring charges.” (This is the highest-anxiety trust signal for merchants who have already been chargebacked and are sensitive to billing surprises)
- Process-based social proof: “Merchants use this to organise the evidence they already have into the exact format card networks want.”

No fabricated reviews. No unverifiable win rate statistics. See Section 4 for full trust guidelines.

**Section 6 — Objection pre-emption strip**

Conversion objective: Neutralise the top 3 mid-page objections before they become exit events.

Three inline objection-busters in a horizontal strip:
- “What if I don’t have all the evidence?” → “The builder tells you exactly what’s needed and what you can include even if partial.”
- “Is $39 worth it for a $50 dispute?” → “If the dispute is above your cost of goods, a properly formatted response often recovers more than it costs.”
- “Why not just use ChatGPT?” → “ChatGPT doesn’t know Stripe’s evidence format or your specific reason code requirements. This does.”

**Section 7 — Final CTA**

Conversion objective: Capture visitors who scrolled past the hero CTA.

Repeat the same CTA button: “Build My Evidence Pack” with the trust line: “$39 · Instant download · 72-hour access to your pack” (72-hour access is the retention policy from the PRD — include it here as a low-stakes framing, not a warning).

### A/B Test Priorities

1. Hero headline variant: “Evidence packs built for your dispute type” vs “Stop guessing what Stripe wants to see”
2. Pricing section: Comparison table (current) vs standalone price card with anchor text only
3. CTA copy: “Build My Evidence Pack” vs “Create My Pack ($39)” — test whether showing the price in the CTA increases or decreases clicks

---

## 2. Pricing Page Conversion Path

The pricing page serves visitors who:
1. Clicked through from an SEO landing page and are now evaluating cost
2. Came from the hero CTA and want to confirm the price before entering the builder
3. Are comparing this against DIY or a consultant

### Step-by-Step Path

**Step 1 — Headline**

“One pack. One payment. $39.” — No ambiguity. No “starting from.” No trial language.

**Step 2 — What’s included (feature list)**

List what the $39 covers, framed by outcome:
- Category-specific evidence structure (not generic chargeback help)
- Guided input flow for your dispute type
- Formatted PDF ready for Stripe’s evidence submission portal
- 72-hour access to download and re-download your pack
- No account required to purchase

Do NOT list technical features (“AI-powered,” “GPT-4o”). List what the merchant gets.

**Step 3 — Pricing anchor (compact version)**

Below the feature list, a compact two-line anchor:
“A chargeback consultant charges $300–$500. This is $39 and takes 10 minutes.”

**Step 4 — No-guarantee disclosure**

Required by both legal and trust considerations. Frame it correctly:
“We can’t guarantee a chargeback outcome — no one can. What we do guarantee is that your evidence is structured the way card networks expect to see it. How the bank rules is not in our control.”

This disclosure actually increases conversion when written this way — it signals honesty and competence. Do NOT bury it in a footnote.

**Step 5 — CTA**

“Build My Evidence Pack — $39” — single button. Below it: “Secure checkout via Stripe. No subscription.”

### Logged-In User Behaviour Rule

If the user is logged in and has already purchased a pack, the pricing page must NOT show the full purchase flow. Instead, show: “You have an active pack. [View your pack] or [Build a new pack for a different dispute].” This prevents confusion and signals that the product treats them as a known customer.

---

## 3. Objection Handling Map

Each objection below has a defined moment when it arises, a placement in the UI, and a required response. These are not FAQ entries — they are inline copy decisions.

| Objection | When it arises | Where to handle it | Required response |
|---|---|---|---|
| “Will this guarantee I win?” | Pricing page, post-purchase anxiety | Pricing page Step 4 + confirmation email | “No one can guarantee a chargeback outcome. We make sure your evidence is formatted correctly — that’s the part in your control.” |
| “Is $39 worth it for a small dispute?” | Homepage pricing section | Objection strip + FAQ | “If the disputed amount exceeds your cost of goods, a correctly formatted response pays for itself.” |
| “Can’t I just do this myself?” | Homepage + category landing pages | How It Works section | “You can — if you know the exact evidence fields Stripe requires for your specific reason code. This builder does.” |
| “Can’t I just use ChatGPT?” | Category pages (AEO traffic) | Category page CTA section | “ChatGPT doesn’t know your reason code requirements, Stripe’s evidence format, or which fields carry the most weight for your dispute type.” |
| “What happens to my uploaded files?” | Builder step 1 (file upload) | Inline helper text in builder | “Files are used only to generate your pack and are not stored after your session ends.” |
| “What if I don’t have all the evidence?” | Builder step 2 (evidence checklist) | Builder inline | “Include what you have. The builder flags which items are critical and which are supplementary for your dispute type.” |
| “Is this company legitimate?” | First homepage visit | Trust signal block (Section 5) | Stripe badge + factual builder description + no-fabrication policy |
| “I filed a response before and it didn’t work.” | Category landing pages (SEO visitors) | Category page intro paragraph | “Most failed responses lack category-specific evidence. This builder structures your pack for exactly your dispute type.” |
| “Is $39 for one dispute or ongoing?” | Anywhere price is visible | Trust line below every CTA | “One pack. One payment. No subscription.” |
| “I don’t know which category applies to me.” | Homepage + FAQ | Category chips + FAQ entry | “Check the reason code on your Stripe dispute notification. Each code maps to one of the six dispute categories we cover.” |

---

## 4. Trust Reinforcement Architecture

Trust signals must be earned by specificity, not asserted through vague language. “Built for Stripe merchants” is a trust signal. “Trusted by thousands” is not (until there is data to back it).

### Signal Placement Table

| Trust signal | Page(s) | Placement | Format |
|---|---|---|---|
| Stripe badge (“Built for Stripe”) | Homepage, Pricing, Category pages | Hero section + header | Image badge |
| No-subscription statement | All pages with a price | Below every CTA | Plain text: “One payment. No subscription.” |
| No-guarantee disclosure | Pricing page, FAQ, confirmation email | Dedicated paragraph | 2–3 sentence prose |
| Retention policy notice | Pricing page, post-purchase | Below purchase CTA | “72-hour access to download your pack” |
| Evidence format sourcing | Category landing pages | Evidence requirements table caption | “Evidence requirements based on Visa / Mastercard / Amex chargeback guidelines” |
| Secure checkout statement | Pricing CTA block | Below CTA button | “Secure checkout via Stripe” |
| Process-based testimonials | Homepage trust block, Pricing | Dedicated testimonial block | Quote format with merchant context (no outcome claims) |

### Anti-Trust Signals to Avoid

The following signals damage credibility and must not appear anywhere on the site:

- Win rate percentages (e.g. “78% win rate”) — not verifiable, legally risky, and flagged by sophisticated merchants
- “Guaranteed results” or “We guarantee your chargeback response”
- “AI-powered” as a primary trust signal (merchants with chargebacks are sceptical of AI outputs for legal/financial matters)
- Logos of companies that haven’t explicitly endorsed the product
- Review counts that cannot be substantiated at launch (e.g. “4.9 stars from 200+ merchants”)
- “Stripe-certified” or “Stripe-approved” — not accurate, risks trademark violation

### Post-Launch VoC Collection Plan

Priority #1 post-launch is collecting honest merchant voice:

1. Email merchants 48 hours after purchase with: “Did your pack include what you needed? One-sentence reply welcome.”
2. If reply is positive, follow up: “Would you be willing to share a sentence about your experience for our site?”
3. Only use testimonials that describe process (“I knew exactly what to include”) not outcomes (“I won my chargeback”). Outcome claims create legal and trust risk.
4. Target 10 real testimonials before adding a testimonial section to the homepage.

---

## 5. One-Time Pack vs Subscription Positioning

The V1 product is intentionally one-time purchase only (no subscription). This is both a technical constraint and a positioning advantage. The copy must treat it as a feature, not a limitation.

### Copy Treatment Table

| Context | Correct framing | Incorrect framing |
|---|---|---|
| CTA trust line | “One payment. No subscription.” | “No recurring charges” (implies a subscription was ever considered) |
| Pricing page | “$39 per pack. Buy when you need it.” | “Subscription plans coming soon” (undermines the one-time positioning) |
| Post-purchase email | “You’ve paid once for this pack. No further charges.” | “Your free trial has ended” or any trial-adjacent language |
| FAQ | “This is a one-time purchase. There is no subscription option.” | “We don’t currently offer subscriptions” (implies future subscription) |

### Bundle Positioning (Future V2 Consideration)

If a multi-pack bundle is introduced:
- Position it as “For merchants managing multiple disputes at once” not as a discount subscription
- Price it as a defined bundle (e.g. “3 packs for $99”) not as monthly access
- The core product positioning must remain one-time purchase — bundle is an add-on, not a pricing model shift

### Pricing Psychology Checklist

Before launch, verify:
- [ ] The price is stated as “$39” on every page that mentions pricing — no “starting from” or “as low as”
- [ ] The lawyer anchor ($300–$500) appears on the homepage and the pricing page
- [ ] The CTA button shows the price: “Build My Evidence Pack — $39”
- [ ] No page implies a free tier, trial, or freemium model
- [ ] The 72-hour access policy is disclosed before purchase, not after
- [ ] The no-subscription statement appears within 200px of every purchase CTA

---

## 6. Risk-Reduction Language

Five specific merchant fears drive exit behaviour on this product. Each fear has a defined response and placement rule.

### Fear 1: “I’ll pay $39 and still lose.”

Response: “We can’t control how the bank rules. We control whether your evidence is formatted correctly. That’s what this pack does.”

Placement: Pricing page (prominent), FAQ, post-purchase email.

Do NOT try to convert this fear by implying a money-back guarantee unless one is actually offered and operationally feasible.

### Fear 2: “My files will be stored and misused.”

Response: “Files uploaded during pack creation are used only to generate your evidence pack. They are not stored after your session.”

Placement: Builder step 1 (inline helper text), Privacy Policy summary section, FAQ.

### Fear 3: “I’ll be charged again next month.”

Response: “One payment of $39. No subscription. No further charges. Ever.”

Placement: Below every purchase CTA, post-purchase confirmation page, confirmation email.

Note: This fear is heightened in the target ICP because they have recently been hit by an unexpected chargeback — billing surprises are acutely salient. The no-subscription signal is the highest-anxiety trust signal for this audience.

### Fear 4: “The pack won’t have what I need for my specific dispute.”

Response: “The builder is structured around your specific dispute type and reason code. The evidence checklist is different for Fraudulent disputes than for Subscription Cancelled disputes.”

Placement: Category landing pages (intro paragraph), builder onboarding step, FAQ.

### Fear 5: “I’ve already missed the deadline.”

Response: “Deadlines vary by card network and dispute type. Check your Stripe notification for the response deadline. For most disputes, Stripe provides 7–21 days from notification.”

Placement: /guide/chargeback-deadlines page, FAQ, category landing pages (urgency note).

Important: Do NOT use deadline urgency to pressure purchase on pages where the visitor may genuinely have time. Urgency language must be accurate, not manufactured.

---

## 7. CRO Measurement Framework

Metrics to track, in priority order. All targets are directional 30-day benchmarks post-launch.

| Metric | Definition | 30-day target | Diagnostic action if missed |
|---|---|---|---|
| Homepage → Builder CTR | % of homepage visitors who click “Build My Evidence Pack” | 15%+ | Test headline variants; check if category chips are visible above fold on mobile |
| Builder completion rate | % of users who start the builder and reach the payment step | 60%+ | Identify drop-off step; add inline objection copy at that step |
| Pricing page conversion | % of pricing page visitors who click the purchase CTA | 20%+ | Check if anchor table is visible; test CTA copy variants |
| Purchase completion rate | % of users who reach Stripe Checkout and complete payment | 75%+ | Check Stripe Checkout configuration; add trust line above payment button |
| Category page → builder CTR | % of category landing page visitors who click to start a pack | 12%+ | Ensure CTA is identity-framed (“Build My Fraudulent Dispute Pack” not “Get Started”) |
| Guide page → site CTR | % of guide page visitors who navigate to a commercial page | 8%+ | Add contextual CTA within first 300 words of guide content |
| Return purchase rate | % of buyers who purchase a second pack within 90 days | 15%+ | Check post-purchase email sequence; ensure repeat purchase is frictionless |

### Diagnostic Logic by Failure

- If homepage CTR is below 15%: The headline is not confirming relevance fast enough. Test a more specific headline that names a dispute type or names Stripe.
- If builder completion is below 60%: The builder has a friction step. Review which input fields have high abandonment and either remove optional fields or add inline explanation text.
- If pricing conversion is below 20%: The anchor is not visible or the objection about guarantee is not being handled. Verify the comparison table renders above the fold on the pricing page.
- If purchase completion is below 75%: Stripe Checkout is the bottleneck — check mobile experience and ensure the product name in Stripe is clear (“Chargeback Evidence Pack” not a UUID or internal code).

### Tool Recommendations

- Analytics: Plausible or PostHog (privacy-first, no consent banner required in most jurisdictions). Do NOT use Google Analytics 4 at launch — cookie consent friction will suppress conversion on mobile.
- Heatmaps: Hotjar or Microsoft Clarity for scroll depth and click maps on homepage and pricing page. Run for the first 30 days post-launch.
- A/B testing: Use PostHog feature flags for simple A/B tests. Do not invest in Optimizely or VWO at V1 scale.
- Funnel tracking: PostHog funnels to track homepage → builder → pricing → checkout → download.

---

## 8. Category Page Conversion Path

Category landing pages (/chargeback/fraudulent, /chargeback/subscription-cancelled, etc.) serve high-intent SEO and AEO traffic. These visitors have a specific dispute type and want confirmation that this tool handles their exact situation.

### CTA Strategy

**Primary CTA (above fold and at end of evidence table):**
Identity-framed and dispute-specific. Not generic.

- Fraudulent: “Build My Fraudulent Dispute Evidence Pack”
- Subscription Cancelled: “Build My Subscription Cancellation Evidence Pack”
- Product Not Received: “Build My Product Not Received Evidence Pack”
- Product Not as Described: “Build My Product Not as Described Evidence Pack”
- Duplicate Charge: “Build My Duplicate Charge Evidence Pack”
- Credit Not Processed: “Build My Credit Not Processed Evidence Pack”

The CTA must name the dispute type. Generic “Get Started” CTAs on category pages are a confirmed conversion leak — the visitor is confirming their situation and a generic CTA does not reflect that confirmation back at them.

**Secondary CTA (mid-page, after evidence requirements table):**
“See what’s included in a pack ($39)” — links to pricing page.

**Final CTA (bottom of page, after FAQ):**
Same as primary CTA. Repeat, do not change the copy. Consistency reduces cognitive load.

### Trust Requirements Per Category Page

Each category page must include before any CTA:
- The no-guarantee statement (inline, not a footnote): “We structure your evidence correctly. The bank’s decision is not in our control.”
- The price (inline): “$39 per pack” before the visitor clicks through
- The no-subscription line: “One payment. No subscription.”

Do NOT hide the price on category pages. Visitors who arrive from SEO are comparison shopping. Showing the price before they click the CTA pre-qualifies them and improves checkout completion rate.

### Category Page Intent Alignment

Visitors on category pages have already self-identified their dispute type. The page copy must validate that self-identification immediately:

- First sentence must name the dispute type: “This page covers evidence requirements for fraudulent or unauthorised transaction disputes on Stripe.”
- Do not start with generic chargeback education — they already know what a chargeback is.
- The evidence requirements table is the highest-value section. Place it within the first scroll depth (above 800px from the top on desktop).

---

_End of CRO Plan. Cross-reference with SEO-AEO-GEO-Plan.md for page-level implementation specs and with design/PageBlueprints.md for UI placement rules._
