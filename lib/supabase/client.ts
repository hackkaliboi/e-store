import { createClient } from '@supabase/supabase-js'

// These will be replaced with your actual Supabase project URL and anon key
// You can find these in your Supabase project settings
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Only create the Supabase client if we have the required environment variables
// This prevents errors during build time when environment variables are not available
const hasCredentials = supabaseUrl && supabaseAnonKey;
console.log('Supabase credentials available:', hasCredentials, { supabaseUrl: supabaseUrl ? 'SET' : 'MISSING', supabaseAnonKey: supabaseAnonKey ? 'SET' : 'MISSING' });

export const supabase = hasCredentials
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null
    
if (supabase) {
  console.log('Supabase client initialized successfully');
} else {
  console.log('Supabase client not initialized');
}