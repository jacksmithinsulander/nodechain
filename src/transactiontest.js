const Transaction = require('./models/Transaction');

async function main() {
  // Create a new transaction
  const transaction1 = new Transaction({
    sender: "senderAddress1",
    recipient: "recipientAddress1",
    amount: 10,
    signature: null,
    hash: null
  });

  // Calculate the transaction hash
  await transaction1.calculateHash();

  // Sign the transaction
  transaction1.sign();

  // Verify the transaction
  const isTransaction1Valid = transaction1.verifyTransaction();
  console.log("Transaction 1 is valid:", isTransaction1Valid);

  // Access the transaction properties
  console.log(transaction1.sender);
  console.log(transaction1.recipient);
  console.log(transaction1.amount);
  console.log(transaction1.signature);
  console.log(transaction1.hash);

  // Create a second transaction with invalid signature
  const transaction2 = new Transaction({
    sender: "senderAddress2",
    recipient: "recipientAddress2",
    amount: 20,
    signature: "invalidSignature",
    hash: "transactionHash2"
  });

  // Verify the second transaction (with invalid signature)
  try {
    const isTransaction2Valid = transaction2.verifyTransaction();
    console.log("Transaction 2 is valid:", isTransaction2Valid);
  } catch (error) {
    console.log("Transaction 2 verification failed:", error.message);
  }

  // Access the transaction properties
  console.log(transaction2.sender);
  console.log(transaction2.recipient);
  console.log(transaction2.amount);
  console.log(transaction2.signature);
  console.log(transaction2.hash);
}

main();