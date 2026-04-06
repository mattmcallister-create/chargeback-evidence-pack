# CRO Sprint 2 Implementation Spec

**Status:** Ready for execution
**Author:** Exec room (CPO, CTO, CMO, CEO) — Session 013
**Target:** Chargebackkit.app launch, 30-day revenue target $10k/mo
**Predecessor:** Sprint 1 (CRO-001 through CRO-008) shipped; PostHog analytics + canonical URL env-gating (CRO-009) shipped this session.

---

## Context

Sprint 1 landed 8 CRO fixes against the homepage, pricing page, FAQ order, and copy hierarchy. Sprint 2 targets the four highest-leverage remaining conversion levers identified in `growth/CRO-Plan.md`:

1. **CRO-010** — Stripe trust badge in homepage hero (reduces "is this legit?" friction)
2. **CRO-011** — Comparison table prominence on pricing (anchors value vs. alternatives)
3. **CRO-012** — Clickable category chips (drives long-tail SEO landing pages + homepage engagement)
4. **CRO-013** — Objection strip copy tightening (removes friction before CTA)

Files touched: `app/(marketing)/page.tsx` (homepage — tasks 10, 12, 13) and `app/(marketing)/pricing/page.tsx` (task 11).

---

## CRO-010 — Stripe trust badge in homepage hero

**Why it matters:** Cold visitors evaluate legitimacy in under 3 seconds. "Built for Stripe merchants" with the Stripe wordmark is the single cheapest trust signal we can ship. CRO-Plan Section 5 spec.

**File:** `app/(marketing)/page.tsx`

**Anchor:** find the hero section's H1 block — search for the primary headline (likely contains "Win chargebacks" or "Chargeback evidence" or the H1 tag immediately after the opening `<section>` of hero).

**Insert immediately below the hero CTA row (the flex container holding the "Get your pack" / primary CTA button):**

```tsx
{/* CRO-010: Stripe trust badge */}
<div className="mt-6 flex items-center gap-3 text-sm text-zinc-500">
  <svg className="h-5 w-auto" viewBox="0 0 60 25" fill="currentColor" aria-hidden="true">
    <path d="M59.5 14.4c0-4.3-2.1-7.7-6.1-7.7s-6.4 3.4-6.4 7.7c0 5.1 2.9 7.6 7 7.6 2 0 3.5-.5 4.7-1.1v-3.4c-1.2.6-2.5 1-4.2 1-1.7 0-3.1-.6-3.3-2.6h8.3c0-.2.0-1 .0-1.5zm-8.4-1.6c0-1.9 1.2-2.7 2.3-2.7 1.0.0 2.1.8 2.1 2.7h-4.4zM41.2 6.7c-1.7 0-2.8.8-3.4 1.3l-.2-1.1h-3.8v19.5l4.3-.9v-4.7c.6.5 1.6 1.1 3.1 1.1 3.2 0 6.1-2.6 6.1-7.7-.1-4.7-3.0-7.5-6.1-7.5zm-1 11.6c-1 0-1.6-.4-2-.8v-6.4c.4-.5 1.1-.9 2.1-.9 1.6 0 2.7 1.8 2.7 4.0s-1.1 4.1-2.8 4.1zM32.2 5.6l4.3-.9V.2l-4.3.9v4.5zM32.2 7.0h4.3V21.7h-4.3V7.0zM27.6 8.3l-.3-1.3H23.6v14.7h4.3v-9.9c1-1.3 2.7-1.1 3.3-.9V7.0c-.6-.2-2.6-.6-3.6 1.3zM19.0 3.4L14.8 4.3v14.0c0 2.6 1.9 4.5 4.5 4.5 1.4 0 2.5-.3 3.1-.6v-3.4c-.5.2-3.4 1-3.4-1.6V10.6h3.4V7.0h-3.4V3.4zM4.4 11.2c0-.7.6-.9 1.5-.9 1.3 0 3.0.4 4.3 1.1V7.4C8.7 6.8 7.2 6.6 6.0 6.6 2.7 6.6.4 8.3.4 11.2c0 4.5 6.3 3.8 6.3 5.8 0 .8-.7 1.1-1.7 1.1-1.5 0-3.4-.6-4.8-1.4v4.1c1.6.7 3.2.9 4.8.9 3.4 0 5.7-1.6 5.7-4.6-.1-4.9-6.3-4.0-6.3-5.9z"/>
  </svg>
  <span>Built for <strong>Stripe</strong> merchants · Evidence structured to Visa / Mastercard / Amex guidelines</span>
</div>
```

