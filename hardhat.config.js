require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")
require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("hardhat-gas-reporter")
require("@nomiclabs/hardhat-ethers")

const { getUsedIdentifiers } = require("typechain")
/** @type import('hardhat/config').HardhatUserConfig */

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL
const K = process.env.KEY
const ETHK = process.env.ETHKEY
const COINMARKETCAP_API = process.env.COINMARKETCAP_API_KEY

module.exports = {
    defaultNetwork: "hardhat",
    //solidity: "0.8.8",
    solidity: {
        compilers: [
            { version: "0.8.8" },
            { version: "0.8.7" },
            { version: "0.6.6" },
        ],
    },
    networks: {
        rinkeby: {
            url: RINKEBY_RPC_URL,
            accounts: [K],
            chainId: 4,
            blockConfirmations: 6,
        },
        polygon: {
            url: "https://rpc-mumbai.maticvigil.com/",
            accounts: [K],
            chainId: 80001,
        },
        localhost: {
            // url: "http://127.0.0.1:8545/",
            chainId: 31337,
        },
    },
    etherscan: {
        apiKey: ETHK,
    },
    gasReporter: {
        enabled: true,
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API,
        token: "ETH",
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        player: {
            default: 1,
        },
    },
}
