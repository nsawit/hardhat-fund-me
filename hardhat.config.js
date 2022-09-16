require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("@nomiclabs/hardhat-waffle")
require("hardhat-gas-reporter")
require("solidity-coverage")
require("hardhat-deploy")
/** @type import('hardhat/config').HardhatUserConfig */

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL
const K = process.env.KEY
const ETHK = process.env.ETHKEY
const COINMARKETCAP_API = process.env.COINMARKETCAP_API_KEY

module.exports = {
    defaultNetwork: "hardhat",
    //solidity: "0.8.8",
    solidity: {
        compilers: [{ version: "0.8.8" }, { version: "0.6.6" }],
    },
    networks: {
        // rinkeby: {
        //     url: RINKEBY_RPC_URL,
        //     accounts: [K],
        //     chainId: 4,
        //     blockConfirmations: 6,
        // },
        // polygon: {
        //     url: "https://rpc-mumbai.maticvigil.com/",
        //     accounts: [K],
        //     chainId: 80001,
        // }
    },
    etherscan: {
        apiKey: ETHK,
    },
    gasReporter: {
        enabled: false,
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
