import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory usage tracking (in production, use Redis or database)
let dailyUsage = {
  date: new Date().toDateString(),
  requests: 0,
  tokens: 0,
  cost: 0
}

const DAILY_LIMIT = 1000 // Max requests per day
const TOKEN_COST = 0.0000001 // Approximate cost per token

export async function GET() {
  return NextResponse.json({
    usage: dailyUsage,
    limit: DAILY_LIMIT,
    remaining: Math.max(0, DAILY_LIMIT - dailyUsage.requests)
  })
}

export async function POST(request: NextRequest) {
  try {
    const { tokens = 150 } = await request.json() // Average tokens per request
    
    // Reset if new day
    const today = new Date().toDateString()
    if (dailyUsage.date !== today) {
      dailyUsage = {
        date: today,
        requests: 0,
        tokens: 0,
        cost: 0
      }
    }
    
    // Update usage
    dailyUsage.requests += 1
    dailyUsage.tokens += tokens
    dailyUsage.cost += tokens * TOKEN_COST
    
    // Check if over limit
    const isOverLimit = dailyUsage.requests >= DAILY_LIMIT
    
    return NextResponse.json({
      success: true,
      usage: dailyUsage,
      overLimit: isOverLimit
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to track usage' },
      { status: 500 }
    )
  }
}