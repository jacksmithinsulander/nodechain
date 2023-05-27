const Hash = require("./Hash");
const Wallet = require("./Wallet");

const hashInstance = new Hash();
const walletInstance = new Wallet();

class Transaction {
	constructor({ sender, recipient, amount, signature, hash }) {
		this.sender = sender;
		this.recipient = recipient;
		this.amount = amount;
		this.signature = signature;
		this.hash = hash;
	}

	async calculateHash() {
		this.hash = await hashInstance.generateHash(this.sender, this.recipient, this.amount);
	}

	sign() {
		this.signature = walletInstance.signTransaction(this.hash);
	}

	verifyTransaction() {
		// Verify the transaction's signature using walletInstance.verifySignature(...)
	}
}

module.exports = Transaction;
