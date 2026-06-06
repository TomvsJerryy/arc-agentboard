import React, { useEffect, useState } from 'react'
import { getLatestBlocks } from '../lib/arc'
import { timeAgo } from '../lib/data'

const DOT_COLOR = { green: 'var(--arc-accent)', blue: 'var(--arc-blue)', warn: 'var(--arc-warn)', purple: 'var(--arc-purple)' }

function FeedItem({ item }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '11px 16px', background: 'var(--arc-surface)',
      border: '1px solid var(--arc-border)', borderRadius: 10,
    }}>
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: DOT_COLOR[item.type] || 'var(--arc-muted)', flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13 }} dangerouslySetInnerHTML={{ __html: item.text }} />
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--arc-muted)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {item.hash}
        </div>
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--arc-muted)' }}>{item.time}</div>
        {item.ms && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--arc-accent)' }}>{item.ms}</div>}
      </div>
    </div>
  )
}

export default function LiveFeed({ appFeed }) {
  const [chainBlocks, setChainBlocks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getLatestBlocks(6).then(blocks => {
      setChainBlocks(blocks)
      setLoading(false)
    })
    const iv = setInterval(() => {
      getLatestBlocks(3).then(blocks => {
        setChainBlocks(prev => {
          const existing = new Set(prev.map(b => b.number))
          const newBlocks = blocks.filter(b => !existing.has(b.number))
          return [...newBlocks, ...prev].slice(0, 10)
        })
      })
    }, 6000)
    return () => clearInterval(iv)
  }, [])

  const chainFeed = chainBlocks.map(b => ({
    type: 'blue',
    text: `New block <b>#${b.number.toLocaleString()}</b> · ${b.txCount} transactions`,
    hash: b.hash,
    time: timeAgo(b.timestamp * 1000),
    ms: '~480ms',
  }))

  const combined = [...appFeed, ...chainFeed]
    .sort((a, b) => (b.ts || 0) - (a.ts || 0))
    .slice(0, 25)

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--arc-muted)', textTransform: 'uppercase', letterSpacing: 1 }}>
          Live Feed · Arc Testnet
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--arc-accent)', display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ display: 'inline-block', width: 6, height: 6, background: 'var(--arc-accent)', borderRadius: '50%', animation: 'pulseDot 1.5s infinite' }} />
          {loading ? 'connecting...' : 'live'}
          <style>{`@keyframes pulseDot{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {combined.length === 0 && (
          <div style={{ textAlign: 'center', padding: 32, color: 'var(--arc-muted)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
            {loading ? 'Fetching Arc Testnet blocks...' : 'No events yet'}
          </div>
        )}
        {combined.map((item, i) => <FeedItem key={i} item={item} />)}
      </div>
    </div>
  )
}
