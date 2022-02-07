import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// This is the address to our ERC-1155 membership NFT contract
const bundleDropModule = sdk.getBundleDropModule(
    "0x267E587a9e541bF967DDB38913C267FBfb5e80C5",
);

// This is the address to our ERC-20 token contract.
const tokenModule = sdk.getTokenModule(
    "0x63AdaaDF924A2fb501F2aE4424A520FbdD9Ad55f",
);