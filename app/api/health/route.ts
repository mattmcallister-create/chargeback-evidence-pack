// app/api/health/route.ts
// Lightweight health check for Render's healthcheck path.
// Returns 200 + minimal JSON. Does NOT touch the database to keep it cheap.

import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export function GET() {
  return NextResponse.json({
    ok: true,
    service: 'chargebackkit',
    timestamp: new Date().toISOString(),
  });
}
