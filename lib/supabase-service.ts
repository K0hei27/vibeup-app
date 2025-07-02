import { supabase } from './supabase'
import { User, Session, Phrase, UserInsert, SessionInsert, PhraseInsert, UserUpdate, PhraseUpdate } from '@/types'

export class SupabaseService {
  // User operations
  static async createUser(userData: UserInsert) {
    const { data, error } = await supabase
      .from('users')
      .upsert(userData)
      .select()
      .single()
    
    if (error) throw error
    return data as User
  }

  static async getUserById(id: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as User
  }

  static async updateUser(id: string, updates: UserUpdate) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as User
  }

  // Session operations
  static async createSession(sessionData: SessionInsert) {
    console.log('Attempting to create session:', sessionData)
    
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    console.log('Auth check result:', { user: user?.id, authError })
    
    if (authError || !user) {
      console.error('User not authenticated for session creation:', authError)
      throw new Error('User not authenticated')
    }
    
    // Also check the session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    console.log('Session check:', { hasSession: !!session, sessionError })
    
    const { data, error } = await supabase
      .from('sessions')
      .insert(sessionData)
      .select()
      .single()
    
    if (error) {
      console.error('Database error creating session:', JSON.stringify(error, null, 2))
      console.error('Error details:', error.message, error.code, error.details)
      throw error
    }
    return data as Session
  }

  static async getUserSessions(userId: string, limit = 10) {
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data as Session[]
  }

  static async deleteSession(id: string) {
    const { error } = await supabase
      .from('sessions')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  }

  // Phrase operations
  static async createPhrase(phraseData: PhraseInsert) {
    console.log('Attempting to create phrase:', phraseData)
    
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      console.error('User not authenticated for phrase creation:', authError)
      throw new Error('User not authenticated')
    }
    
    const { data, error } = await supabase
      .from('phrases')
      .insert(phraseData)
      .select()
      .single()
    
    if (error) {
      console.error('Database error creating phrase:', JSON.stringify(error, null, 2))
      console.error('Error details:', error.message, error.code, error.details)
      throw error
    }
    return data as Phrase
  }

  static async getUserPhrases(userId: string) {
    const { data, error } = await supabase
      .from('phrases')
      .select('*')
      .eq('user_id', userId)
      .order('learned_date', { ascending: false })
    
    if (error) throw error
    return data as Phrase[]
  }

  static async updatePhrase(id: string, updates: PhraseUpdate) {
    const { data, error } = await supabase
      .from('phrases')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Phrase
  }

  static async deletePhrase(id: string) {
    const { error } = await supabase
      .from('phrases')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  }

  // Anonymous usage tracking
  static async trackAnonymousUsage(originalText: string, transformedText: string, keyPhrases: any[]) {
    try {
      const { data, error } = await supabase
        .from('anonymous_usage')
        .insert({
          original_text: originalText,
          transformed_text: transformedText,
          key_phrases: keyPhrases,
          created_at: new Date().toISOString()
        })
        .select()
        .single()
      
      if (error) {
        console.error('Failed to track anonymous usage:', error)
        // Don't throw error - this is non-critical tracking
        return null
      }
      return data
    } catch (error) {
      console.error('Error in anonymous usage tracking:', error)
      // Don't throw error - this is non-critical tracking
      return null
    }
  }

  // Test connection
  static async testConnection() {
    const { error } = await supabase
      .from('users')
      .select('count')
      .limit(1)
    
    if (error) throw error
    return true
  }
}