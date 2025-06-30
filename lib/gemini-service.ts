interface KeyPhrase {
  phrase: string
  explanation: string
}

interface TransformationResult {
  transformedText: string
  keyPhrases: KeyPhrase[]
}

export class GeminiService {
  private static apiKey = process.env.GEMINI_API_KEY
  private static apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'

  static async transformText(originalText: string): Promise<TransformationResult> {
    if (!this.apiKey) {
      throw new Error('Gemini API key not configured')
    }

    const prompt = `
You are a communication coach helping someone express their thoughts more naturally and professionally. 

Transform this raw thought into a more natural, thoughtful expression while keeping the core meaning:
"${originalText}"

Then identify 3 key natural phrases from your transformation that help improve communication.

Respond in this exact JSON format:
{
  "transformedText": "Your improved version here",
  "keyPhrases": [
    {
      "phrase": "exact phrase from transformation",
      "explanation": "why this phrase is more natural/professional"
    },
    {
      "phrase": "another key phrase",
      "explanation": "explanation of its benefit"
    },
    {
      "phrase": "third key phrase", 
      "explanation": "why it improves communication"
    }
  ]
}

Guidelines:
- Keep the original emotion and intent
- Make it more thoughtful but not overly formal
- Focus on natural, conversational improvements
- Phrases should be actually used in the transformation
- Explanations should be helpful and encouraging
`

    try {
      const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
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
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      })

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`)
      }

      const data = await response.json()
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text

      if (!generatedText) {
        throw new Error('No response from Gemini API')
      }

      // Parse the JSON response
      try {
        const result = JSON.parse(generatedText.trim())
        
        // Validate the response structure
        if (!result.transformedText || !Array.isArray(result.keyPhrases)) {
          throw new Error('Invalid response format from AI')
        }

        // Ensure we have exactly 3 key phrases
        const keyPhrases = result.keyPhrases.slice(0, 3).map((phrase: any) => ({
          phrase: phrase.phrase || '',
          explanation: phrase.explanation || ''
        }))

        return {
          transformedText: result.transformedText,
          keyPhrases
        }
      } catch (parseError) {
        console.error('Failed to parse AI response:', generatedText)
        
        // Fallback: Create a simple transformation
        return this.createFallbackTransformation(originalText)
      }
    } catch (error) {
      console.error('Gemini API error:', error)
      
      // Fallback to placeholder data
      return this.createFallbackTransformation(originalText)
    }
  }

  private static createFallbackTransformation(originalText: string): TransformationResult {
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
}