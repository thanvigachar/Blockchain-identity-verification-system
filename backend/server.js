const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { uploadToIPFS, getFromIPFS } = require("./ipfs");
const { hashData } = require("./crypto");
const { contract, web3 } = require("./contract");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
    try {
        const { name, dob, srn } = req.body;

        const hash = hashData(name + dob + srn);
        const ipfsHash = await uploadToIPFS({ name, dob, srn });

        // Decentralized flow: return the IPFS hash and let the client sign the transaction via MetaMask
        res.json({ success: true, hash, ipfsHash });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get("/verify/:srn", async (req, res) => {
    try {
        const srn = req.params.srn;
        const data = await contract.methods.getUser(srn).call();
        const profile = data[0] ? await getFromIPFS(data[0]) : null;

        res.json({
            success: true,
            ipfsHash: data[0],
            isVerified: data[1],
            walletAddress: data[2],
            profile,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
