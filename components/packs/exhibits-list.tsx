'use client';

import { useState } from 'react';
import type { Exhibit } from '@/lib/database/types';

interface ExhibitsListProps {
  packId: string;
  exhibits: Exhibit[];
  isDraft: boolean;
  onUpdate: () => void;
}

export default function ExhibitsList({
  packId,
  exhibits,
  isDraft,
  onUpdate,
}: ExhibitsListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ââ Label editing âââââââââââââââââââââââââââââââââââââââââââââââââââ

  function startEditing(exhibit: Exhibit) {
    setEditingId(exhibit.id);
    setEditLabel(exhibit.label);
    setError(null);
  }

  async function saveLabel(exhibitId: string) {
    if (!editLabel.trim()) return;

    try {
      const res = await fetch(
        `/api/packs/${packId}/exhibits/${exhibitId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ label: editLabel.trim() }),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update label');
      }

      setEditingId(null);
      onUpdate();
    } catch (err: any) {
      setError(err.message);
    }
  }

  // ââ Deletion ââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

  async function handleDelete(exhibitId: string) {
    setDeletingId(exhibitId);
    setError(null);

    try {
      const res = await fetch(
        `/api/packs/${packId}/exhibits/${exhibitId}`,
        { method: 'DELETE' }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete exhibit');
      }

      onUpdate();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  }

  // ââ Reorder âââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

  async function moveExhibit(index: number, direction: 'up' | 'down') {
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= exhibits.length) return;

    const newOrder = exhibits.map((ex, i) => ({
      id: ex.id,
      sort_order: i === index ? swapIndex : i === swapIndex ? index : i,
    }));

    try {
      const res = await fetch(`/api/packs/${packId}/exhibits/reorder`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: newOrder }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to reorder');
      }

      onUpdate();
    } catch (err: any) {
      setError(err.message);
    }
  }

  // ââ Render ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

  if (exhibits.length === 0) {
    return (
      <p className="text-sm text-gray-500 italic py-4">
        No evidence uploaded yet.
      </p>
    );
  }

  const totalBytes = exhibits.reduce((sum, ex) => sum + ex.file_size, 0);

  return (
    <div>
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <ul className="space-y-2">
        {exhibits.map((exhibit, idx) => (
          <li
            key={exhibit.id}
            className="flex items-center justify-between bg-white rounded p-3 border group"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {/* Order badge */}
              <span className="text-xs text-gray-400 font-mono w-5 text-right flex-shrink-0">
                #{idx + 1}
              </span>

              {/* Label or edit input */}
              {editingId === exhibit.id ? (
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="text"
                    value={editLabel}
                    onChange={(e) => setEditLabel(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveLabel(exhibit.id);
                      if (e.key === 'Escape') setEditingId(null);
                    }}
                    className="flex-1 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                  <button
                    onClick={() => saveLabel(exhibit.id)}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="text-xs text-gray-400 hover:text-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium truncate block">
                    {exhibit.label}
                  </span>
                  <span className="text-xs text-gray-400">
                    {exhibit.original_name} Â·{' '}
                    {(exhibit.file_size / 1024).toFixed(0)} KB
                  </span>
                </div>
              )}
            </div>

            {/* Actions (draft only) */}
            {isDraft && editingId !== exhibit.id && (
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {idx > 0 && (
                  <button
                    onClick={() => moveExhibit(idx, 'up')}
                    className="p-1 text-gray-400 hover:text-gray-600 text-xs"
                    title="Move up"
                  >
                    â²
                  </button>
                )}
                {idx < exhibits.length - 1 && (
                  <button
                    onClick={() => moveExhibit(idx, 'down')}
                    className="p-1 text-gray-400 hover:text-gray-600 text-xs"
                    title="Move down"
                  >
                    â¼
                  </button>
                )}
                <button
                  onClick={() => startEditing(exhibit)}
                  className="p-1 text-gray-400 hover:text-blue-600 text-xs"
                  title="Edit label"
                >
                  âï¸
                </button>
                <button
                  onClick={() => handleDelete(exhibit.id)}
                  disabled={deletingId === exhibit.id}
                  className="p-1 text-gray-400 hover:text-red-600 text-xs disabled:opacity-50"
                  title="Delete"
                >
                  {deletingId === exhibit.id ? '...' : 'ð'}
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Storage summary */}
      <div className="mt-3 text-xs text-gray-400 text-right">
        {exhibits.length} exhibit{exhibits.length === 1 ? '' : 's'} Â·{' '}
        {(totalBytes / (1024 * 1024)).toFixed(1)} MB total
      </div>
    </div>
  );
}
