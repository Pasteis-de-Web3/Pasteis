
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0 <0.9.0;


contract Hackathon{

    //declare required variables
    // address payable [] public hackers;
    uint hackID;
    address public hackathonOwner;
    bool hackOpen;
    uint _start;
    uint _end;
    uint256 prizeAmount;

    address payable public winner;

    struct Voter {
        uint weight; // weight is accumulated by delegation
        bool voted;  // if true, that person already voted
        address delegate; // person delegated to
        uint vote;   // index of the voted proposal
    }

    struct Proposal {
        // If you can limit the length to a certain number of bytes, 
        // always use one of bytes1 to bytes32 because they are much cheaper
        bytes32 name;   // short name (up to 32 bytes)
        uint voteCount; // number of accumulated votes
        address owner; //owner of this project
    }

    //voting
    mapping(address => Voter) public hackers;
    Proposal[] public proposals;

    constructor(uint HID, uint _duration, uint256 amount){
        hackID = HID;
        hackathonOwner = msg.sender;
        hackOpen = true;
        prizeAmount = amount;
        //set timer
        _start = block.timestamp;
        _end = _duration + _start;
        hackers[hackathonOwner].weight = 1;

    }


    //Organizer:
    //frontend calls to add funds to hackthon
    function fundHack(uint256 amount) public payable{
        prizeAmount = prizeAmount + amount * 10**18;        
        require(msg.sender.balance >= amount, "Pasteis: insufficient funds.");
        require(msg.value == amount, "Pasteis: Unmatching funds.");
    }

    //Participants
    //frontend calls
    function submission(address hacker, bytes32 proposalName ) public{
        if(block.timestamp >= _end){
            hackOpen = false;

        }
        require(hackOpen == true, "Pasteis: Hackathon is closed.");

        //give hacker who submitted solution the right to vote
        require(!hackers[hacker].voted, "The hacker already voted.");
        require(hackers[hacker].weight == 0, "The hacker has submitted.");
        hackers[hacker].weight = 1;

        // appends it to the end of `proposals`.
        proposals.push(Proposal({
            name: proposalName,
            voteCount: 0,
            owner: hacker
        }));

        //mint NFT from POAP

    }

    //Voting //frontend calls
    /// Give your vote (including votes delegated to you)
    /// to proposal `proposals[proposal].name`.
    function vote(uint proposal) external {
        Voter storage sender = hackers[msg.sender];
        require(sender.weight != 0, "Has no right to vote");
        require(!sender.voted, "Already voted.");
        require(msg.sender != proposals[proposal].owner, "Cannot vote for yourself!");
        sender.voted = true;
        sender.vote = proposal;

        // If `proposal` is out of the range of the array,
        // this will throw automatically and revert all
        // changes.
        proposals[proposal].voteCount += sender.weight;
    }

    //fund winner
    function fundWinner() public {
        Voter storage sender = hackers[hackathonOwner];
        require(sender.voted, "Organizer needs to vote.");
        winnerAddress().transfer(prizeAmount);

    }

    //helper functions
    /// @dev Computes the winning proposal taking all
    /// previous votes into account.
    function winningProposal() public view returns (uint winningProposal_)
    {
        uint winningVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }
    

    // Calls winningProposal() function to get the index
    // of the winner contained in the proposals array and then
    // returns the name of the winner proposal
    function winnerName() public view returns (bytes32 winnerName_)
    {
        winnerName_ = proposals[winningProposal()].name;
    }

    // returns the addree of the winner
    function winnerAddress() public view returns (address payable winnerAddress_)
    {
         winnerAddress_ = payable(proposals[winningProposal()].owner);
    }


}
