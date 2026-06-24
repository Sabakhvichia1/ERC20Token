import { Header } from '@/components/Header'
import { TokenInfo } from '@/components/TokenInfo'
import { BalanceDisplay } from '@/components/BalanceDisplay'
import { CryptoQuiz } from '@/components/CryptoQuiz'
import { TicTacToe } from '@/components/TicTacToe'
import { NetworkWarning } from '@/components/NetworkWarning'
import { EthBalanceWarning } from '@/components/EthBalanceWarning'
import { AnimatedPage } from '@/components/AnimatedPage'
import { Volume2, MonitorPlay, Globe } from 'lucide-react'

export default function Home() {
  return (
    <AnimatedPage>
      <div className="min-h-screen text-white bg-transparent">
        <Header />
        
        <main className="container mx-auto px-6 lg:px-8">
          {/* ── Hero Section ─────────────────────────────────── */}
          <section className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-16 max-w-7xl mx-auto pt-[120px] pb-[80px] section-glow">
            <div className="flex-1 max-w-2xl">
              <h1
                data-animate="hero-heading"
                className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-[1.1] tracking-[-0.02em]"
              >
                Distribute and manage your Samargalo Custom Tokens on Web3.
              </h1>
              <p
                data-animate="hero-subtitle"
                className="text-lg md:text-xl text-[var(--text-secondary)] mb-10 max-w-xl leading-[1.7] tracking-[0.005em]"
              >
                Samargalo puts your tokens on the most popular decentralized networks worldwide. That&apos;s more flexibility and security than any other token manager.
              </p>
              <div data-animate="hero-cta">
                <button className="btn-wallet-connect" id="hero-connect-wallet">
                  Connect Wallet
                </button>
              </div>
            </div>
            
            <div className="flex-1 flex justify-center" data-animate="hero-ring-outer">
              <div className="relative w-72 h-72 md:w-[400px] md:h-[400px]">
                {/* Token ring illustration */}
                <div
                  className="absolute inset-0 rounded-full border-2 border-accent-purple/30 gpu-accelerated"
                  style={{
                    background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, rgba(255,140,66,0.05) 50%, transparent 70%)',
                    boxShadow: '0 0 60px rgba(124,58,237,0.15), inset 0 0 40px rgba(124,58,237,0.08)',
                    animation: 'spin 20s linear infinite',
                  }}
                >
                  <div
                    data-animate="hero-ring-inner"
                    className="absolute inset-[25%] rounded-full border border-accent-orange/40 flex items-center justify-center backdrop-blur-sm gpu-accelerated"
                    style={{
                      background: 'radial-gradient(circle, rgba(255,140,66,0.15) 0%, transparent 70%)',
                      boxShadow: '0 0 30px rgba(255,140,66,0.2)',
                      animation: 'spin 12s linear infinite reverse',
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.8),0_0_40px_rgba(124,58,237,0.4)]"></div>
                  </div>
                </div>
                {/* Decorative glow dots */}
                <div className="absolute -right-8 -bottom-8 w-40 h-40 opacity-30" style={{ backgroundImage: 'radial-gradient(rgba(124,58,237,0.5) 2px, transparent 2px)', backgroundSize: '16px 16px' }}></div>
              </div>
            </div>
          </section>

          {/* ── Features Section ─────────────────────────────── */}
          <section className="mb-16 max-w-7xl mx-auto">
            <div className="glass-card backdrop-blur-xl border-accent-purple/20 shadow-[0_8px_40px_rgba(124,58,237,0.08)]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 text-center py-4">
                
                <div className="flex flex-col items-center" data-animate="feature-card">
                  <div className="icon-circle mb-6" data-animate="feature-icon">
                    <Volume2 className="w-8 h-8 text-accent-orange" />
                  </div>
                  <h3 className="font-heading text-xl lg:text-2xl font-bold mb-4 tracking-[-0.01em]">Your tokens everywhere</h3>
                  <p className="text-[var(--text-secondary)] text-[15px] leading-relaxed max-w-xs">
                    Relax. Unlike some services, we don&apos;t charge you annually. There are no annual fees, ever. New decentralized exchanges are supported free of charge.
                  </p>
                </div>

                <div className="flex flex-col items-center" data-animate="feature-card">
                  <div className="icon-circle mb-6" data-animate="feature-icon">
                    <MonitorPlay className="w-8 h-8 text-accent-purple" />
                  </div>
                  <h3 className="font-heading text-xl lg:text-2xl font-bold mb-4 tracking-[-0.01em]">Collect all your rewards</h3>
                  <p className="text-[var(--text-secondary)] text-[15px] leading-relaxed max-w-xs">
                    Every transaction generates value. We help you collect staking and performance rewards from hundreds of Web3 sources worldwide.
                  </p>
                </div>

                <div className="flex flex-col items-center" data-animate="feature-card">
                  <div className="icon-circle mb-6" data-animate="feature-icon">
                    <Globe className="w-8 h-8 text-accent-cyan" />
                  </div>
                  <h3 className="font-heading text-xl lg:text-2xl font-bold mb-4 tracking-[-0.01em]">Monetize on Web3</h3>
                  <p className="text-[var(--text-secondary)] text-[15px] leading-relaxed max-w-xs">
                    Collect tokens every time a smart contract interacts with your wallet. Global DeFi administration helps collect rewards wherever your token is used.
                  </p>
                </div>

              </div>
            </div>
          </section>

          {/* ── Dashboard Section ────────────────────────────── */}
          <section className="max-w-7xl mx-auto mt-16 mb-8" data-animate="reveal">
            <NetworkWarning />
            <EthBalanceWarning />
          </section>

          <section className="text-center mb-12" data-animate="reveal">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4 tracking-[-0.02em]">
              Token Dashboard
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-lg mx-auto">
              Manage your Samargalo Custom Tokens safely and securely
            </p>
            <div className="w-24 h-1 mx-auto mt-6 rounded-full" style={{ background: 'var(--gradient-primary)' }}></div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto mb-16">
            <div data-animate="dash-card">
              <TokenInfo />
            </div>
            <div data-animate="dash-card">
              <BalanceDisplay />
            </div>
          </section>

          {/* ── Earn Section ──────────────────────────────────── */}
          <section className="max-w-7xl mx-auto pt-16 mb-24" data-animate="reveal">
            <div className="w-full h-px mb-16" style={{ background: 'linear-gradient(90deg, transparent, var(--accent-purple), var(--accent-orange), transparent)' }}></div>
            
            <div className="text-center mb-12">
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4 tracking-[-0.02em]">
                🎁 Earn Free Tokens
              </h3>
              <p className="text-lg text-[var(--text-secondary)] max-w-lg mx-auto">
                Complete the quiz or win at Tic Tac Toe to earn rewards!
              </p>
              <div className="w-20 h-1 mx-auto mt-6 rounded-full" style={{ background: 'var(--gradient-primary)' }}></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div data-animate="dash-card">
                <CryptoQuiz />
              </div>
              <div data-animate="dash-card">
                <TicTacToe />
              </div>
            </div>
          </section>
        </main>
      </div>
    </AnimatedPage>
  )
}
