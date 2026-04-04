'use client';

import { useState } from 'react';
import type { Deadline, DeadlineType } from '@/lib/database/types';

interface DeadlineTrackerProps {
  packId: string;
  deadlines: Deadline[];
  isDraft: boolean;
  onUpdate: () => void;
}

const DEADLINE_TYPE_LABELS: Record<DeadlineType, string> = {
  dispute_response: 'Dispute Response',
  evidence_submission: 'Evidence Submission',
  arbitration: 'Arbitration',
  custom: 'Custom',
};

function getUrgencyColor(dueDate: string): {
  bg: string;
  text: string;
  label: string;
} {
  const now = new Date();
  const due = new Date(dueDate);
  const days = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (days < 0) return { bg: 'bg-gray-100', text: 'text-gray-600', label: 'Overdue' };
  if (days <= 7) return { bg: 'bg-red-100', text: 'text-red-700', label: `${days}d left` };
  if (days <= 14) return { bg: 'bg-yellow-100', text: 'text-yellow-700', label: `${days}d left` };
  return { bg: 'bg-green-100', text: 'text-green-700', label: `${days}d left` };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function DeadlineTracker({
  packId,
  deadlines,
  isDraft,
  onUpdate,
}: DeadlineTrackerProps) {
  const [showForm, setShowForm] = useState(false);
  const [deadlineType, setDeadlineType] = useState<DeadlineType>('dispute_response');
  const [dueDate, setDueDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAddDeadline(e: React.FormEvent) {
    e.preventDefault();
    if (!dueDate) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/packs/${packId}/deadlines`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deadline_type: deadlineType,
          due_date: dueDate,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to create deadline');
      }

      setShowForm(false);
      setDueDate('');
      onUpdate();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-sm text-gray-500 uppercase">
          Deadlines ({deadlines.length})
        </h2>
        {isDraft && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="text-xs text-blue-600 hover:text-blue-700"
          >
            + Add Deadline
          </button>
        )}
      </div>

      {/* Add deadline form */}
      {showForm && (
        <form
          onSubmit={handleAddDeadline}
          className="bg-white border rounded-lg p-3 mb-3 space-y-3"
        >
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Type
            </label>
            <select
              value={deadlineType}
              onChange={(e) => setDeadlineType(e.target.value as DeadlineType)}
              className="w-full px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(DEADLINE_TYPE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
              className="w-full px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-xs text-red-600">{error}</p>}
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setError(null);
              }}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="text-xs px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Adding...' : 'Add'}
            </button>
          </div>
        </form>
      )}

      {/* Deadline list */}
      {deadlines.length === 0 ? (
        <p className="text-sm text-gray-500 italic">
          No deadlines set yet.
        </p>
      ) : (
        <ul className="space-y-2">
          {deadlines.map((d) => {
            const urgency = getUrgencyColor(d.due_date);
            return (
              <li
                key={d.id}
                className="flex items-center justify-between bg-white rounded p-3 border"
              >
                <div>
                  <span className="text-sm font-medium">
                    {DEADLINE_TYPE_LABELS[d.deadline_type] || d.deadline_type}
                  </span>
                  <span className="text-xs text-gray-400 ml-2">
                    Due {formatDate(d.due_date)}
                  </span>
                </div>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${urgency.bg} ${urgency.text}`}
                >
                  {urgency.label}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
