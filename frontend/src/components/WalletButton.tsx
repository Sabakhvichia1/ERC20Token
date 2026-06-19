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
        <div className="glass px-4 py-2 rounded-lg border border-green-200">
          <span className="text-sm font-mono text-green-700 font-medium">
            {truncateAddress(address)}
          </span>
        </div>
        <button
          onClick={() => disconnect()}
          className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200 font-medium border border-gray-200"
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
        className="px-6 py-3 glass rounded-lg cursor-not-allowed flex items-center gap-2 text-gray-500 border border-gray-200"
      >
        <div className="w-4 h-4 border-2 border-gray-400 border-t-green-600 rounded-full animate-spin"></div>
        Connecting...
      </button>
    )
  }

  return (
    <div>
      <button
        onClick={() => connect({ connector: connectors[0] })}
        className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 font-semibold shadow-lg shadow-green-600/30"
      >
        Connect Wallet
      </button>
      {error && (
        <p className="text-red-500 text-sm mt-2 max-w-xs animate-fadeIn">
          {error.name === 'UserRejectedRequestError' 
            ? 'Connection rejected. Please try again.'
            : error.message}
        </p>
      )}
    </div>
  )
}
