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
        <div
          className="px-4 py-2.5 rounded-xl border font-mono text-sm font-medium"
          style={{
            background: 'rgba(124, 58, 237, 0.1)',
            borderColor: 'rgba(124, 58, 237, 0.3)',
            color: 'var(--accent-purple)',
          }}
        >
          {truncateAddress(address)}
        </div>
        <button
          onClick={() => disconnect()}
          className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all duration-300 font-medium border border-white/10 hover:border-white/20 hover:scale-105 font-heading text-sm"
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
        className="px-6 py-3 bg-white/5 rounded-xl cursor-not-allowed flex items-center gap-2 text-[var(--text-muted)] border border-white/10 font-heading text-sm"
      >
        <div className="w-4 h-4 border-2 border-accent-purple border-t-transparent rounded-full animate-spin"></div>
        Connecting...
      </button>
    )
  }

  return (
    <div>
      <button
        onClick={() => connect({ connector: connectors[0] })}
        className="btn-primary font-heading text-sm"
        id="header-connect-wallet"
      >
        Connect Wallet
      </button>
      {error && (
        <p className="text-[var(--error)] text-sm mt-2 max-w-xs animate-fadeIn">
          {error.name === 'UserRejectedRequestError' 
            ? 'Connection rejected. Please try again.'
            : error.message}
        </p>
      )}
    </div>
  )
}
