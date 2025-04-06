
import { createClient } from '@supabase/supabase-js';

// Use environment variables or fallback to empty strings
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if credentials are available
const hasValidCredentials = !!supabaseUrl && !!supabaseAnonKey;

// Create a mock client for when credentials are not available
const mockSupabaseClient = {
  auth: {
    getSession: () => Promise.resolve({ data: { session: null } }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: () => Promise.resolve({ error: null }),
    signUp: () => Promise.resolve({ error: null }),
    signOut: () => Promise.resolve({ error: null }),
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        single: () => Promise.resolve({ data: null, error: null }),
        order: () => Promise.resolve({ data: [], error: null }),
        delete: () => Promise.resolve({ error: null }),
        insert: () => Promise.resolve({ data: [], error: null }),
        update: () => Promise.resolve({ error: null }),
      }),
      insert: () => Promise.resolve({ data: [], error: null }),
      delete: () => Promise.resolve({ error: null }),
      order: () => ({ data: [], error: null }),
    }),
    insert: () => ({
      select: () => Promise.resolve({ data: [], error: null }),
    }),
    delete: () => ({
      eq: () => Promise.resolve({ error: null }),
    }),
    update: () => ({
      eq: () => Promise.resolve({ error: null }),
    }),
  }),
  functions: {
    invoke: () => Promise.resolve({ data: { url: null }, error: null }),
  },
};

// Create and export the Supabase client, or fall back to mock client
export const supabase = hasValidCredentials 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : mockSupabaseClient as any;

// Function to check if Supabase is properly configured
export const isSupabaseConfigured = (): boolean => {
  if (hasValidCredentials) {
    console.log('Supabase is configured with valid credentials');
    return true;
  } else {
    console.log('Supabase is NOT configured with valid credentials. Using mock client.');
    return false;
  }
};

// Add a console message at import time to make configuration status clear
if (!hasValidCredentials) {
  console.warn('Running in demo mode: Supabase credentials missing. App functionality will be limited.');
  console.info('To connect to Supabase, provide VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
}
