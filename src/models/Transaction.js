const Hash = require("./Hash");
const Wallet = require("./Wallet");
const Balance = require("./Balance");

const hashInstance = new Hash();
const walletInstance = new Wallet();
const balanceInstance = new Balance();

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
		const publicKey = walletInstance.publicKey;
		return walletInstance.verifySignature(this.hash, this.signature, publicKey);
	}

	processTransaction() {
		const senderBalance = this.balance.checkWalletBalance(this.sender);
		const recipientBalance = this.balance.checkWalletBalance(this.recipient);

		if (senderBalance >= this.amount) {
			this.balance.updateBalance(this.sender, senderBalance - this.amount);
			this.balance.updateBalance(this.recipient, recipientBalance + this.amount);
		} else {
			console.log("Insufficient balance for transaction");
		}
	}
}

module.exports = Transaction;