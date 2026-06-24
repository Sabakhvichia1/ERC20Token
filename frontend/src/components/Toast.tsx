'use client'

import { useEffect } from 'react'

interface ToastProps {
  message: string
  isVisible: boolean
  onClose: () => void
}

export function Toast({ message, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div className="fixed top-6 right-6 z-[100] animate-toastSlideIn">
      <div
        className="glass-card px-6 py-4 shadow-2xl flex items-center gap-3"
        style={{
          borderColor: 'rgba(16, 185, 129, 0.3)',
          boxShadow: '0 8px 32px rgba(16, 185, 129, 0.15), 0 4px 16px rgba(0, 0, 0, 0.3)',
        }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: 'rgba(16, 185, 129, 0.15)',
            boxShadow: '0 0 12px rgba(16, 185, 129, 0.2)',
          }}
        >
          <svg className="w-5 h-5 text-[var(--success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-white font-medium text-sm font-heading">{message}</p>
      </div>
    </div>
  )
}
