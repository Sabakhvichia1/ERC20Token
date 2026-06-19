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
      <div className="flex items-center gap-3 animate-slideInRight">
        <div className="px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-400/30">
          <span className="text-sm font-mono text-cyan-300 font-medium">
            {truncateAddress(address)}
          </span>
        </div>
        <button
          onClick={() => disconnect()}
          className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all duration-300 font-medium border border-white/10 hover:border-white/20"
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
        className="px-6 py-3 bg-white/5 rounded-lg cursor-not-allowed flex items-center gap-2 text-gray-400 border border-white/10"
      >
        <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
        Connecting...
      </button>
    )
  }

  return (
    <div>
      <button
        onClick={() => connect({ connector: connectors[0] })}
        className="btn-primary"
      >
        Connect Wallet
      </button>
      {error && (
        <p className="text-orange-red text-sm mt-2 max-w-xs animate-fadeIn">
          {error.name === 'UserRejectedRequestError' 
            ? 'Connection rejected. Please try again.'
            : error.message}
        </p>
      )}
    </div>
  )
}
