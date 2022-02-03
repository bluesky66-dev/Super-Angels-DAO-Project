import { useEffect, useMemo, useState } from "React";

// Import ThirdWeb
import { useWeb3 } from "@3rdweb/hooks";

const App = () => {
  // Use the connectWallet hook ThirdWeb gives us
  const { connectWallet, address, error, provider } = useWeb3();
  console.log("👋 Address:", address);

  return (
    <div className="landing">
      <h1>Welcome to SuperAngels DAO 😇</h1>
    </div>
  );
};

export default App;
