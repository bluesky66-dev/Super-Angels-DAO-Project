import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
    "0x267E587a9e541bF967DDB38913C267FBfb5e80C5",
);

(async () => {
    try {
        await bundleDrop.createBatch([
            {
                name: "Archangels",
                description: "This NFT will give you access to SuperAngelsDAO",
                image: readFileSync("scripts/assets/Archangel.jpg"),
            }
        ])
    }
})