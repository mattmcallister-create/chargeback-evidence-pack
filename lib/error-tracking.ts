import { createBrowserClient } from '@supabase/ssr';

type ErrorSeverity = 'error' | 'warning' | 'fatal';

interface ErrorReport {
  error_message: string;
  error_stack?: string;
  error_digest?: string;
  path?: string;
  component?: string;
  metadata?: Record<string, unknown>;
  severity?: ErrorSeverity;
}

let supabase: ReturnType<typeof createBrowserClient> | null = null;

function getSupabase() {
  if (!supabase) {
    supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return supabase;
}

/**
 * Report an error to the app_errors table in Supabase.
 * Fire-and-forget — never throws, never blocks UI.
 */
export async function reportError(report: ErrorReport): Promise<void> {
  try {
    const sb = getSupabase();
    const { data: { user } } = await sb.auth.getUser();

    await sb.from('app_errors').insert({
      user_id: user?.id ?? null,
      error_message: report.error_message.slice(0, 2000),
      error_stack: report.error_stack?.slice(0, 5000) ?? null,
      error_digest: report.error_digest ?? null,
      path: report.path ?? (typeof window !== 'undefined' ? window.location.pathname : null),
      component: report.component ?? null,
      metadata: report.metadata ?? {},
      severity: report.severity ?? 'error',
    });
  } catch {
    // Silently fail — error tracking should never break the app
    if (process.env.NODE_ENV === 'development') {
      console.warn('[error-tracking] Failed to report error:', report.error_message);
    }
  }
}

/**
 * Server-side error reporter using service role or anon key.
 * Import this only in server components / API routes.
 */
export async function reportServerError(
  report: Omit<ErrorReport, 'path'> & { path?: string }
): Promise<void> {
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const sb = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    await sb.from('app_errors').insert({
      error_message: report.error_message.slice(0, 2000),
      error_stack: report.error_stack?.slice(0, 5000) ?? null,
      error_digest: report.error_digest ?? null,
      path: report.path ?? null,
      component: report.component ?? null,
      metadata: report.metadata ?? {},
      severity: report.severity ?? 'error',
    });
  } catch {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[error-tracking] Failed to report server error:', report.error_message);
    }
  }
}

/**
 * Install global window error handlers (call once in a client layout).
 */
export function installGlobalErrorHandlers(): void {
  if (typeof window === 'undefined') return;

  window.addEventListener('error', (event) => {
    reportError({
      error_message: event.message || 'Unknown error',
      error_stack: event.error?.stack,
      severity: 'error',
      metadata: {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      },
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    reportError({
      error_message:
        reason instanceof Error
          ? reason.message
          : typeof reason === 'string'
            ? reason
            : 'Unhandled promise rejection',
      error_stack: reason instanceof Error ? reason.stack : undefined,
      severity: 'error',
      metadata: { type: 'unhandledrejection' },
    });
  });
}
