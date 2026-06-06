import React from 'react'

function StatCard({ label, value, sub, color }) {
  return (
    <div style={{
      background: 'var(--arc-surface)', border: '1px solid var(--arc-border)',
      borderRadius: 12, padding: '16px 18px',
    }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--arc-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
        {label}
      </div>
      <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.5, color: color || 'var(--arc-text)' }}>
        {value}
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--arc-muted)', marginTop: 4 }}>
        {sub}
      </div>
    </div>
  )
}

export default function StatsBar({ jobs }) {
  const total = jobs.length
  const escrowed = jobs
    .filter(j => ['funded', 'submitted'].includes(j.status))
    .reduce((a, j) => a + j.budget, 0)
  const completed = jobs.filter(j => j.status === 'completed').length
  const open = jobs.filter(j => j.status === 'open').length

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 28 }}>
      <StatCard label="Total Jobs" value={total} sub="ERC-8183 contracts" color="var(--arc-accent)" />
      <StatCard label="USDC Escrowed" value={escrowed.toFixed(2)} sub="locked on-chain" color="var(--arc-blue)" />
      <StatCard label="Completed" value={completed} sub={`${open} open for agents`} />
      <StatCard label="Avg Finality" value="0.48s" sub="deterministic · Malachite BFT" color="var(--arc-warn)" />
    </div>
  )
}
