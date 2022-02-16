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
    
})();