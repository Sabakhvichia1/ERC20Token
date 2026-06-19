'use client'

import { WalletButton } from './WalletButton'

export function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-black/20 border-b border-white/10">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-110">
              ST
            </div>
            <h1 className="text-xl font-bold text-white">
              Saba Token
            </h1>
          </div>
          <WalletButton />
        </div>
      </div>
    </header>
  )
}
