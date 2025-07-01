'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SuperSimpleLanding() {
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
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      padding: '20px',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center'
    }}>
      
      {/* LOGO + APP NAME */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '48px'
      }}>
        <img 
          src="/app-icon-title.svg" 
          alt="VibeUp" 
          style={{ 
            height: '64px',
            marginBottom: '16px'
          }}
        />
        <p style={{
          fontSize: '18px',
          color: '#64748b',
          margin: 0,
          fontWeight: '500'
        }}>
          Express yourself with the perfect vibe
        </p>
      </div>

      {/* DEMO ANIMATION */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        padding: '32px',
        marginBottom: '48px',
        width: '100%',
        maxWidth: '450px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
        backdropFilter: 'blur(10px)'
      }}>
        
        {/* INPUT */}
        <div style={{
          backgroundColor: '#fef7f7',
          border: '2px solid #fda4af',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '20px',
          transition: 'all 0.3s ease'
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
            fontSize: '16px',
            color: '#000',
            lineHeight: '1.4'
          }}>
            "I'm super annoyed my boss keeps changing stuff"
          </div>
        </div>

        {/* ARROW */}
        <div style={{
          fontSize: '24px',
          color: '#3b82f6',
          margin: '12px 0'
        }}>
          ↓
        </div>

        {/* OUTPUT */}
        <div style={{
          backgroundColor: '#f0fdf4',
          border: '2px solid #86efac',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '20px',
          opacity: showOutput ? 1 : 0.3,
          transition: 'all 0.5s ease',
          transform: showOutput ? 'translateY(0)' : 'translateY(10px)'
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
            fontSize: '16px',
            color: '#000',
            lineHeight: '1.4'
          }}>
            "I'd appreciate more consistency in our project timeline to help me deliver my best work"
          </div>
        </div>

        {/* DEMO BUTTON */}
        <button 
          onClick={handleDemo}
          style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            color: 'white',
            border: 'none',
            padding: '16px 32px',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            width: '100%',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'scale(0.95)'
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          Try Transformation ✨
        </button>
      </div>

      {/* CALL TO ACTION */}
      <button 
        onClick={() => router.push('/app')}
        style={{
          background: 'linear-gradient(135deg, #000000 0%, #18181b 100%)',
          color: 'white',
          border: 'none',
          padding: '20px 40px',
          borderRadius: '16px',
          fontSize: '18px',
          fontWeight: '700',
          cursor: 'pointer',
          width: '100%',
          maxWidth: '350px',
          transition: 'all 0.3s ease',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)'
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'scale(0.95)'
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
        }}
      >
        Start Using VibeUp →
      </button>

    </div>
  )
}