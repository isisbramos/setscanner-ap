import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Remove trailing slashes and any extra paths from URL
function cleanUrl(url: string): string {
  return url.replace(/\/+$/, '').replace(/\/rest\/v1.*$/, '')
}

const supabaseUrl = cleanUrl(process.env.NEXT_PUBLIC_SUPABASE_URL || '')
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export function createClient() {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}
