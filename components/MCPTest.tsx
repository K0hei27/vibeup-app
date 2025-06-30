'use client'

import { useState, useEffect } from 'react'
import { MCPService } from '@/lib/mcp-service'
import { auth } from '@/lib/supabase'
import { AuthUser, Session, Phrase } from '@/types'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

export default function MCPTest() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [sessions, setSessions] = useState<Session[]>([])
  const [phrases, setPhrases] = useState<Phrase[]>([])
  const [loading, setLoading] = useState(false)
  const [testResults, setTestResults] = useState<string[]>([])

  useEffect(() => {
    // Listen for auth changes
    const { data: { subscription } } = auth.onAuthStateChange((user) => {
      setUser(user)
    })

    return () => subscription.unsubscribe()
  }, [])

  const addTestResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`])
  }

  const testConnection = async () => {
    setLoading(true)
    try {
      const result = await MCPService.testConnection()
      if (result.success) {
        addTestResult('✅ MCP Connection successful')
      } else {
        addTestResult(`❌ MCP Connection failed: ${result.error}`)
      }
    } catch (error) {
      addTestResult(`❌ MCP Connection error: ${error}`)
    }
    setLoading(false)
  }

  const testCreateSession = async () => {
    if (!user) {
      addTestResult('❌ No user logged in')
      return
    }

    setLoading(true)
    try {
      const sessionData = {
        user_id: user.id,
        original_text: 'I\'m super annoyed my boss keeps changing stuff',
        transformed_text: 'I\'m finding it challenging to adapt to the frequently changing requirements',
        key_phrases: [
          {
            phrase: 'finding it challenging',
            explanation: 'A professional way to express difficulty',
            usage_example: 'I\'m finding it challenging to meet the deadline'
          }
        ]
      }

      const result = await MCPService.createSession(sessionData)
      if (result.success) {
        addTestResult('✅ Session created successfully')
        if (result.data) {
          setSessions(prev => [result.data!, ...prev])
        }
      } else {
        addTestResult(`❌ Session creation failed: ${result.error}`)
      }
    } catch (error) {
      addTestResult(`❌ Session creation error: ${error}`)
    }
    setLoading(false)
  }

  const testCreatePhrase = async () => {
    if (!user) {
      addTestResult('❌ No user logged in')
      return
    }

    setLoading(true)
    try {
      const phraseData = {
        user_id: user.id,
        phrase: 'finding it challenging',
        context: 'Professional communication',
        usage_example: 'I\'m finding it challenging to adapt to the new system',
        learned_date: new Date().toISOString()
      }

      const result = await MCPService.createPhrase(phraseData)
      if (result.success) {
        addTestResult('✅ Phrase created successfully')
        if (result.data) {
          setPhrases(prev => [result.data!, ...prev])
        }
      } else {
        addTestResult(`❌ Phrase creation failed: ${result.error}`)
      }
    } catch (error) {
      addTestResult(`❌ Phrase creation error: ${error}`)
    }
    setLoading(false)
  }

  const testGetUserSessions = async () => {
    if (!user) {
      addTestResult('❌ No user logged in')
      return
    }

    setLoading(true)
    try {
      const result = await MCPService.getUserSessions(user.id)
      if (result.success) {
        addTestResult(`✅ Retrieved ${result.data?.length || 0} sessions`)
        setSessions(result.data || [])
      } else {
        addTestResult(`❌ Failed to get sessions: ${result.error}`)
      }
    } catch (error) {
      addTestResult(`❌ Get sessions error: ${error}`)
    }
    setLoading(false)
  }

  const testGetUserPhrases = async () => {
    if (!user) {
      addTestResult('❌ No user logged in')
      return
    }

    setLoading(true)
    try {
      const result = await MCPService.getUserPhrases(user.id)
      if (result.success) {
        addTestResult(`✅ Retrieved ${result.data?.length || 0} phrases`)
        setPhrases(result.data || [])
      } else {
        addTestResult(`❌ Failed to get phrases: ${result.error}`)
      }
    } catch (error) {
      addTestResult(`❌ Get phrases error: ${error}`)
    }
    setLoading(false)
  }

  const clearResults = () => {
    setTestResults([])
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <h2 className="text-xl font-bold text-black mb-4">MCP Service Test</h2>
        
        <div className="mb-4">
          <p className="text-sm text-black/60 mb-2">
            Current User: {user ? user.email : 'Not logged in'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button 
            onClick={testConnection} 
            disabled={loading}
            variant="primary" 
            size="sm"
          >
            Test Connection
          </Button>
          
          <Button 
            onClick={testCreateSession} 
            disabled={loading || !user}
            variant="secondary" 
            size="sm"
          >
            Create Session
          </Button>
          
          <Button 
            onClick={testCreatePhrase} 
            disabled={loading || !user}
            variant="secondary" 
            size="sm"
          >
            Create Phrase
          </Button>
          
          <Button 
            onClick={testGetUserSessions} 
            disabled={loading || !user}
            variant="outline" 
            size="sm"
          >
            Get Sessions
          </Button>
          
          <Button 
            onClick={testGetUserPhrases} 
            disabled={loading || !user}
            variant="outline" 
            size="sm"
          >
            Get Phrases
          </Button>
          
          <Button 
            onClick={clearResults} 
            variant="outline" 
            size="sm"
          >
            Clear Results
          </Button>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-black mb-2">Test Results:</h3>
          <div className="bg-black/5 rounded-lg p-3 max-h-48 overflow-y-auto">
            {testResults.length === 0 ? (
              <p className="text-black/60 text-sm">No tests run yet</p>
            ) : (
              testResults.map((result, index) => (
                <div key={index} className="text-sm font-mono mb-1">
                  {result}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-black mb-2">Sessions ({sessions.length})</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {sessions.map((session) => (
                <div key={session.id} className="text-xs bg-blue/10 p-2 rounded">
                  <p className="font-medium">Original: {session.original_text}</p>
                  <p className="text-black/60">Transformed: {session.transformed_text}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-black mb-2">Phrases ({phrases.length})</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {phrases.map((phrase) => (
                <div key={phrase.id} className="text-xs bg-blue/10 p-2 rounded">
                  <p className="font-medium">{phrase.phrase}</p>
                  <p className="text-black/60">{phrase.usage_example}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}