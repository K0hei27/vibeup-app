'use client'

import React, { useState, useEffect } from 'react'

interface UsageData {
  usage: {
    date: string
    requests: number
    tokens: number
    cost: number
  }
  limit: number
  remaining: number
}

export default function AdminDashboard() {
  const [usage, setUsage] = useState<UsageData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsage()
    // Refresh every 30 seconds
    const interval = setInterval(fetchUsage, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchUsage = async () => {
    try {
      const response = await fetch('/api/usage')
      const data = await response.json()
      setUsage(data)
    } catch (error) {
      console.error('Failed to fetch usage:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>Loading usage data...</h1>
      </div>
    )
  }

  if (!usage) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>Failed to load usage data</h1>
      </div>
    )
  }

  const usagePercentage = (usage.usage.requests / usage.limit) * 100

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      padding: '40px',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1 style={{ 
        fontSize: '32px', 
        fontWeight: '800', 
        marginBottom: '32px',
        color: '#000'
      }}>
        VibeUp Cost Dashboard
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {/* Requests */}
        <div style={{
          backgroundColor: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '24px',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 8px 0', color: '#64748b', fontSize: '14px' }}>
            DAILY REQUESTS
          </h3>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#000' }}>
            {usage.usage.requests}
          </div>
          <div style={{ fontSize: '14px', color: '#64748b' }}>
            of {usage.limit} limit
          </div>
        </div>

        {/* Remaining */}
        <div style={{
          backgroundColor: usage.remaining < 100 ? '#fef2f2' : '#f0fdf4',
          border: `1px solid ${usage.remaining < 100 ? '#fecaca' : '#bbf7d0'}`,
          borderRadius: '12px',
          padding: '24px',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 8px 0', color: '#64748b', fontSize: '14px' }}>
            REMAINING
          </h3>
          <div style={{ 
            fontSize: '32px', 
            fontWeight: '800', 
            color: usage.remaining < 100 ? '#dc2626' : '#059669'
          }}>
            {usage.remaining}
          </div>
          <div style={{ fontSize: '14px', color: '#64748b' }}>
            requests left
          </div>
        </div>

        {/* Tokens */}
        <div style={{
          backgroundColor: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '24px',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 8px 0', color: '#64748b', fontSize: '14px' }}>
            TOKENS USED
          </h3>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#000' }}>
            {usage.usage.tokens.toLocaleString()}
          </div>
          <div style={{ fontSize: '14px', color: '#64748b' }}>
            total tokens
          </div>
        </div>

        {/* Cost */}
        <div style={{
          backgroundColor: '#fef3f2',
          border: '1px solid #fecaca',
          borderRadius: '12px',
          padding: '24px',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 8px 0', color: '#64748b', fontSize: '14px' }}>
            ESTIMATED COST
          </h3>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#dc2626' }}>
            ${usage.usage.cost.toFixed(4)}
          </div>
          <div style={{ fontSize: '14px', color: '#64748b' }}>
            today
          </div>
        </div>
      </div>

      {/* Usage Bar */}
      <div style={{
        backgroundColor: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '32px'
      }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '700' }}>
          Daily Usage Progress
        </h3>
        <div style={{
          backgroundColor: '#e2e8f0',
          borderRadius: '8px',
          height: '12px',
          overflow: 'hidden'
        }}>
          <div style={{
            backgroundColor: usagePercentage > 80 ? '#dc2626' : usagePercentage > 60 ? '#f59e0b' : '#059669',
            height: '100%',
            width: `${Math.min(usagePercentage, 100)}%`,
            transition: 'width 0.3s ease'
          }} />
        </div>
        <div style={{ 
          marginTop: '8px', 
          fontSize: '14px', 
          color: '#64748b',
          textAlign: 'center'
        }}>
          {usagePercentage.toFixed(1)}% of daily limit used
        </div>
      </div>

      {/* Status */}
      <div style={{
        backgroundColor: usage.remaining < 100 ? '#fef2f2' : '#f0fdf4',
        border: `1px solid ${usage.remaining < 100 ? '#fecaca' : '#bbf7d0'}`,
        borderRadius: '12px',
        padding: '24px',
        textAlign: 'center'
      }}>
        <h3 style={{ 
          margin: '0 0 8px 0', 
          fontSize: '18px', 
          fontWeight: '700',
          color: usage.remaining < 100 ? '#dc2626' : '#059669'
        }}>
          {usage.remaining < 100 ? '⚠️ Usage Alert' : '✅ All Good'}
        </h3>
        <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
          {usage.remaining < 100 
            ? 'Approaching daily limit. Consider upgrading or implementing user authentication.'
            : 'Usage is within safe limits for the day.'
          }
        </p>
      </div>

      <div style={{ 
        marginTop: '32px', 
        padding: '16px', 
        backgroundColor: '#f1f5f9',
        borderRadius: '8px',
        fontSize: '12px',
        color: '#64748b'
      }}>
        <strong>Cost Protection Active:</strong><br />
        • 500 character limit per request<br />
        • 1,000 requests per day limit<br />
        • Fallback responses when API fails<br />
        • Last updated: {new Date().toLocaleTimeString()}
      </div>
    </div>
  )
}