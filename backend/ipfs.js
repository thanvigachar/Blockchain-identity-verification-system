const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const storePath = path.resolve(__dirname, "ipfs-store.json");

function readStore() {
    if (!fs.existsSync(storePath)) {
        return {};
    }

    return JSON.parse(fs.readFileSync(storePath, "utf8"));
}

function writeStore(store) {
    fs.writeFileSync(storePath, JSON.stringify(store, null, 2));
}

async function uploadToIPFS(data) {
    // Mock IPFS for demo: create a stable content-based hash and persist the payload locally.
    const ipfsHash = `Qm${crypto.createHash("sha256").update(JSON.stringify(data)).digest("hex").slice(0, 20)}`;
    const store = readStore();
    store[ipfsHash] = data;
    writeStore(store);
    return ipfsHash;
}

async function getFromIPFS(ipfsHash) {
    const store = readStore();
    return store[ipfsHash] || null;
}

module.exports = { uploadToIPFS, getFromIPFS };
