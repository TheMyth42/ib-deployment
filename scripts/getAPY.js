require("dotenv").config();
const {ethers, utils} = require("ethers");

// Mainnet
const RPC = "https://bsc-dataseed.binance.org/";
const gCake = require("../deployments/bsc_mainnet/gCake.json");

const ethMantissa = 1e18;
const blocksPerDay = 28767;
const daysPerYear = 365;

const run = async () => {
    const wallet = new ethers.Wallet(process.env.DEPLOY_PRIVATE_KEY);
    const provider = new ethers.providers.JsonRpcProvider(RPC);
    const account = wallet.connect(provider);
    const gCakeContract = new ethers.Contract(gCake.address, gCake.abi, account);
    try {
        const supplyRatePerBlock = await gCakeContract.supplyRatePerBlock();
        const borrowRatePerBlock = await gCakeContract.borrowRatePerBlock();
        const supplyApy = (((Math.pow((supplyRatePerBlock / ethMantissa * blocksPerDay) + 1, daysPerYear))) - 1) * 100;
        const borrowApy = (((Math.pow((borrowRatePerBlock / ethMantissa * blocksPerDay) + 1, daysPerYear))) - 1) * 100;
        console.log(`🍰 🍰 🍰 Cake Supply/Lending APY 🍰 🍰 🍰`);
        console.log(`💶 - Supply APY ${(supplyApy).toFixed(2)} %`);
        console.log(`💶 - Borrow APY ${(borrowApy).toFixed(2)} %`);
    } catch(e) {
        console.log(e);
        process.exit();
    }
}
run();
