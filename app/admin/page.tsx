import { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  robots: 'noindex, nofollow',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getAdminStats() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    return null;
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [
    { count: totalUsers },
    { count: totalPacks },
    { count: recentPacks },
    { data: creditTxns },
    { data: recentCredits },
    { count: webhookErrors },
    { count: appErrors },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('evidence_packs').select('*', { count: 'exact', head: true }),
    supabase
      .from('evidence_packs')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', sevenDaysAgo.toISOString()),
    supabase
      .from('credit_transactions')
      .select('amount, transaction_type')
      .eq('transaction_type', 'purchase'),
    supabase
      .from('credit_transactions')
      .select('amount, transaction_type, created_at')
      .eq('transaction_type', 'purchase')
      .gte('created_at', thirtyDaysAgo.toISOString()),
    supabase
      .from('webhook_events')
      .select('*', { count: 'exact', head: true })
      .not('error', 'is', null),
    supabase
      .from('app_errors')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', sevenDaysAgo.toISOString()),
  ]);

  const totalRevenue = (creditTxns || []).reduce((sum, tx) => {
    const credits = tx.amount || 0;
    if (credits === 1) return sum + 19;
    if (credits === 5) return sum + 79;
    if (credits === 10) return sum + 129;
    if (credits === 25) return sum + 269;
    return sum + credits * 19;
  }, 0);

  const recentRevenue = (recentCredits || []).reduce((sum, tx) => {
    const credits = tx.amount || 0;
    if (credits === 1) return sum + 19;
    if (credits === 5) return sum + 79;
    if (credits === 10) return sum + 129;
    if (credits === 25) return sum + 269;
    return sum + credits * 19;
  }, 0);

  return {
    totalUsers: totalUsers || 0,
    totalPacks: totalPacks || 0,
    recentPacks: recentPacks || 0,
    totalRevenue,
    recentRevenue,
    totalPurchases: (creditTxns || []).length,
    recentPurchases: (recentCredits || []).length,
    webhookErrors: webhookErrors || 0,
    appErrors: appErrors || 0,
  };
}

function StatCard({
  label,
  value,
  subtext,
}: {
  label: string;
  value: string | number;
  subtext?: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
      {subtext && <p className="mt-1 text-sm text-gray-400">{subtext}</p>}
    </div>
  );
}

export default async function AdminPage() {
  const stats = await getAdminStats();

  if (!stats) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-4 text-red-600">
            Missing environment variables. Ensure SUPABASE_SERVICE_ROLE_KEY is set.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              ChargebackKit Admin
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Last refreshed: {new Date().toLocaleString()}
            </p>
          </div>
          <a
            href="/admin"
            className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-medium text-white hover:bg-brand-800"
          >
            Refresh
          </a>
        </div>

        {/* Revenue Section */}
        <h2 className="mb-4 text-lg font-semibold text-gray-700">Revenue</h2>
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Total Revenue"
            value={`$${stats.totalRevenue.toLocaleString()}`}
            subtext="All time"
          />
          <StatCard
            label="30-Day Revenue"
            value={`$${stats.recentRevenue.toLocaleString()}`}
            subtext="Last 30 days"
          />
          <StatCard
            label="Total Purchases"
            value={stats.totalPurchases}
            subtext="All time"
          />
          <StatCard
            label="Recent Purchases"
            value={stats.recentPurchases}
            subtext="Last 30 days"
          />
        </div>

        {/* Users & Packs */}
        <h2 className="mb-4 text-lg font-semibold text-gray-700">
          Users & Packs
        </h2>
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard label="Total Users" value={stats.totalUsers} />
          <StatCard
            label="Evidence Packs Created"
            value={stats.totalPacks}
            subtext="All time"
          />
          <StatCard
            label="Packs This Week"
            value={stats.recentPacks}
            subtext="Last 7 days"
          />
        </div>

        {/* Errors & Health */}
        <h2 className="mb-4 text-lg font-semibold text-gray-700">
          System Health
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <StatCard
            label="Webhook Errors"
            value={stats.webhookErrors}
            subtext="Events with errors"
          />
          <StatCard
            label="App Errors (7d)"
            value={stats.appErrors}
            subtext="Last 7 days"
          />
        </div>
      </div>
    </div>
  );
}
