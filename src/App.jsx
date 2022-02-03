import { useEffect, useMemo, useState } from "react";

// Import ThirdWeb
import { useWeb3 } from "@3rdweb/hooks";

const App = () => {
  // Use the connectWallet hook ThirdWeb gives us
  const { connectWallet, address, error, provider } = useWeb3();
  console.log("👋 Address:", address);

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
