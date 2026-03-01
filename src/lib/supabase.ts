import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ckyutsfuejtepzxmglae.supabase.co';
const supabaseAnonKey = 'sb_publishable_-4CC2ZvzFfSon4fSOflpYg_-BLmDvPm';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Helper to get the public URL for an image stored in the 'website-images' bucket.
 * @param filename The exact name of the file uploaded to the bucket.
 */
export function getImageUrl(filename: string): string {
    const { data } = supabase.storage.from('website-images').getPublicUrl(filename);
    return data.publicUrl;
}
