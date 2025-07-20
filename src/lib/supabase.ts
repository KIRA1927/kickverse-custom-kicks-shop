
import { createClient } from '@supabase/supabase-js';

// Use environment variables or fallback to demo values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-key';

// Check if real credentials are available
const hasRealCredentials = !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);

if (!hasRealCredentials) {
  console.warn('Supabase not configured. Using demo mode. Connect to Supabase for full functionality.');
}

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to check if Supabase is properly configured
export const isSupabaseConfigured = (): boolean => {
  return hasRealCredentials;
};
