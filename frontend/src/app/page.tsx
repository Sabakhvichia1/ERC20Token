import { Header } from '@/components/Header'
import { TokenInfo } from '@/components/TokenInfo'
import { BalanceDisplay } from '@/components/BalanceDisplay'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-6">
        {/* Hero Section - Premium Web3 Style */}
        <div className="text-center py-24 animate-fadeInUp">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-text mb-8 leading-tight">
            Saba Custom Token
          </h2>
          <p className="text-lg md:text-xl text-secondary max-w-3xl mx-auto leading-relaxed">
            Connect your wallet to interact with SCT tokens on the Sepolia testnet
          </p>
        </div>

        {/* Content Grid - Premium Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24 max-w-7xl mx-auto">
          <div className="animate-fadeInUp">
            <TokenInfo />
          </div>
          <div className="animate-fadeInUp delay-100">
            <BalanceDisplay />
          </div>
        </div>
      </main>
    </div>
  )
}
