'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function NewLanding() {
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
      // Cycle to next example
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
    <div className="landing-container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-content">
          <img src="/app-icon-title.svg" alt="VibeUp" className="logo" />
          <button 
            className="nav-cta"
            onClick={() => router.push('/app')}
          >
            Try VibeUp Free
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              Communication Training
              <br />
              <span className="hero-accent">Like Duolingo</span>
            </h1>
            <p className="hero-description">
              Transform messy thoughts into natural expressions. Build better communication habits daily.
            </p>
            <button 
              className="hero-cta"
              onClick={() => {
                document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              See How It Works ✨
            </button>
          </div>
        </section>

        {/* Demo Section */}
        <section id="demo" className="demo-section">
          <div className="demo-content">
            <div className="demo-header">
              <h2 className="demo-title">Watch Your Words Transform</h2>
              <p className="demo-subtitle">
                See how VibeUp turns everyday thoughts into professional communication
              </p>
            </div>
            
            <div className="demo-container">
              <div className="demo-input">
                <div className="demo-label">What you think</div>
                <div className="demo-text">
                  "{examples[currentExample].input}"
                </div>
              </div>
              
              <div className="demo-arrow">
                <span>↓</span>
              </div>
              
              {showOutput && (
                <div className="demo-output">
                  <div className="demo-label">What you say</div>
                  <div className="demo-text">
                    "{examples[currentExample].output}"
                  </div>
                </div>
              )}
              
              {showPhrases && (
                <div className="demo-phrases">
                  {examples[currentExample].phrases.map((phrase, index) => (
                    <div key={index} className="phrase-tag">
                      {phrase}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <button 
              className="demo-cta"
              onClick={handleTransformation}
            >
              {demoStep === 0 ? 'Try Transformation ✨' : 'Try Another Example ✨'}
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="features-content">
            <h2 className="features-title">Why Professionals Choose VibeUp</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <span>🧠</span>
                </div>
                <h3 className="feature-title">Smart Transform</h3>
                <p className="feature-description">
                  AI turns your raw thoughts into polished communication
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <span>📚</span>
                </div>
                <h3 className="feature-title">Learn Phrases</h3>
                <p className="feature-description">
                  Build vocabulary with explanations for each transformation
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <span>⚡</span>
                </div>
                <h3 className="feature-title">Daily Practice</h3>
                <p className="feature-description">
                  Build better communication habits through regular use
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Transform Your Communication?</h2>
            <p className="cta-description">
              Join thousands of professionals who've leveled up their communication skills with VibeUp
            </p>
            <button 
              className="cta-button"
              onClick={() => router.push('/app')}
            >
              Start Your Free Trial
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 VibeUp. Transform your communication, transform your career.</p>
        </div>
      </footer>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .landing-container {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
          background: #ffffff;
          color: #1a1a1a;
          line-height: 1.6;
          overflow-x: hidden;
        }

        /* Navigation */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          background: #ffffff;
          border-bottom: 2px solid #000000;
          z-index: 9999;
          padding: 1rem 0;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          min-height: 60px;
        }

        .nav-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 100%;
          min-height: 40px;
        }

        .logo {
          height: 2rem;
          width: auto;
        }

        .nav-cta {
          background: #000000;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
          display: inline-block;
        }

        .nav-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        /* Main Content */
        .main-content {
          margin-top: 80px;
          padding-top: 20px;
        }

        /* Hero Section */
        .hero-section {
          padding: 5rem 1.5rem;
          text-align: center;
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
        }

        .hero-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .hero-title {
          font-size: clamp(3rem, 8vw, 5rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #000000 0%, #18181b 50%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.03em;
        }

        .hero-accent {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-description {
          font-size: clamp(1.2rem, 3vw, 1.5rem);
          color: #666;
          margin-bottom: 3rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          font-weight: 500;
        }

        .hero-cta {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: white;
          border: none;
          padding: 1.25rem 2.5rem;
          border-radius: 1rem;
          font-size: 1.125rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .hero-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.25);
        }

        /* Demo Section */
        .demo-section {
          padding: 5rem 1.5rem;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        }

        .demo-content {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }

        .demo-header {
          margin-bottom: 3rem;
        }

        .demo-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #1a1a1a;
        }

        .demo-subtitle {
          font-size: 1.2rem;
          color: #666;
        }

        .demo-container {
          background: white;
          border-radius: 1.5rem;
          padding: 2.5rem;
          box-shadow: 0 8px 32px rgba(0,0,0,0.08);
          margin-bottom: 2rem;
          border: 1px solid #f0f0f0;
        }

        .demo-input, .demo-output {
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 1rem;
          padding: 1.25rem;
          margin-bottom: 1.5rem;
          font-size: 1rem;
          color: #666;
          font-style: italic;
        }

        .demo-output {
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          border-color: #3b82f6;
          color: #1a1a1a;
          font-weight: 500;
          font-style: normal;
          opacity: 0;
          animation: fadeIn 0.5s ease forwards;
        }

        .demo-arrow {
          font-size: 2rem;
          color: #3b82f6;
          margin: 1rem 0;
          animation: bounce 2s infinite;
        }

        .demo-phrases {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 0.75rem;
          margin-top: 1.5rem;
          opacity: 0;
          animation: fadeIn 0.5s ease forwards;
        }

        .phrase-tag {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: white;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          font-size: 0.875rem;
          font-weight: 600;
          text-align: center;
        }

        .demo-cta {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: white;
          border: none;
          padding: 1.25rem 2.5rem;
          border-radius: 1rem;
          font-size: 1.125rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .demo-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.25);
        }

        /* Features Section */
        .features-section {
          padding: 5rem 1.5rem;
          background: white;
        }

        .features-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .features-title {
          text-align: center;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 4rem;
          color: #1a1a1a;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2.5rem;
        }

        .feature-card {
          text-align: center;
          padding: 2.5rem 1.5rem;
          border-radius: 1.25rem;
          background: white;
          border: 1px solid #f0f0f0;
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.1);
        }

        .feature-icon {
          width: 3.75rem;
          height: 3.75rem;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          font-size: 1.5rem;
        }

        .feature-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #1a1a1a;
        }

        .feature-description {
          color: #666;
          font-size: 1rem;
          line-height: 1.6;
        }

        /* CTA Section */
        .cta-section {
          padding: 5rem 1.5rem;
          background: linear-gradient(135deg, #1a1a1a 0%, #3b82f6 100%);
          color: white;
        }

        .cta-content {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }

        .cta-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }

        .cta-description {
          font-size: 1.2rem;
          margin-bottom: 2.5rem;
          opacity: 0.9;
        }

        .cta-button {
          background: white;
          color: #1a1a1a;
          border: none;
          padding: 1.25rem 2.5rem;
          border-radius: 1rem;
          font-size: 1.125rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 255, 255, 0.25);
        }

        /* Footer */
        .footer {
          background: #f8fafc;
          padding: 2.5rem 1.5rem;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
          color: #666;
        }

        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .navbar {
            padding: 0.75rem 0;
          }

          .nav-content {
            padding: 0 1rem;
          }

          .logo {
            height: 1.75rem;
          }

          .nav-cta {
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
          }

          .main-content {
            margin-top: 3.5rem;
          }

          .hero-section {
            padding: 3rem 1rem;
          }

          .demo-section {
            padding: 4rem 1rem;
          }

          .features-section {
            padding: 4rem 1rem;
          }

          .cta-section {
            padding: 4rem 1rem;
          }

          .demo-container {
            padding: 1.5rem;
          }

          .demo-phrases {
            grid-template-columns: 1fr;
          }

          .features-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .feature-card {
            padding: 2rem 1rem;
          }
        }

        @media (max-width: 480px) {
          .navbar {
            padding: 0.5rem 0;
          }

          .nav-content {
            padding: 0 1rem;
          }

          .logo {
            height: 1.5rem;
          }

          .nav-cta {
            padding: 0.5rem 0.75rem;
            font-size: 0.75rem;
          }

          .main-content {
            margin-top: 3rem;
          }

          .hero-section {
            padding: 2rem 1rem;
          }

          .demo-section {
            padding: 3rem 1rem;
          }

          .features-section {
            padding: 3rem 1rem;
          }

          .cta-section {
            padding: 3rem 1rem;
          }

          .demo-title {
            font-size: 2rem;
          }

          .features-title {
            font-size: 2rem;
          }

          .cta-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  )
}