import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validate environment variables
const hasValidConfig = supabaseUrl && supabaseAnonKey && 
  supabaseUrl !== 'your_supabase_project_url' && 
  supabaseAnonKey !== 'your_supabase_anon_key' &&
  supabaseUrl.startsWith('https://') &&
  supabaseUrl.includes('.supabase.co')

if (!hasValidConfig) {
  console.error('Invalid or missing Supabase environment variables.')
  console.error('Current values:', { 
    url: supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : 'missing',
    key: supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : 'missing'
  })
  console.error('Please check your .env file and ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set correctly.')
}
export const supabase = hasValidConfig ? createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
    global: {
      headers: {
        'X-Client-Info': 'supabase-js-web',
      },
    },
  }
) : null

export const isSupabaseConfigured = hasValidConfig
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          name: string
          description: string
          plan: 'personal' | 'creator' | 'business'
          social_links: Record<string, string> | null
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          plan: 'personal' | 'creator' | 'business'
          social_links?: Record<string, string> | null
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          plan?: 'personal' | 'creator' | 'business'
          social_links?: Record<string, string> | null
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}