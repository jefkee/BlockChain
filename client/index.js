import Web3 from 'web3';
import configuration from '../build/contracts/Tickets.json';
import 'bootstrap/dist/css/bootstrap.css';
import ticketImage from './images/ticket.png';

const createElementFromString = (string) => {
  const el = document.createElement('div');
  el.innerHTML = string;
  return el.firstChild;
};

const CONTRACT_ADDRESS = "0x341eaAdA26C4D220B6a908F3Bc1882b336aCa1e9";
const CONTRACT_ABI = configuration.abi;

const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7545');
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

let account;

const accountEl = document.getElementById('account');
const ticketsEl = document.getElementById('tickets');
const TOTAL_TICKETS = 10;
const EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000';

const buyTicket = async (ticket) => {
  console.log(ticket);
  await contract.methods
    .buyTicket(ticket.id)
    .send({ from: account, value: ticket.price });
  await refreshTickets();
};

// ...

// window.returnTicket = async (ticketId) => {
//   const ticket = await contract.methods.tickets(ticketId).call();
//   if (ticket.owner.toLowerCase() === account.toLowerCase()) {
//     await contract.methods.returnTicket(ticketId).send({ from: account });
//     await refreshTickets();
//   } else {
//     alert("You can only return tickets that you own.");
//   }
// };

const returnTicket = async (ticket) => {
  // const ticket = await contract.methods.tickets(ticketId).call();
  // if (ticket.owner.toLowerCase() === account.toLowerCase()) {
    console.log(ticket);
    console.log(account)
    await contract.methods
      .returnTicket(ticket.id)
      .send({ from: account });
    await refreshTickets();
  // } else {
  //   alert("You can only return tickets that you own.");
  // }
};
// ...




// const returnTicket = async (ticket) => {
//   await contract.methods
//     .returnTicket(ticket.id)
//     .send({ from: account });
//   await refreshTickets();
// };

const refreshTickets = async () => {

  ticketsEl.innerHTML = '';

  const userTickets = [];

  for (let i = 0; i < TOTAL_TICKETS; i++) {
    const ticket = await contract.methods.tickets(i).call();
    ticket.id = i;

    if (ticket.owner === EMPTY_ADDRESS  || ticket.owner === CONTRACT_ADDRESS) {
      const ticketEl = createElementFromString(
        `<div class="ticket card" style="width: 18rem;">
          <img src="${ticketImage}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Ticket</h5>
            <p class="card-text">${ticket.price / 1e18} Eth</p>
            <p class="card-text">ID: ${ticket.id}</p>
            <button class="btn btn-primary">Buy Ticket</button>
          </div>
        </div>`
      );
      ticketEl.onclick = buyTicket.bind(null, ticket);
      ticketsEl.appendChild(ticketEl);
    } else if (ticket.owner.toLowerCase() === account.toLowerCase()) {
      // If the ticket is owned by the current user, add it to the userTickets array
      userTickets.push(ticket);
    }
  }

    //display all user tickets
  userTickets.forEach((ticket) => {
    const userTicketEl = createElementFromString(
      `<div class="ticket card" style="width: 18rem;">
        <img src="${ticketImage}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Owned Ticket</h5>
          <p class="card-text">${ticket.price / 1e18} Eth</p>
          <p class="card-text">ID: ${ticket.id}</p>
          <button class="btn btn-primary">Return Ticket</button>
        </div>
      </div>`
    );
    userTicketEl.onclick = returnTicket.bind(null, ticket);
    ticketsEl.appendChild(userTicketEl);
  });

  // Display the count of tickets owned by the current user
  const userTicketsCountEl = document.createElement('div');
  userTicketsCountEl.innerHTML = `<p>You have ${userTickets.length} ticket(s).</p>`;
  ticketsEl.appendChild(userTicketsCountEl);

  
};

const main = async () => {
  const accounts = await web3.eth.requestAccounts();
  account = accounts[0];
  accountEl.innerHTML = account;
  console.log(account);

  await refreshTickets();
};

main();


// /// index.js
// import Web3 from 'web3';
// import configuration from '../build/contracts/Tickets.json';
// import 'bootstrap/dist/css/bootstrap.css';
// import ticketImage from './images/ticket.png';

// const createElementFromString = (string) => {
//   const el = document.createElement('div');
//   el.innerHTML = string;
//   return el.firstChild;
// };

// const CONTRACT_ADDRESS = "0x2608cA9f25578EA10425F655b6aaC44314eB3B6c"
// const CONTRACT_ABI = configuration.abi;

// const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7545');
// const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

// let account;

// const accountEl = document.getElementById('account');
// const ticketsEl = document.getElementById('tickets');
// const priceInputEl = document.getElementById('priceInput');
// const TOTAL_TICKETS = 10;
// const EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000';


// const buyTicket = async (ticket) => {
//   await contract.methods
//     .buyTicket(ticket.id)
//     .send({ from: account, value: ticket.price });
//   await refreshTickets();
// };

// const createBuyButton = (ticketId) => {
//   const button = document.createElement('button');
//   button.className = 'btn btn-primary';
//   button.innerText = 'Buy Ticket';
//   button.onclick = () => buyTicket(ticketId);
//   return button;
// };



// const returnTicket = async (ticket) => {
//   await contract.methods
//     .returnTicket(ticket.id)
//     .send({ from: account });
//   await refreshTickets();
// };

// const refreshTickets = async () => {
//   ticketsEl.innerHTML = '';

//   const userTickets = [];

//   for (let i = 0; i < TOTAL_TICKETS; i++) {
//     const ticket = await contract.methods.tickets(i).call();
//     ticket.id = i;

//     if (ticket.owner === EMPTY_ADDRESS) {
//       const ticketEl = createElementFromString(
//         `<div class="ticket card" style="width: 18rem;">
//           <img src="${ticketImage}" class="card-img-top" alt="...">
//           <div class="card-body">
//             <h5 class="card-title">Ticket</h5>
//             <p class="card-text">${ticket.price / 1e18} Eth</p>
//             <p class="card-text">ID: ${ticket.id}</p>
//             <button class="btn btn-primary" onclick="buyTicket(${i})">Buy Ticket</button>
//           </div>
//         </div>`
//       );
//       ticketsEl.appendChild(ticketEl);
//     } else if (ticket.owner.toLowerCase() === account.toLowerCase()) {
//       userTickets.push(ticket);
//     }
//   }


//   //display all user tickets
//   userTickets.forEach((ticket) => {
//     const userTicketEl = createElementFromString(
//       `<div class="ticket card" style="width: 18rem;">
//         <img src="${ticketImage}" class="card-img-top" alt="...">
//         <div class="card-body">
//           <h5 class="card-title">Owned Ticket</h5>
//           <p class="card-text">${ticket.price / 1e18} Eth</p>
//           <p class="card-text">ID: ${ticket.id}</p>
//           <button class="btn btn-primary" onClick="returnTicket(${ticket.id})">Return Ticket</button>
//         </div>
//       </div>`
//     );
//     ticketsEl.appendChild(userTicketEl);
//   });


//   // Display the count of tickets owned by the current user
//   const userTicketsCountEl = document.createElement('div');
//   userTicketsCountEl.innerHTML = `<p>You have ${userTickets.length} ticket(s).</p>`;
//   ticketsEl.appendChild(userTicketsCountEl);
// };

// const main = async () => {
//   const accounts = await web3.eth.requestAccounts();
//   account = accounts[0];
//   accountEl.innerText = account;

//   await refreshTickets();
// };

// main();
