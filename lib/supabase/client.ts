import { createBrowserClient } from '@supabase/ssr';

/**
 * Create a Supabase client for use in Client Components (browser).
 * Uses the anon key — respects RLS policies.
 *
 * Usage:
 *   const supabase = createClient();
 *   const { data } = await supabase.from('packs').select('*');
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
