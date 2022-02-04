import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const app = sdk.getAppModule("https://eth-rinkeby.alchemyapi.io/v2/1dWf8nhPmMMtB2SZ8l1gh-3yeloafe_S");

