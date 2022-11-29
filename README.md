# **How To Use 🤔?**
1. First install truffle globally `npm install truffle -g`
1. Use `truffle init` to intiate truffle.
1. Now make changes in migration folder
    ```js
    const demo = artifacts.require("demo");     
    module.exports = function(deployer){
        deployer.deploy(demo);              
    }
    ```
1. Add changes in `truffle-config.js` file.
    - Uncomment the development network and change port to `7545`
    - Then add the line given below in the `module.exports =` section
        ```js
        contracts_build_directory: "./frontend/public/contracts"
        ```
1. 👇 Add the `Demo.sol` file in contract folder. Here is the code 👇
    ```js
    // SPDX-License-Identifier: UNLICENCED
    pragma solidity ^0.8.7;
    contract demo{
        uint tomato;

        receive() external payable{}



        uint public numoffunder;    
        mapping (uint => address) private funders;
        
        function transfer_tocontract() external payable{
            funders[numoffunder] = msg.sender;
        }
        function withdraw(uint withdrawAmount) external payable{
            require(
                withdrawAmount <= 2000000000000000000,
                "Cannot withdraw more than 2 ether"
            );
            payable(msg.sender).transfer(withdrawAmount);
            
        }


        //setting and getting value of tomato
        function setvalue(uint value) public {
            tomato = value;
        }

        function getvalue() view public returns(uint){
            return tomato;
        }
    }   
    ```
1. Add the Frontend folder in this repo in the root directory of project.
1. Use `npm install` accordingly to install dependencies in frontend folder.
1. Now migrate the contract using `truffle migrate --reset` in frontend folder.
1. Finally Use `npm start` to see the working ✔✔


