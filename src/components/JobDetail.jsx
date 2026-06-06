import React, { useState } from 'react'
import { STATUS_META, STATUS_IDX, LC_STEPS, AGENTS, randomHash, randomMs } from '../lib/data'
import { BLOCK_EXPLORER } from '../lib/arc'
import { StatusBadge } from './JobList'

const TX_ICONS = {
  createJob: '📝', setBudget: '💱', approve: '✅', fund: '🔒',
  submit: '📤', complete: '🎉', reject: '❌',
}

function Lifecycle({ status }) {
  const cur = STATUS_IDX[status] ?? 0
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24, overflowX: 'auto', paddingBottom: 4 }}>
      {LC_STEPS.map((step, i) => {
        const done = i < cur
        const current = i === cur && status !== 'rejected'
        return (
          <React.Fragment key={step}>
            {i > 0 && (
              <div style={{
                flex: 1, height: 1, minWidth: 16,
                background: done ? 'var(--arc-accent)' : 'var(--arc-border)',
                marginBottom: 18, transition: 'background 0.3s',
              }} />
            )}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, minWidth: 64 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, transition: 'all 0.3s', position: 'relative', zIndex: 1,
                border: `2px solid ${done ? 'var(--arc-accent)' : current ? 'var(--arc-warn)' : 'var(--arc-border)'}`,
                background: done ? 'rgba(0,229,160,0.15)' : current ? 'rgba(255,184,0,0.15)' : 'var(--arc-surface2)',
                color: done ? 'var(--arc-accent)' : current ? 'var(--arc-warn)' : 'var(--arc-muted)',
                boxShadow: current ? '0 0 0 4px rgba(255,184,0,0.15)' : 'none',
              }}>
                {done ? '✓' : i + 1}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 9, textAlign: 'center',
                color: done ? 'var(--arc-accent)' : current ? 'var(--arc-warn)' : 'var(--arc-muted)',
              }}>
                {step}
              </div>
            </div>
          </React.Fragment>
        )
      })}
    </div>
  )
}

