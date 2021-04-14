// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.4.25;

/** 
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */
contract Influencer {
   
    uint public balance;
    uint public id;
    address public _address;
    
    mapping (uint => Cause) public causes;
    struct Cause {
        uint goal;
        uint cause_id;
        uint balance;
        address cause_address;
    }
    
    constructor(uint _id) {
        balance = 0;
        _address = msg.sender;
        id = _id;
                
    }   
    
   function addCause(uint _id, uint _goal) public {
       Cause storage c = causes[_id];
       c.goal = _goal;
       c.balance = 0;
       c.cause_address = msg.sender;
   }
}
