'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import { SABA_TOKEN_ADDRESS, SABA_TOKEN_ABI } from '@/lib/constants'

interface SendTokenModalProps {
  isOpen: boolean
  onClose: () => void
  maxBalance: string
}

export function SendTokenModal({ isOpen, onClose, maxBalance }: SendTokenModalProps) {
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [error, setError] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const validateAddress = (addr: string) => {
    return /^0x[a-fA-F0-9]{40}$/.test(addr)
  }

  const handleSend = async () => {
    setError('')

    if (!recipient || !validateAddress(recipient)) {
      setError('Invalid Ethereum address')
      return
    }

    if (!amount || parseFloat(amount) <= 0) {
      setError('Invalid amount')
      return
    }

    if (parseFloat(amount) > parseFloat(maxBalance)) {
      setError('Insufficient balance')
      return
    }

    try {
      writeContract({
        address: SABA_TOKEN_ADDRESS,
        abi: SABA_TOKEN_ABI,
        functionName: 'transfer',
        args: [recipient as `0x${string}`, parseEther(amount)],
      })
    } catch (err: any) {
      setError(err.message || 'Transaction failed')
    }
  }

  const handleClose = () => {
    setRecipient('')
    setAmount('')
    setError('')
    onClose()
  }

  if (!isOpen) return null

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-overlayFadeIn">
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={handleClose}></div>
        <div className="gradient-border rounded-2xl p-8 max-w-md w-full z-10 animate-modalSlideUp text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">
            Transaction Sent!
          </h3>
          <p className="text-gray-300 mb-6">Your tokens are being transferred</p>
          <button
            onClick={handleClose}
            className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 font-semibold"
          >
            Done
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-overlayFadeIn">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={handleClose}></div>
      
      <div className="gradient-border rounded-2xl p-6 max-w-md w-full z-10 animate-modalSlideUp">
        <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">
          Send SCT Tokens
        </h3>

        <div className="space-y-4">
          {/* Recipient Address */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              To Address
            </label>
            <div className="relative">
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="0x..."
                className="w-full px-4 py-3 glass rounded-lg border border-white/10 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 text-white font-mono text-sm transition-all"
              />
              {recipient && validateAddress(recipient) && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Amount (SCT)
            </label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0"
                max={maxBalance}
                className="w-full px-4 py-3 glass rounded-lg border border-white/10 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 text-white font-semibold text-lg transition-all"
              />
              <button
                onClick={() => setAmount(maxBalance)}
                className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded text-sm font-medium transition-colors"
              >
                Max
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">Available: {maxBalance} SCT</p>
          </div>

          {/* Gas Estimate */}
          <div className="glass p-3 rounded-lg">
            <p className="text-xs text-gray-400">Estimated gas: ~0.001 ETH</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleSend}
              disabled={isPending || isConfirming}
              className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 font-semibold shadow-lg disabled:shadow-none flex items-center justify-center gap-2"
            >
              {isPending || isConfirming ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {isPending ? 'Sending...' : 'Confirming...'}
                </>
              ) : (
                'Send'
              )}
            </button>
            
            <button
              onClick={handleClose}
              disabled={isPending || isConfirming}
              className="w-full px-6 py-3 glass border border-cyan-400/50 hover:bg-cyan-500/10 text-white rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
