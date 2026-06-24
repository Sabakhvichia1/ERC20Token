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
    <div
      className="rounded-xl p-5 mb-6 animate-slideInDown border"
      style={{
        background: 'rgba(239, 68, 68, 0.08)',
        borderColor: 'rgba(239, 68, 68, 0.25)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="flex items-start gap-4">
        <span className="text-2xl flex-shrink-0">⚠️</span>
        <div className="flex-1">
          <h3 className="font-heading font-bold text-white mb-1 tracking-[-0.01em]">Wrong Network Detected</h3>
          <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
            You&apos;re connected to the wrong network. This dApp works on Sepolia testnet only.
          </p>
          <button
            onClick={() => switchChain({ chainId: sepolia.id })}
            className="btn-primary text-sm py-2.5 px-5 font-heading"
          >
            Switch to Sepolia Network
          </button>
        </div>
      </div>
    </div>
  )
}
