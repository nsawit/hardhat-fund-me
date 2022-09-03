const { network } = require("hardhat")
const { developmentChain } = require("../helper-hardhat-config")

const DECIMAL = 8
const INITIAL_ANSWER = 200000000

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    if (developmentChain.includes(network.name)) {
        log("Local network detected!")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMAL, INITIAL_ANSWER],
        })
        log("LOGGGING MOCKS DEPLOYED")
        log("******************************************")
    }
}

//running specific deploy scripts using tags
module.exports.tags = ["all", "mocks"]
