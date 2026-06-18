'use client'

import { SABA_TOKEN_ADDRESS, SEPOLIA_ETHERSCAN_BASE_URL, TOKEN_NAME, TOKEN_SYMBOL } from '@/lib/constants'

export function TokenInfo() {
  const etherscanUrl = `${SEPOLIA_ETHERSCAN_BASE_URL}/address/${SABA_TOKEN_ADDRESS}`
  
  const isConfigured = SABA_TOKEN_ADDRESS !== '0x0000000000000000000000000000000000000000'

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 animate-fadeIn hover:transform hover:scale-[1.02]">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-300 to-purple-300 text-transparent bg-clip-text">{TOKEN_NAME}</h2>
      <div className="space-y-4">
        <div className="group">
          <p className="text-sm text-blue-300/70 mb-1">Symbol</p>
          <p className="font-semibold text-white text-lg group-hover:text-purple-300 transition-colors">{TOKEN_SYMBOL}</p>
        </div>
        <div className="group">
          <p className="text-sm text-blue-300/70 mb-1">Contract Address</p>
          {isConfigured ? (
            <p className="font-mono text-xs break-all text-purple-200 bg-slate-900/50 p-2 rounded border border-purple-500/20 group-hover:border-purple-400/40 transition-colors">{SABA_TOKEN_ADDRESS}</p>
          ) : (
            <p className="text-yellow-400 text-sm">Not configured - deploy contract first</p>
          )}
        </div>
        <div className="group">
          <p className="text-sm text-blue-300/70 mb-2">Description</p>
          <p className="text-sm text-gray-300 leading-relaxed">
            A custom ERC-20 token deployed on the Sepolia testnet with a fixed supply 
            of 14 tokens. Built using OpenZeppelin's secure and audited contracts.
          </p>
        </div>
        {isConfigured && (
          <a
            href={etherscanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/50 min-h-[44px] font-semibold mt-2"
          >
            View on Etherscan ↗
          </a>
        )}
      </div>
    </div>
  )
}
