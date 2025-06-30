import { MCPServiceResponse } from '@/types'

export enum MCPErrorCode {
  CONNECTION_ERROR = 'CONNECTION_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  CONSTRAINT_VIOLATION = 'CONSTRAINT_VIOLATION',
  NETWORK_ERROR = 'NETWORK_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export interface MCPError extends Error {
  code: MCPErrorCode
  details?: Record<string, unknown>
  statusCode?: number
}

export class MCPErrorHandler {
  static createError(
    code: MCPErrorCode, 
    message: string, 
    details?: Record<string, unknown>,
    statusCode?: number
  ): MCPError {
    const error = new Error(message) as MCPError
    error.code = code
    error.details = details
    error.statusCode = statusCode
    return error
  }

  static handleDatabaseError(error: unknown): MCPServiceResponse {
    console.error('Database Error:', error)

    // Handle PostgreSQL specific errors
    if (error.code) {
      switch (error.code) {
        case '23505': // Unique violation
          return {
            success: false,
            error: 'A record with this information already exists'
          }
        case '23503': // Foreign key violation
          return {
            success: false,
            error: 'Referenced record does not exist'
          }
        case '23514': // Check constraint violation
          return {
            success: false,
            error: 'Data does not meet validation requirements'
          }
        case '42501': // Permission denied
          return {
            success: false,
            error: 'Permission denied'
          }
        case '08006': // Connection failure
          return {
            success: false,
            error: 'Database connection failed'
          }
        default:
          return {
            success: false,
            error: error.message || 'Database operation failed'
          }
      }
    }

    // Handle Supabase/PostgREST errors
    if (error.details || error.hint) {
      return {
        success: false,
        error: error.message || 'Database operation failed',
      }
    }

    // Handle network errors
    if (error.name === 'NetworkError' || error.message?.includes('fetch')) {
      return {
        success: false,
        error: 'Network connection failed'
      }
    }

    // Handle authentication errors
    if (error.message?.includes('JWT') || error.message?.includes('auth')) {
      return {
        success: false,
        error: 'Authentication failed'
      }
    }

    // Default error handling
    return {
      success: false,
      error: error.message || 'An unexpected error occurred'
    }
  }

  static handleApiError(error: unknown, operation: string): MCPServiceResponse {
    console.error(`MCP API Error during ${operation}:`, error)

    if (error instanceof Response) {
      return {
        success: false,
        error: `HTTP ${error.status}: ${error.statusText}`
      }
    }

    if (error.name === 'AbortError') {
      return {
        success: false,
        error: 'Request was cancelled'
      }
    }

    if (error.name === 'TimeoutError') {
      return {
        success: false,
        error: 'Request timed out'
      }
    }

    return this.handleDatabaseError(error)
  }

  static validateInput<T>(
    data: T, 
    validator: (data: T) => string | null
  ): MCPServiceResponse<T> | null {
    const validationError = validator(data)
    
    if (validationError) {
      return {
        success: false,
        error: validationError
      }
    }
    
    return null
  }

  static async withErrorHandling<T>(
    operation: () => Promise<T>,
    operationName: string
  ): Promise<MCPServiceResponse<T>> {
    try {
      const result = await operation()
      return {
        success: true,
        data: result
      }
    } catch (error) {
      return this.handleApiError(error, operationName)
    }
  }
}

// Validation helpers
export const validators = {
  email: (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return 'Invalid email address'
    }
    return null
  },

  uuid: (id: string): string | null => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    if (!id || !uuidRegex.test(id)) {
      return 'Invalid UUID format'
    }
    return null
  },

  required: (value: unknown, fieldName: string): string | null => {
    if (value === null || value === undefined || value === '') {
      return `${fieldName} is required`
    }
    return null
  },

  minLength: (value: string, minLength: number, fieldName: string): string | null => {
    if (!value || value.length < minLength) {
      return `${fieldName} must be at least ${minLength} characters long`
    }
    return null
  },

  maxLength: (value: string, maxLength: number, fieldName: string): string | null => {
    if (value && value.length > maxLength) {
      return `${fieldName} must be no more than ${maxLength} characters long`
    }
    return null
  }
}