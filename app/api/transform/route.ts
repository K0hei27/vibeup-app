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
You are helping someone express messy thoughts more naturally. Transform this into something better but keep it casual and real.

Original: "${text}"

Make it:
- Natural and conversational (not formal/corporate)
- Keep the real emotion but express it better
- Sound like how people actually talk
- More thoughtful but still authentic

Then pick 3 key phrases that help.

Respond in JSON:
{
  "transformedText": "Your natural version here",
  "keyPhrases": [
    {
      "phrase": "key phrase from text",
      "explanation": "Why it helps (4 words max)"
    },
    {
      "phrase": "another phrase",
      "explanation": "Benefit (4 words max)"
    },
    {
      "phrase": "third phrase",
      "explanation": "Why better (4 words max)"
    }
  ]
}

Good examples:
- "I'm so annoyed" → "I'm finding this challenging"
- "This sucks" → "This isn't working for me" 
- "My boss is crazy" → "My boss keeps changing things"

Keep it real and natural!
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
      const keyPhrases = result.keyPhrases.slice(0, 3).map((phrase: any) => ({
        phrase: phrase.phrase || '',
        explanation: phrase.explanation || ''
      }))

      return NextResponse.json({
        transformedText: result.transformedText,
        keyPhrases
      })
    } catch (parseError) {
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