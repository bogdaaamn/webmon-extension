pragma solidity ^0.4.25;
/**
 * @title Owner
 * @dev Set & change owner
 */
contract Webmon {

    mapping (address => Cause) public causes;
    mapping (address => Influencer) public influencers;
    mapping (address => Donor) public donors;
    
    struct Cause {
        address[] helper;
        uint balance;
        uint goal;
    }
    struct Donor{
        uint balance;
    }
    struct Influencer{
        uint balance;
    }
    
    function registerDonor() public  {
        donors[msg.sender].balance = 0;
    }
    
    function registerInfluencer() public {
        influencers[msg.sender].balance = 0;
    }
    
    function registerCause() public {
        causes[msg.sender].balance = 0;
        causes[msg.sender].goal = 0;
    }
    
    
    
    
}