import { ThirdwebSDK } from '@3rdweb/sdk';
import { useEffect, useMemo, useState } from "react";
// Import ThirdWeb
import { useWeb3 } from "@3rdweb/hooks";

// We instantiate the sdk on Rinkeby
const sdk = new ThirdwebSDK("rinkeby");

// We can grab a reference to our ERC-1155 contract
const bundleDropModule = sdk.getBundleDropModule(
  "0x267E587a9e541bF967DDB38913C267FBfb5e80C5",
);

const App = () => {
  // Use the connectWallet hook ThirdWeb gives us
  const { connectWallet, address, error, provider } = useWeb3();
  console.log("👋 Address:", address);

  // The signer is required to sign transactions on the blockchain
  // Without it we can only read data, not write
  const signer = provider ? provider.getSigner() : undefined;

  // State variable for us to know if user has our NFT
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  // isClaiming lets us easily keep a loading state while the NFT is minting
  const [isClaiming, setIsClaiming] = useState(false);

  // Another useEffect
  useEffect(() => {
    // We pass the signer to the sdk, which enables us to interact with
    // our deployed contract!
    sdk.setProviderOrSigner(signer);
  }, [signer]);

  useEffect(() => {
  // If they don't have a connected wallet, exit!
  if (!address) {
    return;
  }

  // Check if the user has the NFT by using bundleDropModule.balanceOf
  return bundleDropModule
    .balanceOf(address, "0")
    .then((balance) => {
      // If balance is greater than 0, they have our NFT!
      if (balance.gt(0)) {
        setHasClaimedNFT(true);
        console.log("🌟 This user has a membership NFT!");
      } else {
        setHasClaimedNFT(false);
        console.log("😭 This user has no membership NFT.");
      }
    }) 
    .catch((error) => {
      setHasClaimedNFT(false);
      console.error("Failed to NFT balance", error);
    });
  }, [address]);

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

  if (hasClaimedNFT) {
    return (
      <div className="member-page">
        <h1>🍪 DAO Member Page</h1>
        <p>Congratulations on being a member!</p>
      </div>
    );
  };

  const mintNFT = () => {
    setIsClaiming(true);
    // Call bundleDropModule.claim("0", 1) to mint nft to user's wallet.
    bundleDropModule
    .claim("0", 1)
    .then(() => {
      // Set claim state
      setHasClaimedNFT(true);
      // Show user their fancy new NFT
      console.log(
        `🔥 Successfully minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${bundleDropModule.address.toLowerCase()}/0}`
      );
    })
    .catch((err) => {
      console.error("Failed to claim", err);
    }) 
    .finally(() => {
      // Stop loading state
      setIsClaiming(false);
    });
  }

  // Render mint NFT screen
  return(
    <div className="mint-nft">
      <h1>Mint your free DAO membership NFT</h1>
      <button
        disabled={isClaiming}
        onClick={() => mintNFT()}
      >
        {isClaiming ? "Minting..." : "Mint your NFT (FREE)"}
      </button>
    </div>
  );

  // When we have the user's address 
  // Which means they've connected their wallet to our site
  return (
    <div className="landing">
      <h1>👀 Wallet connected. Now what?</h1>
    </div>);
};

export default App;