import { NextRequest, NextResponse } from 'next/server'

interface KeyPhrase {
  phrase: string
  explanation: string
}

interface TransformationResult {
  transformedText: string
  keyPhrases: KeyPhrase[]
}

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()
    
    console.log('🔥 Transform API called with text:', text)
    
    if (!text?.trim()) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      )
    }

    // 🚨 COST PROTECTION: Limit input length
    if (text.length > 500) {
      return NextResponse.json(
        { error: 'Text too long. Please keep it under 500 characters to manage costs.' },
        { status: 400 }
      )
    }

    // 🚨 COST PROTECTION: Check daily usage limits
    try {
      const usageResponse = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/usage`, {
        method: 'GET'
      })
      const usageData = await usageResponse.json()
      
      if (usageData.remaining <= 0) {
        console.warn('🚨 Daily API limit reached!')
        return NextResponse.json(
          { error: 'Daily usage limit reached. Please try again tomorrow.' },
          { status: 429 }
        )
      }
    } catch (error) {
      console.warn('⚠️ Could not check usage limits:', error)
    }

    const apiKey = process.env.GEMINI_API_KEY
    console.log('🔑 Environment check - API key exists:', !!apiKey)
    console.log('🔑 API key first 10 chars:', apiKey ? apiKey.slice(0, 10) + '...' : 'NOT FOUND')
    console.log('🔑 All env vars:', Object.keys(process.env).filter(key => key.includes('GEMINI')))
    
    if (!apiKey) {
      console.error('❌ Gemini API key not configured - using fallback')
      return NextResponse.json(
        createFallbackTransformation(text),
        { status: 200 }
      )
    }

    console.log('✅ Using Gemini API key:', apiKey.slice(0, 10) + '...')

    const prompt = `
You're helping someone express their thoughts more clearly and naturally. Transform their message to sound like the thoughtful, well-spoken version of themselves.

Original: "${text}"

Make it:
- Clear and natural (not stiff or corporate)
- Sound like how people actually talk when they're being thoughtful
- Fix grammar and awkward phrasing
- Better flow and word choice
- Genuine but more polished

Guidelines:
- Keep it conversational and human
- Use everyday language that flows well
- Make it sound confident but not pretentious
- Fix mistakes without losing personality
- Think "smart friend giving advice" not "business presentation"

Then identify 3 key phrases from your transformation that made it better.

Respond in JSON:
{
  "transformedText": "Your natural version here",
  "keyPhrases": [
    {
      "phrase": "specific improved phrase",
      "explanation": "Brief benefit (6 words max)"
    },
    {
      "phrase": "another better phrase",
      "explanation": "Why it's better (6 words max)"
    },
    {
      "phrase": "third enhanced phrase",
      "explanation": "What it improves (6 words max)"
    }
  ]
}

Example transformation:
Original: "VibeUp is super application that help you keep learning new natural and professional tone and style!"
Transformed: "VibeUp is an innovative app that helps you develop natural, professional communication skills through continuous practice and AI-powered guidance."
Key phrases:
- "innovative app" - More natural than "super application"
- "helps you develop" - Clearer, more supportive tone  
- "continuous practice" - Better than "keep learning"

Keep it natural and conversational!
`

    console.log('📡 Sending request to Gemini API...')
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    })

    console.log('📡 Gemini API response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`❌ Gemini API error: ${response.status}`, errorText)
      return NextResponse.json(
        createFallbackTransformation(text),
        { status: 200 }
      )
    }

    const data = await response.json()
    console.log('📦 Gemini API full response:', JSON.stringify(data, null, 2))
    
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!generatedText) {
      console.error('❌ No response from Gemini API')
      console.log('📦 Response data:', data)
      return NextResponse.json(
        createFallbackTransformation(text),
        { status: 200 }
      )
    }

    console.log('✅ Generated text from AI:', generatedText)

    // Parse the JSON response
    try {
      // Remove markdown code blocks if present
      let cleanedText = generatedText.trim()
      if (cleanedText.startsWith('```json')) {
        cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/\s*```$/, '')
      }
      if (cleanedText.startsWith('```')) {
        cleanedText = cleanedText.replace(/^```\s*/, '').replace(/\s*```$/, '')
      }
      
      console.log('🧹 Cleaned text for parsing:', cleanedText)
      
      const result = JSON.parse(cleanedText.trim())
      
      // Validate the response structure
      if (!result.transformedText || !Array.isArray(result.keyPhrases)) {
        throw new Error('Invalid response format from AI')
      }

      // Ensure we have exactly 3 key phrases
      const keyPhrases = result.keyPhrases.slice(0, 3).map((phrase: { phrase?: string; explanation?: string }) => ({
        phrase: phrase.phrase || '',
        explanation: phrase.explanation || ''
      }))

      // 📊 Track successful usage
      try {
        await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/usage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tokens: text.length + result.transformedText.length })
        })
      } catch (error) {
        console.warn('⚠️ Could not track usage:', error)
      }

      return NextResponse.json({
        transformedText: result.transformedText,
        keyPhrases
      })
    } catch {
      console.error('Failed to parse AI response:', generatedText)
      return NextResponse.json(
        createFallbackTransformation(text),
        { status: 200 }
      )
    }
  } catch (error) {
    console.error('Transform API error:', error)
    const { text } = await request.json().catch(() => ({ text: '' }))
    return NextResponse.json(
      createFallbackTransformation(text),
      { status: 200 }
    )
  }
}

function createFallbackTransformation(originalText: string): TransformationResult {
  // Simple fallback transformation when AI fails
  const fallbackTransformations: Record<string, TransformationResult> = {
    "frustrated": {
      transformedText: "I'm finding this situation challenging and would appreciate some support.",
      keyPhrases: [
        { phrase: "finding this challenging", explanation: "Acknowledges difficulty without sounding overwhelmed" },
        { phrase: "would appreciate", explanation: "Polite way to ask for help" },
        { phrase: "some support", explanation: "Specific but not demanding request" }
      ]
    },
    "annoyed": {
      transformedText: "I'm experiencing some frustration with this situation and would like to find a solution.",
      keyPhrases: [
        { phrase: "experiencing frustration", explanation: "Honest but measured way to express annoyance" },
        { phrase: "with this situation", explanation: "Focuses on the problem, not people" },
        { phrase: "find a solution", explanation: "Shows constructive intent" }
      ]
    },
    "boss": {
      transformedText: "I'm finding it challenging to adapt to the frequently changing requirements and would appreciate more consistency in our planning.",
      keyPhrases: [
        { phrase: "finding it challenging", explanation: "Professional way to express difficulty" },
        { phrase: "frequently changing", explanation: "Neutral description of the problem" },
        { phrase: "would appreciate", explanation: "Respectful way to make a request" }
      ]
    }
  }

  // Find best matching fallback
  const lowerText = originalText.toLowerCase()
  for (const [key, result] of Object.entries(fallbackTransformations)) {
    if (lowerText.includes(key)) {
      return result
    }
  }

  // Default fallback
  return fallbackTransformations.frustrated
}