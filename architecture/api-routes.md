# API Route Structure — Chargeback Evidence Pack Builder
# Last updated: 2026-03-30 | Phase 2 Architecture
#
# Framework: Next.js 14 App Router
# Runtime: Node.js on Render (NOT edge runtime — Puppeteer requires Node)
# Auth: Supabase Auth + middleware session validation
# Base URL (prod): https://[app-name].onrender.com
#
# CRITICAL RULES:
# 1. /api/webhooks/stripe MUST have body parsing DISABLED (raw body required)
# 2. All other routes use default Next.js body parsing
# 3. All routes except /api/webhooks/stripe require valid Supabase session
# 4. Never expose Stripe secret key or OpenAI key to client
# 5. Rate limit generation endpoint to prevent abuse

---

## NEXT.JS APP ROUTER DIRECTORY STRUCTURE

```
app/
  (marketing)/          # Public pages (no auth required)
    page.tsx            # Homepage
    pricing/page.tsx    # Pricing page
    layout.tsx

  (app)/                # Authenticated pages
    layout.tsx          # Auth guard middleware
    dashboard/page.tsx  # Pack list
    packs/
      new/page.tsx      # Category selection (Magic Moment #1)
      [id]/
        page.tsx        # Pack detail / intake form
        generate/page.tsx # Generation status + download
    account/page.tsx    # Credit balance + billing history

  api/
    webhooks/
      stripe/route.ts   # POST — Stripe webhook (RAW BODY)
    packs/
      route.ts          # GET, POST
      [id]/
        route.ts        # GET, PUT
        exhibits/
          route.ts      # POST (upload)
          [exhibitId]/
            route.ts    # DELETE
        generate/
          route.ts      # POST
        download/
          route.ts      # GET
    checkout/
      route.ts          # POST — Create Stripe Checkout session
    user/
      credits/route.ts  # GET — Credit balance
```

---

## ROUTE SPECIFICATIONS

---

### POST /api/webhooks/stripe

**Purpose:** Receive and process Stripe webhook events.
**Auth:** None (validated via Stripe signature, NOT Supabase session)
**Body parsing:** DISABLED — must receive raw Buffer

```typescript
// app/api/webhooks/stripe/route.ts
export const config = {
  api: {
    bodyParser: false,  // CRITICAL: must be false
  },
};

// In App Router, disable body parsing via:
export const dynamic = 'force-dynamic';
// And read raw body via: await request.arrayBuffer()
```

**Events handled:**

| Event | Action |
|---|---|
| checkout.session.completed | Add credits to user_credits, log webhook_events |
| payment_intent.payment_failed | Log for debugging (no credit action) |

**Processing flow:**
1. Read raw body as Buffer
2. Get Stripe-Signature header
3. Call stripe.webhooks.constructEvent(rawBody, sig, STRIPE_WEBHOOK_SECRET)
4. If verification fails: return HTTP 400
5. Check webhook_events table for this event_id (idempotency check)
6. If already processed: return HTTP 200 (do not process again)
7. Process event (add credits)
8. Insert into webhook_events table
9. Return HTTP 200

**Credit amounts by product:**

| Stripe Product | Credits to Add |
|---|---|
| Single Pack ($39) | 1 |
| 3-Pack Bundle ($99) | 3 |

**Error handling:** Always return HTTP 200 to Stripe (even on processing errors) to prevent
automatic retries for errors that won't resolve themselves. Log all errors internally.

---

### GET /api/packs

**Purpose:** List all packs for the authenticated user.
**Auth:** Required (Supabase session)
**Response:** Array of pack summaries

```typescript
// Request: GET /api/packs?status=draft&limit=20&offset=0

// Response 200:
{
  packs: [
    {
      id: string,
      dispute_category: string,
      status: 'draft' | 'generating' | 'ready' | 'expired' | 'failed',
      dispute_amount: number | null,
      dispute_date: string | null,
      response_deadline: string | null,
      pdf_expires_at: string | null,
      created_at: string,
      updated_at: string
    }
  ],
  total: number
}
```

**Query params:** status (optional filter), limit (default 20, max 50), offset (default 0)
**Sorting:** created_at DESC (newest first)

---

### POST /api/packs

**Purpose:** Create a new draft pack.
**Auth:** Required
**Note:** Pack creation does NOT deduct credits. Credits deducted only at generation.

```typescript
// Request body:
{
  dispute_category: 'product_not_received' | 'product_unacceptable' |
                    'subscription_canceled' | 'duplicate' |
                    'credit_not_processed' | 'fraudulent',
  merchant_name?: string,
  dispute_amount?: number,
  dispute_date?: string,  // ISO date
  response_deadline?: string  // ISO date
}

// Response 201:
{
  id: string,
  dispute_category: string,
  status: 'draft',
  created_at: string
}

// Response 400: Invalid dispute_category
// Response 401: Not authenticated
```

---

### GET /api/packs/[id]

**Purpose:** Get full pack detail including intake answers and exhibit list.
**Auth:** Required (must be pack owner — enforced by RLS)

