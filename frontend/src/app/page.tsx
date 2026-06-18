import { Header } from '@/components/Header'
import { TokenInfo } from '@/components/TokenInfo'
import { BalanceDisplay } from '@/components/BalanceDisplay'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fadeIn">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-transparent bg-clip-text mb-6">
            Welcome to ERC-20 Token Platform
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Connect your MetaMask wallet to view your SCT token balance and explore token information on the Sepolia testnet.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 max-w-7xl mx-auto">
          <TokenInfo />
          <BalanceDisplay />
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-400 space-y-2 animate-fadeIn">
          <p className="text-sm">
            Built with ❤️ using Next.js, Wagmi, and OpenZeppelin
          </p>
        </footer>
      </main>
    </div>
  )
}
