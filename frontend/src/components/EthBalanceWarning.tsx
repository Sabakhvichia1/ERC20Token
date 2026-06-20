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
    <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-6 animate-fadeIn">
      <div className="flex items-start gap-3">
        <span className="text-2xl">⛽</span>
        <div className="flex-1">
          <h3 className="font-bold text-white mb-1">Low Gas Balance</h3>
          <p className="text-sm text-secondary mb-3">
            You have {balance?.formatted ? `${parseFloat(balance.formatted).toFixed(4)} ETH` : '0 ETH'}. 
            You need Sepolia ETH to pay for transaction gas fees (~0.002 ETH per claim).
          </p>
          <a
            href="https://www.alchemy.com/faucets/ethereum-sepolia"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm py-2 px-4 inline-block"
          >
            Get Free Sepolia ETH →
          </a>
          <p className="text-xs text-secondary mt-2">
            💡 Tip: Visit the faucet to get free testnet ETH for gas fees
          </p>
        </div>
      </div>
    </div>
  )
}