function TxRow({ tx }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '8px 12px', background: 'var(--arc-surface2)',
      border: '1px solid var(--arc-border)', borderRadius: 8,
    }}>
      <div style={{
        width: 28, height: 28, borderRadius: 7, flexShrink: 0,
        background: 'rgba(0,229,160,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 14,
      }}>
        {TX_ICONS[tx.name] || '⚡'}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 600 }}>{tx.name}()</div>
        <a
          href={`${BLOCK_EXPLORER}/tx/${tx.hash}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--arc-blue)',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            display: 'block', textDecoration: 'none',
          }}
        >
          {tx.hash}
        </a>
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--arc-accent)' }}>
          {tx.ms}ms
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--arc-muted)' }}>finality</div>
      </div>
    </div>
  )
}

function Processing({ text }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '12px 16px', background: 'rgba(0,229,160,0.06)',
      border: '1px solid rgba(0,229,160,0.2)', borderRadius: 10, marginBottom: 14,
    }}>
      <div style={{
        width: 16, height: 16, border: '2px solid rgba(0,229,160,0.2)',
        borderTopColor: 'var(--arc-accent)', borderRadius: '50%',
        animation: 'spin 0.7s linear infinite', flexShrink: 0,
      }} />
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--arc-accent)' }}>{text}</span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

const PROC_MSGS = [
  'Signing transaction with wallet...',
  'Broadcasting to Arc testnet...',
  'Waiting for block inclusion...',
  'Malachite BFT achieving finality...',
  'Confirmed ✓',
]

export default function JobDetail({ job, onBack, onUpdate }) {
  const [processing, setProcessing] = useState(false)
  const [procMsg, setProcMsg] = useState('')

  const simulate = (newStatus, txName, assignAgent) => {
    setProcessing(true)
    let i = 0
    setProcMsg(PROC_MSGS[0])
    const iv = setInterval(() => {
      i++
      if (i < PROC_MSGS.length) setProcMsg(PROC_MSGS[i])
    }, 380)
    setTimeout(() => {
      clearInterval(iv)
      setProcessing(false)
      const ms = randomMs()
      const updated = {
        ...job,
        status: newStatus,
        txs: [...job.txs, { name: txName, hash: randomHash(), ms }],
        agent: assignAgent || job.agent,
        agentId: assignAgent
          ? (AGENTS.find(a => a.name === assignAgent)?.id || job.agentId)
          : job.agentId,
      }
      onUpdate(updated, ms)
    }, PROC_MSGS.length * 380 + 200)
  }

  const doFund = () => {
    const ag = AGENTS[Math.floor(Math.random() * AGENTS.length)]
    simulate('funded', 'fund', ag.name)
  }
  const doSubmit = () => simulate('submitted', 'submit')
  const doComplete = () => simulate('completed', 'complete')
  const doReject = () => simulate('rejected', 'reject')

  const nextAction = {
    open: {
      label: `Fund Escrow · ${job.budget} USDC`,
      fn: doFund,
      desc: 'Lock USDC escrow via the ERC-8183 contract. An available agent will be auto-assigned and the job moves to Funded state.',
    },
    funded: {
      label: 'Submit Deliverable Hash',
      fn: doSubmit,
      desc: 'Agent submits a keccak256 hash of the deliverable on-chain. Job moves to Submitted state awaiting evaluator review.',
    },
    submitted: {
      label: 'Approve & Release Payment',
      fn: doComplete,
      desc: 'Evaluator approves the deliverable. USDC escrow is instantly released to the agent wallet — sub-second settlement.',
    },
  }[job.status]

  return (
    <div style={{ background: 'var(--arc-surface)', border: '1px solid var(--arc-border)', borderRadius: 16, overflow: 'hidden' }}>
      {/* Header */}
      <div style={{
        padding: '18px 24px', borderBottom: '1px solid var(--arc-border)',
        display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'transparent', border: '1px solid var(--arc-border)',
            color: 'var(--arc-muted)', fontFamily: 'var(--font-mono)', fontSize: 11,
            padding: '6px 12px', borderRadius: 8, transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.target.style.borderColor = 'var(--arc-border2)'; e.target.style.color = 'var(--arc-text)' }}
          onMouseLeave={e => { e.target.style.borderColor = 'var(--arc-border)'; e.target.style.color = 'var(--arc-muted)' }}
        >
          ← Back
        </button>
        <div style={{ flex: 1, fontSize: 15, fontWeight: 800 }}>{job.title}</div>
        <StatusBadge status={job.status} />
      </div>

      {/* Body */}
      <div style={{ padding: 24 }}>
        <p style={{ fontSize: 13, color: 'var(--arc-muted)', lineHeight: 1.6, marginBottom: 24 }}>{job.desc}</p>

        <Lifecycle status={job.status} />

        {/* Fields */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {[
            { label: 'Budget', value: `${job.budget} USDC`, color: 'var(--arc-blue)' },
            { label: 'Category', value: job.cat },
            { label: 'ERC-8183 Contract', value: job.contractAddr, mono: true, color: 'var(--arc-accent)' },
            { label: 'Assigned Agent', value: job.agent || '—' },
            { label: 'Job ID On-Chain', value: `#${job.jobIdOnChain}`, mono: true },
            { label: 'Client', value: job.client, mono: true },
          ].map(f => (
            <div key={f.label}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--arc-muted)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 }}>
                {f.label}
              </div>
              <div style={{
                fontSize: f.mono ? 11 : 14, fontWeight: 600,
                fontFamily: f.mono ? 'var(--font-mono)' : 'inherit',
                color: f.color || 'var(--arc-text)', wordBreak: 'break-all',
              }}>
                {f.value}
              </div>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--arc-muted)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>
            Required Skills
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {job.skills.map(s => (
              <span key={s} style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, padding: '3px 10px', borderRadius: 6,
                background: 'rgba(0,229,160,0.08)', border: '1px solid rgba(0,229,160,0.25)', color: 'var(--arc-accent)',
              }}>{s}</span>
            ))}
          </div>
        </div>

        {/* Tx Log */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--arc-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>
            Transaction Log — Arc Testnet
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 220, overflowY: 'auto' }}>
            {job.txs.map((tx, i) => <TxRow key={i} tx={tx} />)}
          </div>
        </div>

        {/* Action */}
        <div style={{ borderTop: '1px solid var(--arc-border)', paddingTop: 20 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--arc-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>
            Next Action
          </div>
          {processing && <Processing text={procMsg} />}
          {nextAction && !processing && (
            <>
              <p style={{ fontSize: 13, color: 'var(--arc-muted)', marginBottom: 14, lineHeight: 1.5 }}>
                {nextAction.desc}
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button
                  onClick={nextAction.fn}
                  style={{
                    background: 'var(--arc-accent)', color: '#000', border: 'none',
                    padding: '10px 20px', borderRadius: 8, fontSize: 13, fontWeight: 700,
                    display: 'inline-flex', alignItems: 'center', gap: 6, transition: 'opacity 0.15s',
                  }}
                  onMouseEnter={e => e.target.style.opacity = '0.85'}
                  onMouseLeave={e => e.target.style.opacity = '1'}
                >
                  ✓ {nextAction.label}
                </button>
                {job.status === 'open' && (
                  <button
                    onClick={doReject}
                    style={{
                      background: 'rgba(255,68,68,0.1)', color: 'var(--arc-danger)',
                      border: '1px solid rgba(255,68,68,0.3)', padding: '10px 18px',
                      borderRadius: 8, fontSize: 13, fontWeight: 700, transition: 'all 0.15s',
                    }}
                  >
                    Reject
                  </button>
                )}
              </div>
            </>
          )}
          {!nextAction && !processing && (
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--arc-muted)' }}>
              Job {job.status}. No further action required.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
