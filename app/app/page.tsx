import Link from 'next/link';
import { getAuthenticatedUser } from '@/lib/auth/get-user';
import { redirect } from 'next/navigation';
import { PlusCircle, FileText, ChevronRight } from 'lucide-react';
import { ROUTES, DISPUTE_CATEGORIES } from '@/lib/constants';
import type { PackStatus } from '@/lib/constants';

// Status badge colors
const STATUS_STYLES: Record<PackStatus, { bg: string; text: string; label: string }> = {
  draft: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Draft' },
  submitted: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Submitted' },
  generating: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Generating' },
  ready: { bg: 'bg-green-100', text: 'text-green-700', label: 'Ready' },
  failed: { bg: 'bg-red-100', text: 'text-red-700', label: 'Failed' },
};

function StatusBadge({ status }: { status: PackStatus }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.draft;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style.bg} ${style.text}`}
    >
      {style.label}
    </span>
  );
}

function getCategoryLabel(categoryId: string): string {
  const cat = DISPUTE_CATEGORIES.find((c) => c.id === categoryId);
  return cat?.label || categoryId;
}

export default async function DashboardPage() {
  const user = await getAuthenticatedUser();
  if (!user) redirect('/login');

  // Fetch packs from API — during build/SSR this calls our own route
  let packs: any[] = [];
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://chargebackkit.app';
    const res = await fetch(`${baseUrl}/api/packs`, {
      headers: { cookie: '' },
      cache: 'no-store',
    });
    if (res.ok) {
      const data = await res.json();
      packs = data.packs || [];
    }
  } catch {
    // API not available yet — show empty state
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your dispute evidence packs
          </p>
        </div>
        <Link
          href={ROUTES.NEW_PACK}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="h-4 w-4" />
          New Pack
        </Link>
      </div>

      {/* Pack list or empty state */}
      {packs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            No evidence packs yet
          </h2>
          <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
            Create your first dispute evidence pack to start building your case.
          </p>
          <Link
            href={ROUTES.NEW_PACK}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusCircle className="h-4 w-4" />
            Create Your First Pack
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Merchant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {packs.map((pack: any) => (
                <tr key={pack.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {pack.merchant_name || 'Untitled'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {getCategoryLabel(pack.dispute_category)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {pack.transaction_amount
                      ? `$${(pack.transaction_amount / 100).toFixed(2)}`
                      : '\u2014'}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={pack.status} />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(pack.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={ROUTES.PACK_DETAIL(pack.id)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
