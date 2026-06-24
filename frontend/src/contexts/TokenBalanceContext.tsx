'use client'

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react'

interface TokenBalanceContextType {
  websiteBalance: number
  addTokens: (amount: number) => void
  quizClaims: number
  gameClaims: number
  incrementQuizClaims: () => void
  incrementGameClaims: () => void
}

const TokenBalanceContext = createContext<TokenBalanceContextType | undefined>(undefined)

export function TokenBalanceProvider({ children }: { children: ReactNode }) {
  const [websiteBalance, setWebsiteBalance] = useState(0)
  const [quizClaims, setQuizClaims] = useState(0)
  const [gameClaims, setGameClaims] = useState(0)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('sct_website_balance')
    const savedQuiz = localStorage.getItem('sct_quiz_claims')
    const savedGame = localStorage.getItem('sct_game_claims')
    
    // Handle old boolean format gracefully
    const oldSavedQuiz = localStorage.getItem('sct_claimed_quiz')
    const oldSavedGame = localStorage.getItem('sct_claimed_game')
    
    if (saved) setWebsiteBalance(parseFloat(saved))
    
    if (savedQuiz) setQuizClaims(parseInt(savedQuiz, 10))
    else if (oldSavedQuiz === 'true') setQuizClaims(1)
    
    if (savedGame) setGameClaims(parseInt(savedGame, 10))
    else if (oldSavedGame === 'true') setGameClaims(1)
  }, [])

  const addTokens = useCallback((amount: number) => {
    setWebsiteBalance(prev => {
      const newBalance = prev + amount
      localStorage.setItem('sct_website_balance', newBalance.toString())
      return newBalance
    })
  }, [])

  const incrementQuizClaims = useCallback(() => {
    setQuizClaims(prev => {
      const newCount = prev + 1
      localStorage.setItem('sct_quiz_claims', newCount.toString())
      return newCount
    })
  }, [])

  const incrementGameClaims = useCallback(() => {
    setGameClaims(prev => {
      const newCount = prev + 1
      localStorage.setItem('sct_game_claims', newCount.toString())
      return newCount
    })
  }, [])

  return (
    <TokenBalanceContext.Provider value={{ 
      websiteBalance, 
      addTokens, 
      quizClaims,
      gameClaims,
      incrementQuizClaims,
      incrementGameClaims
    }}>
      {children}
    </TokenBalanceContext.Provider>
  )
}

export function useTokenBalance() {
  const context = useContext(TokenBalanceContext)
  if (context === undefined) {
    throw new Error('useTokenBalance must be used within a TokenBalanceProvider')
  }
  return context
}
