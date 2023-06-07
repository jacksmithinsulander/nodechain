const Hash = require("./Hash");

const hashInstance = new Hash();

class Mining {
    constructor() {
        this.miningWords = [
            "lfg", "ngmi", "wagmi", "rug", "pump",
            "dump", "420", "666", "1337", "69",
            "pepe", "doge", "elon", "moon",
            "lambo", "wojak", "ponzi"
        ];
        this.previousNonce = 0;
    }

    sortingAlgo(a, b) {
        const valueA = a.gasFee;
        const valueB = b.gasFee;
        if (valueA < valueB) {
            return 1;
        }
        if (valueA > valueB) {
            return -1;
        }
        return 0;
    }

    async chooseTransaction(wallet, mempool, lastHash, index) {
        if (!wallet) {
            throw new Error("No wallet found");
        }

        const mempoolArr = await mempool;
        mempoolArr.sort(this.sortingAlgo);
        const data = mempoolArr.slice(0, 5);

        for (const transaction of data) {
            const index = mempoolArr.indexOf(transaction);
            if (index > -1) {
                mempool.splice(index, 1);
            }
        }

        let conditionMet = false;
        let hash, timestamp, nonce, usedWord;
        let iteration = 1;
        let totalGasFee = 0;

        for (const transaction of data) {
            totalGasFee += transaction.gasFee;
        }

        while (!conditionMet) {
            for (let i = 0; i < this.miningWords.length; i++) {
                const pattern = new RegExp(this.miningWords[i], "i");
                timestamp = Date.now();
                nonce = this.previousNonce + ((iteration - 1) % 3) + 1;
                usedWord = this.miningWords[i];
                hash = await hashInstance.generateHash(timestamp, lastHash,
                    nonce, index, data);
                console.log("Iteration: ", iteration);
                console.log("Tested Hash: ", hash);
                if (pattern.test(hash)) {
                    conditionMet = true;
                    break;
                }
            }
            iteration++;
        }

        this.previousNonce = nonce + 1;

        console.log("Used word is", usedWord)
        const miningReward = parseFloat((usedWord.length - 1) + (
            totalGasFee *
            0.1));
        const returnData = {
            hash: hash,
            timestamp: timestamp,
            nonce: nonce,
            data: data,
            miner: wallet.publicKey,
            miningReward: miningReward,
        };

        const signature = wallet.signTransaction(returnData);
        const isValidSignature = wallet.verifySignature(returnData,
            signature,
            wallet.publicKey);
        if (!isValidSignature) {
            throw new Error("Invalid signature");
        }

        for (const transaction of data) {
            const sender = transaction.sender;
            const recipient = transaction.recipient;
            const senderBalance = parseInt(sender.checkWalletBalance(sender
                .publicKey));
            const recipientBalance = parseInt(recipient.checkWalletBalance(
                recipient.publicKey));

            const amount = parseInt(transaction.amount);
            const gasFee = parseInt(transaction.gasFee);

            const newSenderBalance = parseInt(senderBalance - amount -
                gasFee);
            const newRecipientBalance = parseInt(recipientBalance + amount);

            sender.updateBalance(sender.publicKey, newSenderBalance);
            recipient.updateBalance(recipient.publicKey,
                newRecipientBalance);
        }

        const walletBal = parseFloat(wallet.checkWalletBalance(wallet
            .publicKey));
        const newWalletBal = parseFloat(walletBal + miningReward);

        wallet.updateBalance(wallet.publicKey, newWalletBal);

        returnData.signature = signature;

        return returnData;
    }
}

module.exports = Mining;