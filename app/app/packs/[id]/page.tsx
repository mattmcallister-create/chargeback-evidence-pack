import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAuthenticatedUser } from '@/lib/auth/get-user';
import { getPack } from '@/lib/database/packs';
import { listExhibits } from '@/lib/database/exhibits';
import { DISPUTE_CATEGORIES } from '@/lib/constants';
import type { Pack, Exhibit } from '@/lib/database/types';

export const metadata = {
  title: 'Dispute Pack',
};

function getCategoryLabel(categoryId: string): string {
  return (
    DISPUTE_CATEGORIES.find((c) => c.id === categoryId)?.label ?? categoryId
  );
}

function formatCurrency(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function statusBadge(status: string) {
  const colors: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-700',
    submitted: 'bg-blue-100 text-blue-700',
    generating: 'bg-yellow-100 text-yellow-700',
    ready: 'bg-green-100 text-green-700',
    failed: 'bg-red-100 text-red-700',
  };
  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${colors[status] || colors.draft}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default async function PackDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getAuthenticatedUser();
  if (!user) notFound();

  const pack = await getPack(params.id, user.id);
  if (!pack) notFound();

  const exhibits = await listExhibits(params.id, user.id);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link
            href="/app"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            &larr; Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold mt-1">
            {pack.merchant_name} â {getCategoryLabel(pack.dispute_category)}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {statusBadge(pack.status)}
          {pack.status === 'draft' && (
            <Link
              href={`/app/packs/${pack.id}/edit`}
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Edit
            </Link>
          )}
        </div>
      </div>

      {/* Transaction Details */}
      <section className="bg-gray-50 rounded-lg p-5 mb-6">
        <h2 className="font-semibold text-sm text-gray-500 uppercase mb-3">
          Transaction Details
        </h2>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-600">Merchant</dt>
            <dd className="font-medium">{pack.merchant_name}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-600">Amount</dt>
            <dd className="font-medium">
              {formatCurrency(pack.transaction_amount)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-600">Transaction Date</dt>
            <dd className="font-medium">{formatDate(pack.transaction_date)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-600">Category</dt>
            <dd className="font-medium">
              {getCategoryLabel(pack.dispute_category)}
            </dd>
          </div>
        </dl>
      </section>

      {/* Dispute Reason */}
      <section className="bg-gray-50 rounded-lg p-5 mb-6">
        <h2 className="font-semibold text-sm text-gray-500 uppercase mb-3">
          Dispute Reason
        </h2>
        <p className="text-sm text-gray-800 whitespace-pre-wrap">
          {pack.dispute_reason}
        </p>
      </section>

      {/* Evidence / Exhibits */}
      <section className="bg-gray-50 rounded-lg p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-sm text-gray-500 uppercase">
            Evidence ({exhibits.length})
          </h2>
          {pack.status === 'draft' && (
            <span className="text-xs text-gray-400">
              Upload evidence to strengthen your case
            </span>
          )}
        </div>
        {exhibits.length === 0 ? (
          <p className="text-sm text-gray-500 italic">
            No evidence uploaded yet.
          </p>
        ) : (
          <ul className="space-y-2">
            {exhibits.map((ex: Exhibit, idx: number) => (
              <li
                key={ex.id}
                className="flex items-center justify-between bg-white rounded p-3 border"
              >
                <div>
                  <span className="text-xs text-gray-400 mr-2">
                    #{idx + 1}
                  </span>
                  <span className="text-sm font-medium">{ex.label}</span>
                  <span className="text-xs text-gray-400 ml-2">
                    ({ex.original_name})
                  </span>
                </div>
                <span className="text-xs text-gray-400">
                  {(ex.file_size / 1024).toFixed(0)} KB
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Generation / Download Section */}
      <section className="bg-white border rounded-lg p-5">
        <h2 className="font-semibold text-sm text-gray-500 uppercase mb-3">
          Evidence Pack PDF
        </h2>
        {pack.status === 'draft' && (
          <div className="text-center py-4">
            <p className="text-sm text-gray-600 mb-3">
              Once you&apos;re ready, generate your professional evidence pack
              PDF.
            </p>
            <button
              disabled
              className="px-6 py-2 bg-green-600 text-white rounded-lg opacity-50 cursor-not-allowed"
            >
              Generate Evidence Pack
            </button>
            <p className="text-xs text-gray-400 mt-2">
              Uses 1 credit from your account
            </p>
          </div>
        )}
        {pack.status === 'generating' && (
          <div className="text-center py-4">
            <div className="animate-pulse text-sm text-yellow-600">
              Generating your evidence pack...
            </div>
          </div>
        )}
        {pack.status === 'ready' && (
          <div className="text-center py-4">
            <p className="text-sm text-green-600 font-medium mb-3">
              Your evidence pack is ready!
            </p>
            <a
              href={`/api/packs/${pack.id}/download`}
              className="inline-block px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Download PDF
            </a>
          </div>
        )}
        {pack.status === 'failed' && (
          <div className="text-center py-4">
            <p className="text-sm text-red-600 mb-3">
              Generation failed. Your credit has been refunded.
            </p>
            <button
              disabled
              className="px-6 py-2 bg-red-100 text-red-700 rounded-lg opacity-50 cursor-not-allowed"
            >
              Retry Generation
            </button>
          </div>
        )}
      </section>

      {/* Pack Metadata */}
      <div className="mt-4 text-xs text-gray-400 text-right">
        Created {formatDate(pack.created_at)} Â· Last updated{' '}
        {formatDate(pack.updated_at)}
      </div>
    </div>
  );
}
