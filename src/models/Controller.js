const Blockchain = require("./Blockchain");
const Mempool = require("./Mempool");
const Transaction = require("./Transaction");
const Wallet = require("./Wallet");

class Controller {
	constructor() {
		this.blockchain = new Blockchain();
		this.mempool = new Mempool();
	}

	async createWallet() {
		const wallet = new Wallet();
		console.log("Your Public key is: ", wallet.publicKey);
		console.log("Your Private key is: ", wallet.keyPair.secretKey);
		return wallet;
	}
	
	async transaction(sender, recipient, amount, gasFee) {
		const newTransaction = new Transaction({
			sender: sender,
			recipient: recipient,
			amount: amount,
			signature: null,
			hash: null,
			senderBalance: sender.balance,
			recipientBalance: recipient.balance,
			gasFee, gasFee
		});
		
		newTransaction.calculateHash().sign().verifyTransaction().
			processTransaction(mempool);
	}

	getBlock(blockHash) {
		foundBlock = this.blockchain.chain.
			find(block => blocks.hash === blockhash);
		return foundBlock;
	}

	getTransaction(transactionHash) {
		for (const obj of this.blockchain.chain) {
			for (const data of obj.data) {
				if (data.hash === transactionHash) {
					return data;
				}
			}
		}
	}
	
	getBalance(address) {
		return address.balance.checkWalletBalance(address.publicKey);
	}

	getChain() {
		return this.blockchain.chain;
	}

	addBlock() {
		return this.blockchain.addBlock(this.mempool);
	}

	queryMempool() {
		return this.mempool.printMempool();
	}

	getLatestBlock() {
		const lastBlock = this.blockchain.chain[blockchain.chain.length - 1];
		return lastBlock;
	}
}

