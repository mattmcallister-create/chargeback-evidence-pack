# Supabase Storage & RLS — Chargeback Evidence Pack Builder
# Last updated: 2026-03-30 | Phase 2 Architecture
#
# This file covers:
# 1. Supabase Storage bucket configuration
# 2. Storage path conventions
# 3. Storage RLS policies (bucket-level + object-level)
# 4. Database RLS policies (referenced from db-schema.md, expanded here)
# 5. Service role vs anon key usage

---

## SECURITY PRINCIPLES

1. All storage is PRIVATE — no public buckets. Every file requires authentication.
2. Users can only access their own files — enforced at both Storage and DB level.
3. Server-side only writes for generated PDFs — clients never write to pack-pdfs.
4. Anon key is safe for client use (RLS enforces per-user isolation).
5. Service role key is NEVER exposed to the client — server-side API routes only.
6. Signed URLs for downloads — short-lived (15 min), logged, not guessable.

---

## SUPABASE STORAGE BUCKETS

### Bucket 1: pack-exhibits

| Setting | Value |
|---|---|
| Bucket ID | pack-exhibits |
| Public | false (private) |
| File size limit | 10 MB |
| Allowed MIME types | image/png, image/jpeg, image/jpg, application/pdf |
| Created via | Supabase Dashboard or migration script |

**Path convention:**
```
pack-exhibits/{user_id}/{pack_id}/{exhibit_id}.{ext}
```
Example: `pack-exhibits/abc123/def456/ghi789.pdf`

