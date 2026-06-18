'use client'

import { WalletButton } from './WalletButton'

export function Header() {
  return (
    <header className="bg-gradient-to-r from-slate-900/80 to-purple-900/80 backdrop-blur-lg border-b border-purple-500/20 sticky top-0 z-50 animate-fadeIn">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text animate-pulse-slow">
            Saba Token Platform
          </h1>
          <WalletButton />
        </div>
      </div>
    </header>
  )
}
