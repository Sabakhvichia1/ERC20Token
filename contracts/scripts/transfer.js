const hre = require("hardhat");

async function main() {
  const tokenAddress = "0x3D291f3bAcB66F89aeb01aaC59533C2A90f092a9";
  const toAddress = "0x4C8EE98374c90B3C35a1A977DD5186f4b3820205";
  
  const Token = await hre.ethers.getContractFactory("SamargaloToken");
  const token = await Token.attach(tokenAddress);
  
  const [signer] = await hre.ethers.getSigners();
  const balance = await token.balanceOf(signer.address);
  console.log("Deployer balance:", hre.ethers.formatUnits(balance, 18), "SCT");
  
  console.log("Transferring 90 SCT to", toAddress, "...");
  
  const tx = await token.transfer(toAddress, hre.ethers.parseUnits("90", 18));
  console.log("Transaction hash:", tx.hash);
  
  await tx.wait();
  console.log("Transfer complete! Tokens are now in your account.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
