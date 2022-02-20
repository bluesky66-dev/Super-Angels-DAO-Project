import { ethers } from "ethers";
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

const tokenModule = sdk.getTokenModule(
  "0x63AdaaDF924A2fb501F2aE4424A520FbdD9Ad55f",
);

const voteModule = sdk.getVoteModule(
  "0x622533b911038B8AC349aB9fE0450cC492437D4C",
);

const [proposals, setProposals] = useState([]);
const [isVoting, setIsVoting] = useState(false);
const [hasVoted, setHasVoted] = useState(false);

// Retrieve all our existing proposals from the contract
useEffect( async () => {
  if (!hasClaimedNFT) {
    return;
  }

  // A simple call to voteModule.getAll() to grab the proposals
  try {
    
  }



})

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

  // Holds the amount of token each member has in state
  const [memberTokenAmounts, setMemberTokenAmounts] = useState({});
  // The array holding all of our members' addresses
  const [memberAddresses, setMemberAddresses] = useState([]);

  // A fancy function to shorten someone's wallet address, no need to show the whole thing
  const shortenAddress = (str) => {
    return str.substring (0,6) + "..." + str.substring(str.length - 4);  
  };

  // This useEffect grabs all the addresses of our members holding the NFT
  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    // Just like we did in the 7-airdrop-token.js file! Grab the users who hold our NFT
    // with tokenId 0
    bundleDropModule
      .getAllClaimerAddresses("0")
      .then((addresses) => {
        console.log("🚀 Members' addresses", addresses)
        setMemberAddresses(addresses);
      })
      .catch((err) => {
        console.error("Failed to get member list", err);
      });
  }, [hasClaimedNFT]);
  
  // This useEffect grabs the # of token each member holds
  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }
    
    // Grab all the balances
    tokenModule
      .getAllHolderBalances()
      .then((amounts) => {
        console.log("👜 Amounts", amounts)
        setMemberTokenAmounts(amounts);
      })
      .catch((err) => {
        console.error("Failed to get token amounts", err);
      });
  }, [hasClaimedNFT]);

  // Now, we combine the memberAddresses and memberTokenAmounts into a single array
  const memberList = useMemo(() => {
    return memberAddresses.map((address) => {
      return {
        address,
        tokenAmount: ethers.utils.formatUnits(
          // If the address isn't in memberTokenAmounts, it means they don't
          // hold any of our token
          memberTokenAmounts[address] || 0,
          18,
        ),
      };
    });
  }, [memberAddresses, memberTokenAmounts]);

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

  // If the user has already claimed their NFT we want to display the interal DAO page to them
  // only DAO members will see this. Render all the members + token amounts.
  if (hasClaimedNFT) {
    return (
      <div className="member-page">
        <h1>🍪 DAO Member Page</h1>
        <p>Congratulations on being a member!</p>
        <div>
          <div>
            <h2>Member List</h2>
            <table className="card">
              <thead>
                <tr>
                  <th>Address</th>
                  <th>Token Amount</th>
                </tr>
              </thead>
              <tbody>
                {memberList.map((member) => {
                  return (
                    <tr key={member.address}>
                      <td>{shortenAddress(member.address)}</td>
                      <td>{member.tokenAmount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
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