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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={handleClose}></div>
        <div className="glass-card relative gradient-border-top max-w-md w-full z-10 animate-modalSlideUp text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/50">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-3xl font-bold mb-2 gradient-text">
            Transaction Sent!
          </h3>
          <p className="text-secondary mb-8">Your tokens are being transferred</p>
          <button
            onClick={handleClose}
            className="btn-primary w-full"
          >
            Done
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={handleClose}></div>
      
      <div className="glass-card relative gradient-border-top max-w-md w-full z-10 animate-modalSlideUp">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-3xl font-bold gradient-text">
            Send SCT Tokens
          </h3>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-all duration-300 text-gray-400 hover:text-white hover:rotate-90"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-5">
          {/* Recipient Address */}
          <div>
            <label className="block text-xs uppercase text-muted mb-2 font-medium tracking-wider">
              To Address
            </label>
            <div className="relative">
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="0x..."
                className="input-dark w-full font-mono"
              />
              {recipient && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {validateAddress(recipient) ? (
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-orange-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-xs uppercase text-muted mb-2 font-medium tracking-wider">
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
                className="input-dark w-full text-lg font-semibold"
              />
              <button
                onClick={() => setAmount(maxBalance)}
                className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded text-sm font-medium transition-colors"
              >
                Max
              </button>
            </div>
            <p className="text-xs text-muted mt-2">Available: {maxBalance} SCT</p>
          </div>

          {/* Gas Estimate */}
          <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
            <p className="text-xs text-muted">Estimated gas: ~0.001 ETH</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-orange-red/10 border border-orange-red/30 rounded-lg animate-fadeIn">
              <p className="text-sm text-orange-red">{error}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleSend}
              disabled={isPending || isConfirming}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending || isConfirming ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {isPending ? 'Sending...' : 'Confirming...'}
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Send
                </>
              )}
            </button>
            
            <button
              onClick={handleClose}
              disabled={isPending || isConfirming}
              className="btn-secondary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
