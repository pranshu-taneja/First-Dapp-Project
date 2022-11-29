import React, { useEffect, useState } from "react";
import imp from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import loadContract from './util/load-contract'
// import Account from './components/account'

import "./App.css";


function App() {

  const [account, setAccount] = useState(null);
  const [web3api, setWeb3api] = useState({
    provider:null,
    web3:null,
    contract:null
  })
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const loadprovider = async () => {
      const provider = await detectEthereumProvider();      //well you get window.ethereum in return if everything works well
      const contract = await loadContract("demo",provider);

      if (provider) {             //if provider exists then-- metamsk is installed
        // console.log("Metamask successfully detected!");
        // const connect = await window.ethereum.request({ method: 'eth_requestAccounts' });   //well you saw provider is basically now is actulaly window.ethereum now so
        provider.request({method:'eth_requestAccounts'});     //to pop up metamask and request for account
        setWeb3api({
          web3: new imp(provider),
          provider,
          contract      //btw if you don't define contract like const contract then this will show that contract is undefined that means it can't assign anything
        })
        
      } else {
        console.log("Please install MetaMask!");
      }

      //------------------- fucked one WORKED-------------------

      //------------------- what is provider -------------------
      // https://www.linkedin.com/pulse/what-web3-node-provider-top-5-blockchain-development-hukam-singh#:~:text=This%20Web3%20provider%20allows%20your,or%20IPC%20socket%20based%20server. 
      //------------------- what is provider -------------------

        // let web3 = new imp(new imp.providers.HttpProvider("HTTP://127.0.0.1:7545")); //keep a sharp eye on two new keyword used

        // web3.eth.getAccounts().then((account)=>{
        // console.log(account);
        // }); //error if you don't use two new in the httpprovider rpc statement
        // //eth is the module to connect with the etherum network

        // //well i Tried getting these accounts using account[0] kinda thing but due to promise pening problem it didn't work until now 

        // web3.eth                //eth as you know is used to connect to etherum network
        // .getBalance("0x6A303C197181a75F507523f9181CBEc76280Feec")
        // .then(console.log); //use then cuz its promise which are used in api so that waiting doesn't dead our resoponse it will be stored when available

        // web3.eth.sendTransaction({
        // from: "0x6A303C197181a75F507523f9181CBEc76280Feec",
        // to: "0xb25A1068cc02dAE03b49529E372468794F16f4A8",
        // value: web3.utils.toWei("1", "ether"),        //web3.utils provides various functionalities one of them is towei (amount, unit).... this will simply calculate and convert the ether unit into wei(smallest unit in transaction)
        // });
      //------------------- fucked one WORKED-------------------
    };

    loadprovider();
  }, []);  

  window.ethereum.on('accountsChanged', function (accounts) {         //event to reflect changes on page dynamically
    setAccount(accounts[0].toUpperCase());
  });
  
  useEffect(() => {
    const getbalance = async()=>{
      const {web3, contract} = web3api;
    
      let balance = await web3.eth.getBalance(contract.address,"latest");
      setBalance(web3.utils.fromWei(balance,"ether"));
    }
  
    getbalance()
  }, [web3api])
  
  useEffect(() => {           //to get the accounts
    const getaccount = async () => {          //Here we are actulaly just passing the all accounts and it won't render after changin the account in metamask but above event useeffect will render it 
      let accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      setAccount(accounts[0]);
    };

    getaccount();
  }, []);

  const transferFund= async()=>{
    const{web3, contract} = web3api;
    await contract.transfer_tocontract({
      from:account,
      value:web3.utils.toWei("2","ether")
    })
  }

  const withdrawfund = async()=>{
    const{contract,web3} = web3api;
    const withdrawAmount = web3.utils.toWei("1","ether");
    await contract.withdraw(withdrawAmount,{
      from:account
    })
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>First Dapp Application</h1>
        <p>Our account address is: {account ? account : "not connected"}</p>
        <p>Our contract balance is: {balance ? balance : "not here"} ETH</p>
        <button type="button" id="Transaction" onClick={transferFund}>Transfer</button>
        <button type="button" id="Transaction" onClick={withdrawfund}>Withdraw</button>
      </header>
    </div>
  );
}

export default App;
