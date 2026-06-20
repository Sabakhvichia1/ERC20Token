'use client'

import { useAccount, useChainId, useSwitchChain } from 'wagmi'
import { sepolia } from 'wagmi/chains'

export function NetworkWarning() {
  const { isConnected } = useAccount()
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()

  // Only show warning if connected and not on Sepolia
  if (!isConnected || chainId === sepolia.id) {
    return null
  }

  return (
    <div className="bg-orange-red/20 border border-orange-red/50 rounded-lg p-4 mb-6 animate-fadeIn">
      <div className="flex items-start gap-3">
        <span className="text-2xl">⚠️</span>
        <div className="flex-1">
          <h3 className="font-bold text-white mb-1">Wrong Network Detected</h3>
          <p className="text-sm text-secondary mb-3">
            You're connected to the wrong network. This dApp works on Sepolia testnet only.
          </p>
          <button
            onClick={() => switchChain({ chainId: sepolia.id })}
            className="btn-primary text-sm py-2 px-4"
          >
            Switch to Sepolia Network
          </button>
        </div>
      </div>
    </div>
  )
}
