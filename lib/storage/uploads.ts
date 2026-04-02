import { supabaseAdmin } from '@/lib/supabase-admin';
import {
  STORAGE_BUCKET_EXHIBITS,
  STORAGE_BUCKET_PDFS,
  MAX_FILE_SIZE_BYTES,
  ALLOWED_MIME_TYPES,
} from '@/lib/constants';

/**
 * Sanitize a filename for safe storage.
 * Removes special characters, preserves extension.
 */
export function sanitizeFilename(originalName: string): string {
  const ext = originalName.split('.').pop()?.toLowerCase() || '';
  const base = originalName
    .replace(/\.[^/.]+$/, '') // remove extension
    .replace(/[^a-zA-Z0-9_-]/g, '_') // replace special chars
    .replace(/_+/g, '_') // collapse underscores
    .substring(0, 100); // limit length

  const timestamp = Date.now();
  return `${base}_${timestamp}.${ext}`;
}

/**
 * Validate a file before upload.
 */
export function validateFile(
  file: { size: number; type: string },
  existingTotalBytes: number = 0
): { valid: boolean; error?: string } {
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File exceeds maximum size of ${MAX_FILE_SIZE_BYTES / (1024 * 1024)}MB`,
    };
  }

  if (!ALLOWED_MIME_TYPES.includes(file.type as any)) {
    return {
      valid: false,
      error: `File type ${file.type} is not supported. Allowed: ${ALLOWED_MIME_TYPES.join(', ')}`,
    };
  }

  const totalAfterUpload = existingTotalBytes + file.size;
  if (totalAfterUpload > 50 * 1024 * 1024) {
    return {
      valid: false,
      error: 'Total pack storage would exceed 50MB limit',
    };
  }

  return { valid: true };
}

/**
 * Upload a file to the exhibits storage bucket.
 */
export async function uploadExhibit(
  packId: string,
  userId: string,
  fileName: string,
  fileBuffer: Buffer,
  mimeType: string
): Promise<{ path: string }> {
  const storagePath = `${userId}/${packId}/${fileName}`;

  const { error } = await supabaseAdmin.storage
    .from(STORAGE_BUCKET_EXHIBITS)
    .upload(storagePath, fileBuffer, {
      contentType: mimeType,
      upsert: false,
    });

  if (error) {
    console.error('[storage.uploadExhibit] Error:', error);
    throw new Error(`Failed to upload file: ${error.message}`);
  }

  return { path: storagePath };
}

/**
 * Upload a generated PDF to the PDFs storage bucket.
 */
export async function uploadPDF(
  packId: string,
  userId: string,
  pdfBuffer: Buffer
): Promise<{ path: string }> {
  const timestamp = Date.now();
  const storagePath = `${userId}/${packId}/evidence-pack-${timestamp}.pdf`;

  const { error } = await supabaseAdmin.storage
    .from(STORAGE_BUCKET_PDFS)
    .upload(storagePath, pdfBuffer, {
      contentType: 'application/pdf',
      upsert: false,
    });

  if (error) {
    console.error('[storage.uploadPDF] Error:', error);
    throw new Error(`Failed to upload PDF: ${error.message}`);
  }

  return { path: storagePath };
}

/**
 * Delete a file from the exhibits storage bucket.
 */
export async function deleteExhibitFile(storagePath: string): Promise<void> {
  const { error } = await supabaseAdmin.storage
    .from(STORAGE_BUCKET_EXHIBITS)
    .remove([storagePath]);

  if (error) {
    console.error('[storage.deleteExhibit] Error:', error);
    throw new Error(`Failed to delete file: ${error.message}`);
  }
}

/**
 * Get a signed download URL for a file.
 * URL valid for 1 hour.
 */
export async function getSignedUrl(
  bucket: string,
  storagePath: string,
  expiresInSeconds: number = 3600
): Promise<string> {
  const { data, error } = await supabaseAdmin.storage
    .from(bucket)
    .createSignedUrl(storagePath, expiresInSeconds);

  if (error) {
    console.error('[storage.getSignedUrl] Error:', error);
    throw new Error(`Failed to create signed URL: ${error.message}`);
  }

  return data.signedUrl;
}

/**
 * Get a signed download URL for an exhibit.
 */
export async function getExhibitUrl(storagePath: string): Promise<string> {
  return getSignedUrl(STORAGE_BUCKET_EXHIBITS, storagePath);
}

/**
 * Get a signed download URL for a generated PDF.
 */
export async function getPDFUrl(storagePath: string): Promise<string> {
  return getSignedUrl(STORAGE_BUCKET_PDFS, storagePath);
}
