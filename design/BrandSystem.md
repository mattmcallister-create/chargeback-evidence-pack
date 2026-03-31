# Brand and Design System — Chargeback Evidence Pack Builder

Version: 1.0  Phase: 3 — Design System  Date: 2026-03-30  Owner: Matt McAllister

---

## 1. Brand Direction

### 1.1 Personality and Voice

**What this product is:** A precision instrument used by stressed-out merchants on tight legal deadlines. Every design decision should feel like it belongs to a product that a serious person trusts with real money.

**Tone in three words:** Competent. Direct. Steady.

**Tone guidelines:**
- Short sentences. Active voice. Zero puns or wordplay.
- Never minimize the stakes. This is high-stakes for the user.
- Reassure through structure and clarity, not through promises.
- When something is wrong, say what it is. No vague error messages.
- When something is good, be specific. "Your pack is ready" beats "Success!"

**Voice examples:**

| Wrong — never use | Right — use consistently |
|---|---|
| "Win your chargeback!" | "Submit your strongest possible evidence." |
| "It's easy to get started" | "Create your first pack in under 30 minutes." |
| "Our AI-powered tool" | "Category-specific evidence logic." |
| "Simple and fast" | "Answer 12 questions. Get a submission-ready PDF." |
| "Guaranteed results" | "Built the way card networks want to see it." |

**Power phrases** (use consistently across all copy):
- "Submission-grade"
- "Category-specific"
- "Built for your dispute reason"
- "30 minutes to a complete evidence pack"
- "Not a template — a structured assembly"

---

### 1.2 Visual Personality

**Positioning sentence:** A precision legal instrument that any non-lawyer can use, credible enough to submit to a card network.

**Visual comps:**
- Stripe Dashboard — data density, trust from precision layout, financial infrastructure blue
- Linear — deliberate status colors, tight typography, nothing wasted
- Notion — clean structured documents, hierarchy through type weight not decoration

**What it is not:**
- Not playful (no blobs, gradients, or mascots)
- Not enterprise-gray (not dull or generic)
- Not startup-pastel (no mint/lavender/coral palettes)

**Emotional target on first load:** "This looks like it was built by someone who actually understands chargeback disputes. I trust this."

---

### 1.3 Typography

**Primary:** Inter (Google Fonts). Fallback: -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif

**Monospace:** JetBrains Mono. Used for dispute amounts, IDs, card digits, file names.

**Type scale (1.25 modular ratio, 16px base):**

| Token | Size | Line Height | Weight | Usage |
|---|---|---|---|---|
| text-xs | 12px | 16px | 400 | Meta labels, timestamps, helper text |
| text-sm | 14px | 20px | 400/500 | Body secondary, table cells, form help |
| text-base | 16px | 24px | 400 | Body primary |
| text-lg | 18px | 28px | 500 | Card titles, section intros |
| text-xl | 20px | 28px | 600 | Page section headings |
| text-2xl | 24px | 32px | 700 | Page sub-headings |
| text-3xl | 30px | 36px | 700 | Page headings (H1 inner app) |
| text-4xl | 36px | 44px | 800 | Marketing H2 |
| text-5xl | 48px | 52px | 800 | Marketing H1 |

---

### 1.4 Color System

**Philosophy:** Color carries meaning. The palette is intentionally restrained. Amber = urgent. Red = broken. Green = complete. Blue = product identity.

**Primary (brand) palette:**

| Token | Hex | Usage |
|---|---|---|
| brand-900 | #0F2744 | Nav backgrounds, darkest brand elements |
| brand-800 | #1E3A5F | Primary action color (buttons, links, focus rings) |
| brand-700 | #1D4ED8 | Hover states, active links |
| brand-100 | #DBEAFE | Selected state backgrounds |
| brand-50 | #EFF6FF | Page section tint backgrounds |

**Semantic palette:**

| Token | Tailwind | Hex | Usage |
|---|---|---|---|
| success-600 | emerald-600 | #059669 | Pack generated, payment success, Submitted status |
| success-50 | emerald-50 | #ECFDF5 | Success state backgrounds |
| warning-600 | amber-600 | #D97706 | Deadlines within 7 days, missing evidence |
| warning-50 | amber-50 | #FFFBEB | Warning state backgrounds |
| danger-600 | red-600 | #DC2626 | Errors, expired packs, failed payments |
| danger-50 | red-50 | #FEF2F2 | Error state backgrounds |

**Neutral palette:**

| Token | Tailwind | Hex | Usage |
|---|---|---|---|
| slate-900 | slate-900 | #0F172A | Primary text |
| slate-700 | slate-700 | #334155 | Secondary text, labels |
| slate-500 | slate-500 | #64748B | Tertiary text, placeholders, disabled |
| slate-300 | slate-300 | #CBD5E1 | Borders, dividers |
| slate-200 | slate-200 | #E2E8F0 | Table row dividers |
| slate-100 | slate-100 | #F1F5F9 | Hover states, alternate rows |
| slate-50 | slate-50 | #F8FAFC | Page background |
| white | white | #FFFFFF | Card surfaces, modals |

