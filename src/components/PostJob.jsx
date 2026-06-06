import React, { useState } from 'react'
import { randomHash, randomMs } from '../lib/data'

const ALL_SKILLS = ['Python', 'Solidity', 'TypeScript', 'DeFi', 'NLP', 'Web3', 'Data Science', 'RAG', 'Rust', 'Go']
const CATEGORIES = ['Data Analysis', 'Smart Contract Audit', 'Content Generation', 'Code Review', 'Research', 'Translation', 'Development']

export default function PostJob({ onPost }) {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [budget, setBudget] = useState('')
  const [cat, setCat] = useState('Data Analysis')
  const [skills, setSkills] = useState([])
  const [posting, setPosting] = useState(false)
  const [error, setError] = useState('')

  const toggleSkill = s => setSkills(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])

  const handlePost = () => {
    if (!title.trim() || !desc.trim() || !budget || parseFloat(budget) <= 0) {
      setError('Please fill in all fields with a valid budget.')
      return
    }
    setError('')
    setPosting(true)
    setTimeout(() => {
      const ms = randomMs()
      const job = {
        id: Date.now(),
        title: title.trim(),
        desc: desc.trim(),
        budget: parseFloat(budget),
        cat,
        skills,
        status: 'open',
        agent: null,
        agentId: null,
        client: '0x' + Math.random().toString(16).slice(2, 10) + '...' + Math.random().toString(16).slice(2, 6),
        contractAddr: '0x0747EEf0706327138c69792bF28Cd525089e4583',
        jobIdOnChain: Math.floor(Math.random() * 900) + 100,
        txs: [{ name: 'createJob', hash: randomHash(), ms }],
        createdAt: Date.now(),
      }
      setPosting(false)
      setTitle(''); setDesc(''); setBudget(''); setSkills([])
      onPost(job, ms)
    }, 1800)
  }

  const inp = {
    width: '100%', background: 'var(--arc-surface2)', border: '1px solid var(--arc-border)',
    borderRadius: 8, padding: '10px 14px', color: 'var(--arc-text)',
    fontSize: 14, outline: 'none', transition: 'border-color 0.15s',
  }

  return (
    <div style={{ background: 'var(--arc-surface)', border: '1px solid var(--arc-border)', borderRadius: 16, padding: 24 }}>
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 4 }}>Create New Job</div>
        <div style={{ fontSize: 13, color: 'var(--arc-muted)' }}>
          Deploys an ERC-8183 contract on Arc Testnet with USDC escrow · gas ~0.000012 USDC
        </div>
      </div>

      {error && (
        <div style={{ marginBottom: 16, padding: '10px 14px', background: 'rgba(255,68,68,0.08)', border: '1px solid rgba(255,68,68,0.25)', borderRadius: 8, color: 'var(--arc-danger)', fontSize: 13 }}>
          ⚠ {error}
        </div>
      )}

      <div style={{ marginBottom: 16 }}>
        <label style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--arc-muted)', textTransform: 'uppercase', letterSpacing: 0.8, display: 'block', marginBottom: 8 }}>
          Job Title
        </label>
        <input
          style={inp} value={title} onChange={e => setTitle(e.target.value)}
          placeholder="e.g. Analyze DeFi protocol security vulnerabilities"
          onFocus={e => e.target.style.borderColor = 'rgba(0,229,160,0.4)'}
          onBlur={e => e.target.style.borderColor = 'var(--arc-border)'}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--arc-muted)', textTransform: 'uppercase', letterSpacing: 0.8, display: 'block', marginBottom: 8 }}>
          Description & Deliverables
        </label>
        <textarea
          style={{ ...inp, resize: 'vertical' }} rows={3} value={desc}
          onChange={e => setDesc(e.target.value)}
          placeholder="Describe what the agent must deliver..."
          onFocus={e => e.target.style.borderColor = 'rgba(0,229,160,0.4)'}
          onBlur={e => e.target.style.borderColor = 'var(--arc-border)'}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
        <div>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--arc-muted)', textTransform: 'uppercase', letterSpacing: 0.8, display: 'block', marginBottom: 8 }}>
            Budget (USDC)
          </label>
          <input
            style={inp} type="number" min="1" value={budget}
            onChange={e => setBudget(e.target.value)} placeholder="50"
            onFocus={e => e.target.style.borderColor = 'rgba(0,229,160,0.4)'}
            onBlur={e => e.target.style.borderColor = 'var(--arc-border)'}
          />
        </div>
        <div>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--arc-muted)', textTransform: 'uppercase', letterSpacing: 0.8, display: 'block', marginBottom: 8 }}>
            Category
          </label>
          <select
            style={{ ...inp, appearance: 'none' }} value={cat} onChange={e => setCat(e.target.value)}
            onFocus={e => e.target.style.borderColor = 'rgba(0,229,160,0.4)'}
            onBlur={e => e.target.style.borderColor = 'var(--arc-border)'}
          >
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div style={{ marginBottom: 22 }}>
        <label style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--arc-muted)', textTransform: 'uppercase', letterSpacing: 0.8, display: 'block', marginBottom: 8 }}>
          Required Skills
        </label>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {ALL_SKILLS.map(s => (
            <span
              key={s}
              onClick={() => toggleSkill(s)}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, padding: '4px 10px', borderRadius: 6, cursor: 'pointer',
                transition: 'all 0.15s', userSelect: 'none',
                background: skills.includes(s) ? 'rgba(0,229,160,0.1)' : 'var(--arc-surface2)',
                border: `1px solid ${skills.includes(s) ? 'rgba(0,229,160,0.4)' : 'var(--arc-border)'}`,
                color: skills.includes(s) ? 'var(--arc-accent)' : 'var(--arc-muted)',
              }}
            >{s}</span>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, borderTop: '1px solid var(--arc-border)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--arc-muted)' }}>
          Finality: <span style={{ color: 'var(--arc-accent)' }}>&lt;0.5s</span> · Gas: <span style={{ color: 'var(--arc-accent)' }}>~0.000012 USDC</span>
        </div>
        <button
          onClick={handlePost}
          disabled={posting}
          style={{
            background: posting ? 'rgba(0,229,160,0.4)' : 'var(--arc-accent)',
            color: '#000', border: 'none', padding: '10px 22px',
            borderRadius: 8, fontSize: 13, fontWeight: 700,
            display: 'inline-flex', alignItems: 'center', gap: 8,
            cursor: posting ? 'not-allowed' : 'pointer', transition: 'opacity 0.15s',
          }}
        >
          {posting ? (
            <>
              <div style={{ width: 14, height: 14, border: '2px solid rgba(0,0,0,0.3)', borderTopColor: '#000', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
              Deploying...
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </>
          ) : (
            <>✦ Deploy Contract</>
          )}
        </button>
      </div>
    </div>
  )
}
