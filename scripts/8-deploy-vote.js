import sdk from "./1-initialize-sdk.js";

// Grab the app module address
const appModule = sdk.getAppModule(
    "0xF1013c2c258EA9756a8ee1B64e9a5c6313C3f4f1",
);

(async () => {
    try {
        const voteModule = await appModule.deployVoteModule({
            // Give your governance contract a name
            name: "SuperAngelsDAO Epic Proposals",

            // This is the location of our governance token, our ERC-20 contract!
            votingTokenAddress: "0x63AdaaDF924A2fb501F2aE4424A520FbdD9Ad55f",

            // After a proposal is created, when can members start voting?
            // For now, we set this to immediately
            proposalStartWaitTimeInSeconds: 0,

            // How long do members have to vote on a proposal when it's created?
            // Here, we set it to 24 hours (86400 seconds)
            

            votingQuorumFraction: 0,

            // What's the minimum # of tokens a user needs to be allowed to create a proposal?
            // I set it to 0. Meaning no tokens are required for a user to be allowed to
            // create a proposal
            minimumNumberOfTokensNeededToPropose: "0",
        });

        console.log(
            "✅ Successfully deployed vote module, address:",
            voteModule.address,
        );
    } catch (err) {
        console.error("Failed to deploy vote module", err);
    }
})();