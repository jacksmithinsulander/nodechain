const express = require("express");
const cors = require("cors");
const Blockchain = require("./Blockchain");

const app = express();
const blockchain = new Blockchain();

app.use(express.json());
app.use(cors());

app.get("/api/1/blocks", (req, res) => {
	res.status(200).json(blockchain.chain);
});

app.post("/api/1/blocks", (req, res) => {
	const { data } = req.body;
	const block = blockchain.addBlock({ data });

	res.status(201).json({ message: "Added new block", block: block });
});

const PORT = 5001;

app.listen(PORT, () =>
	console.log("Server is up and running on port: ${PORT}")
);