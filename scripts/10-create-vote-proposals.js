import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// Our voting contract
const voteModule = sdk.getVoteModule(
    "0x622533b911038B8AC349aB9fE0450cC492437D4C",
);

// Our ERC-20 contract
const tokenModule = sdk.getTokenModule(
    "0x63AdaaDF924A2fb501F2aE4424A520FbdD9Ad55f",
);

(async () => {
    try {
        const amount = 420_000;
        // Create proposal to mint 420,000 new token to the treasury
        await voteModule.propose(
            "Should the DAO mint an additional " + amount + "tokens into the treasury?",
            [
                {
                    // Our nativeToken is ETH. nativeTokenValue is the amount of ETH we want
                    // to send in this proposal. In this case, we're sending 0 ETH.
                    // We're just minting new tokens to the treasury. So, set to 0.
                    nativeTokenValue: 0,
                    transactionData: tokenModule.contract.interface.encodeFunctionData(
                        // We're doing a mint! And, we're minting to the voteModule, which is
                        // acting as our treasury.
                        "mint",
                        [
                            voteModule.address,
                            ethers.utils.parseUnits(amount.toString(), 18),
                        ]
                    ),
                }
            ]
        )

    }
})();