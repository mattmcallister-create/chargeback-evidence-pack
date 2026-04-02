import { supabaseAdmin } from '@/lib/supabase-admin';
import type { Exhibit, CreateExhibitInput } from './types';

/**
 * Create an exhibit record for a pack.
 */
export async function createExhibit(
  packId: string,
  userId: string,
  input: CreateExhibitInput
): Promise<Exhibit> {
  const { data, error } = await supabaseAdmin
    .from('pack_exhibits')
    .insert({
      pack_id: packId,
      user_id: userId,
      file_name: input.file_name,
      original_name: input.original_name,
      file_size: input.file_size,
      mime_type: input.mime_type,
      label: input.label,
      sort_order: input.sort_order,
      storage_path: input.storage_path,
    })
    .select()
    .single();

  if (error) {
    console.error('[exhibits.create] Error:', error);
    throw new Error(`Failed to create exhibit: ${error.message}`);
  }

  return data as Exhibit;
}

/**
 * List all exhibits for a pack with ownership verification.
 */
export async function listExhibits(
  packId: string,
  userId: string
): Promise<Exhibit[]> {
  const { data, error } = await supabaseAdmin
    .from('pack_exhibits')
    .select('*')
    .eq('pack_id', packId)
    .eq('user_id', userId)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[exhibits.list] Error:', error);
    throw new Error(`Failed to list exhibits: ${error.message}`);
  }

  return (data || []) as Exhibit[];
}

/**
 * Update an exhibit's label or sort order.
 */
export async function updateExhibit(
  exhibitId: string,
  packId: string,
  userId: string,
  updates: { label?: string; sort_order?: number }
): Promise<Exhibit | null> {
  const { data, error } = await supabaseAdmin
    .from('pack_exhibits')
    .update(updates)
    .eq('id', exhibitId)
    .eq('pack_id', packId)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    console.error('[exhibits.update] Error:', error);
    throw new Error(`Failed to update exhibit: ${error.message}`);
  }

  return data as Exhibit;
}

/**
 * Delete an exhibit record. Storage cleanup should be done separately.
 */
export async function deleteExhibit(
  exhibitId: string,
  packId: string,
  userId: string
): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from('pack_exhibits')
    .delete()
    .eq('id', exhibitId)
    .eq('pack_id', packId)
    .eq('user_id', userId);

  if (error) {
    console.error('[exhibits.delete] Error:', error);
    throw new Error(`Failed to delete exhibit: ${error.message}`);
  }

  return true;
}

/**
 * Bulk reorder exhibits for a pack.
 */
export async function reorderExhibits(
  packId: string,
  userId: string,
  newOrder: { id: string; sort_order: number }[]
): Promise<void> {
  // Verify all exhibits belong to this pack/user, then update
  const promises = newOrder.map(({ id, sort_order }) =>
    supabaseAdmin
      .from('pack_exhibits')
      .update({ sort_order })
      .eq('id', id)
      .eq('pack_id', packId)
      .eq('user_id', userId)
  );

  const results = await Promise.all(promises);
  const failed = results.find((r) => r.error);
  if (failed?.error) {
    console.error('[exhibits.reorder] Error:', failed.error);
    throw new Error(`Failed to reorder exhibits: ${failed.error.message}`);
  }
}
