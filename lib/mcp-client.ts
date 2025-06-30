import { 
  User, 
  Session, 
  Phrase, 
  UserInsert, 
  SessionInsert, 
  PhraseInsert,
  UserUpdate,
  PhraseUpdate,
  MCPServiceResponse 
} from '@/types'

// Client-side service that calls API routes
export class MCPClient {
  private static async makeRequest<T>(
    endpoint: string, 
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: unknown
  ): Promise<MCPServiceResponse<T>> {
    try {
      const response = await fetch(`/api/mcp/${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Network error' }))
        return {
          success: false,
          error: errorData.error || `HTTP ${response.status}`
        }
      }

      const data = await response.json()
      return data
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message || 'Network error'
      }
    }
  }

  // User operations
  static async createUser(userData: UserInsert): Promise<MCPServiceResponse<User>> {
    return this.makeRequest<User>('users', 'POST', userData)
  }

  static async getUserById(id: string): Promise<MCPServiceResponse<User>> {
    return this.makeRequest<User>(`users/${id}`)
  }

  static async updateUser(id: string, updates: UserUpdate): Promise<MCPServiceResponse<User>> {
    return this.makeRequest<User>(`users/${id}`, 'PUT', updates)
  }

  // Session operations
  static async createSession(sessionData: SessionInsert): Promise<MCPServiceResponse<Session>> {
    return this.makeRequest<Session>('sessions', 'POST', sessionData)
  }

  static async getUserSessions(userId: string, limit = 10): Promise<MCPServiceResponse<Session[]>> {
    return this.makeRequest<Session[]>(`sessions?userId=${userId}&limit=${limit}`)
  }

  static async deleteSession(id: string): Promise<MCPServiceResponse<boolean>> {
    return this.makeRequest<boolean>(`sessions/${id}`, 'DELETE')
  }

  // Phrase operations
  static async createPhrase(phraseData: PhraseInsert): Promise<MCPServiceResponse<Phrase>> {
    return this.makeRequest<Phrase>('phrases', 'POST', phraseData)
  }

  static async getUserPhrases(userId: string): Promise<MCPServiceResponse<Phrase[]>> {
    return this.makeRequest<Phrase[]>(`phrases?userId=${userId}`)
  }

  static async updatePhrase(id: string, updates: PhraseUpdate): Promise<MCPServiceResponse<Phrase>> {
    return this.makeRequest<Phrase>(`phrases/${id}`, 'PUT', updates)
  }

  static async deletePhrase(id: string): Promise<MCPServiceResponse<boolean>> {
    return this.makeRequest<boolean>(`phrases/${id}`, 'DELETE')
  }

  // Test connection
  static async testConnection(): Promise<MCPServiceResponse<boolean>> {
    return this.makeRequest<boolean>('test')
  }
}