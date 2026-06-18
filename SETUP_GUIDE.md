# Quick Setup Guide

## 🚀 You can run the website right now!

### Step 1: Start the Development Server

```bash
cd frontend
npm run dev
```

Then open **http://localhost:3000** in your browser.

**Note:** The website will work, but won't show real token balances until you deploy the smart contract (Step 2).

---

## 📝 What You'll See Without Contract Deployment

- ✅ Full website interface
- ✅ Wallet connection button (can connect MetaMask)
- ✅ Token information card
- ⚠️ "Contract not configured" message
- ⚠️ Balance will show "0 SCT"

This is perfect for testing the UI before deploying!

---

## 🔧 Step 2: Deploy Smart Contract (When Ready)

### Prerequisites:
1. **Get Sepolia ETH** (free testnet ETH)
   - Visit: https://sepoliafaucet.com
   - Or: https://www.alchemy.com/faucets/ethereum-sepolia

2. **Get Alchemy API Key** (free)
   - Visit: https://www.alchemy.com
   - Create account → Create App → Select "Sepolia"
   - Copy your API key

3. **Export MetaMask Private Key**
   - Open MetaMask
   - Click ⋮ → Account Details → Export Private Key
   - ⚠️ **NEVER share this with anyone!**

### Deploy Steps:

1. **Install contract dependencies:**
```bash
cd contracts
npm install
```

2. **Create `.env` file** in `contracts/` folder:
```
ALCHEMY_SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR-API-KEY-HERE
PRIVATE_KEY=your_metamask_private_key_here
```

3. **Deploy the contract:**
```bash
npm run deploy
```

4. **Copy contract address** from the output or `deployed-address.json`

5. **Update frontend `.env.local`:**
   - Open `frontend/.env.local`
   - Replace the `NEXT_PUBLIC_CONTRACT_ADDRESS` value with your deployed contract address
   - Also update `NEXT_PUBLIC_SEPOLIA_RPC_URL` with your Alchemy API key

6. **Restart the frontend:**
   - Stop the dev server (Ctrl+C)
   - Run `npm run dev` again
   - Refresh your browser

---

## ✨ Features After Deployment

- ✅ Connect MetaMask wallet
- ✅ View real-time SCT token balance
- ✅ See contract info on Etherscan
- ✅ Automatic balance updates
- ✅ Mobile responsive design

---

## 🛠️ Troubleshooting

### "Contract not configured" message?
- Make sure you've deployed the contract
- Check that `NEXT_PUBLIC_CONTRACT_ADDRESS` in `.env.local` is set correctly
- Restart the dev server after changing .env.local

### Can't connect wallet?
- Make sure MetaMask is installed
- Switch MetaMask to Sepolia network
- Refresh the page

### Balance shows 0?
- Make sure you're connected to the Sepolia network
- The deployer wallet will have 1,000,000 SCT
- Other wallets will show 0 until you transfer tokens

---

## 📂 Project Structure

```
ERC20Token/
├── contracts/              # Smart contract code
│   ├── contracts/
│   │   └── SabaToken.sol  # ERC-20 token contract
│   └── scripts/
│       └── deploy.js      # Deployment script
│
└── frontend/               # Next.js website
    ├── src/
    │   ├── app/           # Pages
    │   ├── components/    # React components
    │   └── lib/           # Config & constants
    └── .env.local         # Environment variables
```

---

## 🎯 Next Steps

1. **Run the website now** (it works without deployment!)
2. **Test the UI** and wallet connection
3. **Deploy the contract** when you have Sepolia ETH
4. **Update the contract address** in .env.local
5. **Enjoy your token platform!**

---

## 📚 Additional Resources

- **Sepolia Faucet**: https://sepoliafaucet.com
- **Alchemy Dashboard**: https://dashboard.alchemy.com
- **MetaMask**: https://metamask.io
- **Sepolia Etherscan**: https://sepolia.etherscan.io

---

## Need Help?

Check the main README.md for more detailed information.
