import { Header } from '@/components/Header'
import { TokenInfo } from '@/components/TokenInfo'
import { BalanceDisplay } from '@/components/BalanceDisplay'
import { SEPOLIA_ETHERSCAN_BASE_URL, SABA_TOKEN_ADDRESS } from '@/lib/constants'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fadeIn">
          <div className="relative inline-block">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text mb-6 animate-pulse-slow">
              Welcome to Saba Token Platform
            </h2>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl -z-10"></div>
          </div>
          <p className="text-lg text-blue-200/80 max-w-2xl mx-auto leading-relaxed">
            Connect your MetaMask wallet to view your SCT token balance and 
            explore token information on the Sepolia testnet.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto">
          <TokenInfo />
          <BalanceDisplay />
        </div>

        {/* Footer */}
        <footer className="text-center text-blue-300/60 space-y-3 animate-fadeIn">
          {SABA_TOKEN_ADDRESS !== '0x0000000000000000000000000000000000000000' && (
            <p>
              <a
                href={`${SEPOLIA_ETHERSCAN_BASE_URL}/address/${SABA_TOKEN_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors duration-300 hover:underline inline-flex items-center gap-2"
              >
                View Contract on Etherscan
                <span className="text-xl">↗</span>
              </a>
            </p>
          )}
          <p className="text-sm">
            Built with ❤️ using Next.js, Wagmi, and OpenZeppelin
          </p>
        </footer>
      </main>

      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
      </div>
    </div>
  )
}
