import { NextRequest, NextResponse } from 'next/server'
import { MCPErrorHandler, validators } from '@/lib/mcp-error-handler'
import { SessionInsert } from '@/types'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const limit = parseInt(searchParams.get('limit') || '10')

    if (!userId) {
      return NextResponse.json({
        success: false,
        error: 'userId is required'
      }, { status: 400 })
    }

    const idError = validators.uuid(userId)
    if (idError) {
      return NextResponse.json({
        success: false,
        error: idError
      }, { status: 400 })
    }

    // Mock sessions data for testing
    const mockSessions = [
      {
        id: crypto.randomUUID(),
        user_id: userId,
        original_text: 'I am feeling frustrated',
        transformed_text: 'I am experiencing some challenges',
        key_phrases: [
          { phrase: 'experiencing challenges', explanation: 'More professional way to express frustration', usage_example: 'I am experiencing some challenges with this project' }
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ].slice(0, limit)

    return NextResponse.json({
      success: true,
      data: mockSessions
    })
  } catch (error) {
    return NextResponse.json(
      MCPErrorHandler.handleApiError(error, 'get user sessions'),
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: SessionInsert = await request.json()
    
    // Validate input
    const idError = validators.uuid(body.user_id)
    if (idError) {
      return NextResponse.json({
        success: false,
        error: idError
      }, { status: 400 })
    }

    const originalTextError = validators.required(body.original_text, 'Original text')
    if (originalTextError) {
      return NextResponse.json({
        success: false,
        error: originalTextError
      }, { status: 400 })
    }

    const transformedTextError = validators.required(body.transformed_text, 'Transformed text')
    if (transformedTextError) {
      return NextResponse.json({
        success: false,
        error: transformedTextError
      }, { status: 400 })
    }

    // Mock session creation
    const mockSession = {
      id: crypto.randomUUID(),
      user_id: body.user_id,
      original_text: body.original_text,
      transformed_text: body.transformed_text,
      key_phrases: body.key_phrases || [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      data: mockSession
    })
  } catch (error) {
    return NextResponse.json(
      MCPErrorHandler.handleApiError(error, 'create session'),
      { status: 500 }
    )
  }
}