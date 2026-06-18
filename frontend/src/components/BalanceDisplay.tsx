'use client'

import { useAccount, useReadContract, useBlockNumber } from 'wagmi'
import { SABA_TOKEN_ADDRESS, SABA_TOKEN_ABI, TOKEN_SYMBOL } from '@/lib/constants'
import { formatUnits } from 'viem'
import { useEffect } from 'react'

export function BalanceDisplay() {
  const { address, isConnected } = useAccount()
  const { data: blockNumber } = useBlockNumber({ watch: true })

  const { data: balance, isLoading, isError, refetch } = useReadContract({
    address: SABA_TOKEN_ADDRESS,
    abi: SABA_TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && SABA_TOKEN_ADDRESS !== '0x0000000000000000000000000000000000000000',
    },
  })

  // Refetch balance when new block is mined
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
      maximumFractionDigits: 4,
    })
  }

  if (!isConnected) {
    return (
      <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-purple-500/20 animate-fadeIn">
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-purple-300 text-transparent bg-clip-text">Your Balance</h2>
        <p className="text-5xl font-bold text-gray-400/50 animate-pulse-slow">0 {TOKEN_SYMBOL}</p>
        <p className="text-sm text-blue-300/60 mt-3">Connect wallet to view balance</p>
      </div>
    )
  }

  if (SABA_TOKEN_ADDRESS === '0x0000000000000000000000000000000000000000') {
    return (
      <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-purple-500/20 animate-fadeIn">
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-purple-300 text-transparent bg-clip-text">Your Balance</h2>
        <p className="text-yellow-400 mb-2">⚠️ Contract not configured</p>
        <p className="text-sm text-gray-300">
          Please set NEXT_PUBLIC_CONTRACT_ADDRESS in .env.local
        </p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-purple-500/20 animate-fadeIn">
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-purple-300 text-transparent bg-clip-text">Your Balance</h2>
        <div className="flex items-center gap-3">
          <div className="animate-spin h-6 w-6 border-3 border-purple-400 border-t-transparent rounded-full"></div>
          <p className="text-lg text-blue-300">Loading balance...</p>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-purple-500/20 animate-fadeIn">
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-purple-300 text-transparent bg-clip-text">Your Balance</h2>
        <p className="text-red-400 mb-2">Failed to load balance</p>
        <p className="text-sm text-gray-300 mb-4">
          Please check your connection and network settings
        </p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/50"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 animate-fadeIn hover:transform hover:scale-[1.02]">
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-purple-300 text-transparent bg-clip-text">Your Balance</h2>
      <div className="relative">
        <p className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text animate-pulse-slow">
          {balance !== undefined ? formatBalance(balance) : '0'} {TOKEN_SYMBOL}
        </p>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-2xl -z-10"></div>
      </div>
      <p className="text-xs text-blue-300/60 mt-3 flex items-center gap-2">
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
        Updates automatically on new blocks
      </p>
    </div>
  )
}
