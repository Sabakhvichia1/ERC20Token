'use client'

import { useState } from 'react'
import { useAccount, useReadContract, useBlockNumber } from 'wagmi'
import { SABA_TOKEN_ADDRESS, SABA_TOKEN_ABI, TOKEN_SYMBOL } from '@/lib/constants'
import { formatUnits } from 'viem'
import { useEffect } from 'react'
import { SendTokenModal } from './SendTokenModal'

export function BalanceDisplay() {
  const { address, isConnected } = useAccount()
  const { data: blockNumber } = useBlockNumber({ watch: true })
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: balance, isLoading, isError, refetch } = useReadContract({
    address: SABA_TOKEN_ADDRESS,
    abi: SABA_TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && SABA_TOKEN_ADDRESS !== '0x0000000000000000000000000000000000000000',
    },
  })

  useEffect(() => {
    if (address && blockNumber) {
      refetch()
    }
  }, [blockNumber, address, refetch])

  const formatBalance = (value: bigint) => {
    const formatted = formatUnits(value, 18)
    const num = parseFloat(formatted)
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  if (!isConnected) {
    return (
      <div className="glass-card relative gradient-border-top">
        <h2 className="text-3xl font-bold mb-8 text-cyan-400">
          Your Balance
        </h2>
        <p className="text-5xl md:text-6xl font-bold text-gray-500/30 mb-6">0.00 {TOKEN_SYMBOL}</p>
        <p className="text-sm text-muted mb-8">Connect wallet to view balance</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            disabled
            className="px-6 py-3 bg-gray-600/20 border border-gray-500/30 text-gray-500 rounded-lg cursor-not-allowed font-semibold flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Send Tokens
          </button>
          <button
            disabled
            className="px-6 py-3 bg-gray-600/20 border border-gray-500/30 text-gray-500 rounded-lg cursor-not-allowed font-semibold flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m0 0l-4-4m4 4l4-4" />
            </svg>
            Receive
          </button>
        </div>
      </div>
    )
  }

  if (SABA_TOKEN_ADDRESS === '0x0000000000000000000000000000000000000000') {
    return (
      <div className="glass-card relative gradient-border-top">
        <h2 className="text-3xl font-bold mb-8 text-cyan-400">
          Your Balance
        </h2>
        <p className="text-orange-red mb-2">⚠️ Contract not configured</p>
        <p className="text-sm text-secondary">Please set contract address in .env.local</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="glass-card relative gradient-border-top">
        <h2 className="text-3xl font-bold mb-8 text-cyan-400">
          Your Balance
        </h2>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 border-3 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg text-secondary">Loading balance...</p>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="glass-card relative gradient-border-top">
        <h2 className="text-3xl font-bold mb-8 text-cyan-400">
          Your Balance
        </h2>
        <p className="text-orange-red mb-2">Failed to load balance</p>
        <p className="text-sm text-secondary mb-4">Check your connection and network</p>
        <button
          onClick={() => refetch()}
          className="btn-primary"
        >
          Retry
        </button>
      </div>
    )
  }

  const formattedBalance = balance !== undefined ? formatBalance(balance) : '0.00'

  return (
    <>
      <div className="glass-card relative gradient-border-top">
        <h2 className="text-3xl font-bold mb-8 text-cyan-400">
          Your Balance
        </h2>
        
        <div className="mb-8">
          <p className="text-5xl md:text-6xl font-bold gradient-text mb-3 animate-glow">
            {formattedBalance} {TOKEN_SYMBOL}
          </p>
          
          <div className="flex items-center gap-2 text-sm status-live">
            <span className="text-muted">Live updates</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Send Tokens
          </button>
          
          <button
            className="btn-secondary flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m0 0l-4-4m4 4l4-4" />
            </svg>
            Receive
          </button>
        </div>
      </div>

      <SendTokenModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        maxBalance={formattedBalance}
      />
    </>
  )
}
