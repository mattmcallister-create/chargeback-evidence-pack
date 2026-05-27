import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { LoginForm } from '@/components/auth/login-form';

const APP_NAME = 'ChargebackKit';

export const metadata = {
  title: `Sign In — ${APP_NAME}`,
  description: `Sign in to your ${APP_NAME} account to manage your chargeback evidence packs.`,
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const params = await searchParams;
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
  if (user) {
    redirect(params.next || '/app');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{APP_NAME}</h1>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>

        {params.error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            {params.error === 'auth_callback_failed'
              ? 'Authentication failed. Please try again.'
              : 'An error occurred. Please try again.'}
          </div>
        )}

        <LoginForm redirectTo={params.next} />

        <p className="mt-6 text-center text-sm text-gray-500">
          Don&apos;t have an account?{' '}
          <a href="https://buy.stripe.com/5kQaEY83P3f02Hdf0l3Nm02" className="font-medium text-blue-600 hover:text-blue-500">
            Get started
          </a>
        </p>
      </div>
    </div>
  );
}
