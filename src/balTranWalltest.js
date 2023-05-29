const Wallet = require("./models/Wallet");
const Transaction = require("./models/Transaction");
const Balance = require("./models/Balance");

// Generate wallets
const wallet1 = new Wallet();
const wallet2 = new Wallet();
const wallet3 = new Wallet();

// Create balance instance
const balanceInstance = new Balance();

// Set initial balances
balanceInstance.updateBalance(wallet1.publicKey, 10);
balanceInstance.updateBalance(wallet2.publicKey, 5);
balanceInstance.updateBalance(wallet3.publicKey, 3);

// Print initial balances
console.log("Initial Balances:");
console.log(wallet1.publicKey, balanceInstance.checkWalletBalance(wallet1.publicKey));
console.log(wallet2.publicKey, balanceInstance.checkWalletBalance(wallet2.publicKey));
console.log(wallet3.publicKey, balanceInstance.checkWalletBalance(wallet3.publicKey));
console.log("----------------------");

// Create transactions
const transaction1 = new Transaction({
  sender: wallet1.publicKey,
  recipient: wallet2.publicKey,
  amount: 5
});
transaction1.calculateHash();
transaction1.sign();
transaction1.processTransaction();

const transaction2 = new Transaction({
  sender: wallet2.publicKey,
  recipient: wallet3.publicKey,
  amount: 2
});
transaction2.calculateHash();
transaction2.sign();
transaction2.processTransaction();

// Print updated balances
console.log("Updated Balances:");
console.log(wallet1.publicKey, balanceInstance.checkWalletBalance(wallet1.publicKey));
console.log(wallet2.publicKey, balanceInstance.checkWalletBalance(wallet2.publicKey));
console.log(wallet3.publicKey, balanceInstance.checkWalletBalance(wallet3.publicKey));