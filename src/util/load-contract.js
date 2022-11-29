// @ts-ignore
import contract from '@truffle/contract'

//well this all below lines are used for deployment dn't care too much just copy paste and change accordingly resue it basically

async function loadContract(name, provider) {               //btw rem truffle migrate wroking in frontend rather than in the root directory starnge but it is what it is in root its only compiling
    const res = await fetch(`/contracts/${name}.json`);
    const artifact = await res.json();
    const _contract = contract(artifact);
    _contract.setProvider(provider);
    const deployedContract = await _contract.deployed();
    return deployedContract;
}


export default loadContract;