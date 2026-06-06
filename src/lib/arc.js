// Arc Testnet — real on-chain data via public RPC
// No API key required for read-only operations

const ARC_RPC = 'https://rpc.testnet.arc.network'
const CHAIN_ID = 5042002
const ERC8183_CONTRACT = '0x0747EEf0706327138c69792bF28Cd525089e4583'
const USDC_ADDRESS = '0x3600000000000000000000000000000000000000'
const BLOCK_EXPLORER = 'https://testnet.arcscan.app'

async function rpc(method, params = []) {
  try {
    const res = await fetch(ARC_RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
    })
    const data = await res.json()
    return data.result
  } catch {
    return null
  }
}

export async function getLatestBlock() {
  const hex = await rpc('eth_blockNumber')
  return hex ? parseInt(hex, 16) : null
}

export async function getBlockInfo(blockNum = 'latest') {
  const tag = typeof blockNum === 'number' ? '0x' + blockNum.toString(16) : blockNum
  return await rpc('eth_getBlockByNumber', [tag, false])
}

export async function getLatestBlocks(count = 5) {
  const latest = await getLatestBlock()
  if (!latest) return []
  const blocks = []
  for (let i = 0; i < count; i++) {
    const b = await getBlockInfo(latest - i)
    if (b) blocks.push({
      number: parseInt(b.number, 16),
      hash: b.hash,
      txCount: b.transactions?.length || 0,
      timestamp: parseInt(b.timestamp, 16),
      gasUsed: parseInt(b.gasUsed || '0', 16),
    })
  }
  return blocks
}

export async function getGasPrice() {
  const hex = await rpc('eth_gasPrice')
  return hex ? parseInt(hex, 16) : null
}

export async function getBalance(address) {
  const hex = await rpc('eth_getBalance', [address, 'latest'])
  return hex ? parseInt(hex, 16) : 0
}

export async function getTxReceipt(hash) {
  return await rpc('eth_getTransactionReceipt', [hash])
}

export { ARC_RPC, CHAIN_ID, ERC8183_CONTRACT, USDC_ADDRESS, BLOCK_EXPLORER }
