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
  
  const { addTokens, hasClaimedGame, setHasClaimedGame } = useTokenBalance()

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
  }

  const claimReward = () => {
    // Add tokens to website balance
    addTokens(parseFloat(REWARD_AMOUNT))
    setHasClaimedGame(true)
    setShowTokenAnimation(true)
  }

  if (!isConnected) {
    return (
      <div className="card">
        <h3 className="text-2xl font-bold mb-4">🎮 Tic Tac Toe</h3>
        <p className="text-secondary">Connect your wallet to play and earn rewards!</p>
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
        <h3 className="text-2xl font-bold mb-4">🎮 Tic Tac Toe</h3>
        
        <div className="text-center mb-6">
          {!winner && (
            <p className="text-lg text-secondary">
              {isPlayerTurn ? "Your turn (X)" : "Computer thinking... (O)"}
            </p>
          )}
          
          {winner && (
            <div className="space-y-4">
              <p className="text-2xl font-bold gradient-text">
                {winner === 'X' ? '🎉 You Won!' : winner === 'O' ? '😢 Computer Won!' : '🤝 Draw!'}
              </p>
              
              {winner === 'X' && !hasClaimedGame && (
                <div className="space-y-3">
                  <p className="text-secondary">
                    You've earned <span className="font-bold text-white">{REWARD_AMOUNT} SCT</span>!
                  </p>
                  <button
                    onClick={claimReward}
                    className="btn-primary w-full"
                  >
                    🎁 Claim Reward
                  </button>
                </div>
              )}

              {hasClaimedGame && (
                <div className="p-4 rounded-lg bg-success/10 border border-success">
                  <p className="text-success font-medium">✅ Reward claimed successfully!</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto mb-6">
          {board.map((cell, index) => {
            const isWinningCell = winningLine.includes(index)
            return (
              <button
                key={index}
                onClick={() => handleClick(index)}
                disabled={!isPlayerTurn || !!cell || !!winner}
                className={`
                  aspect-square text-4xl font-bold rounded-lg border-2 transition-all
                  ${cell === 'X' ? 'text-primary border-primary bg-primary/10' : ''}
                  ${cell === 'O' ? 'text-accent border-accent bg-accent/10' : ''}
                  ${!cell ? 'border-surface-dark hover:border-primary/50 hover:bg-primary/5' : ''}
                  ${isWinningCell ? 'ring-4 ring-success animate-pulse' : ''}
                  disabled:cursor-not-allowed
                `}
              >
                {cell}
              </button>
            )
          })}
        </div>

        <button onClick={resetGame} className="btn-secondary w-full">
          🔄 New Game
        </button>

        <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
          <p className="text-sm text-secondary text-center">
            💡 Beat the computer to earn {REWARD_AMOUNT} SCT tokens!
          </p>
        </div>
      </div>
    </>
  )
}
