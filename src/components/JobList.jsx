import React from 'react'
import { STATUS_META, timeAgo } from '../lib/data'

function StatusBadge({ status }) {
  const m = STATUS_META[status] || STATUS_META.open
  return (
    <span style={{
      fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
      padding: '4px 10px', borderRadius: 20, whiteSpace: 'nowrap',
      color: m.color, background: m.bg, border: `1px solid ${m.border}`,
    }}>
      {m.label}
    </span>
  )
}

function JobCard({ job, onClick }) {
  return (
    <div
      onClick={() => onClick(job.id)}
      style={{
        background: 'var(--arc-surface)', border: '1px solid var(--arc-border)',
        borderRadius: 12, padding: '18px 20px', cursor: 'pointer',
        transition: 'border-color 0.2s, background 0.2s',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--arc-border2)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--arc-border)'}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{job.title}</div>
          <div style={{ fontSize: 13, color: 'var(--arc-muted)', lineHeight: 1.5 }}>
            {job.desc.substring(0, 110)}...
          </div>
        </div>
        <StatusBadge status={job.status} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
        <Chip color="blue">💰 {job.budget} USDC</Chip>
        <Chip>{job.cat}</Chip>
        {job.agent
          ? <Chip>🤖 {job.agent}</Chip>
          : <Chip muted>⏳ Awaiting agent</Chip>}
        <Chip>⚡ {job.txs.length} txs</Chip>
        <Chip muted style={{ marginLeft: 'auto' }}>{timeAgo(job.createdAt)}</Chip>
      </div>
    </div>
  )
}

function Chip({ children, color, muted, style }) {
  return (
    <span style={{
      fontFamily: 'var(--font-mono)', fontSize: 10,
      padding: '3px 8px', borderRadius: 6,
      background: color === 'blue' ? 'rgba(91,163,255,0.1)' : 'var(--arc-surface2)',
      border: `1px solid ${color === 'blue' ? 'rgba(91,163,255,0.3)' : 'var(--arc-border)'}`,
      color: color === 'blue' ? 'var(--arc-blue)' : muted ? 'var(--arc-muted)' : 'var(--arc-muted)',
      display: 'inline-flex', alignItems: 'center', gap: 3,
      ...style,
    }}>
      {children}
    </span>
  )
}

export default function JobList({ jobs, onSelect }) {
  if (jobs.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--arc-muted)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
        No jobs yet. Post the first one!
      </div>
    )
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {jobs.map(j => <JobCard key={j.id} job={j} onClick={onSelect} />)}
    </div>
  )
}

export { StatusBadge }