**Acceptance:**
- Badge renders below primary CTA, not above
- Stripe wordmark visible at small size (h-5)
- Mobile: text wraps gracefully under badge
- No layout shift (CLS = 0)

---

## CRO-011 — Comparison table prominence on pricing page

**Why it matters:** Price anchoring. A buyer comparing $39 against "hire a consultant ($200+)" or "DIY in 4 hours ($thousands in opportunity cost)" converts 2-3x higher than one who only sees the bare price. CRO-Plan Section 4 spec.

**File:** `app/(marketing)/pricing/page.tsx`

**Current state:** Pricing card is likely above the fold. Comparison table (if it exists) is below or absent.

**Change:** Move comparison table **immediately below the primary pricing card**, above the FAQ. If no comparison table exists yet, add this one:

```tsx
{/* CRO-011: Comparison table — price anchor */}
<section className="mx-auto max-w-4xl px-4 py-12">
  <h2 className="text-center text-2xl font-semibold mb-2">Compare your options</h2>
  <p className="text-center text-zinc-500 mb-8">
    Every approach to a $50–$5,000 chargeback. Pick the one that actually gets paid.
  </p>
  <div className="overflow-x-auto">
    <table className="w-full border border-zinc-200 rounded-lg text-sm">
      <thead className="bg-zinc-50">
        <tr>
          <th className="text-left p-4 font-medium">Approach</th>
          <th className="text-left p-4 font-medium">Cost</th>
          <th className="text-left p-4 font-medium">Time</th>
          <th className="text-left p-4 font-medium">Win rate</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-zinc-200">
        <tr className="bg-emerald-50">
          <td className="p-4 font-semibold">ChargebackKit (this)</td>
          <td className="p-4">$39 one-time</td>
          <td className="p-4">~10 minutes</td>
          <td className="p-4">Network-compliant evidence</td>
        </tr>
        <tr>
          <td className="p-4">DIY from scratch</td>
          <td className="p-4">Free</td>
          <td className="p-4">3–5 hours</td>
          <td className="p-4">Inconsistent formatting, often rejected</td>
        </tr>
        <tr>
          <td className="p-4">ChatGPT / generic AI</td>
          <td className="p-4">$20/mo</td>
          <td className="p-4">30–60 minutes of prompting</td>
          <td className="p-4">Doesn't know Stripe evidence format</td>
        </tr>
        <tr>
          <td className="p-4">Chargeback consultant</td>
          <td className="p-4">$150–$500 per dispute</td>
          <td className="p-4">2–5 business days</td>
          <td className="p-4">High quality, high cost</td>
        </tr>
        <tr>
          <td className="p-4">Chargeback automation SaaS</td>
          <td className="p-4">$99–$499/mo subscription</td>
          <td className="p-4">Setup + integration</td>
          <td className="p-4">Overkill for sub-100/mo volume</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p className="text-center text-xs text-zinc-400 mt-4">
    No subscription. One pack = one payment of $39. No recurring charges.
  </p>
</section>
```

**Acceptance:**
- Renders between pricing card and FAQ
- ChargebackKit row highlighted with `bg-emerald-50`
- Table scrolls horizontally on mobile via `overflow-x-auto`
- Bottom no-subscription line present

---

## CRO-012 — Clickable category chips on homepage

**Why it matters:** Long-tail SEO (each category is a keyword cluster) + engagement signal (scroll + click drives PostHog conversion funnel data). CRO-Plan Section 2 spec.

**File:** `app/(marketing)/page.tsx`

**Current state:** Category chips likely render as static `<span>` or `<div>` pills somewhere in the hero or "Works for" section.

**Change:** Wrap each chip in a Next.js `<Link>` pointing to its category landing page. The six canonical categories and their URLs (matching the CRO-Plan spec):

```tsx
// CRO-012: Clickable category chips
import Link from 'next/link';

const CATEGORIES = [
  { label: 'Fraudulent / Unauthorized', href: '/chargeback/fraudulent' },
  { label: 'Subscription Cancelled', href: '/chargeback/subscription-cancelled' },
  { label: 'Product Not Received', href: '/chargeback/product-not-received' },
  { label: 'Product Not as Described', href: '/chargeback/product-not-as-described' },
  { label: 'Duplicate Charge', href: '/chargeback/duplicate-charge' },
  { label: 'Credit Not Processed', href: '/chargeback/credit-not-processed' },
];

// Replace existing chip render block with:
<div className="flex flex-wrap gap-2 justify-center mt-6">
  {CATEGORIES.map(c => (
    <Link
      key={c.href}
      href={c.href}
      className="px-3 py-1.5 rounded-full border border-zinc-300 text-sm text-zinc-700 hover:border-zinc-900 hover:bg-zinc-50 transition-colors"
    >
      {c.label}
    </Link>
  ))}
</div>
```

