'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function MobileLanding() {
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
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      margin: 0,
      padding: 0,
      backgroundColor: '#ffffff',
      minHeight: '100vh'
    }}>
      {/* Mobile Header - Fixed at top */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        zIndex: 1000,
        padding: '12px 16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <img 
            src="/app-icon-title.svg" 
            alt="VibeUp" 
            style={{ height: '28px', width: 'auto' }}
          />
          <button 
            onClick={() => router.push('/app')}
            style={{
              backgroundColor: '#000000',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Try Free
          </button>
        </div>
      </header>

      {/* Main Content - with top margin for header */}
      <main style={{ marginTop: '60px', padding: '0 16px' }}>
        
        {/* Hero Section */}
        <section style={{
          textAlign: 'center',
          padding: '40px 0 32px',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '800',
            lineHeight: '1.1',
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #000000 0%, #3b82f6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
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
            fontSize: '18px',
            color: '#666',
            marginBottom: '24px',
            lineHeight: '1.5'
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
              padding: '16px 32px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            See How It Works ✨
          </button>
        </section>

        {/* Demo Section - FORCED VISIBLE */}
        <div style={{
          backgroundColor: '#ff0000',
          padding: '20px',
          margin: '20px 0',
          border: '5px solid #000000'
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#000000',
            textAlign: 'center',
            marginBottom: '16px',
            backgroundColor: '#ffff00',
            padding: '10px'
          }}>
            Watch Your Words Transform
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#000000',
            textAlign: 'center',
            backgroundColor: '#ffff00',
            padding: '10px',
            marginBottom: '20px'
          }}>
            See how VibeUp turns everyday thoughts into professional communication
          </p>
          
          <div style={{
            backgroundColor: '#ffffff',
            border: '3px solid #000000',
            padding: '16px',
            marginBottom: '16px'
          }}>
            <div style={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#000000',
              marginBottom: '8px'
            }}>
              😤 What you think
            </div>
            <div style={{
              backgroundColor: '#ffcccc',
              border: '2px solid #ff0000',
              padding: '12px',
              fontSize: '16px',
              color: '#000000',
              marginBottom: '12px'
            }}>
              "I'm super annoyed my boss keeps changing stuff"
            </div>
            
            <div style={{
              fontSize: '32px',
              textAlign: 'center',
              color: '#000000',
              margin: '8px 0'
            }}>
              ↓
            </div>
            
            <div style={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#000000',
              marginBottom: '8px'
            }}>
              ✨ What you say
            </div>
            <div style={{
              backgroundColor: '#ccffcc',
              border: '2px solid #00ff00',
              padding: '12px',
              fontSize: '16px',
              color: '#000000',
              marginBottom: '12px'
            }}>
              "I'd appreciate more consistency in our project timeline to help me deliver my best work"
            </div>
            
            <div style={{
              backgroundColor: '#0066ff',
              color: 'white',
              padding: '8px',
              margin: '4px 0',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              "appreciate more consistency" - Constructive request
            </div>
            <div style={{
              backgroundColor: '#0066ff',
              color: 'white',
              padding: '8px',
              margin: '4px 0',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              "project timeline" - Professional framing
            </div>
            <div style={{
              backgroundColor: '#0066ff',
              color: 'white',
              padding: '8px',
              margin: '4px 0',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              "deliver my best work" - Shows commitment
            </div>
          </div>
          
          <button 
            onClick={handleTransformation}
            style={{
              backgroundColor: '#00ff00',
              color: '#000000',
              border: '3px solid #000000',
              padding: '16px 32px',
              fontSize: '18px',
              fontWeight: 'bold',
              width: '100%',
              cursor: 'pointer'
            }}
          >
            TRY TRANSFORMATION NOW!
          </button>
        </div>

        {/* Features Section */}
        <section style={{ padding: '40px 0', backgroundColor: 'white' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '28px',
            fontWeight: '700',
            marginBottom: '32px',
            color: '#1a1a1a'
          }}>
            Why Professionals Choose VibeUp
          </h2>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}>
            <div style={{
              textAlign: 'center',
              padding: '24px 16px',
              borderRadius: '16px',
              backgroundColor: 'white',
              border: '1px solid #f0f0f0'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: '20px'
              }}>
                🧠
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                marginBottom: '12px',
                color: '#1a1a1a'
              }}>
                Smart Transform
              </h3>
              <p style={{
                color: '#666',
                fontSize: '14px',
                lineHeight: '1.5'
              }}>
                AI turns your raw thoughts into polished communication
              </p>
            </div>
            
            <div style={{
              textAlign: 'center',
              padding: '24px 16px',
              borderRadius: '16px',
              backgroundColor: 'white',
              border: '1px solid #f0f0f0'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: '20px'
              }}>
                📚
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                marginBottom: '12px',
                color: '#1a1a1a'
              }}>
                Learn Phrases
              </h3>
              <p style={{
                color: '#666',
                fontSize: '14px',
                lineHeight: '1.5'
              }}>
                Build vocabulary with explanations for each transformation
              </p>
            </div>
            
            <div style={{
              textAlign: 'center',
              padding: '24px 16px',
              borderRadius: '16px',
              backgroundColor: 'white',
              border: '1px solid #f0f0f0'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: '20px'
              }}>
                ⚡
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                marginBottom: '12px',
                color: '#1a1a1a'
              }}>
                Daily Practice
              </h3>
              <p style={{
                color: '#666',
                fontSize: '14px',
                lineHeight: '1.5'
              }}>
                Build better communication habits through regular use
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          padding: '40px 0',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #3b82f6 100%)',
          color: 'white',
          textAlign: 'center',
          borderRadius: '16px',
          margin: '24px 0'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            marginBottom: '16px'
          }}>
            Ready to Transform Your Communication?
          </h2>
          <p style={{
            fontSize: '16px',
            marginBottom: '24px',
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
              padding: '16px 32px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            Start Your Free Trial
          </button>
        </section>

      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#f8fafc',
        padding: '24px 16px',
        textAlign: 'center',
        color: '#666',
        fontSize: '14px'
      }}>
        <p>&copy; 2024 VibeUp. Transform your communication, transform your career.</p>
      </footer>
    </div>
  )
}