'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import { SAMARGALO_TOKEN_ADDRESS, SAMARGALO_TOKEN_ABI } from '@/lib/constants'

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
        address: SAMARGALO_TOKEN_ADDRESS,
        abi: SAMARGALO_TOKEN_ABI,
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
        <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={handleClose}></div>
        <div className="glass-card relative gradient-border-top max-w-md w-full z-10 animate-modalSlideUp text-center">
          <div
            className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, var(--success), #34d399)',
              boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4)',
            }}
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-heading text-2xl md:text-3xl font-bold mb-2 gradient-text tracking-[-0.02em]">
            Transaction Sent!
          </h3>
          <p className="text-[var(--text-secondary)] mb-8">Your tokens are being transferred</p>
          <button
            onClick={handleClose}
            className="btn-primary w-full font-heading"
          >
            Done
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={handleClose}></div>
      
      <div className="glass-card relative gradient-border-top max-w-md w-full z-10 animate-modalSlideUp">
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-heading text-2xl md:text-3xl font-bold gradient-text tracking-[-0.02em]">
            Send SCT Tokens
          </h3>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-white/10 rounded-xl transition-all duration-300 text-[var(--text-muted)] hover:text-white hover:rotate-90"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-5">
          {/* Recipient Address */}
          <div>
            <label className="block text-caption uppercase text-[var(--text-muted)] mb-2 font-medium tracking-wider">
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
                    <svg className="w-5 h-5 text-[var(--success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-[var(--error)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-caption uppercase text-[var(--text-muted)] mb-2 font-medium tracking-wider">
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
                className="input-dark w-full text-lg font-semibold font-heading"
              />
              <button
                onClick={() => setAmount(maxBalance)}
                className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg text-sm font-medium font-heading transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(124, 58, 237, 0.15)',
                  color: 'var(--accent-purple)',
                  border: '1px solid rgba(124, 58, 237, 0.25)',
                }}
              >
                Max
              </button>
            </div>
            <p className="text-caption text-[var(--text-muted)] mt-2">Available: {maxBalance} SCT</p>
          </div>

          {/* Gas Estimate */}
          <div className="bg-white/[0.03] border border-[var(--border-glass)] p-4 rounded-xl">
            <p className="text-caption text-[var(--text-muted)]">Estimated gas: ~0.001 ETH</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-[var(--error)]/10 border border-[var(--error)]/30 rounded-xl animate-fadeIn">
              <p className="text-sm text-[var(--error)]">{error}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleSend}
              disabled={isPending || isConfirming}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed font-heading"
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
              className="btn-secondary w-full disabled:opacity-50 disabled:cursor-not-allowed font-heading"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
