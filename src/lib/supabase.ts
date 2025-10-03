import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('Supabase configuration:')
console.log('- URL:', supabaseUrl ? 'Set' : 'Missing')
console.log('- Key:', supabaseAnonKey ? 'Set' : 'Missing')

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!')
  console.error('Please check that VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set')
} else {
  console.log('✅ Supabase configuration looks good')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)