// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0 <0.9.0;

import "./hackathon.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@tableland/evm/contracts/ITablelandTables.sol";

contract HackathonFactory{
    // // This function is called for plain Ether transfers, i.e.
    // // for every call with empty calldata.
    receive() external payable { }
    fallback() external payable {}  

    address[] public hackathons;
    uint id;

    
    //tableland setups
    ITablelandTables private _tableland;
    string private _hackathonTable;
    uint256 private _hackathonTableId;
    string private _tablePrefix = "Pasteis";

    string private _projectTable;
    uint256 private _projectTableId;

            
    //announcements
    event newHackathonCreation(uint id, address HackthonAdded);

    constructor() payable {

    /* 
      * The Tableland address on your current chain
      */
      //Tableland Polygon Mumbai Testnet contract
      // address registry = address(0x4b48841d4b32C4650E4ABc117A03FE8B51f38F68); 
      //ETh Goerli testnet address
      address registry = address(0xDA8EA22d092307874f30A1F277D1388dca0BA97a); 

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
          " (hackathonAdd tinytext, projectOwner tinytext, projectName text, description text, projectLink tinytext);"
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
        string memory _hackathon_name,
        string memory _description,
        string memory _organizer,
        uint256 _total_prize,
        string memory _date
        ) public payable returns(address, uint){
        
        // pAmount = amount * 10**18;

        id = hackathons.length;
        require(msg.sender.balance >= amount, "HackathonFactory: insufficient funds.");
        require(msg.value == amount, "HackathonFactory: Unmatching funds.");


        //create new task and add to the array
        //uint HID, uint _duration, uint256 amount
        Hackathon newhackathon = new Hackathon(id, duration_, amount, msg.sender);
        payable(address(newhackathon)).transfer(amount);
        hackathons.push(address(newhackathon));


        // " (id int, hackathonAdd tinytext, hackathon_name tinytext, description text, organizer tinytext, total_prize int, date tinytext);"
        //add new hackthon to tableland
        _tableland.runSQL(
        address(this),
        _hackathonTableId,
        string.concat(
            "INSERT INTO ",
            _hackathonTable,
            " (id, hackathonAdd, hackathon_name, description, organizer, total_prize, date) VALUES (",
            Strings.toString(id),",",
            Strings.toHexString(uint160(address(newhackathon)), 32), ",",
            _hackathon_name, ",",
            _description,",",
            _organizer,",",
            Strings.toString(_total_prize),",",
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
        string memory _hackathonAddy,
        string memory _projectOwner,
        string memory _projectName,
        string memory _description,
        string memory _projectLink) public returns (bool) {
         _tableland.runSQL(
             address(this),
            _projectTableId,
            string.concat(
                "INSERT INTO ",
                _projectTable,
                " (hackathonAdd, projectOwner, projectName, description, projectLink) VALUES (",
                _hackathonAddy, ",",
                _projectOwner,",",
                _projectName,",",
                _description,",",
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
