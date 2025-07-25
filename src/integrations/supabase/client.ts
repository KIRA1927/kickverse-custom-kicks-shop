// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://asurgkvhennvguyznarp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzdXJna3ZoZW5udmd1eXpuYXJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMzA2OTgsImV4cCI6MjA2ODYwNjY5OH0.8ttCbz4KM0l-101acwMNef3ERfnaFEQnt0QXLshRVeU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});