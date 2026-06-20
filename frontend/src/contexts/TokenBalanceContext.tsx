'use client'

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react'

interface TokenBalanceContextType {
  websiteBalance: number
  addTokens: (amount: number) => void
  hasClaimedQuiz: boolean
  hasClaimedGame: boolean
  setHasClaimedQuiz: (claimed: boolean) => void
  setHasClaimedGame: (claimed: boolean) => void
}

const TokenBalanceContext = createContext<TokenBalanceContextType | undefined>(undefined)

export function TokenBalanceProvider({ children }: { children: ReactNode }) {
  const [websiteBalance, setWebsiteBalance] = useState(0)
  const [hasClaimedQuiz, setHasClaimedQuiz] = useState(false)
  const [hasClaimedGame, setHasClaimedGame] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('sct_website_balance')
    const savedQuiz = localStorage.getItem('sct_claimed_quiz')
    const savedGame = localStorage.getItem('sct_claimed_game')
    
    if (saved) setWebsiteBalance(parseFloat(saved))
    if (savedQuiz) setHasClaimedQuiz(savedQuiz === 'true')
    if (savedGame) setHasClaimedGame(savedGame === 'true')
  }, [])

  const addTokens = useCallback((amount: number) => {
    setWebsiteBalance(prev => {
      const newBalance = prev + amount
      localStorage.setItem('sct_website_balance', newBalance.toString())
      return newBalance
    })
  }, [])

  const setQuizClaimed = useCallback((claimed: boolean) => {
    setHasClaimedQuiz(claimed)
    localStorage.setItem('sct_claimed_quiz', claimed.toString())
  }, [])

  const setGameClaimed = useCallback((claimed: boolean) => {
    setHasClaimedGame(claimed)
    localStorage.setItem('sct_claimed_game', claimed.toString())
  }, [])

  return (
    <TokenBalanceContext.Provider value={{ 
      websiteBalance, 
      addTokens, 
      hasClaimedQuiz,
      hasClaimedGame,
      setHasClaimedQuiz: setQuizClaimed,
      setHasClaimedGame: setGameClaimed
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
