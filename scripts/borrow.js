require("dotenv").config();
const {ethers, utils} = require("ethers");

// Mainnet
const RPC = "https://bsc-dataseed.binance.org/";
const gCake = require("../deployments/bsc_mainnet/gCake.json");

const amount = utils.parseUnits("2", "18");

const run = async () => {
    const wallet = new ethers.Wallet(process.env.DEPLOY_PRIVATE_KEY);
    const provider = new ethers.providers.JsonRpcProvider(RPC);
    const account = wallet.connect(provider);
    const gCakeContract = new ethers.Contract(gCake.address, gCake.abi, account);
    try {
        const tx2 = await gCakeContract.borrow(amount);
        console.log(`🎯  Borrow gCake: ${tx2.hash}`);
    } catch(e) {
        console.log(e);
        process.exit();
    }
}
run();
