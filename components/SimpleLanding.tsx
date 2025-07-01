'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SimpleLanding() {
  // Force refresh: Updated at 2025-07-01 11:30
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const router = useRouter()

  useEffect(() => {
    const input = "I'm super annoyed my boss keeps changing stuff"
    const output = "I'd appreciate more consistency in our project timeline"
    
    let inputIndex = 0
    let outputIndex = 0
    
    setInputText('')
    setOutputText('')
    
    const inputTimer = setInterval(() => {
      if (inputIndex <= input.length) {
        setInputText(input.slice(0, inputIndex))
        inputIndex++
      } else {
        clearInterval(inputTimer)
        
        setTimeout(() => {
          const outputTimer = setInterval(() => {
            if (outputIndex <= output.length) {
              setOutputText(output.slice(0, outputIndex))
              outputIndex++
            } else {
              clearInterval(outputTimer)
            }
          }, 30)
        }, 1000)
      }
    }, 60)

    return () => clearInterval(inputTimer)
  }, [])

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      margin: '0',
      backgroundColor: 'white',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 0',
        borderBottom: '1px solid #ddd',
        marginBottom: '32px'
      }}>
        <img 
          src="/app-icon-title.svg" 
          alt="VibeUp" 
          style={{ height: '36px' }}
        />
        <button 
          onClick={() => router.push('/app')}
          style={{
            background: '#000',
            color: 'white',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Try Free
        </button>
      </div>
      
      {/* Hero */}
      <div style={{
        textAlign: 'center',
        padding: '40px 0',
        marginBottom: '40px'
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          margin: '0 0 24px 0',
          color: '#000',
          lineHeight: '1.2'
        }}>
          Communication Training<br />
          <span style={{ 
            color: '#007AFF',
            fontSize: '48px'
          }}>Like Duolingo</span>
        </h1>
        <p style={{
          fontSize: '20px',
          color: '#666',
          margin: '0 0 32px 0',
          lineHeight: '1.5',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          Transform difficult thoughts into clear, professional expressions
        </p>
        <button 
          onClick={() => router.push('/app')}
          style={{
            background: '#000',
            color: 'white',
            border: 'none',
            padding: '16px 32px',
            borderRadius: '12px',
            fontSize: '18px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          Start Learning Free →
        </button>
      </div>

      {/* Demo */}
      <div style={{ 
        margin: '60px 0',
        maxWidth: '600px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <div style={{
          background: '#fff5f5',
          border: '3px solid #ff3030',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '20px'
        }}>
          <div style={{ fontSize: '16px', fontWeight: '600', color: '#666', marginBottom: '12px' }}>
            😤 What you think
          </div>
          <div style={{ fontSize: '18px', minHeight: '60px', lineHeight: '1.4' }}>
            {inputText}
            <span style={{ animation: 'blink 1s infinite' }}>|</span>
          </div>
        </div>
        
        <div style={{ textAlign: 'center', margin: '16px 0', fontSize: '32px', color: '#007AFF' }}>
          ↓
        </div>
        
        <div style={{
          background: '#f0fff4',
          border: '3px solid #34c759',
          borderRadius: '16px',
          padding: '24px'
        }}>
          <div style={{ fontSize: '16px', fontWeight: '600', color: '#666', marginBottom: '12px' }}>
            ✨ What you say
          </div>
          <div style={{ fontSize: '18px', minHeight: '60px', lineHeight: '1.4' }}>
            {outputText}
            <span style={{ animation: 'blink 1s infinite' }}>|</span>
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={{ 
        margin: '80px 0', 
        textAlign: 'center',
        maxWidth: '800px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 60px 0' }}>
          Why VibeUp?
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: window.innerWidth > 768 ? 'repeat(3, 1fr)' : '1fr',
          gap: '40px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🧠</div>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 12px 0' }}>
              Smart Transform
            </h3>
            <p style={{ fontSize: '16px', color: '#666', margin: '0', lineHeight: '1.5' }}>
              AI turns your raw thoughts into polished communication
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📚</div>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 12px 0' }}>
              Learn Phrases
            </h3>
            <p style={{ fontSize: '16px', color: '#666', margin: '0', lineHeight: '1.5' }}>
              Build vocabulary with explanations for each transformation
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚡</div>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 12px 0' }}>
              Daily Practice
            </h3>
            <p style={{ fontSize: '16px', color: '#666', margin: '0', lineHeight: '1.5' }}>
              Build better communication habits through regular use
            </p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div style={{
        textAlign: 'center',
        margin: '80px 0',
        padding: '60px 40px',
        background: '#000',
        borderRadius: '16px',
        color: 'white',
        maxWidth: '600px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', margin: '0 0 24px 0' }}>
          Ready to communicate better?
        </h2>
        <button 
          onClick={() => router.push('/app')}
          style={{
            background: 'white',
            color: '#000',
            border: 'none',
            padding: '16px 32px',
            borderRadius: '12px',
            fontSize: '18px',
            fontWeight: '600',
            cursor: 'pointer',
            marginBottom: '16px'
          }}
        >
          Start Free Now
        </button>
        <p style={{ fontSize: '14px', opacity: '0.7', margin: '0' }}>
          No signup • No payment
        </p>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}