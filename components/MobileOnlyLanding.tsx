'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function MobileOnlyLanding() {
  const [showOutput, setShowOutput] = useState(false)
  const router = useRouter()

  const handleDemo = () => {
    if (!showOutput) {
      setShowOutput(true)
    } else {
      setShowOutput(false)
      setTimeout(() => setShowOutput(true), 500)
    }
  }

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      backgroundColor: '#ffffff',
      margin: 0,
      padding: 0,
      minHeight: '100vh',
      width: '100%'
    }}>
      
      {/* MOBILE HEADER - FORCED VISIBLE */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#ffffff',
        borderBottom: '2px solid #000',
        padding: '16px',
        zIndex: 9999,
        width: '100%',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%'
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
              backgroundColor: '#000',
              color: 'white',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
            Try Free
          </button>
        </div>
      </div>

      {/* MOBILE HERO */}
      <div style={{
        padding: '32px 16px',
        paddingTop: '80px',
        textAlign: 'center',
        backgroundColor: '#ffffff'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '800',
          lineHeight: '1.1',
          margin: '0 0 16px 0',
          color: '#000'
        }}>
          Communication Training<br />
          <span style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Like Duolingo
          </span>
        </h1>
        
        <p style={{
          fontSize: '18px',
          color: '#666',
          margin: '0 0 24px 0',
          lineHeight: '1.4'
        }}>
          Transform messy thoughts into natural expressions
        </p>
        
        <button 
          onClick={() => {
            document.getElementById('transform-section').scrollIntoView({ behavior: 'smooth' })
          }}
          style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            color: 'white',
            border: 'none',
            padding: '14px 28px',
            borderRadius: '10px',
            fontSize: '16px',
            fontWeight: '700',
            width: '100%',
            maxWidth: '280px'
          }}
        >
          See How It Works ✨
        </button>
      </div>

      {/* MOBILE TRANSFORM SECTION - FORCED VISIBLE */}
      <div id="transform-section" style={{
        padding: '32px 16px',
        backgroundColor: '#f5f5f5',
        width: '100%'
      }}>
        
        {/* SECTION TITLE - FORCED VISIBLE */}
        <div style={{
          textAlign: 'center',
          marginBottom: '32px'
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '700',
            margin: '0 0 12px 0',
            color: '#000',
            lineHeight: '1.2'
          }}>
            Watch Your Words Transform
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#666',
            margin: 0,
            lineHeight: '1.4'
          }}>
            See how VibeUp turns everyday thoughts into professional communication
          </p>
        </div>

        {/* DEMO CONTAINER - FORCED VISIBLE */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '24px',
          border: '1px solid #ddd',
          width: '100%'
        }}>
          
          {/* INPUT BOX */}
          <div style={{
            backgroundColor: '#ffebee',
            border: '2px solid #f44336',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '16px'
          }}>
            <div style={{
              fontSize: '12px',
              fontWeight: '600',
              color: '#c62828',
              marginBottom: '8px'
            }}>
              😤 What you think
            </div>
            <div style={{
              fontSize: '16px',
              color: '#000',
              lineHeight: '1.4'
            }}>
              "I'm super annoyed my boss keeps changing stuff"
            </div>
          </div>

          {/* ARROW */}
          <div style={{
            textAlign: 'center',
            fontSize: '24px',
            color: '#3b82f6',
            margin: '12px 0'
          }}>
            ↓
          </div>

          {/* OUTPUT BOX */}
          <div style={{
            backgroundColor: '#e8f5e8',
            border: '2px solid #4caf50',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '16px',
            display: showOutput ? 'block' : 'none'
          }}>
            <div style={{
              fontSize: '12px',
              fontWeight: '600',
              color: '#2e7d32',
              marginBottom: '8px'
            }}>
              ✨ What you say
            </div>
            <div style={{
              fontSize: '16px',
              color: '#000',
              lineHeight: '1.4'
            }}>
              "I'd appreciate more consistency in our project timeline to help me deliver my best work"
            </div>
          </div>

        </div>

        {/* DEMO BUTTON */}
        <div style={{ textAlign: 'center' }}>
          <button 
            onClick={handleDemo}
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              color: 'white',
              border: 'none',
              padding: '14px 28px',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '700',
              width: '100%',
              maxWidth: '280px'
            }}
          >
            Try Transformation
          </button>
        </div>
      </div>

      {/* MOBILE FEATURES */}
      <div style={{
        padding: '32px 16px',
        backgroundColor: '#ffffff'
      }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '28px',
          fontWeight: '700',
          margin: '0 0 32px 0',
          color: '#000'
        }}>
          Why VibeUp?
        </h2>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          <div style={{
            textAlign: 'center',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid #ddd'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🧠</div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '700',
              margin: '0 0 8px 0',
              color: '#000'
            }}>
              Smart Transform
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#666',
              margin: 0,
              lineHeight: '1.4'
            }}>
              AI turns your raw thoughts into polished communication
            </p>
          </div>

          <div style={{
            textAlign: 'center',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid #ddd'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>📚</div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '700',
              margin: '0 0 8px 0',
              color: '#000'
            }}>
              Learn Phrases
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#666',
              margin: 0,
              lineHeight: '1.4'
            }}>
              Build vocabulary with explanations for each transformation
            </p>
          </div>

          <div style={{
            textAlign: 'center',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid #ddd'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>⚡</div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '700',
              margin: '0 0 8px 0',
              color: '#000'
            }}>
              Daily Practice
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#666',
              margin: 0,
              lineHeight: '1.4'
            }}>
              Build better communication habits through regular use
            </p>
          </div>
        </div>
      </div>

      {/* MOBILE CTA */}
      <div style={{
        padding: '32px 16px',
        backgroundColor: '#000',
        color: 'white'
      }}>
        <div style={{
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            margin: '0 0 16px 0'
          }}>
            Ready to Transform Your Communication?
          </h2>
          <p style={{
            fontSize: '16px',
            margin: '0 0 24px 0',
            opacity: 0.9
          }}>
            Join thousands of professionals who've leveled up their communication skills
          </p>
          <button 
            onClick={() => router.push('/app')}
            style={{
              backgroundColor: 'white',
              color: '#000',
              border: 'none',
              padding: '14px 28px',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '700',
              width: '100%',
              maxWidth: '280px'
            }}
          >
            Start Your Free Trial
          </button>
        </div>
      </div>

      {/* MOBILE FOOTER */}
      <div style={{
        padding: '24px 16px',
        backgroundColor: '#f5f5f5',
        textAlign: 'center',
        color: '#666',
        fontSize: '14px'
      }}>
        <p style={{ margin: 0 }}>
          &copy; 2024 VibeUp. Transform your communication, transform your career.
        </p>
      </div>

    </div>
  )
}