```typescript
// Response 200:
{
  id: string,
  dispute_category: string,
  status: string,
  stripe_dispute_id: string | null,
  merchant_name: string | null,
  dispute_amount: number | null,
  dispute_date: string | null,
  response_deadline: string | null,
  intake_answers: Record<string, string>,
  pdf_expires_at: string | null,
  created_at: string,
  updated_at: string,
  exhibits: [
    {
      id: string,
      original_filename: string,
      file_size_bytes: number,
      mime_type: string,
      exhibit_letter: string | null,
      exhibit_label: string | null,
      display_order: number,
      created_at: string
    }
  ],
  deadline: {
    deadline_date: string,
    dismissed: boolean,
    notes: string | null
  } | null
}

// Response 404: Pack not found or not owned by user
```

---

### PUT /api/packs/[id]

**Purpose:** Update pack intake answers and metadata (during draft phase).
**Auth:** Required (must be pack owner)
**Restriction:** Only allowed when pack.status === 'draft'

```typescript
// Request body (all fields optional):
{
  intake_answers?: Record<string, string>,  // merged, not replaced
  merchant_name?: string,
  dispute_amount?: number,
  dispute_date?: string,
  response_deadline?: string,
  stripe_dispute_id?: string
}

// Response 200: Updated pack object (same shape as GET /api/packs/[id])
// Response 400: Pack is not in draft status
// Response 404: Not found or not owned
```

**Note on intake_answers:** Merge incoming answers with existing (JSONB merge),
do not replace the entire object. This allows incremental saving as the user fills the form.

---

### POST /api/packs/[id]/exhibits

**Purpose:** Upload an evidence exhibit file.
**Auth:** Required (must be pack owner)
**Content-Type:** multipart/form-data
**Limits:** 10MB per file, max 8 exhibits per pack, allowed types: PDF/PNG/JPG/JPEG

```typescript
// Request: multipart/form-data
// Fields:
//   file: File (required)
//   exhibit_label: string (optional — user-provided label)

// Processing:
// 1. Validate file size, type
// 2. Generate storage path: pack-exhibits/{user_id}/{pack_id}/{uuid}.{ext}
// 3. Upload to Supabase Storage
// 4. Insert into pack_exhibits table
// 5. Return exhibit record

// Response 201:
{
  id: string,
  original_filename: string,
  file_size_bytes: number,
  mime_type: string,
  exhibit_label: string | null,
  display_order: number,
  created_at: string
}

// Response 400: Invalid file type, file too large, or max exhibits reached
// Response 404: Pack not found or not owned
```

---

### DELETE /api/packs/[id]/exhibits/[exhibitId]

**Purpose:** Delete a specific exhibit file.
**Auth:** Required (must be pack owner)

```typescript
// Response 200: { success: true }
// Response 404: Exhibit not found or not owned

// Processing:
// 1. Get exhibit record (verify ownership)
// 2. Delete from Supabase Storage
// 3. Delete from pack_exhibits table
// 4. Return success
```

---

### POST /api/packs/[id]/generate

**Purpose:** Trigger PDF evidence pack generation.
**Auth:** Required (must be pack owner)
**This is the most critical route — gets its own section.**

```typescript
// Request body: {} (empty — all data read from pack record)

// Pre-conditions checked:
// 1. Pack exists and is owned by user
// 2. Pack status is 'draft' (not already generating/ready/expired)
// 3. User has at least 1 credit (balance > 0)
// 4. Pack has at least the minimum required intake answers for its category

// Processing flow:
// 1. Validate pre-conditions (return 400 if any fail)
// 2. Call deduct_credit(user_id) atomically — returns false if no credits
// 3. If deduction fails: return 402 Payment Required
// 4. Update pack.status = 'generating', pack.generation_started_at = now()
// 5. Insert into pack_generations (status: 'started', credit_deducted: true)
// 6. Start async generation pipeline:
//    a. Load intake_answers + exhibit files from storage
//    b. Call OpenAI to generate narrative (see architecture/openai-prompts.md)
//    c. Assign exhibit letters (A, B, C...) to uploads in display_order
//    d. Render HTML template with narrative + evidence checklist + exhibits
//    e. Run Puppeteer to generate PDF from HTML
//    f. Upload PDF to Supabase Storage (pack-pdfs bucket)
//    g. Update pack: status='ready', pdf_storage_path, pdf_expires_at=now()+72h
//    h. Update pack_generations: status='completed', completed_at, duration_ms
// 7. On any step failure:
//    a. Call restore_credit(user_id)
//    b. Update pack: status='failed'
//    c. Update pack_generations: status='failed', error_code, error_message, credit_restored=true
//    d. Return error (or if async, update pack status for polling)

// Response 202 Accepted (async):
{
  generation_id: string,
  pack_id: string,
  status: 'generating'
}

// Response 400: Pack not in draft status, or missing required intake answers
// Response 402: Insufficient credits
// Response 404: Pack not found or not owned
// Response 409: Pack is already being generated
```

