import sdk from "./1-initialize-sdk.js";

// In order to deploy the new contract we need our old friend the app module again
const app = sdk.getAppModule("0xF1013c2c258EA9756a8ee1B64e9a5c6313C3f4f1"),

(async () => {
    try {
        // Deploy a standard ERC-20 contract
        const tokenModule = await app.deployTokenModule({
            // What's your token's name? Ex. "Ethereum"
            name: "SuperAngelsDAO Governance Token",
            // What's your token's symbol? Ex. "ETH"
            symbol: "SUPE",
        });
        console.log(
            "✅ Successfully deployed token module, address:",
            tokenModule.address,
        );
    } catch (error) {
        console.error("Failed to deploy token module", error);
    }
})();