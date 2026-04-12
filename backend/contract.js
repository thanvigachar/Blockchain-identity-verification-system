const Web3 = require("web3");

const web3 = new Web3("http://127.0.0.1:7545"); // Ganache

const ABI = []; // paste ABI here
const ADDRESS = "YOUR_CONTRACT_ADDRESS";

const contract = new web3.eth.Contract(ABI, ADDRESS);

module.exports = contract;