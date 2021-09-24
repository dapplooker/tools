const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'wrap knock noble human hunt gate finger planet off reason kid response',
  'https://rinkeby.infura.io/v3/56a52d6303a444de9e52da863d37d85f'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log(`attempting to deploy from account ${accounts[0]}`);
  let result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["Hi there!"] })
    .send({ gas: '1000000', gasPrice: '5000000000', from: accounts[0] });
  console.log(`contract deployed to address ${result.options.address}`)
}

deploy();