**Dependency:** If `/chargeback/[slug]` pages don't exist yet, either:
- **Option A (ship now):** Link to `/#` anchors and add category sections to the homepage for now
- **Option B (ideal):** Generate the 6 category pages from a single `app/chargeback/[slug]/page.tsx` dynamic route reading from a `categories.ts` data file. This is ~90 min of work but unlocks 6 SEO landing pages before launch.

**CMO recommendation:** Option B. Each page targets 200-1,000 monthly searches per category. Over 30 days that's the difference between launching with 0 organic traffic and launching with a functioning funnel.

**Acceptance:**
- All 6 chips clickable
- Hover state visible
- Mobile: chips wrap to multiple rows, no overflow
- Destination pages return 200 (not 404)

---

## CRO-013 — Objection strip copy tightening

**Why it matters:** Three specific objections kill conversion at the hero-to-CTA transition. We need to address them inline, above the fold, in the tightest possible copy. CRO-Plan Section 3 spec.

**File:** `app/(marketing)/page.tsx`

**Current state:** Objection strip exists but copy may be verbose or hedging.

**Change:** Replace existing objection strip with this exact structure and copy:

```tsx
{/* CRO-013: Objection strip — exact copy per CRO-Plan Section 3 */}
<section className="bg-zinc-50 border-y border-zinc-200 py-10">
  <div className="mx-auto max-w-4xl px-4 grid md:grid-cols-3 gap-8">
    <div>
      <p className="font-semibold mb-2">"What if I don't have all the evidence?"</p>
      <p className="text-sm text-zinc-600">
        The builder tells you exactly what's needed and what you can include even if partial.
      </p>
    </div>
    <div>
      <p className="font-semibold mb-2">"Is $39 worth it for a $50 dispute?"</p>
      <p className="text-sm text-zinc-600">
        If the dispute is above your cost of goods, a properly formatted response often recovers more than it costs.
      </p>
    </div>
    <div>
      <p className="font-semibold mb-2">"Why not just use ChatGPT?"</p>
      <p className="text-sm text-zinc-600">
        ChatGPT doesn't know Stripe's evidence format or your specific reason code requirements. This does.
      </p>
    </div>
  </div>
</section>
```

**Placement:** Between hero and pricing card, or between "how it works" and FAQ — whichever the current layout naturally supports. Do NOT place above the hero.

**Acceptance:**
- All three objections present with exact copy (character-for-character match)
- Each objection renders as question (bold) + answer (muted)
- Mobile: stacks to single column
- Section has subtle background differentiation (`bg-zinc-50`)

---

## Execution checklist

- [ ] **CRO-010** — Add Stripe badge block below hero CTA in `app/(marketing)/page.tsx`
- [ ] **CRO-011** — Add/move comparison table in `app/(marketing)/pricing/page.tsx` below primary pricing card
- [ ] **CRO-012** — Replace static category chips with `<Link>` components in `app/(marketing)/page.tsx`; decide Option A (anchors) or Option B (dynamic route) for destinations
- [ ] **CRO-013** — Replace objection strip with exact copy in `app/(marketing)/page.tsx`
- [ ] Verify visually on staging at `chargebackkit.app`
- [ ] Update `quality/buglog.md`: mark CRO-010, 011, 012, 013 Status=Fixed
- [ ] Update `growth/CRO-Plan.md` Section 9 implementation log
- [ ] Commit as: `CRO Sprint 2: trust badge, comparison table, clickable chips, objection copy (CRO-010..013)`

## Post-execution verification

Run PostHog sanity check on staging:
1. Load homepage → verify `$pageview` event fires
2. Click a category chip → verify `$pageview` for category page
3. Click primary CTA → verify `$pageview` for pricing
4. Open browser devtools network → confirm `us.i.posthog.com/e/` requests succeed

If any fails, check Render env vars: `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`, `NEXT_PUBLIC_SITE_URL`.

---

## Exec-room sign-off

**CPO:** Objection copy exactly matches plan. Ship.
**CTO:** PostHog shipped, canonical env-driven, analytics snippet is the official PostHog init. Concern: `/chargeback/[slug]` routes don't exist yet — recommend Option B dynamic route before launch to realize full SEO value.
**CMO:** Category chips → long-tail organic. Comparison table → anchor pricing against $150 consultants. This is the right stack for a 30-day $10k target, conditional on the category pages shipping.
**CEO:** Execute. Then Task 13 (red-team QA) before launch.
