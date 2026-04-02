import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Get the authenticated user from a server context (API route or Server Component).
 * Returns the user object or null if not authenticated.
 *
 * Usage in API routes:
 *   const user = await getAuthenticatedUser();
 *   if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
 *
 * Usage in Server Components:
 *   const user = await getAuthenticatedUser();
 *   if (!user) redirect('/login');
 */
export async function getAuthenticatedUser() {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll can fail in Server Components — safe to ignore.
            // The middleware handles session refresh for page requests.
          }
        },
      },
    }
  );

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}

/**
 * Require authentication — throws if not authenticated.
 * Use in API routes where you always need a user.
 */
export async function requireUser() {
  const user = await getAuthenticatedUser();
  if (!user) {
    throw new Error('Authentication required');
  }
  return user;
}
