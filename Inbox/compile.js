//this file as the name suggests used to compile our solidity code
/*
*
* require("./contracts/index.sol") using this is bad here as the code that we require is
* gets executed by the node engine so we not require the file this way
*
*/

const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'index.sol');
const source = fs.readFileSync(inboxPath, 'utf-8');

module.exports = solc.compile(source, 1).contracts[':Inbox']; // exporting the object
/*
{
  contracts :{
    Inbox:{
      bytecode: ,//the actual code that is going to run on the ethereum network
      Interfact : //it is the ABI which is the second part needed for a contract to intract with javascript world
      // ABI contains different function that the contract consists of. and about what are the arguments this function takes and what kind of return value this function returns
    }
  }
}

*/
