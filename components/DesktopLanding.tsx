'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DesktopLanding() {
  const [demoStep, setDemoStep] = useState(0)
  const [showOutput, setShowOutput] = useState(false)
  const [showPhrases, setShowPhrases] = useState(false)
  const [currentExample, setCurrentExample] = useState(0)
  const router = useRouter()

  const examples = [
    {
      input: "I'm super annoyed my boss keeps changing stuff",
      output: "I'd appreciate more consistency in our project timeline to help me deliver my best work",
      phrases: [
        '"appreciate more consistency" - Constructive request',
        '"project timeline" - Professional framing', 
        '"deliver my best work" - Shows commitment'
      ]
    },
    {
      input: "This meeting is such a waste of time",
      output: "I think we could make our meetings more focused and actionable for everyone's benefit",
      phrases: [
        '"more focused and actionable" - Solution-oriented',
        '"everyone\'s benefit" - Collaborative approach',
        '"I think we could" - Diplomatic suggestion'
      ]
    },
    {
      input: "My coworker is being really annoying",
      output: "I'm having some challenges collaborating effectively with my teammate",
      phrases: [
        '"challenges collaborating" - Professional terminology',
        '"effectively" - Focus on outcomes',
        '"teammate" - Respectful language'
      ]
    }
  ]

  const handleTransformation = () => {
    if (demoStep === 0) {
      setShowOutput(false)
      setShowPhrases(false)
      
      setTimeout(() => {
        setShowOutput(true)
        setTimeout(() => {
          setShowPhrases(true)
          setDemoStep(1)
        }, 800)
      }, 1500)
    } else {
      setShowOutput(false)
      setShowPhrases(false)
      setCurrentExample((prev) => (prev + 1) % examples.length)
      
      setTimeout(() => {
        setShowOutput(true)
        setTimeout(() => {
          setShowPhrases(true)
        }, 800)
      }, 500)
    }
  }

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
      backgroundColor: '#ffffff',
      color: '#1a1a1a',
      lineHeight: '1.6',
      margin: 0,
      padding: 0
    }}>
      {/* Desktop Header - Fixed at top */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #e5e7eb',
        zIndex: 1000,
        padding: '20px 0'
      }}>
        <nav style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 48px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <img 
            src="/app-icon-title.svg" 
            alt="VibeUp" 
            style={{ height: '40px', width: 'auto' }}
          />
          <button 
            onClick={() => router.push('/app')}
            style={{
              background: 'linear-gradient(135deg, #000000 0%, #18181b 100%)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '16px'
            }}
          >
            Try VibeUp Free
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main style={{ marginTop: '100px' }}>
        
        {/* Hero Section */}
        <section style={{
          padding: '80px 48px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 5rem)',
            fontWeight: '800',
            lineHeight: '1.1',
            marginBottom: '32px',
            background: 'linear-gradient(135deg, #000000 0%, #18181b 50%, #3b82f6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.03em'
          }}>
            Communication Training<br />
            <span style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Like Duolingo</span>
          </h1>
          <p style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
            color: '#666',
            marginBottom: '48px',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            fontWeight: '500'
          }}>
            Transform messy thoughts into natural expressions. Build better communication habits daily.
          </p>
          <button 
            onClick={() => {
              document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })
            }}
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              color: 'white',
              border: 'none',
              padding: '20px 40px',
              borderRadius: '16px',
              fontSize: '18px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            See How It Works ✨
          </button>
        </section>

        {/* Demo Section */}
        <section id="demo" style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
          padding: '80px 48px'
        }}>
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <div style={{ marginBottom: '64px' }}>
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                marginBottom: '16px',
                color: '#1a1a1a'
              }}>
                Watch Your Words Transform
              </h2>
              <p style={{
                fontSize: '1.2rem',
                color: '#666'
              }}>
                See how VibeUp turns everyday thoughts into professional communication
              </p>
            </div>
            
            <div style={{
              backgroundColor: 'white',
              borderRadius: '24px',
              padding: '48px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              marginBottom: '32px',
              border: '1px solid #f0f0f0'
            }}>
              <div style={{
                backgroundColor: '#f8fafc',
                border: '2px solid #e2e8f0',
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '24px',
                fontSize: '18px',
                color: '#666',
                fontStyle: 'italic'
              }}>
                "{examples[currentExample].input}"
              </div>
              
              <div style={{
                fontSize: '2rem',
                color: '#3b82f6',
                margin: '20px 0',
                animation: 'bounce 2s infinite'
              }}>
                ↓
              </div>
              
              {showOutput && (
                <div style={{
                  background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                  border: '2px solid #3b82f6',
                  borderRadius: '16px',
                  padding: '24px',
                  marginBottom: '24px',
                  fontSize: '18px',
                  color: '#1a1a1a',
                  fontWeight: '500',
                  transition: 'opacity 0.5s ease'
                }}>
                  "{examples[currentExample].output}"
                </div>
              )}
              
              {showPhrases && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '16px',
                  marginTop: '32px',
                  transition: 'opacity 0.5s ease'
                }}>
                  {examples[currentExample].phrases.map((phrase, index) => (
                    <div key={index} style={{
                      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                      color: 'white',
                      padding: '16px 20px',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: '600',
                      textAlign: 'center'
                    }}>
                      {phrase}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <button 
              onClick={handleTransformation}
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                color: 'white',
                border: 'none',
                padding: '20px 40px',
                borderRadius: '16px',
                fontSize: '18px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {demoStep === 0 ? 'Try Transformation ✨' : 'Try Another Example ✨'}
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section style={{
          padding: '80px 48px',
          backgroundColor: 'white',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '64px',
            color: '#1a1a1a'
          }}>
            Why Professionals Choose VibeUp
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '48px'
          }}>
            <div style={{
              textAlign: 'center',
              padding: '40px 24px',
              borderRadius: '20px',
              backgroundColor: 'white',
              border: '1px solid #f0f0f0',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                fontSize: '28px'
              }}>
                🧠
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '16px',
                color: '#1a1a1a'
              }}>
                Smart Transform
              </h3>
              <p style={{
                color: '#666',
                fontSize: '1rem',
                lineHeight: '1.6'
              }}>
                AI turns your raw thoughts into polished communication
              </p>
            </div>
            
            <div style={{
              textAlign: 'center',
              padding: '40px 24px',
              borderRadius: '20px',
              backgroundColor: 'white',
              border: '1px solid #f0f0f0',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                fontSize: '28px'
              }}>
                📚
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '16px',
                color: '#1a1a1a'
              }}>
                Learn Phrases
              </h3>
              <p style={{
                color: '#666',
                fontSize: '1rem',
                lineHeight: '1.6'
              }}>
                Build vocabulary with explanations for each transformation
              </p>
            </div>
            
            <div style={{
              textAlign: 'center',
              padding: '40px 24px',
              borderRadius: '20px',
              backgroundColor: 'white',
              border: '1px solid #f0f0f0',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                fontSize: '28px'
              }}>
                ⚡
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '16px',
                color: '#1a1a1a'
              }}>
                Daily Practice
              </h3>
              <p style={{
                color: '#666',
                fontSize: '1rem',
                lineHeight: '1.6'
              }}>
                Build better communication habits through regular use
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #3b82f6 100%)',
          color: 'white',
          padding: '80px 48px',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              marginBottom: '24px'
            }}>
              Ready to Transform Your Communication?
            </h2>
            <p style={{
              fontSize: '1.2rem',
              marginBottom: '40px',
              opacity: '0.9'
            }}>
              Join thousands of professionals who've leveled up their communication skills with VibeUp
            </p>
            <button 
              onClick={() => router.push('/app')}
              style={{
                backgroundColor: 'white',
                color: '#1a1a1a',
                border: 'none',
                padding: '20px 40px',
                borderRadius: '16px',
                fontSize: '18px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Start Your Free Trial
            </button>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#f8fafc',
        padding: '40px 48px',
        textAlign: 'center',
        color: '#666'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <p>&copy; 2024 VibeUp. Transform your communication, transform your career.</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  )
}