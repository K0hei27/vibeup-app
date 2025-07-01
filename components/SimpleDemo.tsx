'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

// Updated: Navigation bar and removed "expressions" 
export default function SimpleDemo() {
  const [showOutput, setShowOutput] = useState(false)
  const router = useRouter()

  const handleDemo = () => {
    if (!showOutput) {
      setShowOutput(true)
    } else {
      setShowOutput(false)
      setTimeout(() => setShowOutput(true), 300)
    }
  }

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      backgroundColor: '#ffffff',
      margin: 0,
      padding: 0,
      minHeight: '100vh'
    }}>
      
      {/* NAVIGATION */}
      <nav style={{
        padding: '16px 20px',
        borderBottom: '1px solid #e5e7eb',
        backgroundColor: '#ffffff'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <img 
            src="/app-icon-title.svg" 
            alt="VibeUp" 
            style={{ height: '32px' }}
          />
          <button 
            onClick={() => router.push('/app')}
            style={{
              backgroundColor: '#000',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Try Free
          </button>
        </div>
      </nav>

      {/* HERO - FORCED VISIBLE */}
      <div style={{
        padding: '40px 20px',
        textAlign: 'center',
        backgroundColor: '#ffff00',
        border: '3px solid #ff0000',
        margin: '10px'
      }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: '800',
          lineHeight: '1.1',
          margin: '0 0 12px 0',
          color: '#000000',
          backgroundColor: '#ffffff',
          padding: '10px'
        }}>
          VibeUp
        </h1>
        
        <p style={{
          fontSize: '18px',
          color: '#000000',
          margin: '0 0 32px 0',
          lineHeight: '1.4',
          backgroundColor: '#ffffff',
          padding: '10px'
        }}>
          Express yourself with the perfect vibe
        </p>
      </div>

      {/* DEMO SECTION */}
      <div style={{
        padding: '40px 20px',
        backgroundColor: '#f8fafc'
      }}>
        
        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '700',
            margin: '0 0 16px 0',
            color: '#000'
          }}>
            Watch Your Words Transform
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#666',
            margin: 0
          }}>
            See how VibeUp turns everyday thoughts into professional communication
          </p>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '32px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}>
          
          {/* INPUT */}
          <div style={{
            backgroundColor: '#fef2f2',
            border: '2px solid #fecaca',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '20px'
          }}>
            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#991b1b',
              marginBottom: '12px'
            }}>
              😤 What you think
            </div>
            <div style={{
              fontSize: '18px',
              color: '#000',
              lineHeight: '1.4'
            }}>
              "I'm super annoyed my boss keeps changing stuff"
            </div>
          </div>

          {/* ARROW */}
          <div style={{
            textAlign: 'center',
            fontSize: '32px',
            color: '#3b82f6',
            margin: '20px 0'
          }}>
            ↓
          </div>

          {/* OUTPUT */}
          <div style={{
            backgroundColor: '#f0fdf4',
            border: '2px solid #bbf7d0',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '20px',
            opacity: showOutput ? 1 : 0.3,
            transition: 'opacity 0.5s ease'
          }}>
            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#166534',
              marginBottom: '12px'
            }}>
              ✨ What you say
            </div>
            <div style={{
              fontSize: '18px',
              color: '#000',
              lineHeight: '1.4'
            }}>
              "I'd appreciate more consistency in our project timeline to help me deliver my best work"
            </div>
          </div>

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
              fontSize: '18px',
              fontWeight: '700',
              width: '100%',
              maxWidth: '300px'
            }}
          >
            Try Transformation ✨
          </button>
        </div>
      </div>

      {/* CTA */}
      <div style={{
        padding: '40px 20px',
        backgroundColor: '#000',
        color: 'white',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '28px',
          fontWeight: '700',
          margin: '0 0 16px 0'
        }}>
          Ready to Transform Your Communication?
        </h2>
        <button 
          onClick={() => router.push('/app')}
          style={{
            backgroundColor: 'white',
            color: '#000',
            border: 'none',
            padding: '16px 32px',
            borderRadius: '12px',
            fontSize: '18px',
            fontWeight: '700',
            width: '100%',
            maxWidth: '300px'
          }}
        >
          Start Your Free Trial
        </button>
      </div>

    </div>
  )
}