// pragma solidity >=0.4.22 <0.9.0;

// uint256 constant TOTAL_TICKETS = 10;

// contract Tickets {
//   address public owner = msg.sender;

//   struct Ticket {
//     uint256 price;
//     address owner;
//     uint256 id;
//   }

//   Ticket[TOTAL_TICKETS] public tickets;

//   constructor() {
//     for (uint256 i = 0; i < TOTAL_TICKETS; i++) {
//       tickets[i].price = 1e17; // 0.1 ETH in wei
//       tickets[i].owner = address(0x0);
//       tickets[i].id = i;
//     }
//   }

//   function buyTicket(uint256 _index) external payable {
//     require(_index < TOTAL_TICKETS && _index >= 0);
//     require(tickets[_index].owner == address(0x0));
//     require(msg.value >= tickets[_index].price);
//     tickets[_index].owner = msg.sender;
//   }

//   function transferTicket(uint256 _index, address _receiver) external {
//   require(_index < TOTAL_TICKETS && _index >= 0);
//   require(tickets[_index].owner == msg.sender);
//   require(_receiver != address(0) && _receiver != msg.sender);

//   tickets[_index].owner = _receiver;
// }

// }


// Tickets.sol
pragma solidity >=0.4.22 <0.9.0;

uint256 constant TOTAL_TICKETS = 10;

contract Tickets {
    address public owner = msg.sender;

    struct Ticket {
        uint256 price;
        address owner;
        uint256 id;
    }

    Ticket[TOTAL_TICKETS] public tickets;

    constructor() {
        for (uint256 i = 0; i < TOTAL_TICKETS; i++) {
            tickets[i].price = 1e17; // 0.1 ETH in wei
            tickets[i].owner = address(0x0);
            tickets[i].id = i;
        }
    }

    function buyTicket(uint256 _index) external payable {
        require(_index < TOTAL_TICKETS && _index >= 0);
        require(tickets[_index].owner == address(0x0));
        require(msg.value >= tickets[_index].price);
        tickets[_index].owner = msg.sender;
    }

    function transferTicket(uint256 _index, address _receiver) external {
        require(_index < TOTAL_TICKETS && _index >= 0);
        require(tickets[_index].owner == msg.sender);
        require(_receiver != address(0) && _receiver != msg.sender);

        tickets[_index].owner = _receiver;
    }

    function returnTicket(uint256 _index) external {
      require(_index < TOTAL_TICKETS && _index >= 0);
      require(tickets[_index].owner == msg.sender);
      tickets[_index].owner = owner;
    }

}
