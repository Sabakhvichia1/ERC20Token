'use client'

import { useState } from 'react'
import { SAMARGALO_TOKEN_ADDRESS, SEPOLIA_ETHERSCAN_BASE_URL, TOKEN_NAME, TOKEN_SYMBOL } from '@/lib/constants'
import { Toast } from './Toast'

export function TokenInfo() {
  const [showToast, setShowToast] = useState(false)
  const [copied, setCopied] = useState(false)
  const etherscanUrl = `${SEPOLIA_ETHERSCAN_BASE_URL}/address/${SAMARGALO_TOKEN_ADDRESS}`
  const isConfigured = SAMARGALO_TOKEN_ADDRESS !== '0x0000000000000000000000000000000000000000'

  const copyAddress = () => {
    navigator.clipboard.writeText(SAMARGALO_TOKEN_ADDRESS)
    setCopied(true)
    setShowToast(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <div className="glass-card relative gradient-border-top">
        <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8 gradient-text tracking-[-0.02em]">
          {TOKEN_NAME}
        </h2>
        
        <div className="space-y-6">
          {/* Symbol */}
          <div>
            <p className="text-caption uppercase text-[var(--text-muted)] mb-2 font-medium tracking-wider">Symbol</p>
            <div className="flex items-center gap-3">
              <p className="font-heading text-2xl font-bold text-[var(--accent-orange)]">{TOKEN_SYMBOL}</p>
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold font-heading"
                style={{
                  background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(255,140,66,0.2))',
                  color: 'var(--accent-orange)',
                  border: '1px solid rgba(255,140,66,0.2)',
                }}
              >
                {TOKEN_SYMBOL}
              </div>
            </div>
          </div>

          {/* Contract Address */}
          <div>
            <p className="text-caption uppercase text-[var(--text-muted)] mb-2 font-medium tracking-wider">Contract Address</p>
            {isConfigured ? (
              <div className="input-dark font-mono flex items-center justify-between gap-2 group">
                <span className="text-sm text-white break-all flex-1">
                  {SAMARGALO_TOKEN_ADDRESS}
                </span>
                <button
                  onClick={copyAddress}
                  className="flex-shrink-0 p-2 hover:bg-accent-purple/20 rounded-lg transition-all duration-300 transform hover:scale-110 active:scale-95 text-[var(--accent-orange)]"
                  title="Copy address"
                >
                  {copied ? (
                    <svg className="w-5 h-5 text-[var(--success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>
            ) : (
              <p className="text-[var(--error)] text-sm">Not configured</p>
            )}
          </div>

          {/* Etherscan Link */}
          {isConfigured && (
            <a
              href={etherscanUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[var(--accent-cyan)] hover:text-white transition-colors duration-300 group"
            >
              <span className="text-sm font-medium">View on Etherscan</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}

          {/* Description */}
          <div>
            <p className="text-caption uppercase text-[var(--text-muted)] mb-2 font-medium tracking-wider">About</p>
            <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed">
              A custom ERC-20 token deployed on the Sepolia testnet with a fixed supply of 100 tokens. 
              Built with security in mind using OpenZeppelin&apos;s standard contracts.
            </p>
          </div>
        </div>
      </div>

      <Toast message="Address copied!" isVisible={showToast} onClose={() => setShowToast(false)} />
    </>
  )
}
