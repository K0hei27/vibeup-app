'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LandingPageNew() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const router = useRouter()

  const examples = [
    {
      input: "I'm super annoyed my boss keeps changing stuff",
      output: "I'd appreciate more consistency in our project timeline"
    },
    {
      input: "This meeting is such a waste of time",
      output: "I think we could make our meetings more focused"
    },
    {
      input: "My coworker is being really annoying",
      output: "I'm having some challenges collaborating effectively"
    }
  ]

  const [currentExample, setCurrentExample] = useState(0)

  useEffect(() => {
    const example = examples[currentExample]
    
    // Reset
    setInputText('')
    setOutputText('')
    
    let inputIndex = 0
    let outputIndex = 0
    
    // Type input
    const inputTimer = setInterval(() => {
      if (inputIndex <= example.input.length) {
        setInputText(example.input.slice(0, inputIndex))
        inputIndex++
      } else {
        clearInterval(inputTimer)
        
        // Pause, then type output
        setTimeout(() => {
          const outputTimer = setInterval(() => {
            if (outputIndex <= example.output.length) {
              setOutputText(example.output.slice(0, outputIndex))
              outputIndex++
            } else {
              clearInterval(outputTimer)
              
              // Wait, then next example
              setTimeout(() => {
                setCurrentExample((prev) => (prev + 1) % examples.length)
              }, 3000)
            }
          }, 30)
        }, 1000)
      }
    }, 60)

    return () => {
      clearInterval(inputTimer)
    }
  }, [currentExample])

  return (
    <div className="page">
      {/* Simple Header */}
      <div className="header">
        <img src="/app-icon-title.svg" alt="VibeUp" className="logo" />
        <button className="try-btn" onClick={() => router.push('/app')}>
          Try Free
        </button>
      </div>
      
      {/* Hero */}
      <div className="hero">
        <h1 className="title">
          Communication Training<br />
          <span className="accent">Like Duolingo</span>
        </h1>
        <p className="subtitle">
          Transform difficult thoughts into clear, professional expressions
        </p>
        <button className="cta" onClick={() => router.push('/app')}>
          Start Learning Free →
        </button>
      </div>

      {/* Demo */}
      <div className="demo">
        <div className="demo-container">
          <div className="demo-box before">
            <div className="label">😤 What you think</div>
            <div className="text">
              {inputText}
              <span className="cursor">|</span>
            </div>
          </div>
          
          <div className="arrow">→</div>
          
          <div className="demo-box after">
            <div className="label">✨ What you say</div>
            <div className="text">
              {outputText}
              <span className="cursor">|</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="features">
        <h2 className="features-title">Why VibeUp?</h2>
        <div className="features-grid">
          <div className="feature">
            <div className="icon">🧠</div>
            <h3>Smart Transform</h3>
            <p>AI turns your raw thoughts into polished communication</p>
          </div>
          <div className="feature">
            <div className="icon">📚</div>
            <h3>Learn Phrases</h3>
            <p>Build vocabulary with explanations for each transformation</p>
          </div>
          <div className="feature">
            <div className="icon">⚡</div>
            <h3>Daily Practice</h3>
            <p>Build better communication habits through regular use</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="final-cta">
        <h2>Ready to communicate better?</h2>
        <button className="cta big" onClick={() => router.push('/app')}>
          Start Free Now
        </button>
        <p className="note">No signup • No payment</p>
      </div>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .page {
          font-family: var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif;
          background: white;
          padding: 10px;
          margin: 0;
        }

        /* Header */
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          margin-bottom: 10px;
          border-bottom: 1px solid #f0f0f0;
        }

        .logo {
          height: 24px;
        }

        .try-btn {
          background: #000;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          font-size: 14px;
        }

        .try-btn:hover {
          background: #333;
        }

        /* Hero */
        .hero {
          text-align: center;
          padding: 10px 0;
          margin-bottom: 10px;
        }

        .title {
          font-size: 20px;
          font-weight: 800;
          line-height: 1.2;
          margin: 0 0 8px 0;
          color: #000;
        }

        .accent {
          background: linear-gradient(135deg, #007AFF 0%, #0051D5 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .subtitle {
          font-size: 14px;
          color: #666;
          margin: 0 0 10px 0;
          line-height: 1.4;
        }

        .cta {
          background: #000;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cta:hover {
          background: #333;
          transform: translateY(-1px);
        }

        .cta.big {
          padding: 20px 40px;
          font-size: 20px;
        }

        /* Demo */
        .demo {
          margin: 30px 0;
        }

        .demo-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          align-items: center;
        }

        .demo-box {
          background: white;
          border: 2px solid #007AFF;
          border-radius: 12px;
          padding: 16px;
          width: 100%;
          max-width: 350px;
        }

        .demo-box.before {
          border-color: #FF3B30;
          background: #FFF5F5;
        }

        .demo-box.after {
          border-color: #34C759;
          background: #F0FFF4;
        }

        .label {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #666;
        }

        .text {
          font-size: 14px;
          line-height: 1.4;
          min-height: 40px;
          color: #000;
        }

        .arrow {
          font-size: 24px;
          color: #007AFF;
          font-weight: bold;
        }

        .cursor {
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        /* Features */
        .features {
          margin: 80px 0;
          text-align: center;
        }

        .features-title {
          font-size: 32px;
          font-weight: 800;
          margin: 0 0 40px 0;
          color: #000;
        }

        .features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 30px;
        }

        .feature {
          text-align: center;
        }

        .icon {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .feature h3 {
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 8px 0;
          color: #000;
        }

        .feature p {
          color: #666;
          line-height: 1.5;
          margin: 0;
        }

        /* Final CTA */
        .final-cta {
          text-align: center;
          margin: 80px 0;
          padding: 60px 20px;
          background: #000;
          border-radius: 12px;
          color: white;
        }

        .final-cta h2 {
          font-size: 28px;
          font-weight: 800;
          margin: 0 0 24px 0;
        }

        .final-cta .cta {
          background: white;
          color: #000;
        }

        .final-cta .cta:hover {
          background: #f0f0f0;
        }

        .note {
          margin: 16px 0 0 0;
          opacity: 0.7;
          font-size: 14px;
        }

        /* Mobile */
        @media (max-width: 600px) {
          .page {
            padding: 8px;
          }

          .header {
            padding: 8px 0;
            margin-bottom: 8px;
          }

          .logo {
            height: 18px;
          }

          .hero {
            padding: 8px 0;
            margin-bottom: 8px;
          }

          .title {
            font-size: 18px;
            margin-bottom: 6px;
          }

          .subtitle {
            font-size: 12px;
            margin-bottom: 8px;
          }

          .cta {
            padding: 8px 16px;
            font-size: 12px;
          }

          .demo {
            margin: 20px 0;
          }

          .demo-container {
            flex-direction: column;
            gap: 16px;
          }

          .demo-box {
            padding: 12px;
          }

          .text {
            font-size: 12px;
            min-height: 36px;
          }

          .arrow {
            transform: rotate(90deg);
            font-size: 20px;
          }

          .features {
            margin: 40px 0;
          }

          .features-title {
            font-size: 24px;
            margin-bottom: 30px;
          }

          .features-grid {
            gap: 20px;
          }

          .final-cta {
            margin: 40px 0;
            padding: 30px 12px;
          }

          .final-cta h2 {
            font-size: 22px;
          }
        }

        @media (min-width: 600px) {
          .demo-container {
            flex-direction: row;
            align-items: center;
          }

          .arrow {
            transform: none;
          }

          .features-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </div>
  )
}