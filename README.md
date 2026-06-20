# Samargalo Token Platform

Full-stack ERC-20 token platform with Hardhat smart contract deployment and Next.js frontend.

## Project Structure

```
ERC20Token/
├── contracts/          # Hardhat smart contracts
│   ├── contracts/
│   │   └── SamargaloToken.sol
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

## How to Earn Tokens

### Crypto Quiz 🎓
- Answer 5 easy questions about cryptocurrency
- Get at least 3 correct answers to pass
- Earn **1 SCT token** for passing the quiz
- Connect your wallet to participate

### Tic Tac Toe Game 🎮
- Play against the computer
- Beat the AI to win
- Earn **2 SCT tokens** for each win
- Connect your wallet to claim rewards

Both features are always visible on the main page and require a connected wallet to participate.

## Features

✅ ERC-20 token (SamargaloToken - SCT)
✅ 14 token supply
✅ MetaMask wallet connection
✅ Real-time balance display
✅ Token information with Etherscan links
✅ **Interactive Crypto Quiz** - Test your knowledge and earn 1 SCT token
✅ **Tic Tac Toe Game** - Beat the computer to earn 2 SCT tokens
✅ Token rewards system for quiz completion and game wins
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

- **Name**: Samargalo Custom Token
- **Symbol**: SCT
- **Decimals**: 18
- **Total Supply**: 14 SCT
- **Network**: Sepolia Testnet

## License

MIT
