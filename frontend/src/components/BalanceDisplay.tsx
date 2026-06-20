'use client'

import { useState, useEffect } from 'react'
import { useAccount, useReadContract, useBlockNumber } from 'wagmi'
import { SAMARGALO_TOKEN_ADDRESS, SAMARGALO_TOKEN_ABI, TOKEN_SYMBOL } from '@/lib/constants'
import { formatUnits } from 'viem'
import { SendTokenModal } from './SendTokenModal'
import { useTokenBalance } from '@/contexts/TokenBalanceContext'

export function BalanceDisplay() {
  const { address, isConnected } = useAccount()
  const { data: blockNumber } = useBlockNumber({ watch: true })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [displayBalance, setDisplayBalance] = useState('0.00')
  const [prevDisplayBalance, setPrevDisplayBalance] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const { websiteBalance } = useTokenBalance()

  const { data: balance, isLoading, isError, refetch } = useReadContract({
    address: SAMARGALO_TOKEN_ADDRESS,
    abi: SAMARGALO_TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && SAMARGALO_TOKEN_ADDRESS !== '0x0000000000000000000000000000000000000000',
    },
  })

  useEffect(() => {
    if (address && blockNumber) {
      refetch()
    }
  }, [blockNumber, address, refetch])

  // Calculate total balance (blockchain + website rewards)
  useEffect(() => {
    if (balance !== undefined) {
      const blockchainBalance = parseFloat(formatUnits(balance, 18))
      const totalBalance = blockchainBalance + websiteBalance
      
      // If total balance increased, animate the change
      if (totalBalance > prevDisplayBalance && prevDisplayBalance > 0) {
        setIsAnimating(true)
        
        // Animate number counting up
        const difference = totalBalance - prevDisplayBalance
        const duration = 1000 // 1 second
        const steps = 30
        const increment = difference / steps
        const stepDuration = duration / steps
        
        let currentStep = 0
        const interval = setInterval(() => {
          currentStep++
          const newValue = prevDisplayBalance + (increment * currentStep)
          
          setDisplayBalance(newValue.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }))
          
          if (currentStep >= steps) {
            clearInterval(interval)
            setDisplayBalance(totalBalance.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }))
            setIsAnimating(false)
          }
        }, stepDuration)
        
        return () => clearInterval(interval)
      } else {
        // No animation, just set the value
        setDisplayBalance(totalBalance.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }))
      }
      
      setPrevDisplayBalance(totalBalance)
    }
  }, [balance, websiteBalance, prevDisplayBalance])

  if (!isConnected) {
    return (
      <div className="glass-card relative gradient-border-top">
        <h2 className="text-3xl font-bold mb-8 text-brand-orange">
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

  if (SAMARGALO_TOKEN_ADDRESS === '0x0000000000000000000000000000000000000000') {
    return (
      <div className="glass-card relative gradient-border-top">
        <h2 className="text-3xl font-bold mb-8 text-brand-orange">
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
        <h2 className="text-3xl font-bold mb-8 text-brand-orange">
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
        <h2 className="text-3xl font-bold mb-8 text-brand-orange">
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

  return (
    <>
      <div className="glass-card relative gradient-border-top">
        <h2 className="text-3xl font-bold mb-8 text-brand-orange">
          Your Balance
        </h2>
        
        <div className="mb-8">
          <div className={`transition-all duration-300 ${isAnimating ? 'scale-110' : 'scale-100'}`}>
            <p className={`text-5xl md:text-6xl font-bold gradient-text mb-3 ${isAnimating ? 'animate-glow' : ''}`}>
              {displayBalance} {TOKEN_SYMBOL}
            </p>
            {isAnimating && prevDisplayBalance > 0 && (
              <div className="inline-block animate-bounce text-2xl">
                ✨ +{(parseFloat(displayBalance.replace(/,/g, '')) - prevDisplayBalance).toFixed(2)} SCT!
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <span className="status-live text-muted">Blockchain + Game Rewards</span>
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
        maxBalance={displayBalance}
      />
    </>
  )
}
