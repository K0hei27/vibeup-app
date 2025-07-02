'use client'

import React, { useState, useRef, useEffect } from 'react'
import { SupabaseService } from '@/lib/supabase-service'
import { auth } from '@/lib/supabase'
import { AuthUser } from '@/types'

interface KeyPhrase {
  phrase: string
  explanation: string
}

export default function VibeUpApp() {
  const [userInput, setUserInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [transformedText, setTransformedText] = useState("")
  const [keyPhrases, setKeyPhrases] = useState<KeyPhrase[]>([])
  const [isSaved, setIsSaved] = useState(false)
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null)
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [authEmail, setAuthEmail] = useState('')
  const [authPassword, setAuthPassword] = useState('')
  const [authLoading, setAuthLoading] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  // const [currentSession, setCurrentSession] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [showHistory, setShowHistory] = useState(false)
  const [sessionHistory, setSessionHistory] = useState<Array<Record<string, unknown>>>([])  
  const [isLoadingHistory, setIsLoadingHistory] = useState(false)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [isHydrated, setIsHydrated] = useState(false)
  const resultSectionRef = useRef<HTMLDivElement>(null)

  // Hydration effect
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // Authentication effect
  useEffect(() => {
    if (!isHydrated) return

    // Check current auth state safely
    auth.getCurrentUser()
      .then(setCurrentUser)
      .catch((error) => {
        console.log('No active session:', error.message)
        setCurrentUser(null)
      })
    
    // Listen for auth changes
    const { data: { subscription } } = auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session?.user?.id)
      if (session?.user) {
        setCurrentUser({
          id: session.user.id,
          email: session.user.email!
        })
      } else {
        setCurrentUser(null)
      }
    })
    
    return () => subscription.unsubscribe()
  }, [isHydrated])

  // const placeholderData = {
  //   transformedText: "I'm finding it challenging to adapt to the frequently shifting deadlines and would appreciate more consistency in our timeline planning.",
  //   keyPhrases: [
  //     { phrase: "finding it challenging", explanation: "Acknowledges difficulty without blame" },
  //     { phrase: "shifting deadlines", explanation: "Neutral way to describe changes" },
  //     { phrase: "would appreciate", explanation: "Constructive request approach" }
  //   ]
  // }

  const transformText = async () => {
    if (!userInput.trim()) {
      // Add shake animation for empty input
      const textarea = document.getElementById('userInput') as HTMLTextAreaElement
      if (textarea) {
        textarea.style.animation = 'shake 0.5s'
        setTimeout(() => {
          textarea.style.animation = ''
        }, 500)
      }
      return
    }

    setIsLoading(true)
    setShowResult(false)
    setIsSaved(false)
    setError(null)
    
    try {
      // Real AI transformation using Gemini API
      const response = await fetch('/api/transform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: userInput }),
      })

      if (!response.ok) {
        throw new Error('Failed to transform text')
      }

      const result = await response.json()
      
      setTransformedText(result.transformedText)
      setKeyPhrases(result.keyPhrases)
      
      // Save session to database if user is authenticated
      if (currentUser) {
        try {
          // Add a small delay to ensure auth state is properly synced
          await new Promise(resolve => setTimeout(resolve, 100))
          
          const session = await SupabaseService.createSession({
            user_id: currentUser.id,
            original_text: userInput,
            transformed_text: result.transformedText,
            key_phrases: result.keyPhrases
          })
          // setCurrentSession(session)
        } catch (error) {
          console.error('Failed to save session:', error)
          console.error('Current user context:', currentUser)
          console.error('Session data attempted:', {
            user_id: currentUser.id,
            original_text: userInput,
            transformed_text: result.transformedText,
            key_phrases: result.keyPhrases
          })
          // Continue with UI even if save fails
        }
      }
      
      setShowResult(true)
      setIsLoading(false)
      
      // Optional gentle scroll to result - user can still scroll freely
      setTimeout(() => {
        if (resultSectionRef.current) {
          const element = resultSectionRef.current
          const elementTop = element.getBoundingClientRect().top + window.pageYOffset
          const offset = 100 // Small offset to keep some context visible
          window.scrollTo({ 
            top: elementTop - offset, 
            behavior: 'smooth' 
          })
        }
      }, 300)
      
    } catch (error) {
      console.error('Transform error:', error)
      setIsLoading(false)
      setError('Sorry, something went wrong with the transformation. Please try again.')
      
      // Show error for 5 seconds then hide it
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  const saveSession = async () => {
    if (!currentUser) {
      setShowAuth(true)
      setAuthMode('login')
      setAuthEmail('')
      setAuthPassword('')
      setAuthError(null)
      return
    }

    setIsSaved(true)
    
    try {
      // Save each key phrase to the phrases table
      for (const keyPhrase of keyPhrases) {
        await SupabaseService.createPhrase({
          user_id: currentUser.id,
          phrase: keyPhrase.phrase,
          context: 'Communication improvement',
          usage_example: keyPhrase.explanation,
          learned_date: new Date().toISOString().split('T')[0]
        })
      }
      
      // Haptic feedback if available
      if (navigator.vibrate) {
        navigator.vibrate(50)
      }
      
    } catch (error) {
      console.error('Failed to save phrases:', error)
      console.error('Current user context:', currentUser)
      console.error('Key phrases attempted:', keyPhrases)
      // Could show error message to user
    }
    
    setTimeout(() => {
      setIsSaved(false)
    }, 2000)
  }

  const loadSessionHistory = async () => {
    if (!currentUser) return
    
    setIsLoadingHistory(true)
    try {
      const sessions = await SupabaseService.getUserSessions(currentUser.id, 20)
      setSessionHistory(sessions)
    } catch (error) {
      console.error('Failed to load session history:', error)
    } finally {
      setIsLoadingHistory(false)
    }
  }

  const toggleExpanded = (sessionId: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(sessionId)) {
      newExpanded.delete(sessionId)
    } else {
      newExpanded.add(sessionId)
    }
    setExpandedItems(newExpanded)
  }

  const handleAuth = async () => {
    if (!authEmail.trim() || !authPassword.trim()) {
      setAuthError('Please enter both email and password')
      return
    }

    console.log('Starting auth process:', authMode, authEmail)
    setAuthLoading(true)
    setAuthError(null)

    try {
      if (authMode === 'signup') {
        const { data, error } = await auth.signUp(authEmail, authPassword)
        if (error) throw error
        
        console.log('User signed up successfully:', data)
        
        // Check if user needs email confirmation
        if (data?.user && !data?.session) {
          setAuthError('Please check your email to confirm your account, then try signing in.')
          setAuthMode('login') // Switch to login mode
          return
        }
        
        // Manually update current user state for immediate UI feedback
        if (data?.user) {
          const newUser = {
            id: data.user.id,
            email: data.user.email!
          }
          console.log('Setting current user:', newUser)
          setCurrentUser(newUser)
          
          // Ensure user record exists in public.users table
          try {
            await SupabaseService.createUser({
              id: data.user.id,
              email: data.user.email!,
              preferences: {},
              streak_count: 0
            })
            console.log('User record created/updated in public.users')
          } catch (userError) {
            console.log('User record might already exist:', userError)
          }
        }
      } else {
        const { data, error } = await auth.signIn(authEmail, authPassword)
        if (error) throw error
        console.log('User signed in successfully:', data)
        
        // Manually update current user state for immediate UI feedback
        if (data?.user) {
          const newUser = {
            id: data.user.id,
            email: data.user.email!
          }
          console.log('Setting current user:', newUser)
          setCurrentUser(newUser)
          
          // Ensure user record exists in public.users table
          try {
            await SupabaseService.createUser({
              id: data.user.id,
              email: data.user.email!,
              preferences: {},
              streak_count: 0
            })
            console.log('User record created/updated in public.users')
          } catch (userError) {
            console.log('User record might already exist:', userError)
          }
        }
      }
      
      // Reset form and close modal
      setAuthEmail('')
      setAuthPassword('')
      setShowAuth(false)
    } catch (error: unknown) {
      console.error('Auth error:', error)
      
      // Provide better error messages
      let errorMessage = 'Authentication failed'
      
      if (error) {
        if (typeof error === 'string') {
          errorMessage = error
        } else if (error && typeof error === 'object' && 'message' in error) {
          const message = (error as { message: string }).message
          if (message.includes('Invalid login credentials')) {
            errorMessage = 'Invalid email or password'
          } else if (message.includes('User already registered')) {
            errorMessage = 'Account already exists. Try signing in instead.'
            setAuthMode('login')
          } else if (message.includes('Email not confirmed')) {
            errorMessage = 'Please confirm your email address first'
          } else if (message.includes('signup disabled')) {
            errorMessage = 'Account creation is currently disabled'
          } else {
            errorMessage = message
          }
        }
      }
      
      setAuthError(errorMessage)
    } finally {
      setAuthLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await auth.signOut()
      setCurrentUser(null)
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <div className="mobile-app">
      {/* Top Navigation Bar */}
      <div className="top-nav">
        <div className="nav-left">
          {isHydrated && currentUser && (
            <button 
              className="history-button"
              onClick={() => {
                setShowHistory(true)
                loadSessionHistory()
              }}
              title="View History"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
            </button>
          )}
        </div>
        <div className="nav-right">
          <div className="user-status">
            {!isHydrated ? (
              <span>•••</span>
            ) : currentUser ? (
              <button 
                className="sign-in-status logged-in"
                onClick={handleSignOut}
                title="Click to sign out"
              >
                {currentUser.id.slice(0, 8)}
              </button>
            ) : (
              <button 
                className="sign-in-status"
                onClick={() => {
                  setShowAuth(true)
                  setAuthMode('login')
                  setAuthEmail('')
                  setAuthPassword('')
                  setAuthError(null)
                }}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="app-container">
        {/* Main Header Section */}
        <div className="main-header">
          <div className="app-branding">
            <img 
              src="/app-icon-title.svg" 
              alt="VibeUp" 
              className="app-icon-title"
            />
          </div>
          <p className="app-subtitle">Express yourself with the perfect vibe</p>
          <div className="context-pill">Casual • Thoughtful • Natural</div>
        </div>

        <div className="input-section">
              <div className="input-label">What&apos;s on your mind? 💭</div>
              <textarea 
                className="input-textarea"
                id="userInput"
                placeholder="Share your thoughts, feelings, or what you want to express..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
            </div>

            <button 
              className={`transform-button ${isLoading ? 'loading' : ''}`}
              onClick={transformText}
              disabled={isLoading}
            >
              {isLoading ? 'Finding your perfect vibe...' : 'Vibe It Up ✨'}
            </button>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {showResult && (
              <div 
                ref={resultSectionRef}
                className={`result-section ${showResult ? 'show' : ''}`}
              >
                <div className="result-title">
                  🌟 Natural Expression
                </div>
                <div className="professional-text">
                  {transformedText}
                </div>
                
                <div className={`key-phrases ${showResult ? 'show' : ''}`}>
                  <div className="phrases-title">Key Natural Phrases</div>
                  {keyPhrases.map((phrase, index) => (
                    <div 
                      key={index}
                      className="phrase-card"
                      style={{ animationDelay: `${0.5 + index * 0.2}s` }}
                    >
                      &quot;{phrase.phrase}&quot; - {phrase.explanation}
                    </div>
                  ))}
                </div>

                <button 
                  className={`save-button ${showResult ? 'show' : ''} ${isSaved ? 'saved' : ''}`}
                  onClick={saveSession}
                >
                  {isSaved ? 'Vibed Up! 🎉' : 'Save to My Collection 🎯'}
                </button>
              </div>
            )}
          </div>

        {/* Authentication Modal */}
        {showAuth && (
          <div className="auth-modal-overlay" onClick={() => setShowAuth(false)}>
            <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
              <h3 className="auth-title">
                {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h3>
              <p className="auth-subtitle">
                {authMode === 'login' 
                  ? 'Sign in to access your saved phrases' 
                  : 'Start saving your communication progress'}
              </p>
              
              {authError && (
                <div className="auth-error">
                  {authError}
                </div>
              )}
              
              <div className="auth-form">
                <input
                  type="email"
                  placeholder="Email"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="auth-input"
                  disabled={authLoading}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  className="auth-input"
                  disabled={authLoading}
                />
                
                <button 
                  className="auth-button primary"
                  onClick={handleAuth}
                  disabled={authLoading}
                >
                  {authLoading ? 'Loading...' : (authMode === 'login' ? 'Sign In' : 'Sign Up')}
                </button>
              </div>
              
              <div className="auth-switch">
                {authMode === 'login' ? (
                  <span>
                    Don&apos;t have an account?{' '}
                    <button 
                      className="auth-link" 
                      onClick={() => {
                        setAuthMode('signup')
                        setAuthError(null)
                      }}
                    >
                      Sign up
                    </button>
                  </span>
                ) : (
                  <span>
                    Already have an account?{' '}
                    <button 
                      className="auth-link" 
                      onClick={() => {
                        setAuthMode('login')
                        setAuthError(null)
                      }}
                    >
                      Sign in
                    </button>
                  </span>
                )}
              </div>
              
              <button 
                className="auth-button close"
                onClick={() => setShowAuth(false)}
              >
                Maybe Later
              </button>
            </div>
          </div>
        )}

        {/* History Modal */}
        {showHistory && (
          <div className="history-modal-overlay" onClick={() => setShowHistory(false)}>
            <div className="history-modal" onClick={(e) => e.stopPropagation()}>
              <div className="history-header">
                <div className="header-content">
                  <h3 className="history-title">My Collections</h3>
                  {sessionHistory.length > 0 && (
                    <div className="progress-indicator">
                      📚 {sessionHistory.length} sessions • 🎯 {sessionHistory.reduce((total, session) => total + (session.key_phrases?.length || 0), 0)} phrases learned
                    </div>
                  )}
                </div>
                <button 
                  className="close-button"
                  onClick={() => setShowHistory(false)}
                >
                  ✕
                </button>
              </div>
              
              <div className="history-content">
                {isLoadingHistory ? (
                  <div className="loading-state">Loading your collections...</div>
                ) : sessionHistory.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">📝</div>
                    <div className="empty-message">No collections yet</div>
                    <div className="empty-submessage">Start transforming thoughts to build your collection!</div>
                  </div>
                ) : (
                  sessionHistory.map((session) => {
                    const isExpanded = expandedItems.has(session.id)
                    const phraseCount = session.key_phrases?.length || 0
                    
                    return (
                      <div key={session.id} className={`collection-item ${isExpanded ? 'expanded' : ''}`}>
                        {/* Compact Header - Always Visible */}
                        <div 
                          className="collection-header" 
                          onClick={() => toggleExpanded(session.id)}
                        >
                          <div className="collection-summary">
                            <div className="transformed-preview">
                              &quot;{session.transformed_text?.slice(0, 60)}...&quot;
                            </div>
                            <div className="collection-meta">
                              {new Date(session.created_at).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric', 
                                year: 'numeric' 
                              })} • {phraseCount} phrases
                            </div>
                          </div>
                          <div className="expand-icon">
                            {isExpanded ? '▲' : '▼'}
                          </div>
                        </div>

                        {/* Expanded Content - Only When Expanded */}
                        {isExpanded && (
                          <div className="collection-details">
                            <div className="collection-section">
                              <div className="section-label">💭 Original:</div>
                              <div className="original-text">&quot;{session.original_text}&quot;</div>
                            </div>
                            
                            <div className="collection-section">
                              <div className="section-label">✨ Transformed:</div>
                              <div className="transformed-text">{session.transformed_text}</div>
                            </div>
                            
                            {session.key_phrases && session.key_phrases.length > 0 && (
                              <div className="collection-section">
                                <div className="section-label">🎯 Key Phrases ({session.key_phrases.length}):</div>
                                <div className="phrases-list">
                                  {session.key_phrases.map((phrase, index) => (
                                    <div key={index} className="phrase-item" onClick={() => {
                                      // Highlight phrase when clicked
                                      const phraseElement = document.querySelector(`[data-phrase="${session.id}-${index}"]`);
                                      if (phraseElement) {
                                        phraseElement.classList.add('phrase-highlighted');
                                        setTimeout(() => phraseElement.classList.remove('phrase-highlighted'), 1500);
                                      }
                                    }}>
                                      <div className="phrase-text" data-phrase={`${session.id}-${index}`}>• &quot;{phrase.phrase}&quot;</div>
                                      <div className="phrase-explanation">→ {phrase.explanation}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          </div>
        )}
        
        <style jsx>{`
        .mobile-app {
          min-height: 100vh;
          min-height: 100dvh; /* Dynamic viewport height for mobile */
          width: 100vw;
          background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);
          position: relative;
          display: flex;
          flex-direction: column;
          overflow-x: hidden;
          font-family: var(--font-inter), 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* Top Navigation Bar */
        .top-nav {
          background: #ffffff;
          padding: calc(env(safe-area-inset-top, 20px) + 12px) 20px 12px 20px;
          border-bottom: 1px solid #f4f4f5;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 100;
          min-height: 56px;
        }

        .nav-left {
          display: flex;
          align-items: center;
        }

        .nav-right {
          display: flex;
          align-items: center;
        }

        /* Main Header Section */
        .main-header {
          text-align: center;
          padding: 32px 20px 40px 20px;
        }

        .app-branding {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          width: 100%;
        }

        .app-icon-title {
          height: 60px;
          width: auto;
          object-fit: contain;
        }

        .user-status {
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 4px;
          position: relative;
        }

        .sign-in-status {
          background: none;
          border: none;
          font-size: 14px;
          color: #1d1d1f;
          cursor: pointer;
          font-weight: 600;
          transition: opacity 0.2s ease;
        }

        .sign-in-status:hover {
          opacity: 0.7;
        }

        .sign-in-status.logged-in {
          background: linear-gradient(135deg, #0891b2 0%, #0e7490 100%);
          color: white;
          padding: 6px 14px;
          border-radius: 14px;
          font-weight: 700;
          letter-spacing: 0.5px;
          box-shadow: 0 2px 8px rgba(8, 145, 178, 0.25);
          min-height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sign-in-status.logged-in:hover {
          opacity: 0.9;
          transform: scale(0.98);
        }

        .app-container {
          flex: 1;
          padding: 24px;
          overflow-y: auto;
          background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);
          position: relative;
          min-height: 0;
          padding-bottom: env(safe-area-inset-bottom, 24px);
        }

        .app-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.02) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(0, 0, 0, 0.02) 0%, transparent 50%);
          pointer-events: none;
        }



        .app-subtitle {
          font-size: 17px;
          color: #52525b;
          font-weight: 500;
          line-height: 1.4;
          margin: 0 0 24px 0;
          padding: 0;
        }

        .context-pill {
          background: linear-gradient(135deg, #f4f4f5 0%, #e4e4e7 100%);
          color: #18181b;
          border: 1px solid #d4d4d8;
          padding: 10px 18px;
          border-radius: 25px;
          font-size: 14px;
          font-weight: 600;
          display: inline-block;
          letter-spacing: 0.01em;
          margin: 0;
        }

        .input-section {
          margin-bottom: 24px;
        }

        .input-label {
          font-size: 18px;
          font-weight: 700;
          color: #09090b;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
        }

        .input-textarea {
          width: 100%;
          min-height: 120px;
          padding: 16px;
          border: 2px solid #e4e4e7;
          border-radius: 16px;
          font-size: 16px;
          font-family: var(--font-inter), 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          resize: none;
          background: #ffffff;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          line-height: 1.5;
          letter-spacing: -0.01em;
        }

        .input-textarea:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
          background: #fffffe;
          transform: translateY(-1px);
        }

        .input-textarea::placeholder {
          color: #a1a1aa;
          font-weight: 400;
        }

        .transform-button {
          width: 100%;
          background: linear-gradient(135deg, #000000 0%, #18181b 100%);
          color: white;
          border: none;
          padding: 16px;
          border-radius: 16px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          margin-bottom: 24px;
          position: relative;
          overflow: hidden;
          letter-spacing: -0.01em;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
          min-height: 48px;
        }

        .transform-button:active {
          transform: scale(0.98);
        }

        .transform-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
        }

        .transform-button.loading {
          background: linear-gradient(135deg, #71717a 0%, #52525b 100%);
          animation: pulse 1.5s infinite;
          box-shadow: 0 6px 20px rgba(113, 113, 122, 0.25);
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInPhrase {
          from {
            transform: translateX(-15px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-3px); }
          75% { transform: translateX(3px); }
        }

        .result-section {
          background: #ffffff;
          border-radius: 24px;
          padding: 28px;
          margin-bottom: 24px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          border: 1px solid #f4f4f5;
          animation: slideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
        }

        .result-section.show {
          opacity: 1;
        }

        .result-title {
          font-size: 20px;
          font-weight: 700;
          color: #09090b;
          margin-bottom: 18px;
          display: flex;
          align-items: center;
          gap: 10px;
          letter-spacing: -0.02em;
        }

        .professional-text {
          font-size: 17px;
          line-height: 1.6;
          color: #18181b;
          background: linear-gradient(135deg, #f9fafb 0%, #f4f4f5 100%);
          padding: 20px;
          border-radius: 16px;
          border-left: 4px solid #3b82f6;
          margin-bottom: 24px;
          font-weight: 500;
          animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s both;
          letter-spacing: -0.01em;
        }

        .key-phrases {
          animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both;
          opacity: 0;
        }

        .key-phrases.show {
          opacity: 1;
        }

        .phrases-title {
          font-size: 18px;
          font-weight: 700;
          color: #09090b;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
        }

        .phrase-card {
          background: linear-gradient(135deg, #f9fafb 0%, #f4f4f5 100%);
          color: #27272a;
          border: 1.5px solid #e4e4e7;
          padding: 16px 18px;
          border-radius: 16px;
          margin-bottom: 10px;
          font-size: 16px;
          font-weight: 600;
          transform: translateX(-15px);
          opacity: 0;
          animation: slideInPhrase 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          letter-spacing: -0.01em;
        }

        .save-button {
          width: 100%;
          background: linear-gradient(135deg, #0891b2 0%, #0e7490 100%);
          color: white;
          border: none;
          padding: 16px;
          border-radius: 18px;
          font-size: 17px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 1.1s both;
          opacity: 0;
          letter-spacing: -0.01em;
          box-shadow: 0 6px 20px rgba(8, 145, 178, 0.25);
        }

        .save-button.show {
          opacity: 1;
        }

        .save-button:active {
          transform: scale(0.98);
        }

        .save-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 25px rgba(8, 145, 178, 0.35);
        }

        .save-button.saved {
          background: linear-gradient(135deg, #0e7490 0%, #155e75 100%);
          transform: scale(1.01);
        }

        .error-message {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
          padding: 16px 20px;
          border-radius: 16px;
          margin-bottom: 24px;
          font-size: 16px;
          font-weight: 500;
          text-align: center;
          animation: slideIn 0.3s ease-out;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.25);
        }


        .auth-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }

        .auth-modal {
          background: white;
          border-radius: 24px;
          padding: 32px 28px;
          width: min(90vw, 400px);
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          animation: modalSlideIn 0.3s ease-out;
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .auth-title {
          font-size: 22px;
          font-weight: 700;
          color: #09090b;
          text-align: center;
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }

        .auth-subtitle {
          font-size: 16px;
          color: #52525b;
          text-align: center;
          margin-bottom: 24px;
          line-height: 1.4;
        }

        .auth-button {
          width: 100%;
          padding: 16px;
          border-radius: 16px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          margin-bottom: 12px;
        }

        .auth-button.guest {
          background: linear-gradient(135deg, #000000 0%, #18181b 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .auth-button.guest:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
        }

        .auth-button.close {
          background: #f4f4f5;
          color: #52525b;
          border: 1px solid #e4e4e7;
        }

        .auth-button.close:hover {
          background: #e4e4e7;
        }

        .auth-divider {
          text-align: center;
          color: #a1a1aa;
          font-size: 14px;
          margin: 16px 0;
          position: relative;
        }

        .auth-divider::before,
        .auth-divider::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 40%;
          height: 1px;
          background: #e4e4e7;
        }

        .auth-divider::before {
          left: 0;
        }

        .auth-divider::after {
          right: 0;
        }

        .auth-note {
          font-size: 14px;
          color: #71717a;
          text-align: center;
          margin-bottom: 16px;
          line-height: 1.4;
        }

        .auth-error {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 14px;
          margin-bottom: 16px;
          text-align: center;
        }

        .auth-form {
          margin-bottom: 20px;
        }

        .auth-input {
          width: 100%;
          padding: 16px;
          border: 2px solid #e4e4e7;
          border-radius: 12px;
          font-size: 16px;
          margin-bottom: 12px;
          transition: border-color 0.2s ease;
          font-family: inherit;
        }

        .auth-input:focus {
          outline: none;
          border-color: #3b82f6;
        }

        .auth-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .auth-button.primary {
          background: linear-gradient(135deg, #000000 0%, #18181b 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .auth-button.primary:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
        }

        .auth-button.primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .auth-switch {
          text-align: center;
          margin-bottom: 16px;
          font-size: 14px;
          color: #71717a;
        }

        .auth-link {
          background: none;
          border: none;
          color: #3b82f6;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          font-size: inherit;
        }

        .auth-link:hover {
          text-decoration: underline;
        }

        .header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          position: relative;
        }

        .app-title {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          margin: 0;
        }

        .header-spacer {
          width: 40px;
          height: 40px;
        }

        .history-button {
          background: rgba(0, 0, 0, 0.05);
          border: none;
          border-radius: 12px;
          width: 40px;
          height: 40px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #52525b;
        }

        .history-button:hover {
          background: rgba(0, 0, 0, 0.1);
          transform: scale(1.05);
        }

        .history-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }

        .history-modal {
          background: white;
          border-radius: 24px;
          width: min(90vw, 400px);
          height: min(80vh, 600px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          animation: modalSlideIn 0.3s ease-out;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .history-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 24px 24px 20px 24px;
          border-bottom: 1px solid #f4f4f5;
          flex-shrink: 0;
        }

        .header-content {
          flex: 1;
        }

        .history-title {
          font-size: 20px;
          font-weight: 700;
          color: #09090b;
          margin: 0;
        }

        .progress-indicator {
          font-size: 12px;
          color: #71717a;
          margin-top: 8px;
          font-weight: 500;
          background: #f9fafb;
          padding: 6px 12px;
          border-radius: 12px;
          display: inline-block;
        }

        .close-button {
          background: #f4f4f5;
          border: none;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #71717a;
        }

        .close-button:hover {
          background: #e4e4e7;
          color: #52525b;
        }

        .history-content {
          padding: 16px 24px 24px 24px;
          flex: 1;
          overflow-y: auto;
          min-height: 0;
        }

        .loading-state {
          text-align: center;
          padding: 40px 20px;
          color: #71717a;
          font-size: 16px;
        }

        .empty-state {
          text-align: center;
          padding: 40px 20px;
        }

        .empty-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .empty-message {
          font-size: 18px;
          font-weight: 600;
          color: #09090b;
          margin-bottom: 8px;
        }

        .empty-submessage {
          font-size: 14px;
          color: #71717a;
          line-height: 1.4;
        }

        .collection-item {
          background: #ffffff;
          border-radius: 16px;
          margin-bottom: 12px;
          border: 1px solid #e4e4e7;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .collection-item:hover {
          border-color: #d4d4d8;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
        }

        .collection-item.expanded {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .collection-header {
          padding: 16px 20px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background 0.2s ease;
        }

        .collection-header:hover {
          background: #fafafa;
        }

        .collection-summary {
          flex: 1;
        }

        .transformed-preview {
          font-size: 15px;
          color: #09090b;
          font-weight: 500;
          margin-bottom: 6px;
          line-height: 1.4;
        }

        .collection-meta {
          font-size: 12px;
          color: #71717a;
          font-weight: 500;
        }

        .expand-icon {
          color: #71717a;
          font-size: 12px;
          margin-left: 12px;
          transition: transform 0.2s ease;
        }

        .collection-item.expanded .expand-icon {
          transform: rotate(0deg);
        }

        .collection-details {
          padding: 0 20px 20px 20px;
          border-top: 1px solid #f4f4f5;
          background: #fafafa;
          animation: slideDown 0.3s ease-out;
          overflow: hidden;
        }

        .collection-section {
          margin-bottom: 20px;
        }

        .collection-section:last-child {
          margin-bottom: 0;
        }

        .section-label {
          font-size: 14px;
          font-weight: 700;
          color: #52525b;
          margin-bottom: 8px;
          letter-spacing: -0.01em;
        }

        .original-text {
          font-size: 15px;
          color: #71717a;
          font-style: italic;
          line-height: 1.5;
          background: #f9fafb;
          padding: 12px 16px;
          border-radius: 12px;
          border-left: 3px solid #e4e4e7;
        }

        .transformed-text {
          font-size: 15px;
          color: #09090b;
          font-weight: 500;
          line-height: 1.5;
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          padding: 12px 16px;
          border-radius: 12px;
          border-left: 3px solid #0891b2;
        }

        .phrases-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .phrase-item {
          background: #fafafa;
          border-radius: 12px;
          padding: 12px 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid #f4f4f5;
        }

        .phrase-item:hover {
          background: #f4f4f5;
          border-color: #e4e4e7;
          transform: translateX(4px);
        }

        .phrase-text {
          font-size: 14px;
          font-weight: 600;
          color: #18181b;
          margin-bottom: 4px;
        }

        .phrase-explanation {
          font-size: 13px;
          color: #71717a;
          font-style: italic;
        }

        .phrase-highlighted {
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%) !important;
          border-color: #f59e0b !important;
          transform: scale(1.02) !important;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            max-height: 600px;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 1;
            max-height: 600px;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            max-height: 0;
            transform: translateY(-8px);
          }
        }

        .collection-item:not(.expanded) .collection-details {
          animation: slideUp 0.2s ease-in;
        }
      `}</style>
    </div>
  )
}