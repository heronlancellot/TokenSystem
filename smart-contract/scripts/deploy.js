const {ethers} = require("hardhat");

async function main() {

  const Lock = await hre.ethers.getContractFactory("Lock");
  const lock = await Lock.deploy();

  await lock.deployed();

  console.log(
    `Lock with 1 ETH and unlock timestamp deployed to ${lock.address}`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
