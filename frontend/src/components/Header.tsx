'use client'

import { WalletButton } from './WalletButton'

export function Header() {
  return (
    <header className="glass sticky top-0 z-50 border-b border-green-100">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center font-bold text-white shadow-lg">
              ST
            </div>
            <h1 className="text-xl font-semibold text-gray-800">
              Saba Token
            </h1>
          </div>
          <WalletButton />
        </div>
      </div>
    </header>
  )
}
