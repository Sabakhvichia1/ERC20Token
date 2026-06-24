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
  const [hasClaimedThisAttempt, setHasClaimedThisAttempt] = useState(false)
  
  const { addTokens, quizClaims, incrementQuizClaims } = useTokenBalance()

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
    addTokens(parseFloat(REWARD_AMOUNT))
    incrementQuizClaims()
    setHasClaimedThisAttempt(true)
    setShowTokenAnimation(true)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowResult(false)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setShowTokenAnimation(false)
    setHasClaimedThisAttempt(false)
  }

  const isPassed = score >= 3

  if (!isConnected) {
    return (
      <div className="card">
        <h3 className="font-heading text-xl md:text-2xl font-bold mb-4 tracking-[-0.01em]">🎓 Crypto Quiz</h3>
        <p className="text-[var(--text-secondary)] leading-relaxed">Connect your wallet to take the quiz and earn rewards!</p>
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
          <h3 className="font-heading text-xl md:text-2xl font-bold mb-6 tracking-[-0.01em]">🎓 Quiz Complete!</h3>
          <div className="text-center space-y-6">
            <div className="font-heading text-4xl font-bold gradient-text tracking-[-0.02em]">
              {score} / {QUIZ_QUESTIONS.length}
            </div>
            <p className="text-lg text-[var(--text-secondary)]">
              {isPassed ? "🎉 Congratulations! You passed!" : "😢 Better luck next time!"}
            </p>

            {isPassed && quizClaims < 5 && !hasClaimedThisAttempt && (
              <div className="space-y-4">
                <p className="text-[var(--text-secondary)]">
                  You&apos;ve earned a reward of <span className="font-bold text-white">{REWARD_AMOUNT} SCT</span>! ({quizClaims}/5 claims used)
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
                <p className="text-[var(--success)] font-medium font-heading text-sm">✅ Reward claimed successfully! ({quizClaims}/5 total claimed)</p>
              </div>
            )}

            {quizClaims >= 5 && !hasClaimedThisAttempt && (
              <div
                className="p-4 rounded-xl"
                style={{
                  background: 'rgba(124, 58, 237, 0.08)',
                  border: '1px solid rgba(124, 58, 237, 0.3)',
                }}
              >
                <p className="text-[var(--text-secondary)] font-medium font-heading text-sm">You have claimed the maximum amount of quiz rewards (5/5).</p>
              </div>
            )}

            <button onClick={resetQuiz} className="btn-secondary w-full font-heading">
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
          <h3 className="font-heading text-xl md:text-2xl font-bold tracking-[-0.01em]">🎓 Crypto Quiz</h3>
          <span className="text-sm text-[var(--text-secondary)] font-heading">
            Question {currentQuestion + 1} / {QUIZ_QUESTIONS.length}
          </span>
        </div>

        <div className="space-y-6">
          <div
            className="p-5 rounded-xl"
            style={{
              background: 'rgba(124, 58, 237, 0.06)',
              border: '1px solid rgba(124, 58, 237, 0.15)',
            }}
          >
            <p className="text-lg font-medium leading-relaxed">{question.question}</p>
          </div>

          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isCorrect = index === question.correctAnswer
              const isSelected = selectedAnswer === index
              
              let buttonStyle: React.CSSProperties = {
                background: 'transparent',
                borderColor: 'rgba(255, 140, 66, 0.3)',
                color: 'var(--accent-orange)',
              }
              
              if (isAnswered) {
                if (isSelected && isCorrect) {
                  buttonStyle = {
                    background: 'rgba(16, 185, 129, 0.1)',
                    borderColor: 'rgba(16, 185, 129, 0.5)',
                    color: 'var(--success)',
                  }
                } else if (isSelected && !isCorrect) {
                  buttonStyle = {
                    background: 'rgba(239, 68, 68, 0.1)',
                    borderColor: 'rgba(239, 68, 68, 0.5)',
                    color: 'var(--error)',
                  }
                } else if (isCorrect) {
                  buttonStyle = {
                    background: 'rgba(16, 185, 129, 0.1)',
                    borderColor: 'rgba(16, 185, 129, 0.5)',
                    color: 'var(--success)',
                  }
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={isAnswered}
                  className="w-full text-left py-3.5 px-5 rounded-xl border-2 font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:hover:scale-100 disabled:hover:shadow-none font-heading text-sm"
                  style={buttonStyle}
                >
                  {option}
                  {isAnswered && isCorrect && ' ✓'}
                  {isAnswered && isSelected && !isCorrect && ' ✗'}
                </button>
              )
            })}
          </div>

          {/* Progress bar */}
          <div className="flex gap-2 pt-4">
            {Array.from({ length: QUIZ_QUESTIONS.length }).map((_, idx) => (
              <div
                key={idx}
                className="h-1.5 flex-1 rounded-full transition-all duration-500"
                style={{
                  background: idx < currentQuestion
                    ? 'var(--gradient-primary)'
                    : idx === currentQuestion
                    ? 'rgba(124, 58, 237, 0.4)'
                    : 'rgba(255, 255, 255, 0.08)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
