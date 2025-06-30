// Error handling utilities for MCP operations

export enum ErrorCode {
  UNAUTHORIZED = 'UNAUTHORIZED',
  NOT_FOUND = 'NOT_FOUND',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export interface AppError {
  code: ErrorCode
  message: string
  details?: unknown
}

export class MCPErrorHandler {
  static createError(code: ErrorCode, message: string, details?: unknown): AppError {
    return { code, message, details }
  }

  static fromMCPError(error: unknown): AppError {
    if (!error) {
      return this.createError(ErrorCode.UNKNOWN_ERROR, 'An unknown error occurred')
    }

    // Handle different types of MCP errors
    const errorMessage = (error as { message?: string })?.message || ''
    
    if (errorMessage.includes('Unauthorized')) {
      return this.createError(
        ErrorCode.UNAUTHORIZED,
        'Authentication failed. Please check your credentials.',
        error
      )
    }

    if (errorMessage.includes('not found') || errorMessage.includes('404')) {
      return this.createError(
        ErrorCode.NOT_FOUND,
        'The requested resource was not found.',
        error
      )
    }

    if (errorMessage.includes('validation') || errorMessage.includes('invalid')) {
      return this.createError(
        ErrorCode.VALIDATION_ERROR,
        'Invalid data provided. Please check your input.',
        error
      )
    }

    if (errorMessage.includes('database') || errorMessage.includes('SQL')) {
      return this.createError(
        ErrorCode.DATABASE_ERROR,
        'Database operation failed. Please try again.',
        error
      )
    }

    if (errorMessage.includes('network') || errorMessage.includes('connection')) {
      return this.createError(
        ErrorCode.NETWORK_ERROR,
        'Network connection failed. Please check your internet connection.',
        error
      )
    }

    return this.createError(
      ErrorCode.UNKNOWN_ERROR,
      errorMessage || 'An unexpected error occurred',
      error
    )
  }

  static getErrorMessage(error: AppError): string {
    switch (error.code) {
      case ErrorCode.UNAUTHORIZED:
        return 'Please log in to continue'
      case ErrorCode.NOT_FOUND:
        return 'The item you\'re looking for doesn\'t exist'
      case ErrorCode.VALIDATION_ERROR:
        return 'Please check your input and try again'
      case ErrorCode.DATABASE_ERROR:
        return 'Something went wrong. Please try again'
      case ErrorCode.NETWORK_ERROR:
        return 'Connection problem. Please check your internet'
      default:
        return error.message || 'Something went wrong'
    }
  }

  static isRetryableError(error: AppError): boolean {
    return [ErrorCode.NETWORK_ERROR, ErrorCode.DATABASE_ERROR].includes(error.code)
  }
}

// Retry mechanism for MCP operations
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> {
  let lastError: unknown

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error
      const appError = MCPErrorHandler.fromMCPError(error)
      
      if (!MCPErrorHandler.isRetryableError(appError) || attempt === maxRetries) {
        throw appError
      }

      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay * attempt))
    }
  }

  throw MCPErrorHandler.fromMCPError(lastError)
}