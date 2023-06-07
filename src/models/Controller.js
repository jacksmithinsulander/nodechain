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
        return wallet;
    }

    async transaction(sender, recipientPublicKey, amount, gasFee) {
        const senderInstance = this.wallets.
        find((wallet) => wallet.publicKey === sender.publicKey);
        const senderBalance = senderInstance.checkWalletBalance();
        const recipient = this.wallets.
        find((wallet) => wallet.publicKey === recipientPublicKey);
        const recipientBalance = recipient.checkWalletBalance(
            recipient.publicKey);

        const newTransaction = await new Transaction({
            sender: senderInstance,
            recipient: recipient,
            amount: amount,
            signature: null,
            hash: null,
            gasFee: gasFee,
        });

        await newTransaction.calculateHash();
        await newTransaction.sign();
        await newTransaction.verifyTransaction();
        await newTransaction.processTransaction(this.mempool);
    }

    findTransactionBySender(sender) {
        const transactions = []

        for (const obj of this.blockchain.chain) {
            for (const data of obj.data) {
                if (data.sender.publicKey === sender) {
                    transactions.push(data);
                }
            }
        }

        const mem = this.mempool.printMempool()

        for (const transaction of mem) {
            if (transaction.sender.publicKey === sender) {
                transactions.push(transaction);
            }
        }

        return transactions;
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
        let mempoolIsEmpty = false;

        while (true) {
            if (mempoolIsEmpty) {
                await new Promise(resolve => setTimeout(resolve, 1000));

                if (this.mempool.mempoolArr.length > 0) {
                    mempoolIsEmpty = false;
                } else {
                    mempoolIsEmpty = true;
                }
            } else {
                const mem = this.mempool.mempoolArr;
                await this.blockchain.addBlock(mem, wallet);

                if (this.mempool.mempoolArr.length === 0) {
                    mempoolIsEmpty = true;
                }
            }
        }
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