import type { Metadata } from 'next'
import { Space_Grotesk, Inter, Space_Mono } from 'next/font/google'
import './globals.css'
import { StarsBackground } from '@/components/StarsBackground'
import { ChatWidget } from '@/components/ChatWidget'
import { Providers } from './providers'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'Samargalo Token Platform — Web3 Token Management',
  description: 'Distribute and manage your Samargalo Custom Tokens on the most popular decentralized networks. ERC-20 token platform on Sepolia testnet.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${spaceMono.variable}`}>
      <body className="font-inter text-white antialiased">
        <StarsBackground />
        <Providers>
          {children}
          <ChatWidget />
        </Providers>
      </body>
    </html>
  )
}
