'use client';

import { useState, useRef, useCallback } from 'react';
import {
  MAX_FILE_SIZE_BYTES,
  MAX_EXHIBITS_PER_PACK,
  ALLOWED_MIME_TYPES,
} from '@/lib/constants';

interface ExhibitUploaderProps {
  packId: string;
  currentCount: number;
  currentTotalBytes: number;
  onUploadComplete: () => void;
}

export default function ExhibitUploader({
  packId,
  currentCount,
  currentTotalBytes,
  onUploadComplete,
}: ExhibitUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const remainingSlots = MAX_EXHIBITS_PER_PACK - currentCount;
  const remainingBytes = 50 * 1024 * 1024 - currentTotalBytes;

  // ââ Validation ââââââââââââââââââââââââââââââââââââââââââââââââââââââ

  function validateFiles(files: File[]): { valid: File[]; errors: string[] } {
    const valid: File[] = [];
    const errors: string[] = [];

    if (files.length > remainingSlots) {
      errors.push(
        `Can only upload ${remainingSlots} more file${remainingSlots === 1 ? '' : 's'} (max ${MAX_EXHIBITS_PER_PACK} per pack)`
      );
      return { valid: [], errors };
    }

    let totalNewBytes = 0;

    for (const file of files) {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        errors.push(`${file.name}: exceeds ${MAX_FILE_SIZE_BYTES / (1024 * 1024)}MB limit`);
        continue;
      }

      if (!ALLOWED_MIME_TYPES.includes(file.type as any)) {
        errors.push(`${file.name}: unsupported file type (${file.type || 'unknown'})`);
        continue;
      }

      totalNewBytes += file.size;
      if (currentTotalBytes + totalNewBytes > 50 * 1024 * 1024) {
        errors.push(`${file.name}: would exceed 50MB total pack storage`);
        continue;
      }

      valid.push(file);
    }

    return { valid, errors };
  }

  // ââ Upload ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

  async function uploadFiles(files: File[]) {
    const { valid, errors: validationErrors } = validateFiles(files);

    if (validationErrors.length > 0) {
      setError(validationErrors.join('\n'));
    }

    if (valid.length === 0) return;

    setUploading(true);
    setError(null);

    try {
      for (let i = 0; i < valid.length; i++) {
        const file = valid[i];
        setProgress(`Uploading ${i + 1} of ${valid.length}: ${file.name}`);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('label', file.name.replace(/\.[^/.]+$/, ''));

        const res = await fetch(`/api/packs/${packId}/exhibits`, {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || `Failed to upload ${file.name}`);
        }
      }

      onUploadComplete();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
      setProgress(null);
    }
  }

  // ââ Drag & Drop handlers ââââââââââââââââââââââââââââââââââââââââââââ

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) uploadFiles(files);
    },
    [packId, currentCount, currentTotalBytes]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) uploadFiles(files);
      // Reset input so same file can be re-selected
      if (fileInputRef.current) fileInputRef.current.value = '';
    },
    [packId, currentCount, currentTotalBytes]
  );

  // ââ Render ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

  if (remainingSlots <= 0) {
    return (
      <div className="text-center py-4 text-sm text-gray-500">
        Maximum {MAX_EXHIBITS_PER_PACK} exhibits reached.
      </div>
    );
  }

  return (
    <div>
      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : uploading
              ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
              : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
        }`}
      >
        {uploading ? (
          <div>
            <div className="animate-spin inline-block w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mb-2" />
            <p className="text-sm text-gray-600">{progress}</p>
          </div>
        ) : (
          <>
            <div className="text-3xl mb-2">ð</div>
            <p className="text-sm font-medium text-gray-700">
              Drop files here or click to browse
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Images, PDFs, text files Â· Max 10MB each Â· {remainingSlots} slot
              {remainingSlots === 1 ? '' : 's'} remaining
            </p>
            <p className="text-xs text-gray-400">
              Storage: {(currentTotalBytes / (1024 * 1024)).toFixed(1)}MB /{' '}
              50MB used
            </p>
          </>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={ALLOWED_MIME_TYPES.join(',')}
        onChange={handleFileSelect}
        className="hidden"
        disabled={uploading}
      />

      {/* Error display */}
      {error && (
        <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-700 whitespace-pre-wrap">{error}</p>
        </div>
      )}
    </div>
  );
}
