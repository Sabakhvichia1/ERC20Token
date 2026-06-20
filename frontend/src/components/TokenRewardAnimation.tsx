'use client'

import { useEffect, useState } from 'react'

interface TokenRewardAnimationProps {
  amount: string
  show: boolean
  onComplete?: () => void
}

export function TokenRewardAnimation({ amount, show, onComplete }: TokenRewardAnimationProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
        if (onComplete) onComplete()
      }, 3000) // Animation lasts 3 seconds
      
      return () => clearTimeout(timer)
    }
  }, [show, onComplete])

  if (!visible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      {/* Multiple token coins floating up */}
      <div className="relative">
        {/* Center large token */}
        <div className="token-float-up animate-token-appear">
          <div className="token-coin token-coin-large">
            <div className="token-shine"></div>
            <div className="token-content">
              <div className="text-2xl font-bold">SCT</div>
              <div className="text-lg">+{amount}</div>
            </div>
          </div>
        </div>

        {/* Smaller floating tokens around */}
        <div className="token-float-up-left animate-token-appear delay-100">
          <div className="token-coin token-coin-small">
            <div className="token-shine"></div>
            <span className="text-sm font-bold">SCT</span>
          </div>
        </div>

        <div className="token-float-up-right animate-token-appear delay-200">
          <div className="token-coin token-coin-small">
            <div className="token-shine"></div>
            <span className="text-sm font-bold">SCT</span>
          </div>
        </div>

        {/* Sparkles */}
        <div className="sparkle sparkle-1"></div>
        <div className="sparkle sparkle-2"></div>
        <div className="sparkle sparkle-3"></div>
        <div className="sparkle sparkle-4"></div>
      </div>

      {/* Success message */}
      <div className="absolute top-1/3 animate-fadeIn delay-300">
        <div className="text-center">
          <div className="text-4xl mb-2">🎉</div>
          <div className="text-2xl font-bold gradient-text">Reward Claimed!</div>
          <div className="text-lg text-white mt-2">+{amount} SCT Tokens</div>
        </div>
      </div>
    </div>
  )
}
