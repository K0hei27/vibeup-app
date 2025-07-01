'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const [demoText, setDemoText] = useState("I'm super annoyed my boss keeps changing stuff")
  const [transformedText, setTransformedText] = useState("I'm finding it challenging to adapt to the frequently changing requirements")
  const router = useRouter()

  const demo = {
    input: "I'm super annoyed my boss keeps changing stuff",
    output: "I'm finding it challenging to adapt to the frequently changing requirements"
  }

  // Simple typing animation - but show text immediately
  useEffect(() => {
    // Show static text immediately, then start animation
    setTimeout(() => {
      let inputIndex = 0
      let outputIndex = 0
      
      setDemoText('')
      setTransformedText('')

      const inputInterval = setInterval(() => {
        if (inputIndex < demo.input.length) {
          setDemoText(demo.input.slice(0, inputIndex + 1))
          inputIndex++
        } else {
          clearInterval(inputInterval)
          
          setTimeout(() => {
            const outputInterval = setInterval(() => {
              if (outputIndex < demo.output.length) {
                setTransformedText(demo.output.slice(0, outputIndex + 1))
                outputIndex++
              } else {
                clearInterval(outputInterval)
              }
            }, 40)
          }, 1000)
        }
      }, 80)
    }, 2000) // Wait 2 seconds before starting animation
  }, [])

  return (
    <div className="landing-page">
      {/* Simple Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <img src="/app-icon-title.svg" alt="VibeUp" className="nav-logo" />
          <button className="cta-button" onClick={() => router.push('/app')}>
            Try VibeUp
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Like Duolingo for 
            <span className="hero-accent"> Communication</span>
          </h1>
          <p className="hero-subtitle">
            Transform messy thoughts into natural expressions. Build better communication habits daily.
          </p>
          <button className="cta-primary" onClick={() => router.push('/app')}>
            Start Learning ✨
          </button>
        </div>

        {/* Live Demo */}
        <div className="demo-box">
          <div className="demo-section">
            <div className="demo-label">😤 Your thoughts</div>
            <div className="demo-text input-text">
              {demoText}<span className="cursor">|</span>
            </div>
          </div>
          <div className="demo-arrow">↓</div>
          <div className="demo-section">
            <div className="demo-label">✨ Natural expression</div>
            <div className="demo-text output-text">
              {transformedText}<span className="cursor">|</span>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Features */}
      <section className="features">
        <div className="features-container">
          <h2 className="features-title">Why VibeUp?</h2>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">🧠</div>
              <h3>Transform Thoughts</h3>
              <p>Turn raw thoughts into natural, clear expressions</p>
            </div>
            <div className="feature">
              <div className="feature-icon">📚</div>
              <h3>Learn Key Phrases</h3>
              <p>Build vocabulary with explanations for each transformation</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🎯</div>
              <h3>Daily Practice</h3>
              <p>Casual, fun approach to improving communication skills</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="cta-container">
          <h2>Ready to level up your communication?</h2>
          <button className="cta-primary large" onClick={() => router.push('/app')}>
            Try VibeUp Now
          </button>
          <p className="cta-note">Free • No signup required</p>
        </div>
      </section>

      <style jsx>{`
        .landing-page {
          min-height: 100vh;
          font-family: var(--font-inter), 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: #ffffff;
        }

        /* Simple Navigation */
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid #e5e7eb;
          z-index: 1000;
          padding: 16px 0;
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-logo {
          height: 32px;
          width: auto;
        }

        .cta-button {
          background: #000000;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 10px 20px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
        }

        .cta-button:hover {
          background: #374151;
        }

        /* Hero Section */
        .hero {
          padding: 80px 20px 40px;
          text-align: center;
        }

        .hero-content {
          margin-bottom: 40px;
        }

        .hero-title {
          font-size: clamp(28px, 7vw, 48px);
          font-weight: 800;
          line-height: 1.2;
          margin: 0 0 20px 0;
          color: #000000;
        }

        .hero-accent {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: clamp(16px, 4vw, 20px);
          line-height: 1.5;
          color: #6b7280;
          margin: 0 0 32px 0;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-primary {
          background: #000000;
          color: white;
          border: none;
          border-radius: 12px;
          padding: 16px 32px;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          font-family: inherit;
        }

        .cta-primary:hover {
          background: #374151;
          transform: translateY(-2px);
        }

        .cta-primary.large {
          padding: 20px 40px;
          font-size: 20px;
        }

        /* Demo Box */
        .demo-box {
          background: white;
          border: 3px solid #3b82f6;
          border-radius: 16px;
          padding: 20px;
          max-width: 350px;
          margin: 0 auto 40px auto;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }

        .demo-section {
          margin-bottom: 16px;
        }

        .demo-section:last-child {
          margin-bottom: 0;
        }

        .demo-label {
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 6px;
          color: #6b7280;
        }

        .demo-text {
          background: #f8fafc;
          padding: 12px;
          border-radius: 8px;
          min-height: 40px;
          font-size: 14px;
          line-height: 1.4;
          border: 2px solid #e5e7eb;
          font-weight: 500;
        }

        .input-text {
          color: #dc2626;
          background: #fef2f2;
          border-color: #fecaca;
        }

        .output-text {
          color: #059669;
          background: #f0fdf4;
          border-color: #bbf7d0;
        }

        .demo-arrow {
          text-align: center;
          font-size: 20px;
          color: #3b82f6;
          margin: 12px 0;
        }

        .cursor {
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        /* Features Section */
        .features {
          padding: 60px 20px;
          background: #f8fafc;
        }

        .features-container {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }

        .features-title {
          font-size: clamp(24px, 6vw, 32px);
          font-weight: 800;
          margin: 0 0 40px 0;
          color: #000000;
        }

        .features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }

        .feature {
          text-align: center;
        }

        .feature-icon {
          font-size: 48px;
          margin-bottom: 16px;
          display: block;
        }

        .feature h3 {
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 12px 0;
          color: #000000;
        }

        .feature p {
          color: #6b7280;
          line-height: 1.6;
          margin: 0;
          font-size: 16px;
        }

        /* Final CTA */
        .final-cta {
          padding: 60px 20px;
          background: #000000;
          color: white;
          text-align: center;
        }

        .cta-container {
          max-width: 600px;
          margin: 0 auto;
        }

        .cta-container h2 {
          font-size: clamp(28px, 6vw, 36px);
          font-weight: 800;
          margin: 0 0 32px 0;
        }

        .cta-note {
          font-size: 14px;
          opacity: 0.7;
          margin: 16px 0 0 0;
        }

        /* Mobile specific adjustments */
        @media (max-width: 480px) {
          .hero {
            padding: 60px 16px 20px;
          }

          .hero-content {
            margin-bottom: 24px;
          }

          .hero-title {
            font-size: 20px;
            margin-bottom: 12px;
          }

          .hero-subtitle {
            font-size: 14px;
            margin-bottom: 16px;
          }

          .cta-primary {
            padding: 12px 24px;
            font-size: 14px;
          }

          .demo-box {
            padding: 16px;
            max-width: 100%;
            margin: 0 auto 20px auto;
          }

          .demo-text {
            font-size: 12px;
            padding: 8px;
          }

          .demo-label {
            font-size: 10px;
          }

          .features {
            padding: 40px 16px;
          }

          .features-title {
            font-size: 20px;
            margin-bottom: 32px;
          }

          .features-grid {
            gap: 24px;
          }

          .final-cta {
            padding: 40px 16px;
          }

          .cta-container h2 {
            font-size: 24px;
            margin-bottom: 24px;
          }
        }

        /* Responsive */
        @media (min-width: 768px) {
          .hero-container {
            grid-template-columns: 1fr 1fr;
            text-align: left;
          }

          .hero-content {
            text-align: left;
          }

          .hero-subtitle {
            margin-left: 0;
            margin-right: 0;
          }

          .features-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </div>
  )
}