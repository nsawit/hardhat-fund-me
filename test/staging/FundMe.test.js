const { deployments, ethers, getNamedAccounts } = require("hardhat")
const { networkConfig, developmentChain } = require("../helper-hardhat-config")

describe("FundMe", () => {
    let fundMe,deployer
    beforeEach(() => {
        // const accounts = await ethers.getSigners()
        // const acctZero = accounts[0]
        deployer = (await getNamedAccounts()).deployer()
        await deployments.fixture("all")
        //hardhat-deploy wraps ethers with getContract()
        //gets the recent contract deployment
        fundMe = await ethers.getContract("FundMe",deployer)
    })

    describe("constructor", () => {})
})
