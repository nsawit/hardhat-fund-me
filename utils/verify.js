const { run } = require("hardhat")
async function verify(ca, args) {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: ca,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("ALREADY VERIFIED")
        } else {
            console.log(e)
        }
    }
}

module.exports = { verify }
