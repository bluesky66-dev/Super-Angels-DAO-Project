import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// This is the address of our ERC-20 contract printed out in the step before
const tokenModule = sdk.getTokenModule(
    "0x63AdaaDF924A2fb501F2aE4424A520FbdD9Ad55f",
);

