import { createClient } from '@supabase/supabase-js'

// These will be replaced with your actual Supabase project URL and anon key
// You can find these in your Supabase project settings
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Only create the Supabase client if we have the required environment variables
// This prevents errors during build time when environment variables are not available
export const supabase = supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null