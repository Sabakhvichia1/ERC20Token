const hre = require("hardhat");

async function main() {
  const toAddress = "0x4C8EE98374c90B3C35a1A977DD5186f4b3820205";
  const amount = "0.01"; // 0.01 Sepolia ETH is plenty for gas
  
  const [signer] = await hre.ethers.getSigners();
  
  console.log("Sending", amount, "Sepolia ETH from", signer.address, "to", toAddress);
  
  const tx = await signer.sendTransaction({
    to: toAddress,
    value: hre.ethers.parseEther(amount)
  });
  
  console.log("Transaction hash:", tx.hash);
  await tx.wait();
  
  console.log("Sent successfully! You now have gas money.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
