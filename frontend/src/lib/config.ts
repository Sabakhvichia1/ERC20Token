'use client'

import { http, createConfig } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { metaMask } from 'wagmi/connectors'

export const config = createConfig({
  chains: [sepolia],
  connectors: [metaMask()],
  transports: {
    [sepolia.id]: http(
      process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || 
      'https://eth-sepolia.g.alchemy.com/v2/demo'
    ),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
