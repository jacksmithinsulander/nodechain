const nacl = require('tweetnacl');
const naclUtil = require('tweetnacl-util');

class Wallet {
	constructor(initialBalance = 10) {
		this.keyPair = nacl.sign.keyPair();
		this.publicKey = naclUtil.encodeBase64(this.keyPair.publicKey);
		this.balance = initialBalance;
	}

	signTransaction(transaction) {
		const messageBytes = naclUtil.decodeUTF8(JSON.stringify(transaction));
		const signatureBytes = nacl.sign.detached(messageBytes, this.keyPair.secretKey);
		const signature = naclUtil.encodeBase64(signatureBytes);
		return signature;
	}

	verifySignature(transaction, signature, publicKey) {
		const messageBytes = naclUtil.decodeUTF8(JSON.stringify(transaction));
		const publicKeyBytes = naclUtil.decodeBase64(publicKey);
		const signatureBytes = naclUtil.decodeBase64(signature);
		return nacl.sign.detached.verify(messageBytes, signatureBytes, publicKeyBytes);
	}

	updateBalance(newBal) {
		this.balance = newBal;
	}

	checkWalletBalance() {
		return this.balance
	}
}

module.exports = Wallet;