const Wallet = require("./models/Wallet");

const wallet = new Wallet();

console.log('Generated public key:', wallet.publicKey);

const transaction = {
	from: 'Alice',
	to: 'Bob',
	amount: 10
};

const signature = wallet.signTransaction(transaction);
console.log('Transaction signature:', signature);

const isValid = wallet.verifySignature(transaction, signature, wallet.publicKey);
console.log('Is signature valid?', isValid);