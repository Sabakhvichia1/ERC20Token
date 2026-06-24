'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { TokenRewardAnimation } from './TokenRewardAnimation'
import { useTokenBalance } from '@/contexts/TokenBalanceContext'

type Player = 'X' | 'O' | null
type Board = Player[]

const REWARD_AMOUNT = '2'

export function TicTacToe() {
  const { isConnected } = useAccount()
  const [board, setBoard] = useState<Board>(Array(9).fill(null))
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [winner, setWinner] = useState<Player | 'Draw' | null>(null)
  const [winningLine, setWinningLine] = useState<number[]>([])
  const [showTokenAnimation, setShowTokenAnimation] = useState(false)
  const [hasClaimedThisAttempt, setHasClaimedThisAttempt] = useState(false)
  
  const { addTokens, gameClaims, incrementGameClaims } = useTokenBalance()

  const checkWinner = (currentBoard: Board): { winner: Player | 'Draw' | null; line: number[] } => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ]

    for (const line of lines) {
      const [a, b, c] = line
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return { winner: currentBoard[a], line }
      }
    }

    if (currentBoard.every(cell => cell !== null)) {
      return { winner: 'Draw', line: [] }
    }

    return { winner: null, line: [] }
  }

  const getComputerMove = (currentBoard: Board): number => {
    // Check if computer can win
    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        const testBoard = [...currentBoard]
        testBoard[i] = 'O'
        if (checkWinner(testBoard).winner === 'O') {
          return i
        }
      }
    }

    // Check if need to block player
    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        const testBoard = [...currentBoard]
        testBoard[i] = 'X'
        if (checkWinner(testBoard).winner === 'X') {
          return i
        }
      }
    }

    // Take center if available
    if (currentBoard[4] === null) {
      return 4
    }

    // Take corners
    const corners = [0, 2, 6, 8]
    const availableCorners = corners.filter(i => currentBoard[i] === null)
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)]
    }

    // Take any available space
    const available = currentBoard.map((cell, idx) => cell === null ? idx : -1).filter(idx => idx !== -1)
    return available[Math.floor(Math.random() * available.length)]
  }

  const handleClick = (index: number) => {
    if (board[index] || winner || !isPlayerTurn || !isConnected) return

    const newBoard = [...board]
    newBoard[index] = 'X'
    setBoard(newBoard)
    setIsPlayerTurn(false)

    const result = checkWinner(newBoard)
    if (result.winner) {
      setWinner(result.winner)
      setWinningLine(result.line)
      return
    }

    // Computer's turn
    setTimeout(() => {
      const computerMove = getComputerMove(newBoard)
      const computerBoard = [...newBoard]
      computerBoard[computerMove] = 'O'
      setBoard(computerBoard)
      
      const computerResult = checkWinner(computerBoard)
      if (computerResult.winner) {
        setWinner(computerResult.winner)
        setWinningLine(computerResult.line)
      }
      
      setIsPlayerTurn(true)
    }, 500)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsPlayerTurn(true)
    setWinner(null)
    setWinningLine([])
    setShowTokenAnimation(false)
    setHasClaimedThisAttempt(false)
  }

  const claimReward = () => {
    addTokens(parseFloat(REWARD_AMOUNT))
    incrementGameClaims()
    setHasClaimedThisAttempt(true)
    setShowTokenAnimation(true)
  }

  if (!isConnected) {
    return (
      <div className="card">
        <h3 className="font-heading text-xl md:text-2xl font-bold mb-4 tracking-[-0.01em]">🎮 Tic Tac Toe</h3>
        <p className="text-[var(--text-secondary)] leading-relaxed">Connect your wallet to play and earn rewards!</p>
      </div>
    )
  }

  return (
    <>
      <TokenRewardAnimation 
        amount={REWARD_AMOUNT} 
        show={showTokenAnimation}
        onComplete={() => setShowTokenAnimation(false)}
      />
      
      <div className="card">
        <h3 className="font-heading text-xl md:text-2xl font-bold mb-6 tracking-[-0.01em]">🎮 Tic Tac Toe</h3>
        
        <div className="text-center mb-6">
          {!winner && (
            <p className="text-lg text-[var(--text-secondary)] font-heading">
              {isPlayerTurn ? "Your turn (X)" : "Computer thinking... (O)"}
            </p>
          )}
          
          {winner && (
            <div className="space-y-4">
              <p className="font-heading text-2xl font-bold gradient-text tracking-[-0.02em]">
                {winner === 'X' ? '🎉 You Won!' : winner === 'O' ? '😢 Computer Won!' : '🤝 Draw!'}
              </p>
              
              {winner === 'X' && gameClaims < 5 && !hasClaimedThisAttempt && (
                <div className="space-y-3">
                  <p className="text-[var(--text-secondary)]">
                    You&apos;ve earned <span className="font-bold text-white">{REWARD_AMOUNT} SCT</span>! ({gameClaims}/5 claims used)
                  </p>
                  <button
                    onClick={claimReward}
                    className="btn-primary w-full font-heading"
                  >
                    🎁 Claim Reward
                  </button>
                </div>
              )}

              {hasClaimedThisAttempt && (
                <div
                  className="p-4 rounded-xl"
                  style={{
                    background: 'rgba(16, 185, 129, 0.08)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                  }}
                >
                  <p className="text-[var(--success)] font-medium font-heading text-sm">✅ Reward claimed successfully! ({gameClaims}/5 total claimed)</p>
                </div>
              )}

              {winner === 'X' && gameClaims >= 5 && !hasClaimedThisAttempt && (
                <div
                  className="p-4 rounded-xl"
                  style={{
                    background: 'rgba(124, 58, 237, 0.08)',
                    border: '1px solid rgba(124, 58, 237, 0.3)',
                  }}
                >
                  <p className="text-[var(--text-secondary)] font-medium font-heading text-sm">You have claimed the maximum amount of game rewards (5/5).</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto mb-6">
          {board.map((cell, index) => {
            const isWinningCell = winningLine.includes(index)
            
            let cellStyle: React.CSSProperties = {
              background: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.08)',
            }

            if (cell === 'X') {
              cellStyle = {
                background: 'rgba(6, 182, 212, 0.08)',
                borderColor: 'rgba(6, 182, 212, 0.4)',
                color: 'var(--accent-cyan)',
              }
            } else if (cell === 'O') {
              cellStyle = {
                background: 'rgba(124, 58, 237, 0.08)',
                borderColor: 'rgba(124, 58, 237, 0.4)',
                color: 'var(--accent-purple)',
              }
            }

            if (isWinningCell) {
              cellStyle = {
                ...cellStyle,
                boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)',
                borderColor: 'rgba(16, 185, 129, 0.6)',
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleClick(index)}
                disabled={!isPlayerTurn || !!cell || !!winner}
                className={`
                  aspect-square text-3xl md:text-4xl font-bold rounded-xl border-2 transition-all duration-300 font-heading
                  ${!cell && !winner && isPlayerTurn ? 'hover:border-accent-cyan/50 hover:bg-accent-cyan/5 hover:scale-105' : ''}
                  ${isWinningCell ? 'animate-pulse' : ''}
                  disabled:cursor-not-allowed
                `}
                style={cellStyle}
              >
                {cell}
              </button>
            )
          })}
        </div>

        <button onClick={resetGame} className="btn-secondary w-full font-heading">
          🔄 New Game
        </button>

        <div
          className="mt-5 p-4 rounded-xl"
          style={{
            background: 'rgba(124, 58, 237, 0.06)',
            border: '1px solid rgba(124, 58, 237, 0.15)',
          }}
        >
          <p className="text-sm text-[var(--text-secondary)] text-center">
            💡 Beat the computer to earn {REWARD_AMOUNT} SCT tokens!
          </p>
        </div>
      </div>
    </>
  )
}
