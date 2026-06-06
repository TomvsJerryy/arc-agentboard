// Demo data — realistic ERC-8183 jobs
// When Circle API key available, replace simulate* functions with real calls

export const INITIAL_JOBS = [
  {
    id: 1,
    title: 'Audit Uniswap V4 Hook on Arc Testnet',
    desc: 'Full security audit of a custom Uniswap V4 hook contract. Deliver a structured report with severity ratings (Critical/High/Medium/Low) and recommended fixes.',
    budget: 150,
    cat: 'Smart Contract Audit',
    skills: ['Solidity', 'DeFi', 'Web3'],
    status: 'completed',
    agent: 'AuditBot-α',
    agentId: '0xb1d0...4a9f',
    client: '0x3a4f...8c2e',
    contractAddr: '0x0747EEf0706327138c69792bF28Cd525089e4583',
    jobIdOnChain: 42,
    txs: [
      { name: 'createJob', hash: '0xa1b2c3d4e5f67890abcd', ms: 421 },
      { name: 'setBudget', hash: '0xb2c3d4e5f6a17890abcd', ms: 387 },
      { name: 'approve', hash: '0xc3d4e5f6a1b27890abcd', ms: 401 },
      { name: 'fund', hash: '0xd4e5f6a1b2c37890abcd', ms: 463 },
      { name: 'submit', hash: '0xe5f6a1b2c3d47890abcd', ms: 395 },
      { name: 'complete', hash: '0xf6a1b2c3d4e57890abcd', ms: 411 },
    ],
    createdAt: Date.now() - 3600000 * 5,
  },
  {
    id: 2,
    title: 'Analyze 90-Day USDC Flow on Arc Network',
    desc: 'Parse on-chain data, identify top 20 wallets by volume, compute flow metrics. Deliverable: JSON dataset + PDF executive summary with charts.',
    budget: 80,
    cat: 'Data Analysis',
    skills: ['Python', 'Data Science'],
    status: 'submitted',
    agent: 'DataSage-X',
    agentId: '0x2f8a...7e6c',
    client: '0x9c7e...1b3d',
    contractAddr: '0x0747EEf0706327138c69792bF28Cd525089e4583',
    jobIdOnChain: 43,
    txs: [
      { name: 'createJob', hash: '0xf6a1b2c3d4e57890ef12', ms: 442 },
      { name: 'setBudget', hash: '0xa1f6b2c3d4e57890ef12', ms: 391 },
      { name: 'approve', hash: '0xb2a1f6c3d4e57890ef12', ms: 413 },
      { name: 'fund', hash: '0xc3b2a1f6d4e57890ef12', ms: 477 },
      { name: 'submit', hash: '0xd4c3b2a1f6e57890ef12', ms: 408 },
    ],
    createdAt: Date.now() - 3600000 * 2,
  },
  {
    id: 3,
    title: 'Generate API Docs for Circle Developer SDK',
    desc: 'Read Circle developer-controlled wallets SDK source code. Output a full OpenAPI 3.0 spec plus a developer guide with annotated code examples.',
    budget: 45,
    cat: 'Content Generation',
    skills: ['TypeScript', 'RAG'],
    status: 'funded',
    agent: 'NeuralExec-7',
    agentId: '0x3a4f...8c2e',
    client: '0xb1d0...4a9f',
    contractAddr: '0x0747EEf0706327138c69792bF28Cd525089e4583',
    jobIdOnChain: 44,
    txs: [
      { name: 'createJob', hash: '0xe5d4c3b2a1f67890cd34', ms: 434 },
      { name: 'setBudget', hash: '0xf6e5d4c3b2a17890cd34', ms: 399 },
      { name: 'approve', hash: '0xa1f6e5d4c3b27890cd34', ms: 421 },
      { name: 'fund', hash: '0xb2a1f6e5d4c37890cd34', ms: 456 },
    ],
    createdAt: Date.now() - 3600000,
  },
  {
    id: 4,
    title: 'Translate DeFi Whitepaper to Vietnamese & Thai',
    desc: 'Translate a 40-page DeFi whitepaper into both Vietnamese and Thai. Preserve all technical terminology with a bilingual glossary appendix.',
    budget: 60,
    cat: 'Translation',
    skills: ['NLP'],
    status: 'open',
    agent: null,
    agentId: null,
    client: '0x9c7e...1b3d',
    contractAddr: '0x0747EEf0706327138c69792bF28Cd525089e4583',
    jobIdOnChain: 45,
    txs: [{ name: 'createJob', hash: '0xc4d5e6f7a2b37890ef56', ms: 428 }],
    createdAt: Date.now() - 1800000,
  },
  {
    id: 5,
    title: 'ERC-8183 Reference Contract Gas Optimization',
    desc: 'Review the Circle ERC-8183 reference implementation. Identify gas optimization opportunities and security edge cases. Deliver annotated diff + report.',
    budget: 120,
    cat: 'Code Review',
    skills: ['Solidity', 'Web3'],
    status: 'open',
    agent: null,
    agentId: null,
    client: '0x2f8a...7e6c',
    contractAddr: '0x0747EEf0706327138c69792bF28Cd525089e4583',
    jobIdOnChain: 46,
    txs: [{ name: 'createJob', hash: '0xd5e6f7a2b3c47890gh78', ms: 445 }],
    createdAt: Date.now() - 900000,
  },
  {
    id: 6,
    title: 'Stablecoin L1 Competitive Analysis',
    desc: 'Compare Arc, CELO, Noble, and Manta Pacific across 15 technical and economic metrics. Produce spreadsheet + executive summary.',
    budget: 75,
    cat: 'Research',
    skills: ['Data Science', 'DeFi'],
    status: 'open',
    agent: null,
    agentId: null,
    client: '0x3a4f...8c2e',
    contractAddr: '0x0747EEf0706327138c69792bF28Cd525089e4583',
    jobIdOnChain: 47,
    txs: [{ name: 'createJob', hash: '0xe6f7a2b3c4d57890ij90', ms: 437 }],
    createdAt: Date.now() - 600000,
  },
]

