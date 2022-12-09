const {ethers} = require("hardhat");

async function main() {

  const StreaX = await hre.ethers.getContractFactory("StreaX");
  const DeployedStreaX = await StreaX.deploy();

  await DeployedStreaX.deployed();

  console.log(
    `Deployed to ${DeployedStreaX.address}`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
