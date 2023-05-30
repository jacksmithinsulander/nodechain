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
		console.log("Your Balance is: ", wallet.balance.checkWalletBalance(
			wallet.publicKey));
		return wallet;
	}
	
	async transaction(sender, recipient, amount, gasFee) {
		const senderBalance = sender.balance.checkWalletBalance(
			sender.publicKey);
		const recipientBalance = recipient.balance.checkWalletBalance(
			recipient.publicKey);
		console.log(sender.publicKey, "Sender Balance is : ", senderBalance,
			recipient.publicKey , "Recipient Balance is : ", recipientBalance)

		const newTransaction = await new Transaction({
			sender: sender.publicKey,
			recipient: recipient.publicKey,
			amount: amount,
			signature: null,
			hash: null,
			senderBalance: sender.balance,
			recipientBalance: recipient.balance,
			gasFee, gasFee
		});
		
		await newTransaction.calculateHash();
		await newTransaction.sign();
		await newTransaction.verifyTransaction();
		await newTransaction.processTransaction(this.mempool);
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

	async addBlock() {
		const mem = this.mempool.mempoolArr
		const miningFromMem = await this.blockchain.addBlock( mem );
		return miningFromMem;
	}

	queryMempool() {
		return this.mempool.printMempool();
	}

	getLatestBlock() {
		const lastBlock = this.blockchain.chain[blockchain.chain.length - 1];
		return lastBlock;
	}
}
module.exports = Controller;
