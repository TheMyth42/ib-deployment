import 'dotenv/config';
import {HardhatUserConfig} from 'hardhat/types';
import 'hardhat-deploy';
import '@nomiclabs/hardhat-ethers';
import "@nomicfoundation/hardhat-verify";
import 'hardhat-contract-sizer';
import './tasks';

const config: HardhatUserConfig = {
  defaultNetwork: 'bsc_testnet',
  solidity: {
    compilers: [
      {
        version: '0.5.17',
        settings: {
          optimizer: {
            enabled: true
          }
        }
      },
      {
        version: '0.8.11',
        settings: {
          optimizer: {
            enabled: true
          }
        }
      }
    ]
  },
  namedAccounts: {
    deployer: {
      default: 0
    },
    admin: {
      default: '0xc44bAC9Ac413DABA4157c2636B5F3adaD88cc330',
      bsc_testnet: '0xc44bAC9Ac413DABA4157c2636B5F3adaD88cc330',
    },
    guardian: {
      default: '0x4F7Af566c5c49cc6c78083b1A15BE85398Ad50DA',
      bsc_testnet: '0x4F7Af566c5c49cc6c78083b1A15BE85398Ad50DA',
    },
    BUSD: {
      bsc_testnet: '0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7'
    },
    CAKE: {
      bsc_testnet: '0xFa60D973F7642B748046464e165A65B7323b0DEE',
      bsc_mainnet: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82'
    },
  },
  networks: {
    bsc_mainnet: {
      url: 'https://bsc-dataseed1.defibit.io',
      accounts: [`0x${process.env.DEPLOY_PRIVATE_KEY ?? ''}`]
    },
    bsc_testnet: {
      url: 'https://data-seed-prebsc-1-s2.bnbchain.org:8545',
      accounts: [`0x${process.env.DEPLOY_PRIVATE_KEY ?? ''}`]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY ?? ''
  },
  sourcify: {
    enabled: false
  }
};

export default config;
