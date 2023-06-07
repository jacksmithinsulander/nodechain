const express = require("express");
const Broker = require("./redis/Broker");
const Controller = require("./models/Controller");
const cors = require("cors");
const axios = require("axios");

const app = express();
const controller = new Controller();
const messageBroker = new Broker(controller.blockchain);

const DEFAULT_PORT = 3001;
const ROOT_ADDRESS = `http://localhost:${DEFAULT_PORT}`;

const syncData = async () => {
	try {
		const url = `${ROOT_ADDRESS}/api/1/chain`;
		const { data } = await axios.get(url);
		controller.blockchain.replaceChain(data);
		console.log("Synchronizing at startup");
	} catch (err) {
		console.log("Error", err);
 	}
};

app.use(express.json());
app.use(cors());


let PEER_PORT;

if (process.env.GENERATE_PEER_PORT === "true") {
	PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 100);
}

const PORT = PEER_PORT || DEFAULT_PORT;

let serverWallet;

async function initializeServer() {
  try {
    serverWallet = await controller.createWallet();
    console.log("ServerWallet: ", serverWallet);
    app.listen(PORT, () => {
      console.log(`Server is up and running on port ${PORT}`);
      syncData();
    });
    
    // Call addBlock with serverWallet as input
    await controller.addBlock(serverWallet);
  } catch (error) {
    console.error("Error initializing server:", error);
  }
}

initializeServer();

app.get('/api/1/wallet', async (req, res) => {
	const wallet = await controller.createWallet();
	res.status(200).json(wallet);
});

app.post('/api/1/transaction', async (req, res) => {
	const { amount, gasFee, recipient, sender } = req.body;

	await controller.
		transaction(sender, recipient, amount, gasFee);

	console.log("Serverwallet is:", serverWallet);
	res.status(200).json({ message: 'Transaction processed successfully' });
});

app.get('/api/1/block/:blockHash', (req, res) => {
	const { blockHash } = req.params;
	const block = controller.getBlock(blockHash);

	if (block) {
		res.status(200).json(block);
	} else {
		res.status(404).json({ message: 'Block not found'});
	}
});

app.get('/api/1/transaction/:transactionHash', (req, res) => {
	const { transactionHash } = req.params;
	const transaction = controller.getTransaction(transactionHash);

	if (transaction) {
		res.status(200).json(transaction);
	} else {
		res.status(400).json({ message: 'Transaction not found'});
	}
});

app.get('/api/1/senderTransaction/:senderAddress', (req, res) => {
	const { senderAddress } = req.params;
	const transactions = controller.findTransactionBySender(senderAddress);
	if (transactions) {
		res.status(200).json(transactions)
	} else {
		res.status(400).json({ message: 'Wallet/Transaactions not found'});
	}
});

app.get('/api/1/balance/:address', (req, res) => {
	const { address } = req.params;
	let balance;
	try {
		balance = controller.getBalance(address);
	} catch (error) {
		return res.status(404).json({ error: 'Wallet not found' });
	}

	res.status(200).json({ balance });
});


app.get('/api/1/chain', (req, res) => {
	const chain = controller.getChain();
	res.status(200).json(chain);
});

app.get('/api/1/mempool', (req, res) => {
	const mempool = controller.queryMempool();
	res.status(200).json(mempool);
});

app.get('/api/1/latestblock', (req, res) => {
	const lastBlock = controller.getLatestBlock();
	res.status(200).json(lastBlock);
});