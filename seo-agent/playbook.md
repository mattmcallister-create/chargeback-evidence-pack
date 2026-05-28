# SEO/AEO Agent Playbook
Read at start of every run. Update after every run with a new lesson. Full self-audit on Sundays.
## State
- calibration_merges_remaining: 8
- total_self_merges: 2 (PR #2, PR #3 — both 2026-05-26)
- total_reverts: 0
- pause_active: Google May 2026 Core Update (started 2026-05-21, complete ~2026-06-04, re-baseline through 2026-06-11)
## Active rules
- **R-001** Honor algo-update pause through re-baselining. No ranking-affecting changes until 2026-06-11. Repo-internal files (no public-site effect) are exempt.
- **R-002** Run Step 0 cross-project sync at the START of every run AND immediately before merge. Both required.
- **R-003** Treat the main project as senior partner. May 27 main-project surge: bulk title fix, sitemap rebuild, /alternatives/ (chargeflow, chatgpt, stripe-smart-disputes), robots auth disallow, login noindex. Do not duplicate or modify these surfaces.
- **R-004** Calibration constraints: Tier 1-2 only, diff ≤ 50 lines AND ≤ 2 files, 3x post-merge canary over 30 min, T+24h follow-up. Any auto-revert resets counter to 10.
- **R-005** Velocity: max 1 self-merge/day, 5/week. PR queue limit: 1 open.
- **R-006** Quiet hours: no autonomous merges 22:00-08:00 ET.
- **R-007** Build CI must pass green before self-merge. Env stubs required for SUPABASE_SERVICE_ROLE_KEY, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, RESEND_API_KEY, OPENAI_API_KEY, NEXT_PUBLIC_SUPPORT_EMAIL.
- **R-008** Title bug resolved by commit deeca42 (2026-05-27). Do not re-fix.
- **R-009** Check main-branch commits for "feat(seo): add /alternatives/" before authoring comparisons. Main project owns this surface for now.
## Pre-staged actions (post-pause, validate vs then-current GSC first)
1. Visa CE 3.0 April 2026 Order Insight FAQ for /guides/visa-reason-code-13-1 (T3)
2. Friendly-fraud stats refresh for /guides/friendly-fraud-prevention (T3)
3. $0.50 auth-and-void H2 for /guides/saas-chargeback-prevention (T3)
4. FAQPage JSON-LD for /guides/visa-reason-code-13-1 (T1)
5. Mastercard 45-day window callout for /guides/mastercard-reason-code-4853 (T3)
6. "Last updated" date stamps on all guide pages (T1)
## Risk tiers
- T1 additive schema, dates, alt text, broken-link fix
- T2 new educational page (no CTAs/prices), meta-desc fill, BreadcrumbList
- T3 title CTR opt (preserve primary kw), new H2, internal links
- T4 sitemap, robots, new top-level route, layouts, canonicals, pages >100 impr/d → open PR only
- T5 forbidden — pricing, product, payments, auth, DB, env, brand voice, chrome, disclaimer
Default new category: T4 until ≥3 clean precedents.
## Auto-revert triggers
Canary fail, CI fail, -3 avg pos in 7d, -30% impr in 7d, -5 Lighthouse, GSC schema error, new mobile/CWV failure, Matt flags issue.
## Lessons
- 2026-05-26 PR #2 fixed title bug per-page; Matt later did bulk. Propose bulk fixes when bug is pattern-wide.
- 2026-05-26 PR #3 CI needed env stubs for Next.js App Router pages reading server vars at build.
- 2026-05-27 Three-gate report-only run was correct outcome, not a workaround.
- 2026-05-28 Main project actively doing SEO. Agent role is gap-filling, not duplication.
