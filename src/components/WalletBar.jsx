import React from 'react'
import { useWallet } from '../lib/useWallet'

export default function WalletBar({ onWalletChange }) {
  const { address, shortAddress, isConnecting, isOnArc, error, connect, switchToArc, disconnect } = useWallet()

  React.useEffect(() => {
    if (onWalletChange) onWalletChange({ address, isOnArc })
  }, [address, isOnArc])

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '12px 16px',
      background: 'var(--arc-surface)',
      border: '1px solid var(--arc-border)',
      borderRadius: 12,
      marginBottom: 20,
      flexWrap: 'wrap',
    }}>
      {/* Status indicator */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
        <div style={{
          width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
          background: address ? (isOnArc ? 'var(--arc-accent)' : 'var(--arc-warn)') : 'var(--arc-muted)',
        }} />
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--arc-muted)' }}>
          {!address && 'Wallet not connected — connect to send real transactions'}
          {address && !isOnArc && (
            <span style={{ color: 'var(--arc-warn)' }}>
              Wrong network — switch to Arc Testnet to send real txs
            </span>
          )}
          {address && isOnArc && (
            <span style={{ color: 'var(--arc-accent)' }}>
              ✓ Connected to Arc Testnet · real transactions enabled
            </span>
          )}
        </div>
        {error && (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--arc-danger)' }}>
            ⚠ {error}
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        {!address && (
          <button
            onClick={connect}
            disabled={isConnecting}
            style={{
              background: 'var(--arc-accent)', color: '#000',
              border: 'none', padding: '7px 16px', borderRadius: 8,
              fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 700,
              cursor: isConnecting ? 'not-allowed' : 'pointer',
              opacity: isConnecting ? 0.7 : 1,
              display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            {isConnecting ? (
              <>
                <div style={{ width: 12, height: 12, border: '2px solid rgba(0,0,0,0.2)', borderTopColor: '#000', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                Connecting...
              </>
            ) : '🦊 Connect MetaMask'}
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          </button>
        )}

        {address && !isOnArc && (
          <button
            onClick={switchToArc}
            style={{
              background: 'rgba(255,184,0,0.15)', color: 'var(--arc-warn)',
              border: '1px solid rgba(255,184,0,0.3)', padding: '7px 16px',
              borderRadius: 8, fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Switch to Arc Testnet
          </button>
        )}

        {address && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'var(--arc-surface2)', border: '1px solid var(--arc-border)',
            padding: '6px 12px', borderRadius: 8,
          }}>
            <div style={{
              width: 20, height: 20, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--arc-accent), var(--arc-blue))',
              flexShrink: 0,
            }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--arc-text)' }}>
              {shortAddress}
            </span>
            <button
              onClick={disconnect}
              style={{
                background: 'none', border: 'none', color: 'var(--arc-muted)',
                fontSize: 14, cursor: 'pointer', padding: '0 2px', lineHeight: 1,
              }}
            >×</button>
          </div>
        )}
      </div>
    </div>
  )
}
