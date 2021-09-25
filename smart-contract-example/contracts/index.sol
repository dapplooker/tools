pragma solidity ^0.4.17;
// this will specify the version of solidity we are going to use
contract Inbox {
    string public message; // it is a storage variable
    function Inbox(string initialMessage) public {
        message = initialMessage;
    }
    function setMessage(string newMessage) public {
        message = newMessage;
    }
}