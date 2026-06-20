const hre = require("hardhat");

async function main() {
  console.log("🚀 Sending SCT Tokens to Instructor...\n");

  const tokenAddress = "0xcECeBe2ee52740FEb89a5FF3e6A782Ef903C11CE";
  const instructorAddress = "0xE16c9d8B67765818Da9d83a1c5Eb6478E51f9e8C";
  const amount = hre.ethers.parseUnits("10", 18); // 10 tokens with 18 decimals

  const [sender] = await hre.ethers.getSigners();
  console.log("📤 Sending from:", sender.address);
  console.log("📥 Sending to:", instructorAddress);
  console.log("💰 Amount: 10 SCT\n");

  // Get contract instance
  const SamargaloToken = await hre.ethers.getContractAt(
    "SamargaloToken",
    tokenAddress
  );

  // Check balance before
  const balanceBefore = await SamargaloToken.balanceOf(sender.address);
  console.log("Balance before:", hre.ethers.formatUnits(balanceBefore, 18), "SCT");

  // Send tokens
  console.log("\n⏳ Sending transaction...");
  const tx = await SamargaloToken.transfer(instructorAddress, amount);
  console.log("Transaction sent! Hash:", tx.hash);
  
  console.log("⏳ Waiting for confirmation...");
  await tx.wait();

  // Check balance after
  const balanceAfter = await SamargaloToken.balanceOf(sender.address);
  console.log("\n✅ Transaction confirmed!");
  console.log("Balance after:", hre.ethers.formatUnits(balanceAfter, 18), "SCT");
  console.log("\n🎉 Successfully sent 10 SCT to instructor!");
  console.log("\n📋 Transaction Details:");
  console.log("Transaction hash:", tx.hash);
  console.log("View on Etherscan:");
  console.log(`https://sepolia.etherscan.io/tx/${tx.hash}`);
}

main().catch((error) => {
  console.error("❌ Error:", error);
  process.exit(1);
});
