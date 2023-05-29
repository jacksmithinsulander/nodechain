const Wallet = require('./models/Wallet');
const Transaction = require('./models/Transaction');
const Balance = require('./models/Balance');

async function main() {
  // Create wallets
  const wallet1 = new Wallet();
  const wallet2 = new Wallet();

  await console.log("Wallet 1 : ", wallet1.publicKey, " balance:", wallet1.balance.checkWalletBalance(wallet1.publicKey));
  await console.log("Wallet 2 : ", wallet2.publicKey, " balance:", wallet2.balance.checkWalletBalance(wallet2.publicKey));

  // Create a new transaction from wallet1 to wallet2
  const transaction1 = new Transaction({
    sender: wallet1.publicKey,
    recipient: wallet2.publicKey,
    amount: 5,
    signature: null,
    hash: null,
    senderBalance: wallet1.balance,
    recipientBalance: wallet2.balance
  });

  // Calculate the transaction hash
  await transaction1.calculateHash();

  // Sign the transaction
  transaction1.sign();

  // Verify the transaction
  const isTransaction1Valid = transaction1.verifyTransaction();
  console.log("Transaction 1 is valid:", isTransaction1Valid);

  // Access the transaction properties
  console.log("Amount sent from wallet 1 to wallet 2 :", transaction1.amount);
  console.log("Transaction signature :", transaction1.signature);
  console.log("Transaction hash :", transaction1.hash);

  transaction1.processTransaction(wallet1, wallet2);

  // Log the updated balances  
  await console.log("Wallet 1 : ", wallet1.publicKey,  "new balance:", wallet1.balance.checkWalletBalance(wallet1.publicKey));
  await console.log("Wallet 2 : ", wallet2.publicKey, " new  balance:", wallet2.balance.checkWalletBalance(wallet2.publicKey));
}

main();