'use client'

import { useState } from 'react'
import { SABA_TOKEN_ADDRESS, SEPOLIA_ETHERSCAN_BASE_URL, TOKEN_NAME, TOKEN_SYMBOL } from '@/lib/constants'
import { Toast } from './Toast'

export function TokenInfo() {
  const [showToast, setShowToast] = useState(false)
  const etherscanUrl = `${SEPOLIA_ETHERSCAN_BASE_URL}/address/${SABA_TOKEN_ADDRESS}`
  const isConfigured = SABA_TOKEN_ADDRESS !== '0x0000000000000000000000000000000000000000'

  const copyAddress = () => {
    navigator.clipboard.writeText(SABA_TOKEN_ADDRESS)
    setShowToast(true)
  }

  return (
    <>
      <div className="gradient-border rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-500 animate-slideUp">
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">
          {TOKEN_NAME}
        </h2>
        
        <div className="space-y-5">
          {/* Symbol */}
          <div>
            <p className="text-sm text-gray-400 mb-1">Symbol</p>
            <p className="text-2xl font-bold text-white">{TOKEN_SYMBOL}</p>
          </div>

          {/* Contract Address */}
          <div>
            <p className="text-sm text-gray-400 mb-2">Contract Address</p>
            {isConfigured ? (
              <div className="glass p-3 rounded-lg flex items-center justify-between gap-2 group">
                <span className="font-mono text-xs text-cyan-300 break-all flex-1">
                  {SABA_TOKEN_ADDRESS}
                </span>
                <button
                  onClick={copyAddress}
                  className="flex-shrink-0 p-2 hover:bg-cyan-500/20 rounded-lg transition-all duration-300 transform hover:scale-110 active:scale-95 text-cyan-400"
                  title="Copy address"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            ) : (
              <p className="text-yellow-400 text-sm">Not configured</p>
            )}
          </div>

          {/* Description */}
          <div>
            <p className="text-sm text-gray-400 mb-2">Description</p>
            <p className="text-sm text-gray-300 leading-relaxed">
              A custom ERC-20 token deployed on the Sepolia testnet with a fixed supply of 14 tokens. 
              Built using OpenZeppelin's secure and audited contracts.
            </p>
          </div>

          {/* Etherscan Link */}
          {isConfigured && (
            <a
              href={etherscanUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-5 py-3 glass border border-cyan-400/50 hover:bg-cyan-500/10 text-white rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 font-medium group"
            >
              <span>View on Etherscan</span>
              <svg className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>

      <Toast message="Address copied!" isVisible={showToast} onClose={() => setShowToast(false)} />
    </>
  )
}
