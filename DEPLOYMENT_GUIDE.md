# Complete Deployment Guide

This guide will walk you through deploying your SabaToken contract step-by-step.

---

## 📋 Task 1: Get Sepolia Test ETH (5-10 minutes)

You need free test ETH to pay for gas fees when deploying.

### Option 1: Alchemy Faucet (Recommended - Fastest)
1. Go to: **https://www.alchemy.com/faucets/ethereum-sepolia**
2. Sign in with Google or GitHub
3. Enter your MetaMask wallet address
4. Click "Send Me ETH"
5. Wait 1-2 minutes
6. Check MetaMask - you should see 0.5 Sepolia ETH

### Option 2: Other Faucets (Backup)
- **Sepolia Faucet**: https://sepoliafaucet.com
- **QuickNode**: https://faucet.quicknode.com/ethereum/sepolia
- **Infura**: https://www.infura.io/faucet/sepolia

### How to Find Your MetaMask Address:
1. Open MetaMask extension
2. Make sure you're on "Sepolia" network (click network dropdown at top)
3. Click on your account name at the top
4. Your address appears below (starts with 0x...)
5. Click to copy

### Verify You Received ETH:
1. Open MetaMask
2. Switch to Sepolia network
3. You should see "0.5 SepoliaETH" or similar
4. ✅ Ready for next step!

---

## 📋 Task 2: Get Alchemy API Key (5 minutes)

Alchemy provides the connection to the Sepolia blockchain.

### Step-by-Step:

1. **Go to Alchemy**
   - Visit: **https://www.alchemy.com**
   - Click "Login" (top right)
   - Sign up with email or Google

2. **Create a New App**
   - After logging in, click **"Create new app"** or **"+ Create App"**
   - Fill in the form:
     - **Name**: SabaToken (or anything you want)
     - **Chain**: Ethereum
     - **Network**: Sepolia (THIS IS IMPORTANT!)
   - Click **"Create app"**

3. **Get Your API Key**
   - You'll see your new app in the dashboard
   - Click **"API Key"** or **"View Key"**
   - Click **"HTTPS"** tab
   - You'll see a URL like:
     ```
     https://eth-sepolia.g.alchemy.com/v2/abc123xyz789...
     ```
   - Click the **copy icon** to copy the full URL
   - ✅ Save this somewhere - you'll need it in the next step!

### What This URL Looks Like:
```
https://eth-sepolia.g.alchemy.com/v2/YOUR-UNIQUE-KEY-HERE
                                    ^^^^^^^^^^^^^^^^^^^^^
                                    This part is secret!
```

---

## 📋 Task 3: Get Your MetaMask Private Key (2 minutes)

⚠️ **SECURITY WARNING**: Your private key controls your wallet. NEVER share it with anyone!

### Step-by-Step:

1. **Open MetaMask**
   - Click the MetaMask extension icon

2. **Access Account Details**
   - Click the **three dots (⋮)** at the top right
   - Select **"Account details"**

3. **Export Private Key**
   - Click **"Show private key"** or **"Export private key"**
   - Enter your MetaMask password
   - Click **"Confirm"**

4. **Copy Your Private Key**
   - You'll see a long string like:
     ```
     a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
     ```
   - Click **"Copy"** or select and copy it
   - ✅ Save this somewhere secure temporarily

### Important Notes:
- ⚠️ This key gives FULL ACCESS to your wallet
- 🔒 Only use this wallet for testnet (not real money)
- 🚫 Never commit this to GitHub or share it
- 💡 We'll put it in a `.env` file that's gitignored

---

## 📋 Task 4: Create .env File (3 minutes)

Now we'll create the configuration file with your secrets.

### Step-by-Step:

1. **Open the contracts folder**
   - Navigate to: `C:\Users\khvic\Desktop\ERC20Token\contracts`

2. **Create a new file named `.env`** (with the dot!)
   - Right-click in the folder
   - Select "New" → "Text Document"
   - Name it EXACTLY: `.env` (delete the .txt extension)
   - Windows might warn you about changing extensions - click Yes

3. **Edit the .env file**
   - Right-click the `.env` file → Open with Notepad
   - Paste this template:

```
ALCHEMY_SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR-API-KEY-HERE
PRIVATE_KEY=your_private_key_here_without_0x
```

4. **Fill in YOUR values**
   - Replace `YOUR-API-KEY-HERE` with your Alchemy URL from Task 2
   - Replace `your_private_key_here_without_0x` with your private key from Task 3
   - ⚠️ **Remove the "0x" from the start of your private key if it has one!**

### Example of What It Should Look Like:
```
ALCHEMY_SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/abc123xyz789def456
PRIVATE_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
```

5. **Save the file**
   - File → Save
   - Close Notepad

6. **Verify the file**
   - The file should be named `.env` (NOT `.env.txt`)
   - It should be in the `contracts` folder
   - ✅ Ready to deploy!

---

## 📋 Task 5: Install Contract Dependencies (2 minutes)

Install all the required packages for Hardhat.

### Step-by-Step:

1. **Open Terminal/Command Prompt in contracts folder**
   - Navigate to: `C:\Users\khvic\Desktop\ERC20Token\contracts`
   - Hold Shift + Right-click in the folder
   - Select "Open PowerShell window here" or "Open Command Prompt here"

2. **Run the install command**
   ```bash
   npm install
   ```

