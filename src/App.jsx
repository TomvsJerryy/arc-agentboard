import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import StatsBar from './components/StatsBar'
import JobList from './components/JobList'
import JobDetail from './components/JobDetail'
import PostJob from './components/PostJob'
import AgentsPanel from './components/AgentsPanel'
import LiveFeed from './components/LiveFeed'
import Toast from './components/Toast'
import WalletBar from './components/WalletBar'
import { INITIAL_JOBS, randomHash, timeAgo } from './lib/data'
import { getLatestBlock } from './lib/arc'

const TABS = [
  { id: 'jobs', label: 'Jobs' },
  { id: 'post', label: 'Post Job' },
  { id: 'agents', label: 'Agents' },
  { id: 'feed', label: 'Live Feed' },
]

export default function App() {
  const [tab, setTab] = useState('jobs')
  const [jobs, setJobs] = useState(INITIAL_JOBS)
  const [selectedId, setSelectedId] = useState(null)
  const [toast, setToast] = useState('')
  const [appFeed, setAppFeed] = useState([])
  const [blockNumber, setBlockNumber] = useState(null)
  const [wallet, setWallet] = useState({ address: null, isOnArc: false })

  useEffect(() => {
    getLatestBlock().then(n => { if (n) setBlockNumber(n) })
    const iv = setInterval(() => {
      getLatestBlock().then(n => { if (n) setBlockNumber(n) })
    }, 5000)
    return () => clearInterval(iv)
  }, [])

  const showToast = msg => setToast(msg)

  const handleSelectJob = id => setSelectedId(id)
  const handleBack = () => setSelectedId(null)

  const handleUpdateJob = (updated, ms) => {
    setJobs(prev => prev.map(j => j.id === updated.id ? updated : j))
    const feed = {
      type: 'green',
      text: `Job #${updated.id} <b>${updated.status}</b> · ${updated.txs.at(-1)?.name}()`,
      hash: updated.txs.at(-1)?.hash || randomHash(),
      time: 'just now',
      ms: ms + 'ms',
      ts: Date.now(),
    }
    setAppFeed(prev => [feed, ...prev])
    showToast(`${updated.txs.at(-1)?.name}() confirmed in ${ms}ms`)
  }

  const handlePost = (job, ms) => {
    setJobs(prev => [job, ...prev])
    const feed = {
      type: 'warn',
      text: `New job posted · <b>"${job.title.substring(0, 45)}..."</b>`,
      hash: job.txs[0].hash,
      time: 'just now',
      ms: ms + 'ms',
      ts: Date.now(),
    }
    setAppFeed(prev => [feed, ...prev])
    showToast(`createJob() confirmed in ${ms}ms`)
    setTab('jobs')
  }

  const selectedJob = selectedId ? jobs.find(j => j.id === selectedId) : null

  return (
    <div style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto', padding: '0 20px 80px' }}>
      <Header blockNumber={blockNumber} />
      <WalletBar onWalletChange={setWallet} />
      <StatsBar jobs={jobs} />

      {/* Tabs */}
      <div style={{
        display: 'flex', gap: 4, marginBottom: 24,
        background: 'var(--arc-surface)', border: '1px solid var(--arc-border)',
        borderRadius: 12, padding: 4,
      }}>
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => { setTab(t.id); setSelectedId(null) }}
            style={{
              flex: 1, padding: '8px 12px', borderRadius: 8, border: 'none',
              background: tab === t.id ? 'var(--arc-surface2)' : 'transparent',
              color: tab === t.id ? 'var(--arc-text)' : 'var(--arc-muted)',
              fontSize: 13, fontWeight: 600, transition: 'all 0.2s',
              outline: tab === t.id ? '1px solid var(--arc-border2)' : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}
          >
            {t.label}
            {t.id === 'jobs' && (
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 10,
                background: tab === 'jobs' ? 'rgba(0,229,160,0.15)' : 'rgba(255,255,255,0.07)',
                color: tab === 'jobs' ? 'var(--arc-accent)' : 'var(--arc-muted)',
                padding: '1px 6px', borderRadius: 10,
              }}>{jobs.length}</span>
            )}
            {t.id === 'agents' && (
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 10,
                background: tab === 'agents' ? 'rgba(0,229,160,0.15)' : 'rgba(255,255,255,0.07)',
                color: tab === 'agents' ? 'var(--arc-accent)' : 'var(--arc-muted)',
                padding: '1px 6px', borderRadius: 10,
              }}>4</span>
            )}
          </button>
        ))}
      </div>

      {/* Panels */}
      {tab === 'jobs' && (
        selectedJob
          ? <JobDetail job={selectedJob} onBack={handleBack} onUpdate={handleUpdateJob} wallet={wallet} />
          : <JobList jobs={jobs} onSelect={handleSelectJob} />
      )}
      {tab === 'post' && <PostJob onPost={handlePost} />}
      {tab === 'agents' && <AgentsPanel />}
      {tab === 'feed' && <LiveFeed appFeed={appFeed} />}

      <Toast msg={toast} onDone={() => setToast('')} />
    </div>
  )
}