---

### 1.5 Spacing Scale

Base unit: 4px. All values are multiples of 4.

| Token | Value | Usage |
|---|---|---|
| space-1 | 4px | Icon+label gap, intra-field spacing |
| space-2 | 8px | Default inline spacing, badge padding |
| space-3 | 12px | Input padding vertical |
| space-4 | 16px | Base card padding, list items |
| space-6 | 24px | Section separation within a card |
| space-8 | 32px | Card-to-card gap |
| space-12 | 48px | Major section separation |
| space-16 | 64px | Page-level top/bottom padding |
| space-24 | 96px | Marketing section breaks |

Container widths: max 1280px / sidebar 240px / content 1040px / marketing column 720px / forms 480px

---

### 1.6 Border Radius

| Token | Value | Usage |
|---|---|---|
| radius-sm | 4px | Inputs, table cells, inline badges |
| radius-md | 8px | Cards, dropdowns, tooltips |
| radius-lg | 12px | Modal dialogs, overlay panels |
| radius-xl | 16px | Marketing feature cards |
| radius-full | 9999px | Pills, avatar circles, progress bars |

---

### 1.7 Shadow System

| Token | Style | Usage |
|---|---|---|
| shadow-xs | 0 1px 2px rgba(0,0,0,0.05) | Subtle card separation |
| shadow-sm | 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06) | Default card shadow |
| shadow-md | 0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06) | Dropdown menus |
| shadow-lg | 0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05) | Modal dialogs |

---

### 1.8 Icon Direction

Icon library: Lucide React. Stroke-based, 1.5px stroke, 24px default (20px compact). Do not mix with other icon libraries.

| Concept | Icon | Color Context |
|---|---|---|
| Upload/exhibit | Upload | slate-500 |
| Evidence file | FileText | slate-700 |
| PDF download | FileDown | brand-800 |
| Deadline | Clock | amber-600 when urgent |
| Dispute/pack | Shield | brand-800 |
| Complete | CheckCircle | emerald-600 |
| Warning | AlertTriangle | amber-600 |
| Error | XCircle | red-600 |
| Settings | Settings | slate-700 |
| Payment | CreditCard | slate-700 |
| Delete | Trash2 | red-600 (confirmation required) |

---

### 1.9 Motion Philosophy

Core rule: Motion serves function only. No decorative animations.

Permitted: loading spinners (300ms), status transitions (200ms ease-out), modal open (150ms scale), toast slide-in (200ms), progress bar fill (400ms ease-in-out).

Never animate: page transitions, background color changes, scroll-triggered effects, text content.

Always respect prefers-reduced-motion. Disable all animations when set.

---

### 1.10 Trust Signal Requirements (Design-Level)

1. Data retention notice — visible on every screen handling uploads: "Files deleted 72 hours after download."
2. Stripe badge — "Payments secured by Stripe" on all payment-adjacent screens.
3. No-guarantee disclosure — shown automatically when AI-generated content is displayed.
4. Explicit category match — selected dispute reason always visible in current step header.
5. Save progress indicator — "Your answers are saved" after each intake question.
6. File limits pre-upload — "PDF, PNG, JPG — max 10MB per file, 20 files max" shown before upload zone.

---

## 2. Component Library

### 2.1 Button System

| Variant | Usage | Style |
|---|---|---|
| primary | Main CTA — one per screen max | brand-800 bg, white text, shadow-sm |
| secondary | Secondary actions | white bg, slate-300 border, slate-900 text |
| ghost | Tertiary actions | transparent bg, slate-700 text, hover slate-100 bg |
| danger | Destructive — always requires confirmation | red-600 bg, white text |
| link | Inline text links | brand-800 text, underline on hover |

| Size | Height | Padding | Text | Usage |
|---|---|---|---|---|
| sm | 32px | 8px 12px | text-sm | Compact table actions |
| md | 40px | 10px 16px | text-sm | Default |
| lg | 48px | 12px 24px | text-base | Primary CTAs, modal confirms |
| xl | 56px | 16px 32px | text-lg | Hero CTAs (marketing) |

States: default / hover / active / focus (ring-2 brand-700) / disabled (opacity-50) / loading (spinner + disabled)

---

### 2.2 Form System

Text input: height 40px, border 1px slate-300, radius-sm, padding 10px 12px, focus ring-2 brand-700.
Error state: border red-600, ring red-100.
Labels: text-sm slate-700 font-medium, always above input. Required: amber asterisk (*).
Error messages: text-xs red-600 + XCircle icon. Always explicit ("Deadline date is required").
Textarea: same as input, min-height 120px, resize vertical only.
Select: same styling as input, ChevronDown icon right-aligned, custom styled.

