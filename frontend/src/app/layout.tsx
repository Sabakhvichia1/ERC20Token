import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import './globals.css'
import { StarsBackground } from '@/components/StarsBackground'
import { Providers } from './providers'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  style: ['normal', 'italic']
})

export const metadata: Metadata = {
  title: 'Samargalo Token Platform',
  description: 'ERC-20 token platform on Sepolia testnet',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${playfair.className} italic text-white`}>
        <StarsBackground />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
