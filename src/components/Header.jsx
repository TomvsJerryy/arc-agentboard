import React from 'react'

export default function Header({ blockNumber, gasPrice }) {
  return (
    <header style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 0', marginBottom: '28px',
      borderBottom: '1px solid var(--arc-border)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 38, height: 38, background: 'var(--arc-accent)',
          borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="#000">
            <path d="M10 2L18 7V13L10 18L2 13V7L10 2Z"/>
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.5 }}>
            Arc <span style={{ color: 'var(--arc-accent)' }}>AgentBoard</span>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--arc-muted)', marginTop: 1 }}>
            ERC-8183 Job Marketplace
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
        {blockNumber && (
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 11,
            background: 'rgba(0,229,160,0.08)', border: '1px solid rgba(0,229,160,0.2)',
            color: 'var(--arc-accent)', padding: '4px 10px', borderRadius: 20,
          }}>
            Block #{blockNumber.toLocaleString()}
          </div>
        )}
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 11,
          background: 'var(--arc-surface)', border: '1px solid var(--arc-border)',
          color: 'var(--arc-muted)', padding: '4px 10px', borderRadius: 20,
          display: 'flex', alignItems: 'center', gap: 5,
        }}>
          <span style={{
            display: 'inline-block', width: 6, height: 6,
            background: 'var(--arc-accent)', borderRadius: '50%',
            animation: 'pulseDot 1.5s infinite',
          }}/>
          Arc Testnet · 5042002
        </div>
        <style>{`
          @keyframes pulseDot { 0%,100%{opacity:1} 50%{opacity:0.3} }
        `}</style>
      </div>
    </header>
  )
}
