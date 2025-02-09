require("dotenv").config();
const {ethers, utils} = require("ethers");

// Testnet
// const RPC = "https://data-seed-prebsc-1-s1.binance.org:8545/";
// const gCake = require("../deployments/bsc_testnet/gCake.json");

// Mainnet
const RPC = "https://bsc-dataseed.binance.org/";
const gToken = require("../deployments/bsc_mainnet/gBTC.json");

const UNDERLYING = { 
    address: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
    abi: require("./abi/token.json")
}

const amount = utils.parseUnits("0.000034", "18");

const run = async () => {
    const wallet = new ethers.Wallet(process.env.DEPLOY_PRIVATE_KEY);
    const provider = new ethers.providers.JsonRpcProvider(RPC);
    const account = wallet.connect(provider);
    const UnderlyingContract = new ethers.Contract(UNDERLYING.address, UNDERLYING.abi, account);
    const gTOKENContract = new ethers.Contract(gToken.address, gToken.abi, account);
    try {
        const tx1 = await UnderlyingContract.approve(gToken.address, amount);
        console.log(`🎯  Approve: ${tx1.hash}`);
        await tx1.wait();
        const tx2 = await gTOKENContract.mint(amount);
        console.log(`🎯  Mint: ${tx2.hash}`);
    } catch(e) {
        console.log(e);
        process.exit();
    }
}
run();
