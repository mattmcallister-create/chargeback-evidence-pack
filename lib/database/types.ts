feat: add database types for Pack, Exhibit, Generation, Deadline// ─── Database Types ───────────────────────────────────────────────────
// Matches the Supabase schema defined in ARCHITECTURE.md.
// All timestamps are ISO 8601 strings from Supabase.

import type { DisputeCategory, PackStatus } from '@/lib/constants';

// ─── Packs ────────────────────────────────────────────────────────────

export interface Pack {
  id: string;
  user_id: string;
  status: PackStatus;
  dispute_category: DisputeCategory;
  merchant_name: string;
  transaction_amount: number; // cents
  transaction_date: string; // ISO date
  dispute_reason: string;
  intake_answers: Record<string, any>; // JSONB — category-specific answers
  created_at: string;
  updated_at: string;
}

export interface CreatePackInput {
  dispute_category: DisputeCategory;
  merchant_name: string;
  transaction_amount: number;
  transaction_date: string;
  dispute_reason: string;
  intake_answers: Record<string, any>;
}

export interface UpdatePackInput {
  merchant_name?: string;
  transaction_amount?: number;
  transaction_date?: string;
  dispute_reason?: string;
  intake_answers?: Record<string, any>;
  status?: PackStatus;
}

// ─── Exhibits ─────────────────────────────────────────────────────────

export interface Exhibit {
  id: string;
  pack_id: string;
  user_id: string;
  file_name: string; // sanitized filename in storage
  original_name: string; // original upload filename
  file_size: number; // bytes
  mime_type: string;
  label: string; // user-provided label (e.g., "Receipt from merchant")
  sort_order: number;
  storage_path: string; // path in Supabase Storage
  created_at: string;
}

export interface CreateExhibitInput {
  file_name: string;
  original_name: string;
  file_size: number;
  mime_type: string;
  label: string;
  sort_order: number;
  storage_path: string;
}

// ─── Generations ──────────────────────────────────────────────────────

export type GenerationStatus = 'pending' | 'processing' | 'ready' | 'failed';

export interface Generation {
  id: string;
  pack_id: string;
  status: GenerationStatus;
  started_at: string | null;
  completed_at: string | null;
  error_message: string | null;
  pdf_storage_path: string | null;
  rebuttal_text: string | null;
}

// ─── Deadlines ────────────────────────────────────────────────────────

export type DeadlineType =
  | 'dispute_response'
  | 'evidence_submission'
  | 'arbitration'
  | 'custom';

export interface Deadline {
  id: string;
  pack_id: string;
  user_id: string;
  deadline_type: DeadlineType;
  due_date: string; // ISO date
  reminded_at: string | null;
  created_at: string;
}

export interface CreateDeadlineInput {
  deadline_type: DeadlineType;
  due_date: string;
}

// ─── API Response Types ───────────────────────────────────────────────

export interface ApiError {
  error: string;
  details?: string;
}

export interface PackListResponse {
  packs: Pack[];
}

export interface PackResponse {
  pack: Pack;
}

export interface ExhibitListResponse {
  exhibits: Exhibit[];
}

export interface GenerationStatusResponse {
  status: GenerationStatus;
  progress?: number;
  error?: string;
  pdf_url?: string;
}
