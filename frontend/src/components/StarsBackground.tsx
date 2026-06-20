'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export function StarsBackground() {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!container.current) return
    
    const stars = container.current.children

    // Animate each star
    gsap.utils.toArray(stars).forEach((star: any) => {
      // Random twinkling
      gsap.to(star, {
        opacity: () => gsap.utils.random(0.1, 1),
        duration: () => gsap.utils.random(1, 3),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: () => gsap.utils.random(0, 2)
      })

      // Slow drift
      gsap.to(star, {
        x: `+=${gsap.utils.random(-20, 20)}`,
        y: `+=${gsap.utils.random(-20, 20)}`,
        duration: () => gsap.utils.random(10, 20),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
    })
  }, { scope: container })

  // Generate 100 random stars
  const stars = Array.from({ length: 100 }).map((_, i) => {
    const size = Math.random() * 3 + 1
    const x = Math.random() * 100
    const y = Math.random() * 100
    
    // Mix of white and gold/orange stars
    const isGold = Math.random() > 0.8
    const bgClass = isGold ? 'bg-brand-orange' : 'bg-white'

    return (
      <div
        key={i}
        className={`absolute rounded-full ${bgClass} shadow-[0_0_8px_rgba(255,255,255,0.8)]`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${x}%`,
          top: `${y}%`,
          opacity: Math.random()
        }}
      />
    )
  })

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden" 
      ref={container}
    >
      {stars}
    </div>
  )
}
