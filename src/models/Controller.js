const Blockchain = require("./Blockchain");
const Mempool = require("./Mempool");
const Transaction = require("./Transaction");
const Wallet = require("./Wallet");

const walletInstance = new Wallet();

class Controller {
	constructor() {
		this.blockchain = new Blockchain();
		this.mempool = new Mempool();
		this.wallets = [];
	}

	async createWallet() {
		const wallet = new Wallet();
		this.wallets.push(wallet);
		console.log("Your Public key is: ", wallet.publicKey);
		console.log("Your Private key is: ", wallet.keyPair.secretKey);
		console.log("Your Balance is: ", wallet.checkWalletBalance(
			wallet.publicKey));
		return wallet;
	}
	
	async transaction(sender, recipientPublicKey, amount, gasFee) {
		console.log("Sender.publicKey = ", sender.publicKey)
		const senderInstance = this.wallets.
			find((wallet) => wallet.publicKey === sender.publicKey);
		console.log("SenderInstance =", senderInstance)
		const senderBalance = senderInstance.checkWalletBalance(
			sender.publicKey);
		const recipient = this.wallets.
			find((wallet) => wallet.publicKey === recipientPublicKey);
		const recipientBalance = recipient.checkWalletBalance(
			recipient.publicKey);
	
		const newTransaction = await new Transaction({
			sender: sender.publicKey,
			recipient: recipient.publicKey,
			amount: amount,
			signature: null,
			hash: null,
			senderBalance: sender.balance,
			recipientBalance: recipient.balance,
			gasFee: gasFee,
		});
		
		await newTransaction.calculateHash();
		await newTransaction.sign();
		await newTransaction.verifyTransaction();
		await newTransaction.processTransaction(this.mempool);
	}

	getBlock(blockHash) {
		const foundBlock = this.blockchain.chain.
			find(block => block.hash === blockHash);
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
	
	
	getBalance(input) {
		console.log(input)
		if (input instanceof Wallet) {
    			return input.checkWalletBalance(input.publicKey);
  		} else if (typeof input === 'string') {
    			const wallet = this.wallets.
    				find((wallet) => wallet.publicKey === input);
    			if (wallet) {
      				return wallet.checkWalletBalance(wallet.publicKey);
   				} else {
      				throw new Error('Wallet not found');
    			}
  		} else {
    			throw new Error('Invalid input');
  		}
	}

	getChain() {
		return this.blockchain.chain;
	}

	async addBlock(wallet) {
		console.log("Wallet from the controller", wallet)
		const mem = this.mempool.mempoolArr
		const miningFromMem = await this.blockchain.addBlock( mem, wallet );
		return miningFromMem;
	}

	queryMempool() {
		return this.mempool.printMempool();
	}

	getLatestBlock() {
		const lastBlock = this.blockchain.
			chain[this.blockchain.chain.length - 1];
		return lastBlock;
	}
}
module.exports = Controller;
