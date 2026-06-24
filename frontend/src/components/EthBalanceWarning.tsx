'use client'

import { useAccount, useBalance } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { parseEther } from 'viem'

export function EthBalanceWarning() {
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({
    address,
    chainId: sepolia.id,
  })

  // Only show if connected and balance is low (less than 0.01 ETH)
  const isLowBalance = balance && balance.value < parseEther('0.01')
  
  if (!isConnected || !isLowBalance) {
    return null
  }

  return (
    <div
      className="rounded-xl p-5 mb-6 animate-slideInDown border"
      style={{
        background: 'rgba(245, 158, 11, 0.08)',
        borderColor: 'rgba(245, 158, 11, 0.25)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="flex items-start gap-4">
        <span className="text-2xl flex-shrink-0">⛽</span>
        <div className="flex-1">
          <h3 className="font-heading font-bold text-white mb-1 tracking-[-0.01em]">Low Gas Balance</h3>
          <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
            You have {balance?.formatted ? `${parseFloat(balance.formatted).toFixed(4)} ETH` : '0 ETH'}. 
            You need Sepolia ETH to pay for transaction gas fees (~0.002 ETH per claim).
          </p>
          <a
            href="https://www.alchemy.com/faucets/ethereum-sepolia"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm py-2.5 px-5 inline-block font-heading"
          >
            Get Free Sepolia ETH →
          </a>
          <p className="text-caption text-[var(--text-secondary)] mt-3">
            💡 Tip: Visit the faucet to get free testnet ETH for gas fees
          </p>
        </div>
      </div>
    </div>
  )
}
