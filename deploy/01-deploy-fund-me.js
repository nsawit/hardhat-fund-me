//before
//import
//main function
//caling of main function

//CASE 1 */
//export this as default function for hardhat-deploy to look for
// to run this , module.exports.default = deployFunc
// async function deployFunc(hre) {
//   console.log("------> first deploy: deployFunc");
//   hre.getNameAccountsa()
//   hre.deployments()

// }
// module.exports.default = deployFunc;

//CASE 2
//when deploying , hardhat passes deploy object i.e. passed to hre param
// module.exports = async (hre) => {
//   const { getNamedAccounts, deployements } = hre;
// };

//CASE 3
// module.exports = async (hre) =>{
//   //hre.getNamedAccounts
//   //hre.deployments
//   const {getNameAccounts, deployments} = hre
// }
//CASE 3
const { networkConfig, developmentChain } = require("../helper-hardhat-config")
const { network, ethers } = require("hardhat")
const { verify } = require("../utils/verify")

//the following codes are just the same as the one above
// const getConfig = require("../helper-hardhat-config")
// const netConfig = getConfig.networkConfig

module.exports = async ({ getNamedAccounts, deployments }) => {
    //pull deploy , log functions out of deployments
    const { deploy, get, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    // if chainId is X use address Y
    //if chainId is Z use address A
    //to enable such functionality
    //open aave github (this is another protocol)
    let ethUsdPriceFeedAddress
    if (developmentChain.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }

    //mock contract
    //if contract doesn't exist, we deploy a minimal version of it for our local testing

    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress], //parameters i.e. priceFeed here would be passed in constructor i
        /*but we can't just add anotehr variable with specified contract address of the pricefee*/
        //check line 35
        log: true, //this will display tx in the logs
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    console.log("DEPLOYING HERE!!")

    if (!developmentChain.includes(network.name) && process.env.ETHKEY) {
        //verify
        //different way than simplestorage example
        //create utils folder
        await verify(fundMe.address, [ethUsdPriceFeedAddress])
    }
}
module.exports.tags = ["all", "fundme"]
