const Wallet = require('./models/Wallet');
const Transaction = require('./models/Transaction');
const Balance = require('./models/Balance');
const Mempool = require('./models/Mempool');

async function main() {
  
  const mempool = new Mempool();
  // Create wallets
  const wallet1 = new Wallet();
  const wallet2 = new Wallet();
  const wallet3 = new Wallet();
  const wallet4 = new Wallet();

  await console.log("Wallet 1 : ", wallet1.publicKey, " balance:", wallet1.balance.checkWalletBalance(wallet1.publicKey));
  await console.log("Wallet 2 : ", wallet2.publicKey, " balance:", wallet2.balance.checkWalletBalance(wallet2.publicKey));
  await console.log("Wallet 3 : ", wallet3.publicKey, " balance:", wallet3.balance.checkWalletBalance(wallet3.publicKey));
  await console.log("Wallet 4 : ", wallet4.publicKey, " balance:", wallet4.balance.checkWalletBalance(wallet4.publicKey));

  // Create a new transaction from wallet1 to wallet2
  const transaction1 = new Transaction({
    sender: wallet1.publicKey,
    recipient: wallet2.publicKey,
    amount: 5,
    signature: null,
    hash: null,
    senderBalance: wallet1.balance,
    recipientBalance: wallet2.balance,
    gasFee: 1,
  });

  // Calculate the transaction hash
  await transaction1.calculateHash();

  // Sign the transaction
  transaction1.sign();

  // Verify the transaction
  const isTransaction1Valid = transaction1.verifyTransaction();
  console.log("Transaction 1. is valid:", isTransaction1Valid);

  // Access the transaction properties
  console.log("Transaction 1. Amount sent from wallet 1 to wallet 2 :", transaction1.amount);
  console.log("Transaction 1. signature :", transaction1.signature);
  console.log("Transaction 1.  hash :", transaction1.hash);

  transaction1.processTransaction(mempool);

  // Log the updated balances  
  await console.log("Wallet 1 : ", wallet1.publicKey,  " new balance:", wallet1.balance.checkWalletBalance(wallet1.publicKey));
  await console.log("Wallet 2 : ", wallet2.publicKey, " new  balance:", wallet2.balance.checkWalletBalance(wallet2.publicKey));
  await console.log("Wallet 3 : ", wallet3.publicKey, " new balance:", wallet3.balance.checkWalletBalance(wallet3.publicKey));
  await console.log("Wallet 4 : ", wallet4.publicKey, " new balance:", wallet4.balance.checkWalletBalance(wallet4.publicKey));

  // Create a new transaction from wallet2 to wallet4
  const transaction2 = new Transaction({
    sender: wallet2.publicKey,
    recipient: wallet4.publicKey,
    amount: 7,
    signature: null,
    hash: null,
    senderBalance: wallet2.balance,
    recipientBalance: wallet4.balance,
    gasFee: 2,
  });

  // Calculate the transaction hash
  await transaction2.calculateHash();

  // Sign the transaction
  transaction2.sign();

  // Verify the transaction
  const isTransaction2Valid = transaction2.verifyTransaction();
  console.log("Transaction 2. is valid:", isTransaction2Valid);

  // Access the transaction properties
  console.log("Transaction 2. Amount sent from wallet 2 to wallet 4 :", transaction2.amount);
  console.log("Transaction 2. signature :", transaction2.signature);
  console.log("Transaction 2.  hash :", transaction2.hash);

  transaction2.processTransaction(mempool);

  // Log the updated balances  
  await console.log("Wallet 1 : ", wallet1.publicKey,  " new balance:", wallet1.balance.checkWalletBalance(wallet1.publicKey));
  await console.log("Wallet 2 : ", wallet2.publicKey, " new  balance:", wallet2.balance.checkWalletBalance(wallet2.publicKey));
  await console.log("Wallet 3 : ", wallet3.publicKey, " new balance:", wallet3.balance.checkWalletBalance(wallet3.publicKey));
  await console.log("Wallet 4 : ", wallet4.publicKey, " new balance:", wallet4.balance.checkWalletBalance(wallet4.publicKey));


  // Create a new transaction from wallet4 to wallet1
  const transaction3 = new Transaction({
    sender: wallet4.publicKey,
    recipient: wallet1.publicKey,
    amount: 3,
    signature: null,
    hash: null,
    senderBalance: wallet4.balance,
    recipientBalance: wallet1.balance,
    gasFee: 1,
  });

  // Calculate the transaction hash
  await transaction3.calculateHash();

  // Sign the transaction
  transaction3.sign();

  // Verify the transaction
  const isTransaction3Valid = transaction3.verifyTransaction();
  console.log("Transaction 3. is valid:", isTransaction3Valid);

  // Access the transaction properties
  console.log("Transaction 3. Amount sent from wallet 4 to wallet 1 :", transaction3.amount);
  console.log("Transaction 3. signature :", transaction3.signature);
  console.log("Transaction 3.  hash :", transaction3.hash);

  transaction3.processTransaction(mempool);

  // Log the updated balances  
  await console.log("Wallet 1 : ", wallet1.publicKey,  " new balance:", wallet1.balance.checkWalletBalance(wallet1.publicKey));
  await console.log("Wallet 2 : ", wallet2.publicKey, " new  balance:", wallet2.balance.checkWalletBalance(wallet2.publicKey));
  await console.log("Wallet 3 : ", wallet3.publicKey, " new balance:", wallet3.balance.checkWalletBalance(wallet3.publicKey));
  await console.log("Wallet 4 : ", wallet4.publicKey, " new balance:", wallet4.balance.checkWalletBalance(wallet4.publicKey));

  console.log("Mempool: ");
  console.log(mempool.printMempool());
}

main();