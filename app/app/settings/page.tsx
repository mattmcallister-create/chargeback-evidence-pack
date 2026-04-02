import { getAuthenticatedUser } from '@/lib/auth/get-user';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { User, CreditCard, ExternalLink } from 'lucide-react';

export const metadata = {
  title: 'Settings | ChargebackKit',
};

export default async function SettingsPage() {
  const user = await getAuthenticatedUser();
  if (!user) redirect('/login');

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account and billing
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile section */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <User className="h-5 w-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
          </div>
          <dl className="space-y-3">
            <div>
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-0.5 text-sm text-gray-900">{user.email}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">User ID</dt>
              <dd className="mt-0.5 text-sm text-gray-500 font-mono text-xs">
                {user.id}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">
                Account created
              </dt>
              <dd className="mt-0.5 text-sm text-gray-900">
                {new Date(user.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </dd>
            </div>
          </dl>
        </section>

        {/* Billing section */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <CreditCard className="h-5 w-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900">Billing</h2>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            View your credits, manage your subscription, and update payment
            methods through the Stripe Customer Portal.
          </p>
          <div className="flex gap-3">
            <Link
              href="/api/billing/portal"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Manage Billing
              <ExternalLink className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get More Credits
            </Link>
          </div>
        </section>

        {/* Support section */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Support</h2>
          <p className="text-sm text-gray-500">
            Need help? Email us at{' '}
            <a
              href="mailto:support@chargebackkit.app"
              className="text-blue-600 hover:text-blue-800"
            >
              support@chargebackkit.app
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
