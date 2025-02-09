import {deployments, ethers, getNamedAccounts} from 'hardhat';
const {parseEther} = ethers.utils;
const {deploy, get, getArtifact, save, run} = deployments;

let baseRate = 0;
let multiplier = parseEther('0.18');
let jump = parseEther('8');
let kink1 = parseEther('0.8');
let kink2 = parseEther('0.9');
let roof = parseEther('1.5');

async function main() {
  const {deployer} = await getNamedAccounts();
  
  const result = await deploy('StableIRM', {
    from: deployer,
    contract: 'TripleSlopeRateModel',
    args: [
      baseRate,
      multiplier.mul(kink1).div(parseEther('1')),
      jump,
      kink1,
      kink2,
      roof
    ],
    log: true
  });
  console.log('deployed at: ', result.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
