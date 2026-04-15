const Web3 = require("web3");
const fs = require("fs");
const path = require("path");

const web3 = new Web3("http://127.0.0.1:7545");

const contractPath = path.resolve(__dirname, "build", "contracts", "Identity.json");
if (!fs.existsSync(contractPath)) {
    console.error("Identity.json not found! Please compile and deploy the smart contract first.");
    process.exit(1);
}

const IdentityArtifact = JSON.parse(fs.readFileSync(contractPath, "utf8"));
const ABI = IdentityArtifact.abi;
const networks = IdentityArtifact.networks || {};

if (Object.keys(networks).length === 0) {
    console.error("Smart contract not deployed to any network. Run 'npx truffle migrate'.");
    process.exit(1);
}

const DEFAULT_NETWORK_ID = "5777";
const deployment = networks[DEFAULT_NETWORK_ID];

if (!deployment?.address) {
    console.error(`Smart contract is not deployed for network ${DEFAULT_NETWORK_ID}. Run 'npx truffle migrate --reset' on Ganache.`);
    process.exit(1);
}

const ADDRESS = deployment.address;

const contract = new web3.eth.Contract(ABI, ADDRESS);

module.exports = { contract, web3 };