File upload zone:
- 2px dashed slate-300 border, radius-md, slate-50 bg, 32px padding
- Center: Upload icon + "Drop files here or click to browse"
- Hover/active: brand-800 border, brand-50 bg
- File limits displayed below: "PDF, PNG, JPG — max 10MB per file, 20 files max"

Form layout: vertical stack, 20px between fields, labels above inputs (never floating), one concept per multi-step form step.

---

### 2.3 Card System

Base card: white bg, 1px slate-200 border, radius-md, shadow-sm, 24px padding.

Pack card (dashboard list): 3-column layout [icon + title + category] | [deadline badge] | [status badge + actions], 72px height, hover bg-slate-50.

Stat card: icon left + value/label right, 20px padding, 3px brand-800 left border.

Evidence item card: file icon + filename + label + size + remove button, 56px height.

---

### 2.4 Status Badge System

| Status | Text | Background | When Used |
|---|---|---|---|
| draft | slate-500 | slate-100 | Pack created, not generated |
| generating | brand-700 | brand-50 | Generation in progress |
| ready | emerald-600 | emerald-50 | PDF ready to download |
| expired | red-600 | red-50 | 72-hour window passed |
| submitted | slate-700 | slate-100 | User marked submitted |
| urgent | amber-700 | amber-50 | Deadline within 48 hours |

Spec: text-xs font-medium, radius-full, px-2.5 py-0.5, always with icon.

---

### 2.5 Alert System

| Type | Left Border | Icon | Background |
|---|---|---|---|
| info | brand-800 | Info | brand-50 |
| success | emerald-600 | CheckCircle | emerald-50 |
| warning | amber-600 | AlertTriangle | amber-50 |
| error | red-600 | XCircle | red-50 |

Structure: icon + bold title + description. Optionally dismissible.

---

### 2.6 Table System

Header: slate-50 bg, text-xs uppercase font-semibold slate-500, 12px 16px padding.
Row: 52px height, border-b slate-200, hover bg-slate-50.
Cell: text-sm slate-900. Actions: right-aligned ghost buttons.
Empty state: centered icon + message (see 2.7).
Pagination: "Showing 1–10 of 23 packs" + prev/next.

---

### 2.7 Empty States

Structure: 48px icon (slate-300) + title (text-lg slate-700) + body (text-sm slate-500, max 2 lines) + optional CTA.

Dashboard empty: Shield icon, "No dispute packs yet", "Create your first pack in under 30 minutes.", CTA "Create Your First Pack" (primary).
Exhibits empty: Upload icon, "No exhibits uploaded", "Upload your evidence files.", CTA "Upload Exhibits" (secondary).
Billing empty: CreditCard icon, "No purchase history", "Receipts appear after your first purchase." No CTA.

---

### 2.8 Loading States

Page skeleton: shimmer cards matching real content (3 shimmer pack cards on dashboard load).
Inline: 16px brand-700 spinner.
Button: replace label with spinner + disable. Never two simultaneous loading states.

Generation loading (special):
- Full-width animated brand-700 progress bar
- Step labels: "Analyzing answers → Generating narrative → Assembling exhibits → Building PDF"
- "This takes about 20–30 seconds."
- User stays on page. Download button appears when done.

---

### 2.9 Error States

Inline field: text-xs red-600 + XCircle below field.
Form-level: Alert (error) at top of form on submit with multiple invalid fields.
Page-level API failure: Alert error, "Something went wrong", specific message, "Try Again" button.
Generation failure: "PDF generation failed", answers saved, credit not consumed, support contact shown.
404: centered, "Page not found", "This pack may have expired or never existed.", "Back to Dashboard" button.

---

## 3. Navigation Architecture

### 3.1 App Sidebar (240px fixed)

Logo / Product wordmark
Pack credit indicator ("1 pack credit available")

MAIN
  Dashboard       [Shield]
  New Dispute Pack  [Plus]

ACCOUNT
  Billing & Settings  [Settings]

HELP
  Documentation  [BookOpen]
  Support  [MessageCircle]

[Bottom] user@email.com / Sign out

Active state: brand-50 bg, brand-800 text + icon, 3px brand-800 left border.

### 3.2 Marketing Navigation (sticky top bar)

[Logo]   How It Works   Pricing   FAQ      [Log In]   [Create Pack →]

Sticky on scroll (shadow-sm added on scroll). Mobile: hamburger → full-screen drawer. CTA: primary button.

---

## 4. Tailwind Configuration Reference

Extend tailwind.config.js with:

colors.brand: { 50: '#EFF6FF', 100: '#DBEAFE', 700: '#1D4ED8', 800: '#1E3A5F', 900: '#0F2744' }

fontFamily.sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif']

fontFamily.mono: ['JetBrains Mono', 'SFMono-Regular', 'Consolas', 'Liberation Mono', 'monospace']

borderRadius: { sm: '4px', md: '8px', lg: '12px', xl: '16px' }
