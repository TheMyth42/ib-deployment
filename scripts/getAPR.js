require("dotenv").config();
const {ethers, utils} = require("ethers");

// Mainnet
const RPC = "https://bsc-dataseed.binance.org/";
const gCake = require("../deployments/bsc_mainnet/gCake.json");
const gUSDT = require("../deployments/bsc_mainnet/gUSDT.json");
const gBTC = require("../deployments/bsc_mainnet/gBTC.json");
const gETH = require("../deployments/bsc_mainnet/gETH.json");
const gBNB = require("../deployments/bsc_mainnet/gBNB.json");

const ethMantissa = 1e18;
const blocksPerYear = 28767 * 365;

const run = async () => {
    const wallet = new ethers.Wallet(process.env.DEPLOY_PRIVATE_KEY);
    const provider = new ethers.providers.JsonRpcProvider(RPC);
    const account = wallet.connect(provider);
    const gCakeContract = new ethers.Contract(gCake.address, gCake.abi, account);
    const gUSDTContract = new ethers.Contract(gUSDT.address, gUSDT.abi, account);
    const gBTCContract = new ethers.Contract(gBTC.address, gBTC.abi, account);
    const gETHContract = new ethers.Contract(gETH.address, gETH.abi, account);
    const gBNBContract = new ethers.Contract(gBNB.address, gBNB.abi, account);
    
    try {
        var supplyRatePerBlock = await gCakeContract.supplyRatePerBlock();
        var borrowRatePerBlock = await gCakeContract.borrowRatePerBlock();
        var supplyApr = supplyRatePerBlock / ethMantissa * blocksPerYear * 100;
        var borrowApr = borrowRatePerBlock / ethMantissa * blocksPerYear * 100;
        console.log(`🍰  Cake Supply/Lending APR`);
        console.log(`💶 - Supply APR ${(supplyApr).toFixed(2)}%`);
        console.log(`💶 - Borrow APR ${(borrowApr).toFixed(2)}%`);
        
        supplyRatePerBlock = await gUSDTContract.supplyRatePerBlock();
        borrowRatePerBlock = await gUSDTContract.borrowRatePerBlock();
        supplyApr = supplyRatePerBlock / ethMantissa * blocksPerYear * 100;
        borrowApr = borrowRatePerBlock / ethMantissa * blocksPerYear * 100;
        console.log(`🍰  USDT Supply/Lending APR`);
        console.log(`💶 - Supply APR ${(supplyApr).toFixed(2)}%`);
        console.log(`💶 - Borrow APR ${(borrowApr).toFixed(2)}%`);

        supplyRatePerBlock = await gBTCContract.supplyRatePerBlock();
        borrowRatePerBlock = await gBTCContract.borrowRatePerBlock();
        supplyApr = supplyRatePerBlock / ethMantissa * blocksPerYear * 100;
        borrowApr = borrowRatePerBlock / ethMantissa * blocksPerYear * 100;
        console.log(`🍰 BTC Supply/Lending APR`);
        console.log(`💶 - Supply APR ${(supplyApr).toFixed(2)}%`);
        console.log(`💶 - Borrow APR ${(borrowApr).toFixed(2)}%`);

        supplyRatePerBlock = await gETHContract.supplyRatePerBlock();
        borrowRatePerBlock = await gETHContract.borrowRatePerBlock();
        supplyApr = supplyRatePerBlock / ethMantissa * blocksPerYear * 100;
        borrowApr = borrowRatePerBlock / ethMantissa * blocksPerYear * 100;
        console.log(`🍰 ETH Supply/Lending APR`);
        console.log(`💶 - Supply APR ${(supplyApr).toFixed(2)}%`);
        console.log(`💶 - Borrow APR ${(borrowApr).toFixed(2)}%`);

        supplyRatePerBlock = await gBNBContract.supplyRatePerBlock();
        borrowRatePerBlock = await gBNBContract.borrowRatePerBlock();
        supplyApr = supplyRatePerBlock / ethMantissa * blocksPerYear * 100;
        borrowApr = borrowRatePerBlock / ethMantissa * blocksPerYear * 100;
        console.log(`🍰 BNB Supply/Lending APR`);
        console.log(`💶 - Supply APR ${(supplyApr).toFixed(2)}%`);
        console.log(`💶 - Borrow APR ${(borrowApr).toFixed(2)}%`);
    } catch(e) {
        console.log(e);
        process.exit();
    }
}
run();
