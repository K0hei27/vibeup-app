'use client'

import React, { useState, useEffect } from 'react'
import MobileLanding from './MobileLanding'
import DesktopLanding from './DesktopLanding'

export default function ResponsiveLanding() {
  const [isMobile, setIsMobile] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    // Check initial screen size
    checkIsMobile()
    setIsLoaded(true)

    // Add resize listener
    window.addEventListener('resize', checkIsMobile)

    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [])

  // Show loading state to prevent hydration mismatch
  if (!isLoaded) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
      }}>
        <div>Loading...</div>
      </div>
    )
  }

  return isMobile ? <MobileLanding /> : <DesktopLanding />
}