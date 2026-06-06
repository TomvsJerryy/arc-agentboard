// Send real transactions to Arc Testnet via MetaMask
// ERC-8183 job contract interactions

const ERC8183_ABI_CREATEJOB = '0x' // placeholder — real ABI below
const USDC_ADDRESS = '0x3600000000000000000000000000000000000000'

// USDC transfer ABI encoded: transfer(address,uint256)
function encodeTransfer(to, amount) {
  const sig = '0xa9059cbb'
  const paddedTo = to.replace('0x', '').padStart(64, '0')
  // amount in USDC = amount * 1e6 (6 decimals)
  const paddedAmount = Math.floor(amount * 1e6).toString(16).padStart(64, '0')
  return sig + paddedTo + paddedAmount
}

// Send a real USDC transfer on Arc Testnet (demo transaction)
export async function sendDemoTransaction(fromAddress, amount = 0.001) {
  if (!window.ethereum) throw new Error('MetaMask not found')

  // Send tiny USDC amount to self as demo tx
  const txParams = {
    from: fromAddress,
    to: USDC_ADDRESS,
    data: encodeTransfer(fromAddress, amount),
    chainId: '0x' + (5042002).toString(16), // Arc Testnet
  }

  try {
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [txParams],
    })
    return txHash
  } catch (e) {
    if (e.code === 4001) throw new Error('Transaction rejected by user')
    throw new Error(e.message || 'Transaction failed')
  }
}

// Send native USDC (gas token) — tiny amount as demo
export async function sendNativeDemo(fromAddress) {
  if (!window.ethereum) throw new Error('MetaMask not found')

  const txParams = {
    from: fromAddress,
    to: fromAddress, // send to self
    value: '0x1', // 1 wei equivalent
    chainId: '0x' + (5042002).toString(16),
  }

  try {
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [txParams],
    })
    return txHash
  } catch (e) {
    if (e.code === 4001) throw new Error('Transaction rejected by user')
    throw new Error(e.message || 'Transaction failed')
  }
}

// Wait for receipt and measure finality time
export async function waitForReceipt(txHash, rpcUrl = 'https://rpc.testnet.arc.network') {
  const start = Date.now()
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 300))
    try {
      const res = await fetch(rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0', id: 1,
          method: 'eth_getTransactionReceipt',
          params: [txHash],
        }),
      })
      const data = await res.json()
      if (data.result) {
        return {
          receipt: data.result,
          finalityMs: Date.now() - start,
        }
      }
    } catch {}
  }
  return { receipt: null, finalityMs: Date.now() - start }
}
