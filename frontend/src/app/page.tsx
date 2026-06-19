import { Header } from '@/components/Header'
import { TokenInfo } from '@/components/TokenInfo'
import { BalanceDisplay } from '@/components/BalanceDisplay'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-6">
        {/* Hero Section - Much more spacious */}
        <div className="text-center py-24 animate-fadeIn">
          <h2 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-green-600 via-green-500 to-green-400 text-transparent bg-clip-text mb-8 leading-tight">
            Saba Custom Token
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Connect your wallet to interact with SCT tokens on the Sepolia testnet
          </p>
        </div>

        {/* Content Grid - More spacing */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24 max-w-7xl mx-auto">
          <TokenInfo />
          <BalanceDisplay />
        </div>
      </main>
    </div>
  )
}
