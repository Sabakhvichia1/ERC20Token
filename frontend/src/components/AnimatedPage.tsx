'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface AnimatedPageProps {
  children: React.ReactNode
}

export function AnimatedPage({ children }: AnimatedPageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(motionQuery.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    motionQuery.addEventListener('change', handler)
    return () => motionQuery.removeEventListener('change', handler)
  }, [])

  useGSAP(() => {
    if (!containerRef.current || reducedMotion || hasAnimated.current) return
    hasAnimated.current = true

    const ctx = gsap.context(() => {
      // Master entrance timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Hero heading - letter-by-letter reveal
      const heroHeading = containerRef.current?.querySelector('[data-animate="hero-heading"]')
      if (heroHeading) {
        const text = heroHeading.textContent || ''
        heroHeading.textContent = ''
        heroHeading.setAttribute('aria-label', text)

        // Split into words, then letters
        const words = text.split(' ')
        words.forEach((word, wordIndex) => {
          const wordSpan = document.createElement('span')
          wordSpan.style.display = 'inline-block'
          wordSpan.style.whiteSpace = 'nowrap'

          word.split('').forEach((char) => {
            const span = document.createElement('span')
            span.textContent = char
            span.style.display = 'inline-block'
            span.className = 'hero-letter'
            wordSpan.appendChild(span)
          })

          heroHeading.appendChild(wordSpan)

          // Add space between words
          if (wordIndex < words.length - 1) {
            const space = document.createElement('span')
            space.innerHTML = '&nbsp;'
            space.style.display = 'inline-block'
            heroHeading.appendChild(space)
          }
        })

        // Use fromTo so default visible state is maintained if GSAP fails
        tl.fromTo('.hero-letter', 
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.04, stagger: 0.025, ease: 'power2.out' },
          0
        )
      }

      // Hero subtitle
      tl.fromTo('[data-animate="hero-subtitle"]',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.6
      )

      // Hero CTA button
      tl.fromTo('[data-animate="hero-cta"]',
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6 },
        0.9
      )

      // Hero illustration - rings expanding outward
      tl.fromTo('[data-animate="hero-ring-outer"]',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.2)' },
        0.4
      )

      tl.fromTo('[data-animate="hero-ring-inner"]',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.4)' },
        0.6
      )

      // Feature cards - staggered slide-in from bottom
      tl.fromTo('[data-animate="feature-card"]',
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out' },
        1.0
      )

      // Feature icons - start infinite subtle rotation
      const featureIcons = containerRef.current?.querySelectorAll('[data-animate="feature-icon"]')
      featureIcons?.forEach((icon) => {
        gsap.to(icon, {
          rotation: 360,
          duration: 20,
          repeat: -1,
          ease: 'none',
        })
      })

      // ScrollTrigger reveals for sections below the fold
      // Use fromTo so elements are visible by default (not hidden with from)
      const revealSections = containerRef.current?.querySelectorAll('[data-animate="reveal"]')
      revealSections?.forEach((section) => {
        gsap.fromTo(section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      // Dashboard cards - staggered reveal on scroll
      const dashCards = containerRef.current?.querySelectorAll('[data-animate="dash-card"]')
      dashCards?.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

    }, containerRef)

    return () => ctx.revert()
  }, { scope: containerRef, dependencies: [reducedMotion] })

  return (
    <div ref={containerRef}>
      {children}
    </div>
  )
}
