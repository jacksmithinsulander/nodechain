const Hash = require("./Hash");
const Wallet = require("./Wallet");

const hashInstance = new Hash();
const walletInstance = new Wallet();

class Transaction {
	constructor({ sender, recipient, amount, gasFee }) {
		this.sender = sender;
		this.recipient = recipient;
		this.amount = amount;
		this.gasFee = gasFee;

		this.signature = null;
		this.hash = null;
	}

	async calculateHash() {
		this.hash = await hashInstance.
			generateHash(this.sender, this.recipient, this.amount);
	}

	sign() {
		this.signature = walletInstance.
			signTransaction(this.hash);
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
		};
	}

	processTransaction(mempool) {
		const senderBalance = walletInstance.
			checkWalletBalance(this.sender);
		const recipientBalance = walletInstance.
			checkWalletBalance(this.recipient);

		if (senderBalance >= this.amount) {
			walletInstance.
				updateBalance(this.sender, senderBalance - this.amount);
			walletInstance.
				updateBalance(this.recipient, recipientBalance + this.amount);

			const transactionData = this.getTransactionData();
			mempool.addToMempool(transactionData);
		} else {
			throw new Error("Insufficient balance for transaction");
		}
	}
}

module.exports = Transaction;