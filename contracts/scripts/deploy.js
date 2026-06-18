const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  // Get deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  
  // Check deployer balance
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "ETH");
  
  // Deploy SabaToken
  console.log("Deploying SabaToken...");
  const SabaToken = await hre.ethers.getContractFactory("SabaToken");
  const sabaToken = await SabaToken.deploy();
  await sabaToken.waitForDeployment();
  
  const contractAddress = await sabaToken.getAddress();
  const deploymentTx = sabaToken.deploymentTransaction();
  
  console.log("SabaToken deployed to:", contractAddress);
  console.log("Transaction hash:", deploymentTx.hash);
  
  // Save deployment information
  const deploymentInfo = {
    contractAddress: contractAddress,
    deployer: deployer.address,
    transactionHash: deploymentTx.hash,
    network: hre.network.name,
    timestamp: new Date().toISOString()
  };
  
  fs.writeFileSync(
    path.join(__dirname, '../deployed-address.json'),
    JSON.stringify(deploymentInfo, null, 2)
  );
  
  console.log("Deployment info saved to deployed-address.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
