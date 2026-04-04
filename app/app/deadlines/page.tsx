import { getAuthenticatedUser } from '@/lib/auth/get-user';
import { listDeadlines, getUrgencyLevel, getDaysRemaining } from '@/lib/database/deadlines';
import { getPack } from '@/lib/database/packs';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Deadline } from '@/lib/database/types';

export const metadata = {
  title: 'Deadlines | ChargebackKit',
};

const URGENCY_STYLES = {
  green: 'bg-green-100 text-green-700',
  yellow: 'bg-yellow-100 text-yellow-700',
  red: 'bg-red-100 text-red-700',
};

const TYPE_LABELS: Record<string, string> = {
  dispute_response: 'Dispute Response',
  evidence_submission: 'Evidence Submission',
  arbitration: 'Arbitration',
  custom: 'Custom',
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default async function DeadlinesPage() {
  const user = await getAuthenticatedUser();
  if (!user) notFound();

  const deadlines = await listDeadlines(user.id);

  // Enrich each deadline with pack info
  const enriched = await Promise.all(
    deadlines.map(async (d: Deadline) => {
      const pack = await getPack(d.pack_id, user.id);
      const urgency = getUrgencyLevel(d.due_date);
      const daysLeft = getDaysRemaining(d.due_date);
      return {
        ...d,
        merchantName: pack?.merchant_name || 'Unknown',
        urgency,
        daysLeft,
      };
    })
  );

  // Split into upcoming and past
  const upcoming = enriched.filter((d) => d.daysLeft >= 0);
  const past = enriched.filter((d) => d.daysLeft < 0);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Deadlines</h1>

      {enriched.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-2">No deadlines set yet.</p>
          <p className="text-sm text-gray-400">
            Add deadlines to your dispute packs to track important dates.
          </p>
        </div>
      ) : (
        <>
          {/* Upcoming */}
          {upcoming.length > 0 && (
            <section className="mb-8">
              <h2 className="font-semibold text-sm text-gray-500 uppercase mb-3">
                Upcoming ({upcoming.length})
              </h2>
              <ul className="space-y-2">
                {upcoming.map((d) => (
                  <li
                    key={d.id}
                    className="flex items-center justify-between bg-white rounded-lg p-4 border"
                  >
                    <div>
                      <Link
                        href={`/app/packs/${d.pack_id}`}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        {d.merchantName}
                      </Link>
                      <span className="text-xs text-gray-400 ml-2">
                        {TYPE_LABELS[d.deadline_type] || d.deadline_type}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        Due {formatDate(d.due_date)}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${URGENCY_STYLES[d.urgency]}`}
                    >
                      {d.daysLeft === 0
                        ? 'Due today'
                        : `${d.daysLeft} day${d.daysLeft !== 1 ? 's' : ''} left`}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Past / Overdue */}
          {past.length > 0 && (
            <section>
              <h2 className="font-semibold text-sm text-gray-500 uppercase mb-3">
                Past Due ({past.length})
              </h2>
              <ul className="space-y-2">
                {past.map((d) => (
                  <li
                    key={d.id}
                    className="flex items-center justify-between bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    <div>
                      <Link
                        href={`/app/packs/${d.pack_id}`}
                        className="text-sm font-medium text-gray-600 hover:text-gray-700"
                      >
                        {d.merchantName}
                      </Link>
                      <span className="text-xs text-gray-400 ml-2">
                        {TYPE_LABELS[d.deadline_type] || d.deadline_type}
                      </span>
                      <p className="text-xs text-gray-400 mt-1">
                        Was due {formatDate(d.due_date)}
                      </p>
                    </div>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-200 text-gray-600">
                      {Math.abs(d.daysLeft)} day{Math.abs(d.daysLeft) !== 1 ? 's' : ''} overdue
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </div>
  );
}
