import { useState, useEffect, useCallback } from 'react'

const ARC_TESTNET = {
  chainId: '0x' + (5042002).toString(16), // 0x4CE052
  chainName: 'Arc Testnet',
  nativeCurrency: {
    name: 'USDC',
    symbol: 'USDC',
    decimals: 6,
  },
  rpcUrls: ['https://rpc.testnet.arc.network'],
  blockExplorerUrls: ['https://testnet.arcscan.app'],
}

export function useWallet() {
  const [address, setAddress] = useState(null)
  const [chainId, setChainId] = useState(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isOnArc, setIsOnArc] = useState(false)
  const [error, setError] = useState('')

  const checkChain = (id) => {
    const chainIdNum = typeof id === 'string' ? parseInt(id, 16) : id
    setIsOnArc(chainIdNum === 5042002)
  }

  useEffect(() => {
    if (!window.ethereum) return
    window.ethereum.request({ method: 'eth_accounts' }).then(accounts => {
      if (accounts[0]) setAddress(accounts[0])
    })
    window.ethereum.request({ method: 'eth_chainId' }).then(id => {
      setChainId(id)
      checkChain(id)
    })
    window.ethereum.on('accountsChanged', accounts => {
      setAddress(accounts[0] || null)
    })
    window.ethereum.on('chainChanged', id => {
      setChainId(id)
      checkChain(id)
    })
  }, [])

  const connect = useCallback(async () => {
    if (!window.ethereum) {
      setError('MetaMask not found. Please install it.')
      return
    }
    setIsConnecting(true)
    setError('')
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      setAddress(accounts[0])
    } catch (e) {
      setError('Connection rejected.')
    } finally {
      setIsConnecting(false)
    }
  }, [])

  const switchToArc = useCallback(async () => {
    if (!window.ethereum) return
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: ARC_TESTNET.chainId }],
      })
    } catch (e) {
      if (e.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [ARC_TESTNET],
          })
        } catch (addErr) {
          setError('Failed to add Arc Testnet to MetaMask.')
        }
      }
    }
  }, [])

  const disconnect = useCallback(() => {
    setAddress(null)
  }, [])

  const shortAddress = address
    ? address.slice(0, 6) + '...' + address.slice(-4)
    : null

  return { address, shortAddress, chainId, isConnecting, isOnArc, error, connect, switchToArc, disconnect }
}
