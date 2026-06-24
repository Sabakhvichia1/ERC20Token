const hre = require("hardhat");

async function main() {
  const tokenAddress = "0x3D291f3bAcB66F89aeb01aaC59533C2A90f092a9";
  const oldDeployerAddress = "0x79558772da1992781C0F518A6ddE6C6Bf78EEC19";
  
  const Token = await hre.ethers.getContractFactory("SamargaloToken");
  const token = await Token.attach(tokenAddress);
  
  const balance = await token.balanceOf(oldDeployerAddress);
  console.log("OLD DEPLOYER BALANCE:", hre.ethers.formatUnits(balance, 18), "SCT");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
