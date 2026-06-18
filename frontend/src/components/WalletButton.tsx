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
      <div className="flex items-center gap-3 animate-slideIn">
        <div className="glass px-4 py-2 rounded-lg">
          <span className="text-sm font-mono text-cyan-300">
            {truncateAddress(address)}
          </span>
        </div>
        <button
          onClick={() => disconnect()}
          className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 font-medium shadow-lg"
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
        className="px-6 py-3 glass rounded-lg cursor-not-allowed flex items-center gap-2 text-white/60"
      >
        <div className="w-4 h-4 border-2 border-white/40 border-t-cyan-400 rounded-full animate-spin"></div>
        Connecting...
      </button>
    )
  }

  return (
    <div>
      <button
        onClick={() => connect({ connector: connectors[0] })}
        className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 font-semibold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50"
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
