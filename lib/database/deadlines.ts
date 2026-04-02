import { supabaseAdmin } from '@/lib/supabase-admin';
import type { Deadline, CreateDeadlineInput } from './types';
import type { UrgencyLevel } from '@/lib/constants';
import { DEADLINE_URGENCY } from '@/lib/constants';

/**
 * Create a deadline for a pack.
 */
export async function createDeadline(
  packId: string,
  userId: string,
  input: CreateDeadlineInput
): Promise<Deadline> {
  const { data, error } = await supabaseAdmin
    .from('pack_deadlines')
    .insert({
      pack_id: packId,
      user_id: userId,
      deadline_type: input.deadline_type,
      due_date: input.due_date,
    })
    .select()
    .single();

  if (error) {
    console.error('[deadlines.create] Error:', error);
    throw new Error(`Failed to create deadline: ${error.message}`);
  }

  return data as Deadline;
}

/**
 * List all deadlines for a user, sorted by due date.
 */
export async function listDeadlines(userId: string): Promise<Deadline[]> {
  const { data, error } = await supabaseAdmin
    .from('pack_deadlines')
    .select('*')
    .eq('user_id', userId)
    .order('due_date', { ascending: true });

  if (error) {
    console.error('[deadlines.list] Error:', error);
    throw new Error(`Failed to list deadlines: ${error.message}`);
  }

  return (data || []) as Deadline[];
}

/**
 * List deadlines for a specific pack.
 */
export async function listPackDeadlines(
  packId: string,
  userId: string
): Promise<Deadline[]> {
  const { data, error } = await supabaseAdmin
    .from('pack_deadlines')
    .select('*')
    .eq('pack_id', packId)
    .eq('user_id', userId)
    .order('due_date', { ascending: true });

  if (error) {
    console.error('[deadlines.listPack] Error:', error);
    throw new Error(`Failed to list pack deadlines: ${error.message}`);
  }

  return (data || []) as Deadline[];
}

/**
 * Calculate urgency level based on days remaining.
 */
export function getUrgencyLevel(dueDate: string): UrgencyLevel {
  const now = new Date();
  const due = new Date(dueDate);
  const diffMs = due.getTime() - now.getTime();
  const daysRemaining = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (daysRemaining > DEADLINE_URGENCY.GREEN) return 'green';
  if (daysRemaining > DEADLINE_URGENCY.YELLOW) return 'yellow';
  return 'red';
}

/**
 * Get days remaining until a deadline.
 */
export function getDaysRemaining(dueDate: string): number {
  const now = new Date();
  const due = new Date(dueDate);
  const diffMs = due.getTime() - now.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}
