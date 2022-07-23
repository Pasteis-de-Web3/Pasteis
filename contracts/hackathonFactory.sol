// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0 <0.9.0;

import "./hackathon.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@tableland/evm/contracts/ITablelandTables.sol";

contract HackathonFactory{

    address[] public hackathons;
    uint id;
    uint256 pAmount;
    
    //tableland setups
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    ITablelandTables private _tableland;
    string private _hackathonTable;
    uint256 private _hackathonTableId;
    string private _tablePrefix = "Pasteis";

    string private _projectTable;
    uint256 private _projectTableId;

            
    //announcements
    event newHackathonCreation(uint id, address HackthonAdded);

    constructor(address registry){
    /* 
      * The Tableland address on your current chain
      */
      _tableland = ITablelandTables(registry);

      /*
      * Stores the unique ID for the newly created Hackathon table.
      */
      _hackathonTableId = _tableland.createTable(
        address(this),
        string.concat(
          "CREATE TABLE",
					_tablePrefix,
          Strings.toString(block.chainid),
          " (id int, hackathonAdd tinytext, hackathon_name tinytext, description text, organizer tinytext, total_prize int, date tinytext);"
        )
      );

      /*
      * Stores the full tablename for the Hackathon table. 
      * {prefix}_{chainid}_{tableid}
      */
      _hackathonTable = string.concat(
        _tablePrefix,
				"_",
        Strings.toString(block.chainid),
        "_",
        Strings.toString(_hackathonTableId)
      );



      /*
      * Stores the unique ID for the newly created Project table.
      */
      _projectTableId = _tableland.createTable(
        address(this),
        string.concat(
          "CREATE TABLE",
					_tablePrefix,
          Strings.toString(block.chainid),
          " (hackathonAdd tinytext, projectOwner tinytext, projectName text, description text, projectLink tinytext );"
        )
      );

      /*
      * Stores the full tablename for the Project table. 
      * {prefix}_{chainid}_{tableid}
      */
      _projectTable = string.concat(
        _tablePrefix,
				"_",
        Strings.toString(block.chainid),
        "_",
        Strings.toString(_projectTableId)
      );


    }
    
    //create a Hackathon SC
    function create(
        uint256 amount,
        uint duration_,
        string memory _hackathonAdd,
        string memory _hackathon_name,
        string memory _description,
        string memory _organizer,
        string memory _total_prize,
        string memory _date
        ) 
        public payable returns(address, uint){
        pAmount = amount * 10**18;
        id = hackathons.length;
        require(msg.sender.balance >= amount, "HackathonFactory: insufficient funds.");
        require(msg.value == amount, "HackathonFactory: Unmatching funds.");


        //create new task and add to the array
        //uint HID, uint _duration, uint256 amount
        Hackathon newhackathon = new Hackathon(id, duration_, pAmount);
        payable(address(newhackathon)).transfer(pAmount);

        hackathons.push(address(newhackathon));

        //add new hackthon to tableland
        _tableland.runSQL(
        address(this),
        _hackathonTableId,
        string.concat(
            "INSERT INTO ",
            _hackathonTable,
            " (id, hackathonAdd, hackathon_name, description, organizer, total_prize, date) VALUES (",
            Strings.toString(id),
            _hackathonAdd,
            _hackathon_name,
            _description,
            _organizer,
            _total_prize,
            _date,
             ")" 
             //should be the format below
        //  "(id, hackathonAdd, hackathon_name, description, organizer, total_prize, date)"
        )
        );

        emit newHackathonCreation(id, address(newhackathon));

        return (address(newhackathon), id);
    }

    //add a new row to Tableland
    function AddProject(
        string calldata _hackathonAddy,
        string calldata _projectOwner,
        string calldata _projectName,
        string calldata _description,
        string calldata _projectLink) public returns (bool) {
         _tableland.runSQL(
             address(this),
            _projectTableId,
            string.concat(
                "INSERT INTO ",
                _projectTable,
                " (hackathonAdd, projectOwner, projectName, description, projectLink) VALUES (",
                _hackathonAddy,
                _projectOwner,
                _projectName,
                _description,
                _projectLink,
                ")"
                //"hackathonAdd, projectOwner, projectName, description, projectLink"
                //should be the format above
            )
         );

    return true;
}
    

//------------HELPER FUNCTIONS------------------------

    function getHackathonAddress(uint _id) public view returns(address){
        return hackathons[_id];
    }

    function getNumDeployedHackathons() public view returns(uint){
        return hackathons.length;
    }
    
    
}
