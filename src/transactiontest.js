const Transaction = require('./models/Transaction');
//const Wallet = require('./models/Wallet');

async function main() {
  // Create a new transaction
  const transaction = new Transaction({
    sender: "senderAddress",
    recipient: "recipientAddress",
    amount: 10,
    signature: null,
    hash: null
  });

  // Calculate the transaction hash
  await transaction.calculateHash();

  // Sign the transaction
  transaction.sign();

  // Verify the transaction
  transaction.verifyTransaction();

  // Access the transaction properties
  console.log(transaction.sender);
  console.log(transaction.recipient);
  console.log(transaction.amount);
  console.log(transaction.signature);
  console.log(transaction.hash);
}

main();