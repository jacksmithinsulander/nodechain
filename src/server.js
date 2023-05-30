const express = require("express");
const Controller = require("./models/Controller");
const cors = require("cors");
const axios = require("axios");

cont app = express();
const controller = new Controller()

const DEFAULT_PORT = 3000;
const ROOT_ADDRESS = `http://localhost:${DEFAULT_PORT}`;

const syncData = async () => {
	try {
		const url = `${ROOT_ADDRESS}/api/1/blocks`;
		const { data } = await axios.get(url);
		controller.blockchain.replaceChain(data);
		console.log("Synchronizing at startup");
	} catch (err) {
		console.log("Error", err);
 	}
};

app.use(express.json());
app.use(cors());

app.get('/api/1/blocks', (req, res) => {
	res.status(200).json(controller.getChain);
});

app.post('/api/1/blocks', (req, res) => {
	const { data } = req.body;
	const block = controller.transaction();
});

let PEER_PORT;

if (process.env.GENERATE_PEER_PORT === "true") {
	PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 100);
}

const PORT = PEER_PORT || DEFAULT_PORT;

app.listen(PORT, () => {
	console.log(`Server is up and running on port ${PORT}`)
	syncData();
});
