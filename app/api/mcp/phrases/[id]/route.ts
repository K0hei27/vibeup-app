import { NextRequest, NextResponse } from 'next/server'
import { MCPErrorHandler, validators } from '@/lib/mcp-error-handler'
import { PhraseUpdate } from '@/types'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body: PhraseUpdate = await request.json()
    
    const idError = validators.uuid(id)
    if (idError) {
      return NextResponse.json({
        success: false,
        error: idError
      }, { status: 400 })
    }

    // Mock phrase update
    const mockUpdatedPhrase = {
      id,
      user_id: crypto.randomUUID(),
      phrase: body.phrase || 'updated phrase',
      context: body.context || 'updated context',
      usage_example: body.usage_example || 'updated example',
      learned_date: body.learned_date || new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      data: mockUpdatedPhrase
    })
  } catch (error) {
    return NextResponse.json(
      MCPErrorHandler.handleApiError(error, 'update phrase'),
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    const idError = validators.uuid(id)
    if (idError) {
      return NextResponse.json({
        success: false,
        error: idError
      }, { status: 400 })
    }

    // Mock phrase deletion
    return NextResponse.json({
      success: true,
      data: true
    })
  } catch (error) {
    return NextResponse.json(
      MCPErrorHandler.handleApiError(error, 'delete phrase'),
      { status: 500 }
    )
  }
}