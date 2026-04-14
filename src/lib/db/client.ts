// src/lib/db/client.ts

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRole) {
  throw new Error('Missing Supabase environment variables');
}

/**
 * Supabase client with Service Role Access
 * Use this only in Server Actions, Route Handlers, and API contexts.
 * This client bypasses RLS - be careful with it!
 */
export const db = createClient(supabaseUrl, supabaseServiceRole, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

/**
 * Supabase client with Anon Access (JWT based)
 * Use this when you want to respect Row Level Security (RLS) policies.
 */
export const dbPublic = createClient(
  supabaseUrl,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);
