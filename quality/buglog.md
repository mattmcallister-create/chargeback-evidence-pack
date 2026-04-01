# Bug Log — Chargeback Evidence Pack Builder
**Last Updated:** 2026-04-01
**Policy:** Do not delete entries. Update status only. Add new bugs at the bottom of the list.

---

## Bug Entry Format

**BUG-[number]**
- **Date Reported:**
- **Reported By:**
- **Severity:** Critical / High / Medium / Low
- **Status:** Open / In Progress / Fixed / Wont Fix / Cannot Reproduce
- **Feature Area:** (Auth / Pack Creation / Payments / Generation / PDF / Deadline / UX / Security)
- **Description:**
- **Steps to Reproduce:**
- **Expected:**
- **Actual:**
- **Fix Applied:** (commit hash or PR, if fixed)
- **Notes:**

---

## Severity Definitions

| Severity | Definition | Response Time |
|----------|-----------|---------------|
| Critical | Data loss, security vulnerability, payment error, or product completely unusable | Immediate — fix before any other work |
| High | Core workflow broken for a subset of users, pack generation fails, PDF corrupt | Fix within current build sprint |
| Medium | Feature partially broken but workaround exists | Fix before launch |
| Low | Minor UX issue, cosmetic, edge case | Fix when time permits |

---

## Active Bugs

_No bugs logged yet. Project is in pre-build harness phase._

---

## Resolved Bugs

_No resolved bugs yet._

---

## Bug Triage Notes

**Pre-build note (2026-04-01):** This log is initialized as part of the operating harness. Bugs will be logged here as development begins. The following known risk areas should be watched closely during build:

1. **Stripe webhook raw body handling** — Next.js default body parsing will break Stripe signature verification. Must disable body parser on the webhook route. This is a known gotcha and a Critical-level risk if missed.

2. **Supabase Storage RLS policies** — Row Level Security must be configured to prevent User A from accessing User B's files. Misconfiguration is a security bug, not a feature bug. Test explicitly.

3. **PDF generation on Render free tier** — Render free tier spins down after inactivity. First PDF generation after spin-down may timeout. Watch for this in staging.

4. **CodeMirror / Monaco editor tab handling** — If using a rich text editor for any intake fields, tab key may be intercepted. Test keyboard navigation explicitly.

5. **Concurrent pack generation** — If a user double-clicks Generate, two generation requests may fire. Credit deduction must be atomic. Test with artificial latency.

6. **File upload race condition** — If exhibit files are uploaded and the user navigates away before upload completes, file records may be orphaned. Implement upload-complete state tracking.
