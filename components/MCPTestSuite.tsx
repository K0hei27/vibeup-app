'use client'

import { useState } from 'react'
import { MCPClient } from '@/lib/mcp-client'
import { UserInsert, SessionInsert, PhraseInsert } from '@/types'

export default function MCPTestSuite() {
  const [results, setResults] = useState<Array<{ test: string; status: 'pending' | 'success' | 'error'; message: string }>>([])
  const [isRunning, setIsRunning] = useState(false)

  const addResult = (test: string, status: 'success' | 'error', message: string) => {
    setResults(prev => [...prev, { test, status, message }])
  }

  const runAllTests = async () => {
    setIsRunning(true)
    setResults([])

    try {
      // Test 1: Connection Test
      addResult('Connection Test', 'pending', 'Testing MCP connection...')
      const connectionResult = await MCPClient.testConnection()
      addResult('Connection Test', connectionResult.success ? 'success' : 'error', 
        connectionResult.success ? 'Connection successful' : connectionResult.error || 'Connection failed')

      // Test 2: User CRUD Operations
      const testUserId = crypto.randomUUID()
      const testUserData: UserInsert = {
        id: testUserId,
        email: 'test@example.com',
        preferences: { theme: 'dark' },
        streak_count: 5
      }

      // Create User
      addResult('Create User', 'pending', 'Creating test user...')
      const createUserResult = await MCPClient.createUser(testUserData)
      addResult('Create User', createUserResult.success ? 'success' : 'error',
        createUserResult.success ? `User created with ID: ${createUserResult.data?.id}` : createUserResult.error || 'Failed to create user')

      if (createUserResult.success) {
        // Read User
        addResult('Read User', 'pending', 'Reading test user...')
        const readUserResult = await MCPClient.getUserById(testUserId)
        addResult('Read User', readUserResult.success ? 'success' : 'error',
          readUserResult.success ? `User found: ${readUserResult.data?.email}` : readUserResult.error || 'Failed to read user')

        // Update User
        addResult('Update User', 'pending', 'Updating test user...')
        const updateUserResult = await MCPClient.updateUser(testUserId, { streak_count: 10 })
        addResult('Update User', updateUserResult.success ? 'success' : 'error',
          updateUserResult.success ? `User updated, new streak: ${updateUserResult.data?.streak_count}` : updateUserResult.error || 'Failed to update user')
      }

      // Test 3: Session CRUD Operations
      const testSessionData: SessionInsert = {
        user_id: testUserId,
        original_text: 'I am feeling frustrated',
        transformed_text: 'I am experiencing some challenges',
        key_phrases: [
          { phrase: 'experiencing challenges', explanation: 'More professional way to express frustration', usage_example: 'I am experiencing some challenges with this project' }
        ]
      }

      addResult('Create Session', 'pending', 'Creating test session...')
      const createSessionResult = await MCPClient.createSession(testSessionData)
      addResult('Create Session', createSessionResult.success ? 'success' : 'error',
        createSessionResult.success ? `Session created with ID: ${createSessionResult.data?.id}` : createSessionResult.error || 'Failed to create session')

      if (createSessionResult.success) {
        // Get User Sessions
        addResult('Get User Sessions', 'pending', 'Getting user sessions...')
        const getUserSessionsResult = await MCPClient.getUserSessions(testUserId)
        addResult('Get User Sessions', getUserSessionsResult.success ? 'success' : 'error',
          getUserSessionsResult.success ? `Found ${getUserSessionsResult.data?.length} sessions` : getUserSessionsResult.error || 'Failed to get user sessions')

        // Delete Session
        addResult('Delete Session', 'pending', 'Deleting test session...')
        const deleteSessionResult = await MCPClient.deleteSession(createSessionResult.data!.id)
        addResult('Delete Session', deleteSessionResult.success ? 'success' : 'error',
          deleteSessionResult.success ? 'Session deleted successfully' : deleteSessionResult.error || 'Failed to delete session')
      }

      // Test 4: Phrase CRUD Operations
      const testPhraseData: PhraseInsert = {
        user_id: testUserId,
        phrase: 'experiencing challenges',
        context: 'professional communication',
        usage_example: 'I am experiencing some challenges with this project',
        learned_date: new Date().toISOString().split('T')[0]
      }

      addResult('Create Phrase', 'pending', 'Creating test phrase...')
      const createPhraseResult = await MCPClient.createPhrase(testPhraseData)
      addResult('Create Phrase', createPhraseResult.success ? 'success' : 'error',
        createPhraseResult.success ? `Phrase created with ID: ${createPhraseResult.data?.id}` : createPhraseResult.error || 'Failed to create phrase')

      if (createPhraseResult.success) {
        // Get User Phrases
        addResult('Get User Phrases', 'pending', 'Getting user phrases...')
        const getUserPhrasesResult = await MCPClient.getUserPhrases(testUserId)
        addResult('Get User Phrases', getUserPhrasesResult.success ? 'success' : 'error',
          getUserPhrasesResult.success ? `Found ${getUserPhrasesResult.data?.length} phrases` : getUserPhrasesResult.error || 'Failed to get user phrases')

        // Update Phrase
        addResult('Update Phrase', 'pending', 'Updating test phrase...')
        const updatePhraseResult = await MCPClient.updatePhrase(createPhraseResult.data!.id, { context: 'updated context' })
        addResult('Update Phrase', updatePhraseResult.success ? 'success' : 'error',
          updatePhraseResult.success ? 'Phrase updated successfully' : updatePhraseResult.error || 'Failed to update phrase')

        // Delete Phrase
        addResult('Delete Phrase', 'pending', 'Deleting test phrase...')
        const deletePhraseResult = await MCPClient.deletePhrase(createPhraseResult.data!.id)
        addResult('Delete Phrase', deletePhraseResult.success ? 'success' : 'error',
          deletePhraseResult.success ? 'Phrase deleted successfully' : deletePhraseResult.error || 'Failed to delete phrase')
      }

    } catch (error) {
      addResult('Test Suite', 'error', `Unexpected error: ${(error as Error).message}`)
    } finally {
      setIsRunning(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600'
      case 'error': return 'text-red-600'
      case 'pending': return 'text-yellow-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return '✅'
      case 'error': return '❌'
      case 'pending': return '⏳'
      default: return '⚪'
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">MCP Integration Test Suite</h1>
        
        <div className="mb-6">
          <button
            onClick={runAllTests}
            disabled={isRunning}
            className={`px-6 py-2 rounded-lg font-medium ${
              isRunning 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isRunning ? 'Running Tests...' : 'Run All Tests'}
          </button>
        </div>

        <div className="space-y-3">
          {results.map((result, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
              <span className="text-xl">{getStatusIcon(result.status)}</span>
              <div className="flex-1">
                <div className="font-medium text-gray-900">{result.test}</div>
                <div className={`text-sm ${getStatusColor(result.status)}`}>
                  {result.message}
                </div>
              </div>
            </div>
          ))}
        </div>

        {results.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            Click &quot;Run All Tests&quot; to start testing the MCP integration
          </div>
        )}

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">Test Coverage:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• MCP Connection Test</li>
            <li>• User CRUD Operations (Create, Read, Update)</li>
            <li>• Session CRUD Operations (Create, Read, Delete)</li>
            <li>• Phrase CRUD Operations (Create, Read, Update, Delete)</li>
            <li>• Error Handling and Validation</li>
          </ul>
        </div>
      </div>
    </div>
  )
}