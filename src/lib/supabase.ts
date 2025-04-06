
import { createClient } from '@supabase/supabase-js';

// Use environment variables or fallback to demo values for connection
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://jqmdhzkdheltvtqjvkkx.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxbWRoemtkaGVsdHZ0cWp2a2t4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4NTg5MTksImV4cCI6MjA1OTQzNDkxOX0.OdeQ_DiFmnJLubiIKZIJ04drX-NR52R4NJ2lcj38R_c';

// Check if credentials are available
const hasValidCredentials = !!supabaseUrl && !!supabaseAnonKey;

// Create a mock client for when credentials are not available
const mockSupabaseClient = {
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
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
  storage: {
    from: () => ({
      upload: () => Promise.resolve({ data: { path: '' }, error: null }),
      getPublicUrl: () => ({ data: { publicUrl: '' } }),
      list: () => Promise.resolve({ data: [], error: null }),
      remove: () => Promise.resolve({ data: null, error: null }),
    }),
  },
  functions: {
    invoke: () => Promise.resolve({ data: { url: null }, error: null }),
  },
};

// Create and export the Supabase client, or fall back to mock client
export const supabase = hasValidCredentials 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        storage: localStorage,
        autoRefreshToken: true,
        persistSession: true,
      }
    })
  : mockSupabaseClient as any;

// Function to check if Supabase is properly configured
export const isSupabaseConfigured = (): boolean => {
  if (hasValidCredentials) {
    console.log('Supabase is configured with valid credentials');
    return true;
  } else {
    console.warn('Supabase is NOT configured with valid credentials. Using mock client.');
    return false;
  }
};

// Add a console message at import time to make configuration status clear
console.info(hasValidCredentials 
  ? 'Supabase client initialized with provided credentials' 
  : 'Running in demo mode with mock client - limited functionality available');
