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
        const duration = 1000
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
        <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8 gradient-text tracking-[-0.02em]">
          Your Balance
        </h2>
        <p className="font-heading text-4xl md:text-5xl font-bold text-white/10 mb-6 tracking-[-0.02em]">0.00 {TOKEN_SYMBOL}</p>
        <p className="text-sm text-[var(--text-muted)] mb-8">Connect wallet to view balance</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            disabled
            className="px-6 py-3.5 bg-white/5 border border-white/10 text-[var(--text-muted)] rounded-xl cursor-not-allowed font-semibold flex items-center justify-center gap-2 font-heading text-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Send Tokens
          </button>
          <button
            disabled
            className="px-6 py-3.5 bg-white/5 border border-white/10 text-[var(--text-muted)] rounded-xl cursor-not-allowed font-semibold flex items-center justify-center gap-2 font-heading text-sm"
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
        <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8 gradient-text tracking-[-0.02em]">
          Your Balance
        </h2>
        <p className="text-[var(--error)] mb-2">⚠️ Contract not configured</p>
        <p className="text-sm text-[var(--text-secondary)]">Please set contract address in .env.local</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="glass-card relative gradient-border-top">
        <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8 gradient-text tracking-[-0.02em]">
          Your Balance
        </h2>
        <div className="space-y-4 mb-8">
          <div className="skeleton h-12 w-3/4"></div>
          <div className="skeleton h-4 w-1/3"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="skeleton h-12 rounded-xl"></div>
          <div className="skeleton h-12 rounded-xl"></div>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="glass-card relative gradient-border-top">
        <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8 gradient-text tracking-[-0.02em]">
          Your Balance
        </h2>
        <p className="text-[var(--error)] mb-2">Failed to load balance</p>
        <p className="text-sm text-[var(--text-secondary)] mb-6">Check your connection and network</p>
        <button
          onClick={() => refetch()}
          className="btn-primary font-heading text-sm"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <>
      <div className="glass-card relative gradient-border-top">
        <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8 gradient-text tracking-[-0.02em]">
          Your Balance
        </h2>
        
        <div className="mb-8">
          <div className={`transition-all duration-300 ${isAnimating ? 'scale-105' : 'scale-100'}`}>
            <p className={`font-heading text-4xl md:text-5xl lg:text-6xl font-bold gradient-text-orange mb-3 tracking-[-0.02em] ${isAnimating ? 'animate-glow-pulse' : ''}`}>
              {displayBalance} {TOKEN_SYMBOL}
            </p>
            {isAnimating && prevDisplayBalance > 0 && (
              <div className="inline-block animate-bounce text-xl font-heading">
                <span className="text-[var(--success)]">
                  ✨ +{(parseFloat(displayBalance.replace(/,/g, '')) - prevDisplayBalance).toFixed(2)} SCT!
                </span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2 text-sm mt-2">
            <span className="status-live text-[var(--text-muted)]">Blockchain + Game Rewards</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary flex items-center justify-center gap-2 font-heading text-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Send Tokens
          </button>
          
          <button
            className="btn-secondary flex items-center justify-center gap-2 font-heading text-sm"
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
