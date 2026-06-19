const hre = require("hardhat");

async function main() {
  console.log("🔍 Verifying SabaToken Balance on Sepolia...\n");

  // Contract details
  const contractAddress = "0xcECeBe2ee52740FEb89a5FF3e6A782Ef903C11CE";
  const deployerAddress = "0x79558772da1992781C0F518A6ddE6C6Bf78EEC19";

  console.log("📋 Configuration:");
  console.log("Contract Address:", contractAddress);
  console.log("Deployer Address:", deployerAddress);
  console.log("Network:", hre.network.name);
  console.log("RPC URL:", hre.network.config.url);
  console.log("");

  try {
    // Get the contract instance
    const SabaToken = await hre.ethers.getContractFactory("SabaToken");
    const token = SabaToken.attach(contractAddress);

    console.log("✅ Connected to contract\n");

    // Check token details
    console.log("📊 Token Information:");
    const name = await token.name();
    const symbol = await token.symbol();
    const decimals = await token.decimals();
    const totalSupply = await token.totalSupply();

    console.log("Name:", name);
    console.log("Symbol:", symbol);
    console.log("Decimals:", decimals);
    console.log("Total Supply (raw):", totalSupply.toString());
    console.log("Total Supply (formatted):", hre.ethers.formatUnits(totalSupply, decimals), symbol);
    console.log("");

    // Check deployer balance
    console.log("💰 Deployer Balance:");
    const balance = await token.balanceOf(deployerAddress);
    console.log("Raw Balance:", balance.toString());
    console.log("Formatted Balance:", hre.ethers.formatUnits(balance, decimals), symbol);
    console.log("");

    // Diagnosis
    console.log("🔍 DIAGNOSIS:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    
    if (balance.toString() === "0") {
      console.log("❌ PROBLEM FOUND: Balance is ZERO!");
      console.log("");
      console.log("📝 Analysis:");
      console.log("The contract exists but has 0 tokens. This means:");
      console.log("1. Constructor may not have executed properly");
      console.log("2. Tokens were minted but to wrong address");
      console.log("3. Contract deployment had an issue");
      console.log("");
      console.log("🔧 SOLUTION:");
      console.log("We need to redeploy the contract with the correct constructor.");
      console.log("Run: npm run deploy");
    } else {
      console.log("✅ TOKENS FOUND!");
      console.log("");
      console.log("📝 Analysis:");
      console.log(`Your wallet HAS ${hre.ethers.formatUnits(balance, decimals)} ${symbol} tokens on-chain!`);
      console.log("The issue is with MetaMask display, not the blockchain.");
      console.log("");
      console.log("🔧 SOLUTION:");
      console.log("1. Open MetaMask");
      console.log("2. Make sure you're on Sepolia network");
      console.log("3. Go to Settings → Advanced");
      console.log("4. Click 'Clear activity tab data'");
      console.log("5. Close and reopen MetaMask");
      console.log("6. Import token with address:", contractAddress);
      console.log("");
      console.log("Alternative:");
      console.log("View your balance on Etherscan:");
      console.log(`https://sepolia.etherscan.io/token/${contractAddress}?a=${deployerAddress}`);
    }
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  } catch (error) {
    console.error("❌ Error verifying balance:");
    console.error(error.message);
    console.log("");
    console.log("🔧 Possible Issues:");
    console.log("1. Contract doesn't exist at this address");
    console.log("2. RPC connection issue");
    console.log("3. Wrong network selected");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
