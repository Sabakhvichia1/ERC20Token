'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { TokenRewardAnimation } from './TokenRewardAnimation'
import { useTokenBalance } from '@/contexts/TokenBalanceContext'

const QUIZ_QUESTIONS = [
  {
    question: "What does 'blockchain' mean?",
    options: [
      "A type of cryptocurrency",
      "A digital ledger of transactions",
      "A computer virus",
      "A social media platform"
    ],
    correctAnswer: 1
  },
  {
    question: "What is a cryptocurrency wallet?",
    options: [
      "A physical wallet for cash",
      "A software that stores private keys",
      "A bank account",
      "A credit card"
    ],
    correctAnswer: 1
  },
  {
    question: "What does 'DeFi' stand for?",
    options: [
      "Digital Finance",
      "Decentralized Finance",
      "Defined Finance",
      "Deferred Finance"
    ],
    correctAnswer: 1
  },
  {
    question: "What is Ethereum?",
    options: [
      "A type of Bitcoin",
      "A blockchain platform for smart contracts",
      "A cryptocurrency exchange",
      "A mining software"
    ],
    correctAnswer: 1
  },
  {
    question: "What is an NFT?",
    options: [
      "A type of cryptocurrency",
      "Non-Fungible Token",
      "A blockchain network",
      "A mining algorithm"
    ],
    correctAnswer: 1
  }
]

const REWARD_AMOUNT = '1'

export function CryptoQuiz() {
  const { isConnected } = useAccount()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [showTokenAnimation, setShowTokenAnimation] = useState(false)
  
  const { addTokens, hasClaimedQuiz, setHasClaimedQuiz } = useTokenBalance()

  const handleAnswer = (answerIndex: number) => {
    if (isAnswered) return

    setSelectedAnswer(answerIndex)
    setIsAnswered(true)

    const isCorrect = answerIndex === QUIZ_QUESTIONS[currentQuestion].correctAnswer
    if (isCorrect) {
      setScore(score + 1)
    }

    setTimeout(() => {
      if (currentQuestion + 1 < QUIZ_QUESTIONS.length) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setIsAnswered(false)
      } else {
        setShowResult(true)
      }
    }, 1500)
  }

  const claimReward = () => {
    // Add tokens to website balance
    addTokens(parseFloat(REWARD_AMOUNT))
    setHasClaimedQuiz(true)
    setShowTokenAnimation(true)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowResult(false)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setShowTokenAnimation(false)
  }

  const isPassed = score >= 3

  if (!isConnected) {
    return (
      <div className="card">
        <h3 className="text-2xl font-bold mb-4">🎓 Crypto Quiz</h3>
        <p className="text-secondary">Connect your wallet to take the quiz and earn rewards!</p>
      </div>
    )
  }

  if (showResult) {
    return (
      <>
        <TokenRewardAnimation 
          amount={REWARD_AMOUNT} 
          show={showTokenAnimation}
          onComplete={() => setShowTokenAnimation(false)}
        />
        
        <div className="card">
          <h3 className="text-2xl font-bold mb-4">🎓 Quiz Complete!</h3>
          <div className="text-center space-y-6">
            <div className="text-4xl font-bold gradient-text">
              {score} / {QUIZ_QUESTIONS.length}
            </div>
            <p className="text-lg text-secondary">
              {isPassed ? "🎉 Congratulations! You passed!" : "😢 Better luck next time!"}
            </p>

            {isPassed && !hasClaimedQuiz && (
              <div className="space-y-4">
                <p className="text-secondary">
                  You've earned a reward of <span className="font-bold text-white">{REWARD_AMOUNT} SCT</span>!
                </p>
                <button
                  onClick={claimReward}
                  className="btn-primary w-full"
                >
                  🎁 Claim Reward
                </button>
              </div>
            )}

            {hasClaimedQuiz && (
              <div className="p-4 rounded-lg bg-success/10 border border-success">
                <p className="text-success font-medium">✅ Reward claimed successfully!</p>
              </div>
            )}

            <button onClick={resetQuiz} className="btn-secondary w-full">
              🔄 Try Again
            </button>
          </div>
        </div>
      </>
    )
  }

  const question = QUIZ_QUESTIONS[currentQuestion]

  return (
    <>
      <TokenRewardAnimation 
        amount={REWARD_AMOUNT} 
        show={showTokenAnimation}
        onComplete={() => setShowTokenAnimation(false)}
      />
      
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">🎓 Crypto Quiz</h3>
          <span className="text-sm text-secondary">
            Question {currentQuestion + 1} / {QUIZ_QUESTIONS.length}
          </span>
        </div>

        <div className="space-y-6">
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-lg font-medium">{question.question}</p>
          </div>

          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isCorrect = index === question.correctAnswer
              const isSelected = selectedAnswer === index
              
              let buttonClass = 'btn-secondary w-full text-left justify-start'
              if (isAnswered) {
                if (isSelected && isCorrect) {
                  buttonClass = 'w-full text-left justify-start bg-success/20 border-success text-success'
                } else if (isSelected && !isCorrect) {
                  buttonClass = 'w-full text-left justify-start bg-error/20 border-error text-error'
                } else if (isCorrect) {
                  buttonClass = 'w-full text-left justify-start bg-success/20 border-success text-success'
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={isAnswered}
                  className={buttonClass}
                >
                  {option}
                  {isAnswered && isCorrect && ' ✓'}
                  {isAnswered && isSelected && !isCorrect && ' ✗'}
                </button>
              )
            })}
          </div>

          <div className="flex gap-2 pt-4">
            {Array.from({ length: QUIZ_QUESTIONS.length }).map((_, idx) => (
              <div
                key={idx}
                className={`h-2 flex-1 rounded-full ${
                  idx < currentQuestion
                    ? 'bg-primary'
                    : idx === currentQuestion
                    ? 'bg-primary/50'
                    : 'bg-surface-dark'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
