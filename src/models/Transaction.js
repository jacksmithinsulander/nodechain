const Hash = require("./Hash");
const Wallet = require("./Wallet");

const hashInstance = new Hash();
const walletInstance = new Wallet();

class Transaction {
	constructor({ 
		sender, recipient, amount, 
		signature, hash, senderBalance, 
		recipientBalance, gasFee 
	}) {
		this.sender = sender;
		this.recipient = recipient;
		this.amount = amount;
		this.signature = signature;
		this.hash = hash;
		this.senderBalance = senderBalance;
		this.recipientBalance = recipientBalance;
		this.gasFee = gasFee;
	}

	async calculateHash() {
		this.hash = await hashInstance.
			generateHash(this.sender, this.recipient, this.amount);
	}

	sign() {
		this.signature = walletInstance.signTransaction(this.hash);
	}

	verifyTransaction() {
		const publicKey = walletInstance.publicKey;
		return walletInstance.
			verifySignature(this.hash, this.signature, publicKey);
	}

	getTransactionData() {
		return {
			sender: this.sender,
			recipient: this.recipient,
			amount: this.amount,
			signature: this.signature,
			hash: this.hash,
			gasFee: this.gasFee
		}
	}

	processTransaction(mempool) {
		const senderBalance = walletInstance.checkWalletBalance(this.sender);
		const recipientBalance = walletInstance.
			checkWalletBalance(this.recipient);

		if (senderBalance >= this.amount) {
			walletInstance.
				updateBalance(this.sender, senderBalance - this.amount);
			walletInstance.
				updateBalance(this.recipient, recipientBalance + this.amount);
			const transactionData = this.getTransactionData();
			mempool.addToMempool(transactionData)
		} else {
			console.log("Insufficient balance for transaction");
		}
	}                             
}

module.exports = Transaction;