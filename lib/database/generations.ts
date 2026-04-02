import { supabaseAdmin } from '@/lib/supabase-admin';
import type { Generation, GenerationStatus } from './types';

/**
 * Create a new generation record for a pack.
 */
export async function createGeneration(
  packId: string
): Promise<Generation> {
  const { data, error } = await supabaseAdmin
    .from('pack_generations')
    .insert({
      pack_id: packId,
      status: 'pending',
      started_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error('[generations.create] Error:', error);
    throw new Error(`Failed to create generation: ${error.message}`);
  }

  return data as Generation;
}

/**
 * Get the latest generation for a pack.
 */
export async function getGeneration(
  packId: string
): Promise<Generation | null> {
  const { data, error } = await supabaseAdmin
    .from('pack_generations')
    .select('*')
    .eq('pack_id', packId)
    .order('started_at', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    console.error('[generations.get] Error:', error);
    throw new Error(`Failed to get generation: ${error.message}`);
  }

  return data as Generation;
}

/**
 * Update a generation's status and optional fields.
 */
export async function updateGeneration(
  generationId: string,
  updates: {
    status?: GenerationStatus;
    completed_at?: string;
    error_message?: string;
    pdf_storage_path?: string;
    rebuttal_text?: string;
  }
): Promise<void> {
  const { error } = await supabaseAdmin
    .from('pack_generations')
    .update(updates)
    .eq('id', generationId);

  if (error) {
    console.error('[generations.update] Error:', error);
    throw new Error(`Failed to update generation: ${error.message}`);
  }
}
