import type { Database } from './database'

// Database entity types using real Supabase schema
export type User = Database['public']['Tables']['users']['Row']
export type Phrase = Database['public']['Tables']['phrases']['Row']

// Session type with properly typed key_phrases
export interface Session extends Omit<Database['public']['Tables']['sessions']['Row'], 'key_phrases'> {
  key_phrases: KeyPhrase[]
}

// Insert types
export type UserInsert = Database['public']['Tables']['users']['Insert']
export type SessionInsert = Database['public']['Tables']['sessions']['Insert']
export type PhraseInsert = Database['public']['Tables']['phrases']['Insert']

// Update types
export type UserUpdate = Database['public']['Tables']['users']['Update']
export type SessionUpdate = Database['public']['Tables']['sessions']['Update']
export type PhraseUpdate = Database['public']['Tables']['phrases']['Update']

// API response types
export interface TransformationResponse {
  transformed_text: string
  key_phrases: KeyPhrase[]
}

export interface KeyPhrase {
  phrase: string
  explanation: string
  usage_example: string
}


// MCP service response types
export interface MCPServiceResponse<T = any> {
  data?: T
  error?: string
  success: boolean
}

// Auth types
export interface AuthUser {
  id: string
  email: string
}