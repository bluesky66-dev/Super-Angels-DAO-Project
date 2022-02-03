import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";

// Import ThirdWeb
import { ThirdwebWeb3Provider } from '@3rdweb/hooks';

// Include what chains you want to support
// 4 = Rinkeby
const supportedChainIds = [4];

// Include what type of wallet you want to support
// Here, we support MetaMask, which is an 'injected' wallet
const connectors = {
  injected: {},
};

// Finally, wrap app with ThirdwebWeb3Provider
// Render the App component to the DOM
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
