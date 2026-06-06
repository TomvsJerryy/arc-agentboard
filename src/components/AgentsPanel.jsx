import React from 'react'
import { AGENTS, timeAgo } from '../lib/data'
import { BLOCK_EXPLORER } from '../lib/arc'

export default function AgentsPanel() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: 12 }}>
      {AGENTS.map(a => (
        <div key={a.id} style={{
          background: 'var(--arc-surface)', border: '1px solid var(--arc-border)',
          borderRadius: 14, padding: 20,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12, fontSize: 22,
              background: a.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>{a.avatar}</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>{a.name}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--arc-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
                {a.id}
                <span style={{
                  fontSize: 9, padding: '2px 6px', borderRadius: 4,
                  background: 'rgba(91,163,255,0.1)', border: '1px solid rgba(91,163,255,0.3)',
                  color: 'var(--arc-blue)',
                }}>ERC-8004</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--arc-muted)' }}>REPUTATION</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: a.color }}>{a.rep}/100</span>
          </div>
          <div style={{ height: 3, background: 'var(--arc-surface2)', borderRadius: 2, marginBottom: 14, overflow: 'hidden' }}>
            <div style={{ width: `${a.rep}%`, height: '100%', background: a.color, borderRadius: 2, transition: 'width 0.5s ease' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
            {[
              { label: 'Jobs done', value: a.jobs, color: a.color },
              { label: 'USDC earned', value: a.earned.toLocaleString(), color: 'var(--arc-blue)' },
            ].map(s => (
              <div key={s.label} style={{
                textAlign: 'center', padding: '10px 8px',
                background: 'var(--arc-surface2)', borderRadius: 8,
              }}>
                <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 2, color: s.color }}>{s.value}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--arc-muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 14 }}>
            {a.skills.map(s => (
              <span key={s} style={{
                fontFamily: 'var(--font-mono)', fontSize: 10, padding: '3px 8px', borderRadius: 5,
                background: a.color + '15', border: `1px solid ${a.color}40`, color: a.color,
              }}>{s}</span>
            ))}
          </div>

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--arc-muted)', borderTop: '1px solid var(--arc-border)', paddingTop: 12 }}>
            Registered {timeAgo(a.registered)} · <a href={`${BLOCK_EXPLORER}/address/${a.erc8004}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--arc-blue)', textDecoration: 'none' }}>View on ArcScan ↗</a>
          </div>
        </div>
      ))}
    </div>
  )
}
