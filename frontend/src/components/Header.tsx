'use client'

import { WalletButton } from './WalletButton'

export function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[var(--bg-deep)]/70 border-b border-[var(--border-glass)]">
      <div className="container mx-auto px-6 lg:px-8 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-sm font-heading tracking-tight transition-all duration-300 hover:scale-110"
              style={{
                background: 'var(--gradient-primary)',
                boxShadow: '0 4px 16px rgba(124, 58, 237, 0.3)',
              }}
            >
              ST
            </div>
            <h1 className="font-heading text-xl font-bold gradient-text tracking-[-0.01em]">
              Samargalo Token
            </h1>
          </div>
          <WalletButton />
        </div>
      </div>
    </header>
  )
}
