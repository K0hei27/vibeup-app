'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SimpleLandingNew() {
  const [demoStep, setDemoStep] = useState(0)
  const [showOutput, setShowOutput] = useState(false)
  const [currentExample, setCurrentExample] = useState(0)
  const router = useRouter()

  const examples = [
    {
      input: "I'm super annoyed my boss keeps changing stuff",
      output: "I'd appreciate more consistency in our project timeline to help me deliver my best work"
    },
    {
      input: "This meeting is such a waste of time",
      output: "I think we could make our meetings more focused and actionable for everyone's benefit"
    },
    {
      input: "My coworker is being really annoying",
      output: "I'm having some challenges collaborating effectively with my teammate"
    }
  ]

  const handleDemo = () => {
    if (demoStep === 0) {
      setShowOutput(false)
      setTimeout(() => {
        setShowOutput(true)
        setDemoStep(1)
      }, 1000)
    } else {
      setShowOutput(false)
      setCurrentExample((prev) => (prev + 1) % examples.length)
      setTimeout(() => {
        setShowOutput(true)
      }, 500)
    }
  }

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      backgroundColor: '#ffffff',
      minHeight: '100vh',
      margin: 0,
      padding: 0
    }}>
      
      {/* Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        zIndex: 100,
        padding: '16px 20px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <img 
            src="/app-icon-title.svg" 
            alt="VibeUp" 
            style={{ 
              height: '32px',
              width: 'auto'
            }}
          />
          <button 
            onClick={() => router.push('/app')}
            style={{
              backgroundColor: '#000000',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Try Free
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>

        {/* Hero Section */}
        <section style={{
          textAlign: 'center',
          padding: '40px 0 60px',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <h1 style={{
            fontSize: 'clamp(28px, 8vw, 48px)',
            fontWeight: '800',
            lineHeight: '1.1',
            margin: '0 0 20px 0',
            color: '#000000'
          }}>
            Communication Training<br />
            <span style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Like Duolingo
            </span>
          </h1>
          
          <p style={{
            fontSize: 'clamp(16px, 4vw, 20px)',
            color: '#666666',
            margin: '0 0 32px 0',
            lineHeight: '1.5',
            maxWidth: '500px',
            marginLeft: 'auto',
            marginRight: 'auto'
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
              cursor: 'pointer',
              marginBottom: '20px'
            }}
          >
            See How It Works ✨
          </button>
        </section>

        {/* Demo Section */}
        <section id="demo" style={{
          padding: '60px 0',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '40px'
          }}>
            <h2 style={{
              fontSize: 'clamp(24px, 6vw, 32px)',
              fontWeight: '700',
              margin: '0 0 16px 0',
              color: '#000000'
            }}>
              Watch Your Words Transform
            </h2>
            <p style={{
              fontSize: 'clamp(14px, 4vw, 18px)',
              color: '#666666',
              margin: 0
            }}>
              See how VibeUp turns everyday thoughts into professional communication
            </p>
          </div>

          <div style={{
            backgroundColor: '#f8fafc',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '32px',
            border: '1px solid #e5e7eb'
          }}>
            
            {/* Input */}
            <div style={{
              backgroundColor: '#fff1f2',
              border: '2px solid #fda4af',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '20px'
            }}>
              <div style={{
                fontSize: '12px',
                fontWeight: '600',
                color: '#991b1b',
                marginBottom: '8px'
              }}>
                😤 What you think
              </div>
              <div style={{
                fontSize: '14px',
                color: '#000000',
                lineHeight: '1.4'
              }}>
                "{examples[currentExample].input}"
              </div>
            </div>

            {/* Arrow */}
            <div style={{
              textAlign: 'center',
              fontSize: '24px',
              color: '#3b82f6',
              margin: '16px 0'
            }}>
              ↓
            </div>

            {/* Output */}
            {showOutput && (
              <div style={{
                backgroundColor: '#f0fdf4',
                border: '2px solid #86efac',
                borderRadius: '12px',
                padding: '16px',
                opacity: showOutput ? 1 : 0,
                transition: 'opacity 0.5s ease'
              }}>
                <div style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#166534',
                  marginBottom: '8px'
                }}>
                  ✨ What you say
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#000000',
                  lineHeight: '1.4'
                }}>
                  "{examples[currentExample].output}"
                </div>
              </div>
            )}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button 
              onClick={handleDemo}
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
              {demoStep === 0 ? 'Try Transformation' : 'Try Another Example'}
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section style={{
          padding: '60px 0',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: 'clamp(24px, 6vw, 32px)',
            fontWeight: '700',
            margin: '0 0 48px 0',
            color: '#000000'
          }}>
            Why VibeUp?
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px'
          }}>
            <div style={{
              textAlign: 'center',
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '16px'
              }}>
                🧠
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                margin: '0 0 12px 0',
                color: '#000000'
              }}>
                Smart Transform
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#666666',
                margin: 0,
                lineHeight: '1.5'
              }}>
                AI turns your raw thoughts into polished communication
              </p>
            </div>

            <div style={{
              textAlign: 'center',
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '16px'
              }}>
                📚
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                margin: '0 0 12px 0',
                color: '#000000'
              }}>
                Learn Phrases
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#666666',
                margin: 0,
                lineHeight: '1.5'
              }}>
                Build vocabulary with explanations for each transformation
              </p>
            </div>

            <div style={{
              textAlign: 'center',
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '16px'
              }}>
                ⚡
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                margin: '0 0 12px 0',
                color: '#000000'
              }}>
                Daily Practice
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#666666',
                margin: 0,
                lineHeight: '1.5'
              }}>
                Build better communication habits through regular use
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          padding: '60px 0',
          textAlign: 'center'
        }}>
          <div style={{
            backgroundColor: '#000000',
            borderRadius: '16px',
            padding: '40px 24px',
            color: 'white'
          }}>
            <h2 style={{
              fontSize: 'clamp(24px, 6vw, 32px)',
              fontWeight: '700',
              margin: '0 0 16px 0'
            }}>
              Ready to Transform Your Communication?
            </h2>
            <p style={{
              fontSize: 'clamp(14px, 4vw, 18px)',
              margin: '0 0 32px 0',
              opacity: 0.9
            }}>
              Join thousands of professionals who've leveled up their communication skills
            </p>
            <button 
              onClick={() => router.push('/app')}
              style={{
                backgroundColor: 'white',
                color: '#000000',
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
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#f8fafc',
        padding: '32px 20px',
        textAlign: 'center',
        color: '#666666',
        fontSize: '14px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <p style={{ margin: 0 }}>
            &copy; 2024 VibeUp. Transform your communication, transform your career.
          </p>
        </div>
      </footer>

    </div>
  )
}