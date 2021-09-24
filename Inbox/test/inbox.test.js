const assert = require('assert');// assert is node module used to make some assertion for some kind of test
const ganache = require('ganache-cli');
const Web3 = require('web3');// this is used as constructor function to create instances of the web3 library

// provider is configuration which can be considered as the communication layer between a web3 library and a network server(ganache here)
const web3 = new Web3(ganache.provider());

const { interface, bytecode } = require('../compile');

let accounts;
let inbox;
let initialMessage = 'Hi There!';
beforeEach(async () => {
  // get list of all account provided by ganache network
  accounts = await web3.eth.getAccounts();

  //use one of those account to deploy the contracts
  inbox = await new web3.eth.Contract(JSON.parse(interface)) // interface is json
    .deploy({ data: bytecode, arguments: [initialMessage] })
    .send({ from: accounts[0], gas: '1000000' })
  //inbox variable is javascript representation of the object that we have created
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    // console.log(inbox.options.address);
    assert.ok(inbox.options.address);// this property contains address of the contract that we have deployed
  });

  it('has a default message', async () => {
    let message = await inbox.methods.message().call();
    /*
    * first () for the arguments that function need and
    * the second set () requires the data related to cost and whome gone pay for that transaction to happen
    */
    assert.equal(message, initialMessage);
  });

  it('can update the message', async () => {
    let newMessage = 'Bye there!';
    await inbox.methods.setMessage(newMessage).send({ from: accounts[0] });// modifying contracts data so here we have to specify whome is issuing this transaction
    // this will return transaction hash and related data
    let message = await inbox.methods.message().call();
    assert.equal(message, newMessage);
  })
})




/*
Mocha startup code



class Car {
  park() {
    return 'stopped';
  }

  drive() {
    return 'vroom';
  }
}
let car;
beforeEach(() => {
  car = new Car();
}) // whatever the code written in this function is run before each it statement calls

describe('Car', () => {
  it(' it can park', () => {
    assert.equal(car.park(), 'stopped');
  })
  it(' it can drive', () => {
    assert.equal(car.drive(), 'vroom');
  })
}) // this string is only for you and me . and it is only used for organisational purposes. not for any specific reason to have value as 'Car'
*/