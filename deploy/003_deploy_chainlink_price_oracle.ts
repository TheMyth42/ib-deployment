import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {deployer} = await getNamedAccounts();

  const maxStalePeriod = 86400;

  await deploy('ChainlinkOracle', {
    from: deployer,
    log: true,
    args: [maxStalePeriod]
  });
};
export default func;
func.tags = ['ChainlinkOracle'];
