import { createClient } from '@supabase/supabase-js'
import { AuthUser } from '@/types'

// Supabase client configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jbleeibcemqugcrvoxsx.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpibGVlaWJjZW1xdWdjcnZveHN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyODQ1MTcsImV4cCI6MjA2Njg2MDUxN30.5SyfswERDjIRC6hxTPnpwxpt7Rw3Q17wx1xxLl7D7wU'

console.log('🔧 Supabase Config Check:')
console.log('- URL:', supabaseUrl ? 'Set' : 'Missing')
console.log('- Key:', supabaseAnonKey ? 'Set' : 'Missing')
console.log('- URL value:', supabaseUrl)

if (!supabaseUrl || supabaseUrl === 'undefined' || !supabaseAnonKey || supabaseAnonKey === 'undefined') {
  console.error('❌ Supabase configuration error')
  throw new Error(`Missing Supabase environment variables: URL=${!!supabaseUrl}, Key=${!!supabaseAnonKey}`)
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helper functions
export const auth = {
  // Sign up with email
  async signUp(email: string, password: string) {
    return await supabase.auth.signUp({
      email,
      password,
    })
  },

  // Sign in with email
  async signIn(email: string, password: string) {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    })
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // Get current user
  async getCurrentUser(): Promise<AuthUser | null> {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) throw error
    
    if (!user) return null
    
    return {
      id: user.id,
      email: user.email!
    }
  },

  // Listen to auth changes
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(event, session)
    })
  },

  // Get session
  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) throw error
    return session
  }
}

// Database helper functions (these would integrate with MCP service)
export const db = {
  // Users
  async createUser(userData: { email: string; preferences?: Record<string, unknown>; streak_count?: number }) {
    const { data, error } = await supabase
      .from('users')
      .insert(userData)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getUser(id: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Sessions
  async createSession(sessionData: {
    user_id: string
    original_text: string
    transformed_text: string
    key_phrases: Record<string, unknown>[]
  }) {
    const { data, error } = await supabase
      .from('sessions')
      .insert(sessionData)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getUserSessions(userId: string, limit = 10) {
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data
  },

  // Phrases
  async createPhrase(phraseData: {
    user_id: string
    phrase: string
    context?: string
    usage_example?: string
  }) {
    const { data, error } = await supabase
      .from('phrases')
      .insert(phraseData)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getUserPhrases(userId: string) {
    const { data, error } = await supabase
      .from('phrases')
      .select('*')
      .eq('user_id', userId)
      .order('learned_date', { ascending: false })
    
    if (error) throw error
    return data
  }
}