**Polling:** Client polls GET /api/packs/[id] every 3 seconds to check status transition
from 'generating' → 'ready' | 'failed'. No websockets needed for v1.

**Generation timeout:** If generation exceeds 120 seconds, mark as failed and restore credit.

---

### GET /api/packs/[id]/download

**Purpose:** Get a signed temporary URL for the generated PDF.
**Auth:** Required (must be pack owner)
**Restriction:** Only available when pack.status === 'ready'

```typescript
// Response 200:
{
  download_url: string,  // Supabase Storage signed URL, expires in 15 minutes
  filename: string,      // e.g., "dispute-evidence-pack-2026-03-30.pdf"
  expires_at: string     // ISO timestamp (15 min from now)
}

// Response 404: Pack not found or not owned
// Response 410 Gone: Pack is expired (PDF deleted)
// Response 409: Pack not ready (still generating or in draft)
```

**Important:** The signed URL is temporary (15 min). The PDF itself expires at pdf_expires_at (72h).
If the user requests a download after pdf_expires_at, return 410 with a clear message.

---

### POST /api/checkout

**Purpose:** Create a Stripe Checkout session for purchasing credits.
**Auth:** Required
**Returns:** URL to redirect user to Stripe-hosted Checkout

```typescript
// Request body:
{
  product: 'single' | 'bundle'  // single = $39/1 credit, bundle = $99/3 credits
}

// Processing:
// 1. Get or create Stripe customer for this user (store in profiles.stripe_customer_id)
// 2. Create Stripe Checkout session:
//    - mode: 'payment' (one-time, not subscription)
//    - line_items: based on product
//    - success_url: /dashboard?payment=success
//    - cancel_url: /dashboard?payment=canceled
//    - customer: profiles.stripe_customer_id
//    - metadata: { user_id, product }
// 3. Return checkout URL

// Response 200:
{
  checkout_url: string  // Redirect user to this URL
}

// Response 400: Invalid product
// Response 500: Stripe API error
```

**Pricing:**

| Product Key | Display Name | Amount | Credits |
|---|---|---|---|
| single | Single Evidence Pack | $39.00 USD | 1 |
| bundle | 3-Pack Bundle | $99.00 USD | 3 |

---

### GET /api/user/credits

**Purpose:** Get the authenticated user's current credit balance.
**Auth:** Required

```typescript
// Response 200:
{
  balance: number,        // current available credits
  total_purchased: number,
  total_used: number
}
```

---

## MIDDLEWARE (app/middleware.ts)

```typescript
// Protects all /app/* routes and /api/* routes (except /api/webhooks/stripe)
// Uses Supabase Auth session cookie
// Redirects unauthenticated users to /login

export const config = {
  matcher: [
    '/(app)/:path*',
    '/api/((?!webhooks/stripe).*)',
  ],
};
```

---

## ERROR RESPONSE FORMAT

All API routes return errors in this format:

```typescript
{
  error: {
    code: string,      // e.g., 'INSUFFICIENT_CREDITS', 'PACK_NOT_FOUND'
    message: string,   // Human-readable description
    details?: any      // Optional additional context
  }
}
```

**Standard error codes:**

| HTTP | Code | Meaning |
|---|---|---|
| 400 | INVALID_INPUT | Request body validation failed |
| 400 | PACK_NOT_DRAFT | Operation requires pack to be in draft status |
| 400 | MISSING_INTAKE | Required intake answers are missing |
| 400 | MAX_EXHIBITS | Pack already has 8 exhibits |
| 400 | FILE_TOO_LARGE | Uploaded file exceeds 10MB |
| 400 | INVALID_FILE_TYPE | File type not allowed |
| 401 | UNAUTHORIZED | Not authenticated |
| 402 | INSUFFICIENT_CREDITS | No credits available |
| 404 | PACK_NOT_FOUND | Pack doesn't exist or not owned by user |
| 404 | EXHIBIT_NOT_FOUND | Exhibit doesn't exist |
| 409 | ALREADY_GENERATING | Pack generation already in progress |
| 410 | PACK_EXPIRED | PDF has been deleted (72h retention) |
| 500 | GENERATION_FAILED | PDF generation encountered an error |

---

## RATE LIMITING

Apply rate limits to prevent abuse:

| Route | Limit |
|---|---|
| POST /api/packs/[id]/generate | 3 requests per hour per user |
| POST /api/checkout | 10 requests per hour per user |
| POST /api/packs/[id]/exhibits | 20 uploads per hour per user |
| All other routes | 100 requests per minute per user |

Implementation: Use Upstash Redis (free tier) or a simple in-memory store for v1.

---

## NEXT.JS ROUTE HANDLER PATTERN

```typescript
// Standard pattern for all authenticated routes
import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json(
      { error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
      { status: 401 }
    );
  }

  // All Supabase queries from here respect RLS (user only sees their data)
  // ...
}
```

---

## VERSION HISTORY

| Version | Date | Changes |
|---|---|---|
| 1.0 | 2026-03-30 | Initial API route design |
