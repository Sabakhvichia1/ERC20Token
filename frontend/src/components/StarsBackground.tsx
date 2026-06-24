'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function StarsBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const orbsRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  // Detect mobile and reduced motion preferences
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(motionQuery.matches)
    checkMobile()

    window.addEventListener('resize', checkMobile)
    motionQuery.addEventListener('change', (e) => setReducedMotion(e.matches))
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // GSAP animations for orbs
  useGSAP(() => {
    if (!orbsRef.current || reducedMotion) return

    const orbs = orbsRef.current.children
    gsap.utils.toArray(orbs).forEach((orb: any, i: number) => {
      // Floating drift
      gsap.to(orb, {
        x: `+=${gsap.utils.random(-60, 60)}`,
        y: `+=${gsap.utils.random(-60, 60)}`,
        scale: gsap.utils.random(0.9, 1.15),
        duration: gsap.utils.random(15, 25),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 2,
      })

      // Opacity breathe
      gsap.to(orb, {
        opacity: gsap.utils.random(0.03, 0.1),
        duration: gsap.utils.random(8, 14),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 1.5,
      })
    })

    // Parallax on scroll for orbs
    gsap.utils.toArray(orbs).forEach((orb: any, i: number) => {
      gsap.to(orb, {
        yPercent: -20 * (i + 1),
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
        },
      })
    })
  }, { scope: orbsRef, dependencies: [reducedMotion] })

  // GSAP animations for particles
  useGSAP(() => {
    if (!particlesRef.current || reducedMotion) return

    const particles = particlesRef.current.children
    gsap.utils.toArray(particles).forEach((particle: any) => {
      // Twinkling
      gsap.to(particle, {
        opacity: () => gsap.utils.random(0.1, 0.9),
        duration: () => gsap.utils.random(1.5, 4),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: () => gsap.utils.random(0, 3),
      })

      // Slow organic drift
      gsap.to(particle, {
        x: `+=${gsap.utils.random(-25, 25)}`,
        y: `+=${gsap.utils.random(-25, 25)}`,
        duration: () => gsap.utils.random(12, 22),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    })

    // Parallax on scroll for particles
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 2,
      onUpdate: (self) => {
        if (particlesRef.current) {
          gsap.set(particlesRef.current, {
            y: self.progress * -80,
          })
        }
      },
    })
  }, { scope: particlesRef, dependencies: [reducedMotion] })

  const particleCount = isMobile ? 40 : 80
  const orbCount = isMobile ? 3 : 6

  // Generate particles
  const particles = Array.from({ length: particleCount }).map((_, i) => {
    const size = Math.random() * 2.5 + 0.8
    const x = Math.random() * 100
    const y = Math.random() * 100
    const rng = Math.random()
    
    // Color variety: white (60%), purple (25%), orange (15%)
    let color = 'rgba(255, 255, 255, 0.8)'
    if (rng > 0.75) color = 'rgba(124, 58, 237, 0.7)'
    else if (rng > 0.6) color = 'rgba(255, 140, 66, 0.7)'

    return (
      <div
        key={`p-${i}`}
        className="absolute rounded-full gpu-accelerated"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${x}%`,
          top: `${y}%`,
          background: color,
          opacity: Math.random() * 0.6 + 0.2,
          boxShadow: size > 2 ? `0 0 ${size * 3}px ${color}` : 'none',
        }}
      />
    )
  })

  // Generate glass-morphic orbs
  const orbs = Array.from({ length: orbCount }).map((_, i) => {
    const size = Math.random() * 300 + 150
    const x = Math.random() * 80 + 10
    const y = Math.random() * 80 + 10
    const isOrange = i % 3 === 0
    const isCyan = i % 3 === 1

    let bg = 'radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 70%)'
    if (isOrange) bg = 'radial-gradient(circle, rgba(255, 140, 66, 0.06) 0%, transparent 70%)'
    if (isCyan) bg = 'radial-gradient(circle, rgba(6, 182, 212, 0.06) 0%, transparent 70%)'

    return (
      <div
        key={`o-${i}`}
        className="absolute rounded-full gpu-accelerated"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${x}%`,
          top: `${y}%`,
          background: bg,
          filter: `blur(${size * 0.3}px)`,
          opacity: 0.06,
        }}
      />
    )
  })

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* Layer 1: Animated gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #0f0612 0%, #1a0e2e 30%, #15082a 60%, #0f0612 100%)',
        }}
      />

      {/* Layer 2: Mesh gradient overlay */}
      <div
        className="absolute inset-0 gpu-accelerated"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(124, 58, 237, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(255, 140, 66, 0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 80%, rgba(6, 182, 212, 0.05) 0%, transparent 50%)
          `,
          animation: reducedMotion ? 'none' : 'meshRotate 60s linear infinite',
          transformOrigin: 'center center',
        }}
      />

      {/* Layer 3: Floating glass-morphic orbs */}
      <div ref={orbsRef} className="absolute inset-0">
        {orbs}
      </div>

      {/* Layer 4: Particle system */}
      <div ref={particlesRef} className="absolute inset-0">
        {particles}
      </div>

      {/* Layer 5: Radial glow patches for key sections */}
      <div className="absolute inset-0">
        {/* Hero area glow */}
        <div
          className="absolute"
          style={{
            top: '5%',
            left: '30%',
            width: '40%',
            height: '30%',
            background: 'radial-gradient(ellipse, rgba(124, 58, 237, 0.06) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Dashboard area glow */}
        <div
          className="absolute"
          style={{
            top: '50%',
            left: '20%',
            width: '60%',
            height: '30%',
            background: 'radial-gradient(ellipse, rgba(255, 140, 66, 0.04) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>
    </div>
  )
}
