'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import gsap from 'gsap'

interface TokenRewardAnimationProps {
  amount: string
  show: boolean
  onComplete?: () => void
}

export function TokenRewardAnimation({ amount, show, onComplete }: TokenRewardAnimationProps) {
  const [visible, setVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  const handleComplete = useCallback(() => {
    setVisible(false)
    if (onCompleteRef.current) onCompleteRef.current()
  }, [])

  useEffect(() => {
    if (show) {
      setVisible(true)
    }
  }, [show])

  // GSAP animations when visible
  useEffect(() => {
    if (!visible || !containerRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: handleComplete,
      })

      // Main coin entrance
      tl.from('.reward-coin-main', {
        scale: 0,
        rotation: -180,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
      })

      // Side coins
      tl.from('.reward-coin-left', {
        scale: 0,
        x: 30,
        y: 20,
        opacity: 0,
        rotation: -90,
        duration: 0.5,
        ease: 'back.out(1.5)',
      }, 0.15)

      tl.from('.reward-coin-right', {
        scale: 0,
        x: -30,
        y: 20,
        opacity: 0,
        rotation: 90,
        duration: 0.5,
        ease: 'back.out(1.5)',
      }, 0.2)

      // Sparkle particles
      tl.from('.reward-sparkle', {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: 'back.out(2)',
      }, 0.3)

      // Text entrance
      tl.from('.reward-text', {
        opacity: 0,
        y: 20,
        scale: 0.8,
        duration: 0.5,
        ease: 'power3.out',
      }, 0.5)

      // Float everything up and fade out
      tl.to('.reward-container', {
        y: -80,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.in',
      }, 1.8)

    }, containerRef)

    return () => ctx.revert()
  }, [visible, handleComplete])

  if (!visible) return null

  // Generate random sparkle positions
  const sparkles = Array.from({ length: 12 }).map((_, i) => {
    const angle = (i / 12) * Math.PI * 2
    const radius = 80 + Math.random() * 40
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius
    const size = 4 + Math.random() * 6
    const colors = ['#FFD700', '#7c3aed', '#ff8c42', '#06b6d4', '#10b981']
    const color = colors[Math.floor(Math.random() * colors.length)]

    return (
      <div
        key={i}
        className="reward-sparkle absolute rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          background: color,
          boxShadow: `0 0 ${size * 2}px ${color}`,
          left: `calc(50% + ${x}px)`,
          top: `calc(50% + ${y}px)`,
          transform: 'translate(-50%, -50%)',
        }}
      />
    )
  })

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      <div className="reward-container relative">
        {/* Center large token */}
        <div className="reward-coin-main">
          <div className="token-coin token-coin-large">
            <div className="token-shine"></div>
            <div className="token-content">
              <div className="text-2xl font-bold">SCT</div>
              <div className="text-lg">+{amount}</div>
            </div>
          </div>
        </div>

        {/* Smaller floating tokens */}
        <div className="reward-coin-left absolute" style={{ left: '-70px', top: '10px' }}>
          <div className="token-coin token-coin-small">
            <div className="token-shine"></div>
            <span className="text-sm font-bold" style={{ color: '#1a0e2e' }}>SCT</span>
          </div>
        </div>

        <div className="reward-coin-right absolute" style={{ right: '-70px', top: '10px' }}>
          <div className="token-coin token-coin-small">
            <div className="token-shine"></div>
            <span className="text-sm font-bold" style={{ color: '#1a0e2e' }}>SCT</span>
          </div>
        </div>

        {/* Sparkle particles */}
        {sparkles}

        {/* Success message */}
        <div className="reward-text absolute -bottom-24 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <div className="text-center">
            <div className="text-4xl mb-2">🎉</div>
            <div className="font-heading text-2xl font-bold gradient-text">Reward Claimed!</div>
            <div className="text-lg text-white mt-1 font-heading">+{amount} SCT Tokens</div>
          </div>
        </div>
      </div>
    </div>
  )
}