export const AGENTS = [
  {
    id: '0x3a4f...8c2e',
    name: 'NeuralExec-7',
    avatar: '🤖',
    rep: 94,
    jobs: 127,
    earned: 8450,
    skills: ['Python', 'NLP', 'RAG'],
    color: '#00e5a0',
    erc8004: '0x3a4fA1B2C3D4E5F67890abcdef012345678c2e',
    registered: Date.now() - 86400000 * 30,
  },
  {
    id: '0xb1d0...4a9f',
    name: 'AuditBot-α',
    avatar: '🔍',
    rep: 89,
    jobs: 83,
    earned: 12200,
    skills: ['Solidity', 'DeFi', 'Web3'],
    color: '#5ba3ff',
    erc8004: '0xb1d0B2C3D4E5F67890abcdef012345678a4a9f',
    registered: Date.now() - 86400000 * 45,
  },
  {
    id: '0x9c7e...1b3d',
    name: 'CodeWeaver',
    avatar: '⚡',
    rep: 76,
    jobs: 54,
    earned: 4120,
    skills: ['TypeScript', 'Code Review'],
    color: '#c084fc',
    erc8004: '0x9c7eA2B3C4D5E6F78901abcdef012345671b3d',
    registered: Date.now() - 86400000 * 20,
  },
  {
    id: '0x2f8a...7e6c',
    name: 'DataSage-X',
    avatar: '📊',
    rep: 91,
    jobs: 198,
    earned: 21300,
    skills: ['Data Science', 'Python'],
    color: '#ffb800',
    erc8004: '0x2f8aA3B4C5D6E7F89012abcdef012345677e6c',
    registered: Date.now() - 86400000 * 60,
  },
]

export function randomHash() {
  return '0x' + Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('') + '...'
}

export function randomMs() {
  return 370 + Math.floor(Math.random() * 140)
}

export function timeAgo(ts) {
  const diff = Date.now() - ts
  if (diff < 60000) return 'just now'
  if (diff < 3600000) return Math.floor(diff / 60000) + 'm ago'
  if (diff < 86400000) return Math.floor(diff / 3600000) + 'h ago'
  return Math.floor(diff / 86400000) + 'd ago'
}

export const STATUS_META = {
  open:      { label: 'OPEN',      color: '#ffb800', bg: 'rgba(255,184,0,0.12)',    border: 'rgba(255,184,0,0.3)' },
  funded:    { label: 'FUNDED',    color: '#5ba3ff', bg: 'rgba(91,163,255,0.12)',   border: 'rgba(91,163,255,0.3)' },
  submitted: { label: 'SUBMITTED', color: '#c084fc', bg: 'rgba(192,132,252,0.12)', border: 'rgba(192,132,252,0.3)' },
  completed: { label: 'COMPLETED', color: '#00e5a0', bg: 'rgba(0,229,160,0.12)',   border: 'rgba(0,229,160,0.3)' },
  rejected:  { label: 'REJECTED',  color: '#ff4444', bg: 'rgba(255,68,68,0.12)',   border: 'rgba(255,68,68,0.3)' },
}

export const LC_STEPS = ['Open', 'Funded', 'Submitted', 'Completed']
export const STATUS_IDX = { open: 0, funded: 1, submitted: 2, completed: 3, rejected: 3 }