This path structure enables:
- Per-user RLS (path starts with user's UUID)
- Per-pack grouping (easy cleanup when pack expires)
- Unique exhibit IDs (no collision)

---

### Bucket 2: pack-pdfs

| Setting | Value |
|---|---|
| Bucket ID | pack-pdfs |
| Public | false (private) |
| File size limit | 50 MB |
| Allowed MIME types | application/pdf |
| Created via | Supabase Dashboard or migration script |

**Path convention:**
```
pack-pdfs/{user_id}/{pack_id}.pdf
```
Example: `pack-pdfs/abc123/def456.pdf`

**Important:** Only the server (service role) writes to this bucket.
Clients never upload here — they only get signed download URLs.

---

## STORAGE RLS POLICIES

Supabase Storage policies operate on the `storage.objects` table.
The `name` column contains the full path (e.g., `pack-exhibits/user_id/pack_id/exhibit_id.pdf`).

### pack-exhibits bucket policies

```sql
-- Allow users to SELECT (view/download) their own exhibits
CREATE POLICY "Users can view own exhibits"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'pack-exhibits'
  AND auth.uid()::text = (string_to_array(name, '/'))[2]
);

-- Allow users to INSERT (upload) their own exhibits
CREATE POLICY "Users can upload own exhibits"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'pack-exhibits'
  AND auth.uid()::text = (string_to_array(name, '/'))[2]
);

-- Allow users to DELETE their own exhibits
CREATE POLICY "Users can delete own exhibits"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'pack-exhibits'
  AND auth.uid()::text = (string_to_array(name, '/'))[2]
);

-- No UPDATE policy — files are immutable after upload (delete + re-upload instead)
```

**Path parsing explanation:**
Path format: `pack-exhibits/{user_id}/{pack_id}/{exhibit_id}.{ext}`
`string_to_array(name, '/')` splits on '/' so:
- index [1] = 'pack-exhibits'
- index [2] = user_id
- index [3] = pack_id
- index [4] = filename

### pack-pdfs bucket policies

```sql
-- Allow users to SELECT (get signed URL) their own PDFs
CREATE POLICY "Users can view own PDFs"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'pack-pdfs'
  AND auth.uid()::text = (string_to_array(name, '/'))[2]
);

-- NO INSERT policy for clients — PDFs are written by server only (service role)
-- NO DELETE policy for clients — PDFs are deleted by server retention cron only
-- NO UPDATE policy for clients
```

**Note:** The generation API route uses the Supabase service role client to upload PDFs.
This bypasses RLS entirely — that's intentional. The service role is trusted server-side code.

---

## SIGNED URL GENERATION

For downloads, use Supabase's `createSignedUrl` method (server-side):

```typescript
// Server-side only — use service role client
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!  // Never expose to client
);

const { data, error } = await supabaseAdmin.storage
  .from('pack-pdfs')
  .createSignedUrl(
    `${userId}/${packId}.pdf`,
    900  // 900 seconds = 15 minutes
  );

// Return data.signedUrl to the authenticated client
```

**Important:** Always verify pack ownership before generating signed URL.
Check `packs.user_id = auth.uid()` before calling createSignedUrl.

---

## FILE DELETION (RETENTION CRON)

The retention cron job runs server-side with service role. It:

1. Queries for packs past their `pdf_expires_at`
2. Deletes the PDF from pack-pdfs bucket
3. Deletes all exhibit files from pack-exhibits bucket (by pack path prefix)
4. Updates pack status to 'expired'

```typescript
// Delete a single PDF
await supabaseAdmin.storage
  .from('pack-pdfs')
  .remove([`${userId}/${packId}.pdf`]);

// Delete all exhibits for a pack (list then delete)
const { data: exhibits } = await supabaseAdmin.storage
  .from('pack-exhibits')
  .list(`${userId}/${packId}`);

const paths = exhibits.map(f => `${userId}/${packId}/${f.name}`);
await supabaseAdmin.storage
  .from('pack-exhibits')
  .remove(paths);
```

---

## DATABASE RLS POLICIES (COMPLETE REFERENCE)

This section consolidates all RLS policies across all tables for easy audit.

### profiles

```sql
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can only see/update their own profile
CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Service role can do anything (bypasses RLS)
-- No explicit service role policy needed — service role key bypasses RLS
```

### user_credits

```sql
ALTER TABLE public.user_credits ENABLE ROW LEVEL SECURITY;

-- Users can only read their own credits
CREATE POLICY "credits_select_own" ON public.user_credits
  FOR SELECT USING (auth.uid() = user_id);

-- No client INSERT/UPDATE/DELETE — all credit mutations via service role functions
-- deduct_credit() and restore_credit() are SECURITY DEFINER functions
```

### webhook_events

```sql
-- No RLS needed — only accessed by service role via webhook API route
-- Never expose to client
ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;
-- (No policies = no access for any JWT-authenticated user)
```

### packs

```sql
ALTER TABLE public.packs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "packs_select_own" ON public.packs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "packs_insert_own" ON public.packs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "packs_update_own" ON public.packs
  FOR UPDATE USING (auth.uid() = user_id);

-- No client DELETE — packs are expired, not deleted by users
-- Service role handles status transitions (generating → ready → expired)
```

### pack_exhibits

```sql
ALTER TABLE public.pack_exhibits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "exhibits_select_own" ON public.pack_exhibits
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "exhibits_insert_own" ON public.pack_exhibits
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "exhibits_delete_own" ON public.pack_exhibits
  FOR DELETE USING (auth.uid() = user_id);

-- No UPDATE — exhibits are immutable after upload
```

### pack_generations

```sql
-- Accessed only by service role — no client access needed
ALTER TABLE public.pack_generations ENABLE ROW LEVEL SECURITY;
-- (No policies = no access for JWT-authenticated users)
-- Service role bypasses RLS for all writes/reads
```

### pack_deadlines

```sql
ALTER TABLE public.pack_deadlines ENABLE ROW LEVEL SECURITY;

-- Single policy covers all operations for pack owner
CREATE POLICY "deadlines_all_own" ON public.pack_deadlines
  FOR ALL USING (auth.uid() = user_id);
```

---

## CLIENT KEY USAGE RULES

| Key | Where Used | Purpose |
|---|---|---|
| NEXT_PUBLIC_SUPABASE_URL | Client + Server | Supabase project URL |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Client only | Supabase client for auth + RLS-protected queries |
| SUPABASE_SERVICE_ROLE_KEY | Server only (API routes) | Bypass RLS for server operations (PDF upload, cron, webhook) |

**Critical:** SUPABASE_SERVICE_ROLE_KEY must NEVER appear in:
- Any `NEXT_PUBLIC_*` environment variable
- Client-side code (anything that runs in the browser)
- Client component files (`use client`)

**Always use the service role client from server-side API route handlers only.**

```typescript
// Client-side (safe — respects RLS)
import { createBrowserClient } from '@supabase/ssr';
const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Server-side API routes (elevated — bypasses RLS)
import { createClient } from '@supabase/supabase-js';
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
```

---

## SUPABASE PROJECT SETUP CHECKLIST

Run in this order when initializing Supabase:

```
[ ] Create Supabase project (staging first, then production)
[ ] Enable Email auth provider (disable phone auth)
[ ] Disable email confirmation in staging for easier testing
[ ] Run db-schema.md migrations in order
[ ] Create storage bucket: pack-exhibits (private, 10MB, image/jpeg + image/png + image/jpg + application/pdf)
[ ] Create storage bucket: pack-pdfs (private, 50MB, application/pdf)
[ ] Apply all Storage RLS policies (above)
[ ] Verify RLS is enabled on all tables
[ ] Test: authenticated user can only see their own packs (create two users, verify isolation)
[ ] Test: unauthenticated request returns 401 on all protected routes
[ ] Test: user cannot upload to pack-pdfs directly (should be rejected by RLS)
[ ] Test: user cannot read another user's exhibits
[ ] Copy anon key + URL → NEXT_PUBLIC env vars
[ ] Copy service role key → SUPABASE_SERVICE_ROLE_KEY (keep secret)
[ ] Add webhook URL in Supabase Auth → Webhooks (if using DB webhooks)
```

---

## COMMON RLS MISTAKES TO AVOID

1. **Forgetting to enable RLS** — Tables without RLS are publicly accessible.
   Always run `ALTER TABLE x ENABLE ROW LEVEL SECURITY;` before any policies.

2. **Using `auth.jwt()` instead of `auth.uid()`** — Use `auth.uid()` for user identity checks.

3. **Missing WITH CHECK on INSERT** — A SELECT policy does not restrict inserts.
   Always add `FOR INSERT WITH CHECK` separately.

4. **Using client Supabase for server-side mutations** — Always use service role for
   generation, webhooks, and cron jobs.

5. **Logging service role key** — Never log env vars. Add `SUPABASE_SERVICE_ROLE_KEY`
   to your .gitignore and log scrubber.

6. **RLS on pack-pdfs allows client upload** — Clients must never write PDFs directly.
   The pack-pdfs bucket should have NO INSERT policy for authenticated users.

---

## VERSION HISTORY

| Version | Date | Changes |
|---|---|---|
| 1.0 | 2026-03-30 | Initial storage and RLS design |
