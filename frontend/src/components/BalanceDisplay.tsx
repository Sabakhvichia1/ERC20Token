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
      <div className="gradient-border rounded-2xl p-6 animate-slideUp" style={{ animationDelay: '0.1s' }}>
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">
          Your Balance
        </h2>
        <p className="text-6xl font-bold text-gray-500/30 mb-6">0.00 {TOKEN_SYMBOL}</p>
        <p className="text-sm text-gray-400 mb-6">Connect wallet to view balance</p>
        <div className="space-y-3">
          <button
            disabled
            className="w-full px-6 py-3 glass border border-gray-500/30 text-gray-500 rounded-lg cursor-not-allowed font-medium"
          >
            Send Tokens
          </button>
          <button
            disabled
            className="w-full px-6 py-3 glass border border-gray-500/30 text-gray-500 rounded-lg cursor-not-allowed font-medium"
          >
            Receive
          </button>
        </div>
      </div>
    )
  }

  if (SABA_TOKEN_ADDRESS === '0x0000000000000000000000000000000000000000') {
    return (
      <div className="gradient-border rounded-2xl p-6 animate-slideUp" style={{ animationDelay: '0.1s' }}>
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">
          Your Balance
        </h2>
        <p className="text-yellow-400 mb-2">⚠️ Contract not configured</p>
        <p className="text-sm text-gray-300">Please set contract address in .env.local</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="gradient-border rounded-2xl p-6 animate-slideUp" style={{ animationDelay: '0.1s' }}>
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">
          Your Balance
        </h2>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 border-3 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg text-gray-300">Loading balance...</p>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="gradient-border rounded-2xl p-6 animate-slideUp" style={{ animationDelay: '0.1s' }}>
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">
          Your Balance
        </h2>
        <p className="text-red-400 mb-2">Failed to load balance</p>
        <p className="text-sm text-gray-300 mb-4">Check your connection and network</p>
        <button
          onClick={() => refetch()}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 font-semibold"
        >
          Retry
        </button>
      </div>
    )
  }

  const formattedBalance = balance !== undefined ? formatBalance(balance) : '0.00'

  return (
    <>
      <div className="gradient-border rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-500 animate-slideUp" style={{ animationDelay: '0.1s' }}>
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">
          Your Balance & Actions
        </h2>
        
        <div className="mb-6">
          <div className="relative inline-block">
            <p className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-transparent bg-clip-text mb-2 animate-glow">
              {formattedBalance} {TOKEN_SYMBOL}
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-gray-400">Live updates</span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 font-semibold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50"
          >
            Send Tokens
          </button>
          
          <button
            className="w-full px-6 py-3 glass border border-purple-400/50 hover:bg-purple-500/10 text-white rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 font-medium"
          >
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
