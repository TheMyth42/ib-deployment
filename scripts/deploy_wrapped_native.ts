import {deployments, ethers, getNamedAccounts} from 'hardhat';
const {parseUnits} = ethers.utils;
const {deploy, execute, get, getArtifact} = deployments;

const crSymbol = 'gBNB';
const crName = 'Galaxy Finance BNB';

async function main() {
  const {deployer} = await getNamedAccounts();
  const wrappedNative = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
  const comptrollerAddress = (await get('Unitroller')).address;
  const majorIRMAddress = (await get('MajorIRM')).address;
  const cTokenAdminAddress = (await get('CTokenAdmin')).address;
  const cWrappedNativeImplementationAddress = (await get('CWrappedNativeDelegate')).address;

  const erc20ABI = (await getArtifact('EIP20Interface')).abi;

  const underlying = await ethers.getContractAt(erc20ABI, wrappedNative);
  const underlyingDecimal = await underlying.decimals();
  const initialExchangeRate = parseUnits('0.01', 18 + underlyingDecimal - 8);

  const result = await deploy(crSymbol, {
    from: deployer,
    contract: 'CWrappedNativeDelegator',
    args: [
      wrappedNative,
      comptrollerAddress,
      majorIRMAddress,
      initialExchangeRate,
      crName,
      crSymbol,
      8,
      cTokenAdminAddress,
      cWrappedNativeImplementationAddress,
      "0x"
    ],
    log: true,
  });

  console.log(crSymbol, 'deployed at:', result.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
