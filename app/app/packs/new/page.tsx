import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAccessState } from '@/lib/billing/entitlements';
import { DisputeWizard } from '@/components/packs/dispute-wizard';

const APP_NAME = 'ChargebackKit';

export const metadata = {
  title: `New Evidence Pack — ${APP_NAME}`,
};

export default async function NewPackPage() {
  const cookieStore = await cookies();
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
          } catch {}
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const accessState = await getAccessState(user.id);

  if (accessState.credits <= 0 && accessState.status !== 'subscription_active') {
    redirect('/pricing?reason=no_credits');
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">New Evidence Pack</h1>
        <p className="mt-1 text-sm text-gray-500">
          Walk through the guided intake to build your chargeback evidence pack.
        </p>
      </div>
      <DisputeWizard userId={user.id} />
    </div>
  );
}
