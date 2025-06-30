import { NextRequest, NextResponse } from 'next/server'
import { MCPErrorHandler, validators } from '@/lib/mcp-error-handler'
import { PhraseInsert } from '@/types'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

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

    // Mock phrases data for testing
    const mockPhrases = [
      {
        id: crypto.randomUUID(),
        user_id: userId,
        phrase: 'experiencing challenges',
        context: 'professional communication',
        usage_example: 'I am experiencing some challenges with this project',
        learned_date: new Date().toISOString().split('T')[0],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]

    return NextResponse.json({
      success: true,
      data: mockPhrases
    })
  } catch (error) {
    return NextResponse.json(
      MCPErrorHandler.handleApiError(error, 'get user phrases'),
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: PhraseInsert = await request.json()
    
    // Validate input
    const idError = validators.uuid(body.user_id)
    if (idError) {
      return NextResponse.json({
        success: false,
        error: idError
      }, { status: 400 })
    }

    const phraseError = validators.required(body.phrase, 'Phrase')
    if (phraseError) {
      return NextResponse.json({
        success: false,
        error: phraseError
      }, { status: 400 })
    }

    // Mock phrase creation
    const mockPhrase = {
      id: crypto.randomUUID(),
      user_id: body.user_id,
      phrase: body.phrase,
      context: body.context || null,
      usage_example: body.usage_example || null,
      learned_date: body.learned_date || new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      data: mockPhrase
    })
  } catch (error) {
    return NextResponse.json(
      MCPErrorHandler.handleApiError(error, 'create phrase'),
      { status: 500 }
    )
  }
}