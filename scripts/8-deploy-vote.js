import sdk from "./1-initialize-sdk.js";

// Grab the app module address
const appModule = sdk.getAppModule(
    "0xF1013c2c258EA9756a8ee1B64e9a5c6313C3f4f1",
);

(async () => {
    const voteModule = await appModule.deployVoteModule({
        // Give your governance contract a name
        name: "SuperAngelsDAO Epic Proposals",

        // This is the location of our governance token, our ERC-20 contract!
        votingTokenAddress: "0x63AdaaDF924A2fb501F2aE4424A520FbdD9Ad55f",
    })
})();