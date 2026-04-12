const express = require("express");
const cors = require("cors");
const { uploadToIPFS } = require("./ipfs");
const { hashData } = require("./crypto");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
    const { name, dob, srn } = req.body;

    const hash = hashData(name + dob + srn);
    const ipfsHash = await uploadToIPFS({ name, dob, srn });

    res.json({ hash, ipfsHash });
});

app.listen(5000, () => console.log("Server running on port 5000"));