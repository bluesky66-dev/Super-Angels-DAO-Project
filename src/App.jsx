import { ThirdwebSDK } from '@3rdweb/sdk';
import { useEffect, useMemo, useState } from "react";

// We instantiate the sdk on Rinkeby
const sdk = new ThirdwebSDK("rinkeby");

// We can grab a reference to our ERC-1155 contract
const bundleDropModule = sdk.getBundleDropModule(
  "0x267E587a9e541bF967DDB38913C267FBfb5e80C5",
);

// Import ThirdWeb
import { useWeb3 } from "@3rdweb/hooks";

const App = () => {
  // Use the connectWallet hook ThirdWeb gives us
  const { connectWallet, address, error, provider } = useWeb3();
  console.log("👋 Address:", address);

  // State variable for us to know if user has our NFT
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);

  useEffect(() => {
  // If they don't have a connected wallet, exit!
  if (!address) {
    return;
  }

  })

  // When the user hasn't connected their wallet
  // to your web app. Let them call connectWallet
  if (!address) {
    return (
      <div className='landing'>
        <h1>Welcome to SuperAngelsDAO 😇</h1>
        <button onClick={() => connectWallet("injected")} className="btn-hero">
          Connect your wallet
        </button>
      </div>
    );
  } 

  // When we have the user's address 
  // Which means they've connected their wallet to our site
  return (
    <div className="landing">
      <h1>👀 Wallet connected. Now what?</h1>
    </div>);
};

export default App;
