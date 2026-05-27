/**
 * Tests for file upload validation rules.
 *
 * Validates MIME type whitelisting and file size limits
 * as defined in lib/constants.ts.
 */
import { describe, it, expect } from 'vitest';

// Mirror constants from lib/constants.ts for isolated testing
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
const MAX_PACK_STORAGE_BYTES = 50 * 1024 * 1024; // 50 MB
const MAX_EXHIBITS_PER_PACK = 25;

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'application/pdf',
  'text/plain',
  'text/csv',
] as const;

// âââ Validation Functions (mirrors app logic) ââââââââââââââââââââââââââ

function isAllowedMimeType(mimeType: string): boolean {
  return (ALLOWED_MIME_TYPES as readonly string[]).includes(mimeType);
}

function isWithinSizeLimit(fileSize: number): boolean {
  return fileSize > 0 && fileSize <= MAX_FILE_SIZE_BYTES;
}

function isWithinPackLimit(totalSize: number): boolean {
  return totalSize <= MAX_PACK_STORAGE_BYTES;
}

function isWithinExhibitCount(count: number): boolean {
  return count >= 0 && count <= MAX_EXHIBITS_PER_PACK;
}

// âââ Tests âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

describe('File Upload Validation', () => {
  describe('MIME Type Whitelist', () => {
    it('allows JPEG images', () => {
      expect(isAllowedMimeType('image/jpeg')).toBe(true);
    });

    it('allows PNG images', () => {
      expect(isAllowedMimeType('image/png')).toBe(true);
    });

    it('allows WebP images', () => {
      expect(isAllowedMimeType('image/webp')).toBe(true);
    });

    it('allows GIF images', () => {
      expect(isAllowedMimeType('image/gif')).toBe(true);
    });

    it('allows PDF documents', () => {
      expect(isAllowedMimeType('application/pdf')).toBe(true);
    });

    it('allows plain text files', () => {
      expect(isAllowedMimeType('text/plain')).toBe(true);
    });

    it('allows CSV files', () => {
      expect(isAllowedMimeType('text/csv')).toBe(true);
    });

    it('rejects executable files', () => {
      expect(isAllowedMimeType('application/x-executable')).toBe(false);
    });

    it('rejects JavaScript files', () => {
      expect(isAllowedMimeType('application/javascript')).toBe(false);
    });

    it('rejects HTML files', () => {
      expect(isAllowedMimeType('text/html')).toBe(false);
    });

    it('rejects SVG files (potential XSS vector)', () => {
      expect(isAllowedMimeType('image/svg+xml')).toBe(false);
    });

    it('rejects ZIP archives', () => {
      expect(isAllowedMimeType('application/zip')).toBe(false);
    });

    it('rejects empty MIME type', () => {
      expect(isAllowedMimeType('')).toBe(false);
    });

    it('rejects MIME type with extra parameters', () => {
      expect(isAllowedMimeType('image/jpeg; charset=utf-8')).toBe(false);
    });
  });

  describe('File Size Limits', () => {
    it('allows a 1 KB file', () => {
      expect(isWithinSizeLimit(1024)).toBe(true);
    });

    it('allows a file at exactly 10 MB', () => {
      expect(isWithinSizeLimit(MAX_FILE_SIZE_BYTES)).toBe(true);
    });

    it('rejects a file larger than 10 MB', () => {
      expect(isWithinSizeLimit(MAX_FILE_SIZE_BYTES + 1)).toBe(false);
    });

    it('rejects a zero-byte file', () => {
      expect(isWithinSizeLimit(0)).toBe(false);
    });

    it('rejects a negative file size', () => {
      expect(isWithinSizeLimit(-1)).toBe(false);
    });
  });

  describe('Pack Storage Limits', () => {
    it('allows total storage under 50 MB', () => {
      expect(isWithinPackLimit(30 * 1024 * 1024)).toBe(true);
    });

    it('allows exactly 50 MB total', () => {
      expect(isWithinPackLimit(MAX_PACK_STORAGE_BYTES)).toBe(true);
    });

    it('rejects total exceeding 50 MB', () => {
      expect(isWithinPackLimit(MAX_PACK_STORAGE_BYTES + 1)).toBe(false);
    });
  });

  describe('Exhibit Count Limits', () => {
    it('allows 1 exhibit', () => {
      expect(isWithinExhibitCount(1)).toBe(true);
    });

    it('allows exactly 25 exhibits', () => {
      expect(isWithinExhibitCount(MAX_EXHIBITS_PER_PACK)).toBe(true);
    });

    it('rejects 26 exhibits', () => {
      expect(isWithinExhibitCount(MAX_EXHIBITS_PER_PACK + 1)).toBe(false);
    });
  });
});
