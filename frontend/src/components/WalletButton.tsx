'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'

export function WalletButton() {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending, error } = useConnect()
  const { disconnect } = useDisconnect()

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-4 animate-slideIn">
        <span className="text-sm font-mono bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-purple-400/30 px-3 py-2 rounded-lg text-blue-300 backdrop-blur-sm">
          {truncateAddress(address)}
        </span>
        <button
          onClick={() => disconnect()}
          className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/50"
        >
          Disconnect
        </button>
      </div>
    )
  }

  if (isPending) {
    return (
      <button 
        disabled 
        className="px-4 py-2 bg-gradient-to-r from-blue-500/50 to-purple-500/50 text-white rounded-lg cursor-not-allowed flex items-center gap-2"
      >
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        Connecting...
      </button>
    )
  }

  return (
    <div>
      <button
        onClick={() => connect({ connector: connectors[0] })}
        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/50 min-h-[44px] font-semibold"
      >
        Connect Wallet
      </button>
      {error && (
        <p className="text-red-400 text-sm mt-2 max-w-xs animate-fadeIn">
          {error.name === 'UserRejectedRequestError' 
            ? 'Connection rejected. Please try again.'
            : error.message}
        </p>
      )}
    </div>
  )
}