3. **Wait for installation**
   - This will take 1-2 minutes
   - You'll see lots of packages being installed
   - Look for "added XXX packages" at the end
   - ✅ Done when you see no errors!

### What Gets Installed:
- Hardhat (Ethereum development environment)
- OpenZeppelin contracts (secure ERC-20 code)
- Ethers.js (blockchain interaction library)
- And other dependencies

---

## 📋 Task 6: Deploy Your Contract! (2 minutes)

This is the big moment - deploying to Sepolia blockchain!

### Step-by-Step:

1. **Make sure you're in the contracts folder**
   - Your terminal should show: `...\ERC20Token\contracts>`

2. **Run the deployment command**
   ```bash
   npm run deploy
   ```

3. **Watch the output**
   You'll see something like:
   ```
   Deploying contracts with the account: 0x1234...5678
   Account balance: 0.5 ETH
   Deploying SabaToken...
   SabaToken deployed to: 0xABCD...EF01
   Transaction hash: 0x9876...5432
   Deployment info saved to deployed-address.json
   ```

4. **Copy your contract address**
   - Look for the line "SabaToken deployed to: 0x..."
   - Copy that address (starts with 0x)
   - ✅ **SAVE THIS ADDRESS!** You need it for everything else!

### What Just Happened?
- ✅ Your SabaToken contract is now on the Sepolia blockchain
- ✅ 1,000,000 SCT tokens were minted to your wallet
- ✅ Anyone can now interact with your token
- ✅ It's permanently recorded on the blockchain!

### Check Your Deployment:
1. Go to: **https://sepolia.etherscan.io**
2. Paste your contract address in the search box
3. You should see your contract!
4. Click "Contract" tab to see the code

---

## 📋 Task 7: Add Token to MetaMask (2 minutes)

Now let's see your 1 million tokens in MetaMask!

### Step-by-Step:

1. **Open MetaMask**
   - Make sure you're on **Sepolia network**

2. **Import Token**
   - Scroll down in MetaMask
   - Click **"Import tokens"** at the bottom

3. **Enter Token Details**
   - **Token Contract Address**: Paste your deployed contract address (0x...)
   - **Token Symbol**: Should auto-fill as "SCT"
   - **Token Decimal**: Should auto-fill as "18"
   - Click **"Add custom token"**

4. **Confirm**
   - Click **"Import tokens"**
   - ✅ You should now see: **1,000,000 SCT** in your wallet!

### Troubleshooting:
- If symbol doesn't auto-fill, manually enter: `SCT`
- If decimals doesn't auto-fill, manually enter: `18`
- If you don't see tokens, wait 30 seconds and refresh MetaMask

---

## 📋 Task 8: Run the Frontend Website (Optional - 3 minutes)

Make your token platform look professional!

### Step-by-Step:

1. **Update frontend configuration**
   - Navigate to: `C:\Users\khvic\Desktop\ERC20Token\frontend`
   - Open the file: `.env.local`
   - Replace the values:
     ```
     NEXT_PUBLIC_SEPOLIA_RPC_URL=YOUR-ALCHEMY-URL-HERE
     NEXT_PUBLIC_CONTRACT_ADDRESS=YOUR-DEPLOYED-CONTRACT-ADDRESS
     ```
   - Save the file

2. **Open terminal in frontend folder**
   - Navigate to the `frontend` folder
   - Shift + Right-click → Open PowerShell

3. **Start the website**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Open: **http://localhost:3000**
   - ✅ You should see your Saba Token Platform!

5. **Test it out**
   - Click "Connect Wallet"
   - Approve in MetaMask
   - See your 1,000,000 SCT balance displayed!

---

## ✅ Checklist - Are You Done?

- [ ] Got Sepolia ETH in MetaMask (Task 1)
- [ ] Got Alchemy API key (Task 2)
- [ ] Got MetaMask private key (Task 3)
- [ ] Created .env file with both keys (Task 4)
- [ ] Ran `npm install` in contracts folder (Task 5)
- [ ] Ran `npm run deploy` successfully (Task 6)
- [ ] Copied contract address (Task 6)
- [ ] Added SCT token to MetaMask (Task 7)
- [ ] See 1,000,000 SCT in MetaMask (Task 7)
- [ ] (Optional) Website running and showing balance (Task 8)

---

## 🎯 Next Step: Send Tokens to Instructor

Once you've completed all the above tasks, you're ready to send 10 SCT tokens to:
```
0xE16c9d8B67765818Da9d83a1c5Eb6478E51f9e8C
```

Let me know when you're ready for the sending guide!

---

## 🆘 Common Issues

### "Insufficient funds" error when deploying
- You don't have enough Sepolia ETH
- Go back to Task 1 and get more from the faucet

### "Invalid private key" error
- Remove "0x" from the start of your private key in .env
- Make sure there are no spaces or quotes

### Contract deploys but doesn't show on Etherscan
- Wait 30-60 seconds, then refresh
- Sepolia can be slow sometimes

### MetaMask doesn't show my tokens
- Make sure you're on Sepolia network
- Try removing and re-adding the token
- Verify you used the correct contract address

### Website shows "Contract not configured"
- Make sure .env.local has your contract address
- Restart the dev server after changing .env.local

---

## 📞 Need Help?

If you get stuck on any task, let me know which task number and what error you're seeing!
