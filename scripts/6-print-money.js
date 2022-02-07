import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// This is the address of our ERC-20 contract printed out in the step before
const tokenModule = sdk.getTokenModule(
    "0x63AdaaDF924A2fb501F2aE4424A520FbdD9Ad55f",
);

(async () => {
    try {
        // What's the max supply you want to set? 1,000,000 is a nice number!
        const amount = 1_000_000;
        // We use the util function from "ethers" to convert the amount
        // to have 18 decimals (which is the standard for ERC20 tokens)
        const amountWith18Decimals = ethers.utils.parseUnits(amount.toString(), 18);
    }
})();