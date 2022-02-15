import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// This is our governance smart contract
const voteModule = sdk.getVoteModule(
    "0x622533b911038B8AC349aB9fE0450cC492437D4C",
);

// This is our ERC-20 contract
const tokenModule = sdk.getTokenModule(
    "0x63AdaaDF924A2fb501F2aE4424A520FbdD9Ad55f",
);

(async () => {
    try {
        // Give our treasury the power to mint additional tokens if needed
        await tokenModule.grantRole("minter", voteModule.address);

        console.log(
            "Successfully gave vote module permissions to act on token module"
        );
    }   catch (error) {
        console.error(
            "Failed to grant vote module permissions on token module",
            error
        );
        process.exit(1);
    }

    try {
        // Grab our wallet's token balance, remember -- we hold basically the entire supply right now!
        const ownedTokenBalance = await tokenModule.balanceOf(
            // The wallet address stored in your env file
            process.env.WALLET_ADDRESS
        );

    }
    
})();