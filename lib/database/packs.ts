import { supabaseAdmin } from '@/lib/supabase-admin';
import type { Pack, CreatePackInput, UpdatePackInput } from './types';

/**
 * Create a new dispute evidence pack.
 */
export async function createPack(
  userId: string,
  input: CreatePackInput
): Promise<Pack> {
  const { data, error } = await supabaseAdmin
    .from('packs')
    .insert({
      user_id: userId,
      status: 'draft',
      dispute_category: input.dispute_category,
      merchant_name: input.merchant_name,
      transaction_amount: input.transaction_amount,
      transaction_date: input.transaction_date,
      dispute_reason: input.dispute_reason,
      intake_answers: input.intake_answers,
    })
    .select()
    .single();

  if (error) {
    console.error('[packs.create] Error:', error);
    throw new Error(`Failed to create pack: ${error.message}`);
  }

  return data as Pack;
}

/**
 * Get a single pack by ID with ownership verification.
 */
export async function getPack(
  packId: string,
  userId: string
): Promise<Pack | null> {
  const { data, error } = await supabaseAdmin
    .from('packs')
    .select('*')
    .eq('id', packId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    console.error('[packs.get] Error:', error);
    throw new Error(`Failed to get pack: ${error.message}`);
  }

  // Ownership check — critical security layer
  if (data.user_id !== userId) {
    return null; // Treat as not found to avoid leaking existence
  }

  return data as Pack;
}

/**
 * List all packs for a user, sorted by most recent first.
 */
export async function listPacks(userId: string): Promise<Pack[]> {
  const { data, error } = await supabaseAdmin
    .from('packs')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[packs.list] Error:', error);
    throw new Error(`Failed to list packs: ${error.message}`);
  }

  return (data || []) as Pack[];
}

/**
 * Update a pack with ownership verification.
 * Returns null if pack not found or not owned by user.
 */
export async function updatePack(
  packId: string,
  userId: string,
  input: UpdatePackInput
): Promise<Pack | null> {
  // First verify ownership
  const existing = await getPack(packId, userId);
  if (!existing) return null;

  const { data, error } = await supabaseAdmin
    .from('packs')
    .update({
      ...input,
      updated_at: new Date().toISOString(),
    })
    .eq('id', packId)
    .eq('user_id', userId) // Double-check ownership in query
    .select()
    .single();

  if (error) {
    console.error('[packs.update] Error:', error);
    throw new Error(`Failed to update pack: ${error.message}`);
  }

  return data as Pack;
}
