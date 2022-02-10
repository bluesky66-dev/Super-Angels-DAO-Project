import sdk from "./1-initialize-sdk.js";

// Grab the app module address
const appModule = sdk.getAppModule(
    "0x63AdaaDF924A2fb501F2aE4424A520FbdD9Ad55f",
);

(async () => {
    const voteModule = await appModule.deployVoteModule({
        // Give your governance contract a name
        name: "SuperAngelsDAO Epic Proposals",

        
    })
})();