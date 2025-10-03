import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

console.log('Environment check:', {
  url: supabaseUrl,
  key: supabaseAnonKey ? 'Present' : 'Missing',
  allEnv: import.meta.env
})

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables!')
  console.error('VITE_SUPABASE_URL:', supabaseUrl)
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Set' : 'Missing')
  console.error('Please restart the dev server to load environment variables from .env file')
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)