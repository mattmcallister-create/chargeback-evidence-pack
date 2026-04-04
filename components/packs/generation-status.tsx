'use client';

import { useState, useEffect, useRef } from 'react';
import { GENERATION_POLL_INTERVAL_MS } from '@/lib/constants';

interface GenerationStatusProps {
  packId: string;
  initialStatus: string;
  onStatusChange?: (status: string) => void;
}

type GenState = 'idle' | 'generating' | 'ready' | 'failed';

/**
 * Generation status component with polling.
 *
 * - Shows "Generate" button when idle/draft
 * - Polls every 3s during generation
 * - Shows download button when ready
 * - Shows retry button on failure
 */
export default function GenerationStatus({
  packId,
  initialStatus,
  onStatusChange,
}: GenerationStatusProps) {
  const [state, setState] = useState<GenState>(mapStatus(initialStatus));
  const [error, setError] = useState<string | null>(null);
  const [isTriggering, setIsTriggering] = useState(false);
  const pollRef = useRef<NodeJS.Timeout | null>(null);

  function mapStatus(s: string): GenState {
    if (s === 'generating' || s === 'submitted') return 'generating';
    if (s === 'ready') return 'ready';
    if (s === 'failed') return 'failed';
    return 'idle';
  }

  // Start polling when in generating state
  useEffect(() => {
    if (state !== 'generating') {
      if (pollRef.current) clearInterval(pollRef.current);
      return;
    }

    async function pollStatus() {
      try {
        const res = await fetch(`/api/packs/${packId}/generate/status`);
        if (!res.ok) return;

        const data = await res.json();

        if (data.status === 'ready') {
          setState('ready');
          setError(null);
          onStatusChange?.('ready');
        } else if (data.status === 'failed') {
          setState('failed');
          setError(data.error_message || 'Generation failed');
          onStatusChange?.('failed');
        }
      } catch {
        // Network error â keep polling
      }
    }

    pollRef.current = setInterval(pollStatus, GENERATION_POLL_INTERVAL_MS);
    // Poll immediately too
    pollStatus();

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [state, packId, onStatusChange]);

  async function handleGenerate() {
    setIsTriggering(true);
    setError(null);

    try {
      const res = await fetch(`/api/packs/${packId}/generate`, {
        method: 'POST',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to start generation');
      }

      setState('generating');
      onStatusChange?.('generating');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsTriggering(false);
    }
  }

  // ââ Idle / Draft ââââââââââââââââââââââââââââââââââââââââââââââââââââ
  if (state === 'idle') {
    return (
      <div className="text-center py-4">
        <p className="text-sm text-gray-600 mb-3">
          Once you&apos;re ready, generate your professional evidence pack PDF.
        </p>
        {error && (
          <p className="text-sm text-red-600 mb-3">{error}</p>
        )}
        <button
          onClick={handleGenerate}
          disabled={isTriggering}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
        >
          {isTriggering ? 'Starting...' : 'Generate Evidence Pack'}
        </button>
        <p className="text-xs text-gray-400 mt-2">
          Uses 1 credit from your account
        </p>
      </div>
    );
  }

  // ââ Generating ââââââââââââââââââââââââââââââââââââââââââââââââââââââ
  if (state === 'generating') {
    return (
      <div className="text-center py-6">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="animate-spin h-5 w-5 border-2 border-yellow-500 border-t-transparent rounded-full" />
          <span className="text-sm text-yellow-700 font-medium">
            Generating your evidence pack...
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 max-w-xs mx-auto">
          <div className="bg-yellow-500 h-1.5 rounded-full animate-pulse" style={{ width: '60%' }} />
        </div>
        <p className="text-xs text-gray-400 mt-3">
          This usually takes 15-30 seconds
        </p>
      </div>
    );
  }

  // ââ Ready âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
  if (state === 'ready') {
    return (
      <div className="text-center py-4">
        <div className="inline-flex items-center gap-2 text-green-600 font-medium mb-3">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          Your evidence pack is ready!
        </div>
        <div>
          <a
            href={`/api/packs/${packId}/download`}
            className="inline-block px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Download PDF
          </a>
        </div>
      </div>
    );
  }

  // ââ Failed ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
  return (
    <div className="text-center py-4">
      <p className="text-sm text-red-600 mb-2">
        Generation failed. Your credit has been refunded.
      </p>
      {error && (
        <p className="text-xs text-red-400 mb-3">{error}</p>
      )}
      <button
        onClick={handleGenerate}
        disabled={isTriggering}
        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
      >
        {isTriggering ? 'Retrying...' : 'Retry Generation'}
      </button>
    </div>
  );
}
