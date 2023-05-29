const Blockchain = require("./Blockchain");
const Mempool = require("./Mempool");
const Transaction = require("./Transaction");
const Wallet = require("./Wallet");

class Controller {
	constructor() {
		this.blockchain = new Blockchain();
		this.mempool = new Mempool();
	}

	createWallet() {
		const wallet = new Wallet();
		console.log("Your Public key is: ", wallet.publicKey);
		console.log("Your Private key is: ", wallet.keyPair.secretKey);
		return wallet;
	}
	
	transaction(sender, recipient, amount, gasFee) {
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
	
	}

	getTransaction(transactionHash) {
	
	}
	
	getBalance(balanceOff) {
	
	}

	getChain() {
	
	}

	queryMempool() {
	
	}

	latestBlock() {
	
	}
}

