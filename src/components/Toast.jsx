import React, { useEffect } from 'react'

export default function Toast({ msg, onDone }) {
  useEffect(() => {
    if (!msg) return
    const t = setTimeout(onDone, 3500)
    return () => clearTimeout(t)
  }, [msg])

  if (!msg) return null

  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
      background: 'var(--arc-surface)', border: '1px solid var(--arc-accent)',
      color: 'var(--arc-accent)', fontFamily: 'var(--font-mono)', fontSize: 12,
      padding: '10px 18px', borderRadius: 10,
      display: 'flex', alignItems: 'center', gap: 8,
      animation: 'slideUp 0.3s ease',
      maxWidth: 340, boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
    }}>
      <style>{`@keyframes slideUp { from { transform: translateY(8px); opacity:0; } to { transform:none; opacity:1; } }`}</style>
      <span>✓</span>
      <span>{msg}</span>
    </div>
  )
}
