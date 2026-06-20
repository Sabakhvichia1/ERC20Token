import { Header } from '@/components/Header'
import { TokenInfo } from '@/components/TokenInfo'
import { BalanceDisplay } from '@/components/BalanceDisplay'
import { CryptoQuiz } from '@/components/CryptoQuiz'
import { TicTacToe } from '@/components/TicTacToe'
import { NetworkWarning } from '@/components/NetworkWarning'
import { EthBalanceWarning } from '@/components/EthBalanceWarning'
import { Volume2, MonitorPlay, Globe } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen text-white bg-transparent font-sans">
      <Header />
      
      <main className="container mx-auto px-6 pt-16 md:pt-24 pb-24">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 max-w-7xl mx-auto mb-24">
          <div className="flex-1 animate-fadeInUp">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
              Distribute and manage your Samargalo Custom Tokens on Web3.
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-xl leading-relaxed drop-shadow">
              Samargalo puts your tokens on the most popular decentralized networks worldwide. That's more flexibility and security than any other token manager.
            </p>
            <button className="bg-brand-orange hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(233,82,33,0.5)] text-lg">
              Connect Wallet
            </button>
          </div>
          
          <div className="flex-1 flex justify-center animate-fadeInUp delay-100">
            <div className="relative w-72 h-72 md:w-[400px] md:h-[400px]">
              {/* Simulated Illustration - Record / Token */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-orange/40 to-black shadow-[0_0_50px_rgba(233,82,33,0.3)] border-4 border-brand-orange/50 flex items-center justify-center animate-spin" style={{ animationDuration: '15s' }}>
                <div className="w-1/3 h-1/3 rounded-full bg-brand-orange/30 border-2 border-brand-orange flex items-center justify-center backdrop-blur-md">
                   <div className="w-6 h-6 rounded-full bg-white shadow-[0_0_15px_white]"></div>
                </div>
              </div>
              {/* decorative dots */}
              <div className="absolute -z-10 -right-12 -bottom-12 w-48 h-48 opacity-50" style={{ backgroundImage: 'radial-gradient(#F39C12 3px, transparent 3px)', backgroundSize: '16px 16px' }}></div>
            </div>
          </div>
        </div>

        {/* Glassy Features Section */}
        <div className="glass-card mb-24 max-w-7xl mx-auto backdrop-blur-xl bg-black/20 border-brand-orange/30 shadow-[0_8px_32px_rgba(233,82,33,0.15)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-brand-orange/20 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(233,82,33,0.4)]">
                <Volume2 className="w-10 h-10 text-brand-yellow" />
              </div>
              <h3 className="text-2xl font-bold mb-4 drop-shadow">Your tokens everywhere</h3>
              <p className="text-gray-300 text-base leading-relaxed">
                Relax. Unlike some services, we don't charge you annually to keep your tokens online. There are no annual fees, ever. And whenever we add a new decentralized exchange, your tokens will be supported free of charge.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-brand-orange/20 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(233,82,33,0.4)]">
                <MonitorPlay className="w-10 h-10 text-brand-yellow" />
              </div>
              <h3 className="text-2xl font-bold mb-4 drop-shadow">Collect all your rewards</h3>
              <p className="text-gray-300 text-base leading-relaxed">
                Every transaction generates value for you. We help you collect your staking and performance rewards, and collect from hundreds of other sources for Web3 interactions around the world.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-brand-orange/20 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(233,82,33,0.4)]">
                <Globe className="w-10 h-10 text-brand-yellow" />
              </div>
              <h3 className="text-2xl font-bold mb-4 drop-shadow">Monetize on Web3</h3>
              <p className="text-gray-300 text-base leading-relaxed">
                Collect tokens every time a smart contract interacts with your wallet. Global DeFi administration helps you collect rewards wherever your token is used.
              </p>
            </div>

          </div>
        </div>

        {/* Dashboard Section */}
        <div className="max-w-7xl mx-auto mb-12">
          <NetworkWarning />
          <EthBalanceWarning />
        </div>

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Token Dashboard</h2>
          <p className="text-lg text-gray-300 drop-shadow">Manage your Samargalo Custom Tokens safely and securely</p>
        </div>

        {/* Grid layout for previous components */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto mb-24">
          <div className="transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(233,82,33,0.3)]">
             <TokenInfo />
          </div>
          <div className="transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(233,82,33,0.3)]">
             <BalanceDisplay />
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-brand-orange/30 pt-24">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-white mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              🎁 Earn Free Tokens
            </h3>
            <p className="text-lg text-gray-300 drop-shadow">
              Complete the quiz or win at Tic Tac Toe to earn rewards!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(233,82,33,0.3)]">
              <CryptoQuiz />
            </div>
            <div className="transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(233,82,33,0.3)]">
              <TicTacToe />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
