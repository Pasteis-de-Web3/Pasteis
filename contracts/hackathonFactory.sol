// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0 <0.9.0;

import "./hackathon.sol";

contract HackathonFactory{

    address[] public hackathons;
    uint id;
    
        
    //announcements
    event newHackathonCreation(uint id, address HackthonAdded);

    constructor() {
    }
    
    //backend calls to create a Hackathon SC
    function create(uint256 amount, uint duration_) public payable returns(address, uint){
        amount = amount * 10**18;
        id = hackathons.length;
        require(msg.sender.balance >= amount, "HackathonFactory: insufficient funds.");
        require(msg.value == amount, "HackathonFactory: Unmatching funds.");


        //create new task and add to the array
        //uint HID, uint _duration, uint256 amount
        Hackathon newhackathon = new Hackathon(id, duration_, amount);
        payable(address(newhackathon)).transfer(amount);

        hackathons.push(address(newhackathon));

        emit newHackathonCreation(id, address(newhackathon));

        return (address(newhackathon), id);
    }
    

//------------HELPER FUNCTIONS------------------------

    function getHackathonAddress(uint _id) public view returns(address){
        return hackathons[_id];
    }

    function getNumDeployedHackathons() public view returns(uint){
        return hackathons.length;
    }
    
    
}
