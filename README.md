# Saba Token Platform

Full-stack ERC-20 token platform with Hardhat smart contract deployment and Next.js frontend.

## Project Structure

```
ERC20Token/
├── contracts/          # Hardhat smart contracts
│   ├── contracts/
│   │   └── SabaToken.sol
│   ├── scripts/
│   │   └── deploy.js
│   ├── hardhat.config.js
│   └── package.json
│
└── frontend/           # Next.js application
    ├── src/
    │   ├── app/
    │   ├── components/
    │   └── lib/
    ├── next.config.js
    └── package.json
```

## Quick Start

### Prerequisites

- Node.js 18+ installed
- MetaMask wallet extension
- Sepolia testnet ETH (get from https://sepoliafaucet.com)
- Alchemy account for RPC endpoint

### Step 1: Install Dependencies

**Contracts:**
```bash
cd contracts
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### Step 2: Deploy Smart Contract (Optional)

1. Create `.env` file in `contracts/` directory:
```
ALCHEMY_SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR-API-KEY
PRIVATE_KEY=your_wallet_private_key_here
```

2. Deploy to Sepolia:
```bash
cd contracts
npm run deploy
```

3. Copy the contract address from `deployed-address.json`

### Step 3: Run Frontend

1. Create `.env.local` file in `frontend/` directory:
```
NEXT_PUBLIC_SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR-API-KEY
NEXT_PUBLIC_CONTRACT_ADDRESS=0x... (your deployed contract address)
```

2. Start development server:
```bash
cd frontend
npm run dev
```

3. Open http://localhost:3000 in your browser

## Features

✅ ERC-20 token (SabaToken - SCT)
✅ 14 token supply
✅ MetaMask wallet connection
✅ Real-time balance display
✅ Token information with Etherscan links
✅ Responsive design (mobile + desktop)
✅ Sepolia testnet deployment

## Technology Stack

- **Smart Contracts**: Solidity 0.8.20, OpenZeppelin, Hardhat
- **Frontend**: Next.js 14+, TypeScript, Tailwind CSS
- **Web3**: Wagmi v2+, Viem
- **Network**: Sepolia Testnet via Alchemy

## Development Commands

### Contracts
```bash
npm run compile  # Compile contracts
npm run test     # Run tests
npm run deploy   # Deploy to Sepolia
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
```

## Contract Details

- **Name**: Saba Custom Token
- **Symbol**: SCT
- **Decimals**: 18
- **Total Supply**: 14 SCT
- **Network**: Sepolia Testnet

## License

MIT
