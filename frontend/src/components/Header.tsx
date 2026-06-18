'use client'

import { WalletButton } from './WalletButton'

export function Header() {
  return (
    <header className="glass sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-500/20">
              ST
            </div>
            <h1 className="text-xl font-bold">
              ERC-20 Token Platform
            </h1>
          </div>
          <WalletButton />
        </div>
      </div>
    </header>
  )
}
