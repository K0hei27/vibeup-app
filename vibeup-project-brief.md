# VibeUp Project Brief for Claude Code

## Project Overview
Build VibeUp - a personal communication learning app that transforms raw thoughts into natural expressions through daily practice.

## Core Concept
- Personal tool for improving daily communication (like Duolingo for expression)
- Transform messy thoughts → natural language → learn key phrases → build habit
- Casual, fun approach (not formal/academic)
- Target: Young professionals/students wanting better communication

## User Experience Flow
1. Open app → "What's on your mind? 💭"
2. Type raw thought: "I'm super annoyed my boss keeps changing stuff"
3. AI transforms: "I'm finding it challenging to adapt to the frequently changing requirements"
4. Learn phrases: "finding it challenging", "frequently changing", "adapt to"
5. Save to personal collection
6. Optional: Share polished thought to Twitter

## Technical Requirements
- Next.js 14 + TypeScript + Tailwind CSS
- Supabase Direct SDK (auth, database)
- Google Gemini API for transformations
- PWA optimized for iPhone (375px width)
- Deploy to Vercel (free tier)
- Budget: $0/month
- Claude Code uses MCP for development assistance only

## Design System
- Colors: Pure black (#000000), white (#ffffff), blue accent (#3b82f6)
- Typography: System fonts with tight letter spacing
- Mobile-first: iPhone 375px optimized
- Components: Cards, smooth animations, rounded corners
- Style: Minimalist, clean, modern AI app aesthetic

## Database Schema
users: id, email, created_at, preferences, streak_count
sessions: id, user_id, original_text, transformed_text, key_phrases, created_at
phrases: id, user_id, phrase, context, usage_example, learned_date

## Key Features (MVP)
1. Text input with transformation
2. Key phrase extraction and explanation
3. Personal phrase collection
4. Session history
5. Twitter sharing integration
6. Basic PWA functionality

## Success Criteria
- Works offline-first on iPhone
- Transforms text naturally and helpfully
- Saves/retrieves user data via MCP
- Feels fast and responsive
- Encourages daily usage habit

## Prototype Code

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VibeUp - UI Prototype</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
            background: linear-gradient(135deg, #fafafa 0%, #f4f4f5 100%);
            min-height: 100vh;
            padding: 40px 20px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .phone-frame {
            width: 375px;
            height: 812px;
            background: #1d1d1f;
            border-radius: 40px;
            padding: 2px;
            box-shadow: 0 20px 80px rgba(0,0,0,0.15);
            position: relative;
        }

        .screen {
            width: 100%;
            height: 100%;
            background: #ffffff;
            border-radius: 38px;
            overflow: hidden;
            position: relative;
        }

        .notch {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 164px;
            height: 30px;
            background: #1d1d1f;
            border-radius: 0 0 18px 18px;
            z-index: 10;
        }

        .status-bar {
            height: 54px;
            background: #ffffff;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            padding: 0 30px 10px 30px;
            font-size: 16px;
            font-weight: 600;
            color: #1d1d1f;
        }

        .app-container {
            padding: 0 24px 24px 24px;
            height: calc(812px - 54px - 90px);
            overflow-y: auto;
            background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);
        }

        .header {
            text-align: center;
            margin-bottom: 32px;
            padding-top: 24px;
        }

        .app-title {
            font-size: 36px;
            font-weight: 800;
            background: linear-gradient(135deg, #000000 0%, #18181b 50%, #27272a 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 8px;
            letter-spacing: -0.03em;
        }

        .app-subtitle {
            font-size: 17px;
            color: #52525b;
            font-weight: 500;
            line-height: 1.4;
        }

        .context-pill {
            background: linear-gradient(135deg, #f4f4f5 0%, #e4e4e7 100%);
            color: #18181b;
            border: 1px solid #d4d4d8;
            padding: 10px 18px;
            border-radius: 25px;
            font-size: 14px;
            font-weight: 600;
            margin: 24px auto;
            display: inline-block;
            letter-spacing: 0.01em;
        }

        .input-section {
            margin-bottom: 24px;
        }

        .input-label {
            font-size: 20px;
            font-weight: 700;
            color: #09090b;
            margin-bottom: 16px;
            letter-spacing: -0.02em;
        }

        .input-container {
            position: relative;
        }

        .input-textarea {
            width: 100%;
            min-height: 120px;
            padding: 20px;
            border: 2px solid #e4e4e7;
            border-radius: 20px;
            font-size: 17px;
            font-family: inherit;
            resize: none;
            background: #ffffff;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            line-height: 1.5;
            letter-spacing: -0.01em;
        }

        .input-textarea:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
            background: #fffffe;
        }

        .input-textarea::placeholder {
            color: #a1a1aa;
            font-weight: 400;
        }

        .transform-button {
            width: 100%;
            background: linear-gradient(135deg, #000000 0%, #18181b 100%);
            color: white;
            border: none;
            padding: 18px;
            border-radius: 20px;
            font-size: 18px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            margin-bottom: 24px;
            position: relative;
            overflow: hidden;
            letter-spacing: -0.01em;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        .transform-button:active {
            transform: scale(0.98);
        }

        .transform-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
        }

        .transform-button.loading {
            background: linear-gradient(135deg, #71717a 0%, #52525b 100%);
            animation: pulse 1.5s infinite;
            box-shadow: 0 6px 20px rgba(113, 113, 122, 0.25);
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(15px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .result-section {
            background: #ffffff;
            border-radius: 24px;
            padding: 28px;
            margin-bottom: 24px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            border: 1px solid #f4f4f5;
            animation: slideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            opacity: 0;
        }

        .result-section.show {
            opacity: 1;
        }

        .result-title {
            font-size: 20px;
            font-weight: 700;
            color: #09090b;
            margin-bottom: 18px;
            display: flex;
            align-items: center;
            gap: 10px;
            letter-spacing: -0.02em;
        }

        .professional-text {
            font-size: 17px;
            line-height: 1.6;
            color: #18181b;
            background: linear-gradient(135d, #f9fafb 0%, #f4f4f5 100%);
            padding: 20px;
            border-radius: 16px;
            border-left: 4px solid #3b82f6;
            margin-bottom: 24px;
            font-weight: 500;
            animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s both;
            letter-spacing: -0.01em;
        }

        .key-phrases {
            animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both;
            opacity: 0;
        }

        .key-phrases.show {
            opacity: 1;
        }

        .phrases-title {
            font-size: 18px;
            font-weight: 700;
            color: #09090b;
            margin-bottom: 16px;
            letter-spacing: -0.02em;
        }

        .phrase-card {
            background: linear-gradient(135deg, #f9fafb 0%, #f4f4f5 100%);
            color: #27272a;
            border: 1.5px solid #e4e4e7;
            padding: 16px 18px;
            border-radius: 16px;
            margin-bottom: 10px;
            font-size: 16px;
            font-weight: 600;
            transform: translateX(-15px);
            opacity: 0;
            animation: slideInPhrase 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            letter-spacing: -0.01em;
        }

        .phrase-card:nth-child(2) { animation-delay: 0.5s; }
        .phrase-card:nth-child(3) { animation-delay: 0.7s; }
        .phrase-card:nth-child(4) { animation-delay: 0.9s; }

        @keyframes slideInPhrase {
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        .save-button {
            width: 100%;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            border: none;
            padding: 16px;
            border-radius: 18px;
            font-size: 17px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 1.1s both;
            opacity: 0;
            letter-spacing: -0.01em;
            box-shadow: 0 6px 20px rgba(16, 185, 129, 0.25);
        }

        .save-button.show {
            opacity: 1;
        }

        .save-button:active {
            transform: scale(0.98);
        }

        .save-button:hover {
            transform: translateY(-1px);
            box-shadow: 0 8px 25px rgba(16, 185, 129, 0.35);
        }

        .save-button.saved {
            background: linear-gradient(135deg, #059669 0%, #047857 100%);
            transform: scale(1.01);
        }

        .hidden {
            display: none;
        }

        .home-indicator {
            position: absolute;
            bottom: 8px;
            left: 50%;
            transform: translateX(-50%);
            width: 134px;
            height: 5px;
            background: #1d1d1f;
            border-radius: 3px;
            opacity: 0.8;
        }

        /* Subtle background pattern */
        .app-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
                radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.02) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(0, 0, 0, 0.02) 0%, transparent 50%);
            pointer-events: none;
        }
    </style>
</head>
<body>
    <div class="phone-frame">
        <div class="screen">
            <div class="notch"></div>
            
            <div class="status-bar">
                <span>9:41</span>
                <span>●●●● 🔋</span>
            </div>
            
            <div class="app-container">
                <div class="header">
                    <h1 class="app-title">VibeUp</h1>
                    <p class="app-subtitle">Express yourself with the perfect vibe</p>
                    <div class="context-pill">Casual • Thoughtful • Natural</div>
                </div>

                <div class="input-section">
                    <div class="input-label">What's on your mind? 💭</div>
                    <div class="input-container">
                        <textarea 
                            class="input-textarea" 
                            id="userInput"
                            placeholder="Share your thoughts, feelings, or what you want to express..."
                        >I'm so annoyed that my boss keeps changing the deadline and I can't keep up</textarea>
                    </div>
                </div>

                <button class="transform-button" id="transformBtn" onclick="transformText()">
                    Vibe It Up ✨
                </button>

                <div class="result-section hidden" id="resultSection">
                    <div class="result-title">
                        🌟 Natural Expression
                    </div>
                    <div class="professional-text" id="professionalText">
                        I'm finding it challenging to adapt to the frequently shifting deadlines and would appreciate more consistency in our timeline planning.
                    </div>
                    
                    <div class="key-phrases" id="keyPhrases">
                        <div class="phrases-title">Key Natural Phrases</div>
                        <div class="phrase-card">"finding it challenging" - Acknowledges difficulty without blame</div>
                        <div class="phrase-card">"shifting deadlines" - Neutral way to describe changes</div>
                        <div class="phrase-card">"would appreciate" - Constructive request approach</div>
                    </div>

                    <button class="save-button" id="saveBtn" onclick="saveSession()">
                        Save to My Collection 🎯
                    </button>
                </div>
            </div>

            <div class="home-indicator"></div>
        </div>
    </div>

    <script>
        function transformText() {
            const input = document.getElementById('userInput').value;
            const resultSection = document.getElementById('resultSection');
            const transformBtn = document.getElementById('transformBtn');
            const keyPhrases = document.getElementById('keyPhrases');
            const saveBtn = document.getElementById('saveBtn');
            
            if (!input.trim()) {
                // Add shake animation for empty input
                document.getElementById('userInput').style.animation = 'shake 0.5s';
                setTimeout(() => {
                    document.getElementById('userInput').style.animation = '';
                }, 500);
                return;
            }

            // Loading state
            transformBtn.textContent = 'Finding your perfect vibe...';
            transformBtn.classList.add('loading');
            transformBtn.disabled = true;
            
            // Hide results first
            resultSection.classList.add('hidden');
            resultSection.classList.remove('show');
            keyPhrases.classList.remove('show');
            saveBtn.classList.remove('show');
            
            setTimeout(() => {
                // Show result section
                resultSection.classList.remove('hidden');
                
                setTimeout(() => {
                    resultSection.classList.add('show');
                    
                    // Show key phrases after natural text
                    setTimeout(() => {
                        keyPhrases.classList.add('show');
                        
                        // Show save button last
                        setTimeout(() => {
                            saveBtn.classList.add('show');
                        }, 1100);
                    }, 500);
                }, 100);
                
                // Reset button
                transformBtn.textContent = 'Vibe It Up ✨';
                transformBtn.classList.remove('loading');
                transformBtn.disabled = false;
                
                // Smooth scroll to result
                setTimeout(() => {
                    resultSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            }, 2200);
        }

        function saveSession() {
            const saveBtn = document.getElementById('saveBtn');
            const originalText = saveBtn.textContent;
            
            saveBtn.textContent = 'Vibed Up! 🎉';
            saveBtn.classList.add('saved');
            
            // Add haptic-like effect
            navigator.vibrate && navigator.vibrate(50);
            
            setTimeout(() => {
                saveBtn.textContent = originalText;
                saveBtn.classList.remove('saved');
            }, 2000);
        }

        // Add shake animation for empty input
        const style = document.createElement('style');
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-3px); }
                75% { transform: translateX(3px); }
            }
        `;
        document.head.appendChild(style);

        // Enhanced interactivity
        document.addEventListener('DOMContentLoaded', function() {
            const textarea = document.getElementById('userInput');
            
            textarea.addEventListener('focus', function() {
                this.style.transform = 'translateY(-1px)';
            });
            
            textarea.addEventListener('blur', function() {
                this.style.transform = 'translateY(0)';
            });

            // Add typing animation simulation
            textarea.addEventListener('input', function() {
                this.style.borderColor = '#3b82f6';
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    if (!this.matches(':focus')) {
                        this.style.borderColor = '#e4e4e7';
                    }
                }, 1000);
            });
        });
    </script>
</body>
</html>