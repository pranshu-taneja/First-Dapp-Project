import React, { useEffect, useState } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
// import Account from './components/account'

import "./App.css";


//------------------- Some important info before You use a metamask injected API's -------------------
//Basically difference bw window.web3 and window.ethereum... inshort it says that web3 is just for legacy system support and is deprected

/* Official:- MetaMask injects a global API into websites visited by its users at window.ethereum (Also available at window.web3.currentProvider for legacy reasons). This API allows websites to request user login, load data from blockchains the user has a connection to, and suggest the user sign messages and transactions. You can use this API to detect the user of a web3 browser. */
//------------------- Some important info before You use a metamask injected API's -------------------

function App() {
  // const [web3api, setWeb3api] = useState({
  //   //create a state inside function using hooks i.e usestate
  //   provider: null,
  //   web3: null,
  // });

  const [account, setAccount] = useState(null);

  useEffect(() => {
    //use effect willl work after every rendering if want it to work for specific component change then there is a array in the end of use effect...
    const loadprovider = async () => {
      const provider = await detectEthereumProvider();      //using by a metamask library installed above only for provider aka metamask detection// down you have used a big step to detect metamask for different situations in raw format but it handles everything by itself 
      
      if (provider) {             //if provider exists then-- metamsk is installed
        console.log("Ethereum successfully detected!");
        const connect = await window.ethereum.request({ method: 'eth_requestAccounts' });   //use this to automatically open metamsk for login *Very Important*
        console.log(provider);
      } else {
        console.low("Please install MetaMask!");
      }
      //------------------- Raw format for detecting metamask  -------------------
      // if (window.ethereum) {                   // Now recall that metamask have two injected api named as window.ethereum and window.web3 where web3 is basically fucked for now so use window.ethereum btw         
      //   //if metamask exists
      //   //Metamask is available
      //   provider = window.ethereum;

      //   try {
      //     await provider.enable();
      //   } catch (err) {
      //     console.log(err);
      //   }
      // } else if (window.web3) {            //just in case window.etherum not found and window.web3 found maybe in old version lets suppose not sure though
      //   provider = window.web3.currentProvider;
      // } else {
      //   //if metamask doesn't exists then use for development i.e ganache
      //   provider = new Web3(               // if there isn't metamask installed then connect with local blocckahin cuz we might be doing development without metamask uk implementing functionalites that doesn't depend on metamask  
      //     new Web3.providers.HttpProvider("http://localhost:7545")
      //   );
      // }
      //------------------- Raw format for detecting metamask  -------------------
      
      // setWeb3api({
        //   web3: new Web3(provider),
        //   provider,
        // });
      };

    loadprovider();
  }, []);

  // console.log("web3:",web3api.web3);

  useEffect(() => {
    const getaccount = async () => {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      setAccount(accounts[0]);
    };

    getaccount();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>First Dapp Application</h1>
        <p>Our account address is: {account ? account : "not connected"}</p>
        {/* <p>Don't use the web3 API passed by metamask its fucked and deprected. ALso rem that web3 api variable(metamsk injected one) is different from the web3 package object... use window.ethereum object injected by metamask </p> */}
      </header>
    </div>
  );
}

export default App;
