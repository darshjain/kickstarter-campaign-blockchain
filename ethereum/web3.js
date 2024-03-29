import Web3 from 'web3';

let web3;

if(typeof window !== 'undefined' && window.web3 !== 'undefined'){
  web3 = new Web3(window.web3.currentProvider);
}
else{
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/3a4fe6fd68534f858f1f393b0a8f322d'
  );
  web3 = new Web3(provider);
}

export default web3;