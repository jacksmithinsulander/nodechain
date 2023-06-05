const Controller = require('./../models/Controller');

async function testController() {
  const controller = new Controller();

  // Create 10 wallets
  const wallets = [];
  for (let i = 0; i < 50; i++) {
    const wallet = await controller.createWallet();
    wallets.push(wallet);
  }

  // Send random transactions between wallets
for (let i = 0; i < 10; i++) {
  const sender = wallets[Math.floor(Math.random() * wallets.length)];
  let recipient = wallets[Math.floor(Math.random() * wallets.length)];
  while (recipient === sender) {
    recipient = wallets[Math.floor(Math.random() * wallets.length)];
  }
  const amount = Math.floor(Math.random() * 5) + 1;
  const gasFee = Math.floor(Math.random() * 3) + 1;
  console.log("Sending:", amount, "Gasfee:", gasFee);

  await controller.transaction(sender, recipient.publicKey, amount, gasFee);
}

  //console.log("Mempool: ", controller.queryMempool())

  // Mine blocks
  for (let i = 0; i < 1; i++) {
    const minerWallet = wallets[Math.floor(Math.random() * wallets.length)];
    await controller.addBlock(minerWallet);
  }

  // Get the latest block
  const latestBlock = controller.getLatestBlock();
  console.log('Latest Block:', latestBlock);

  const fullChain = controller.getChain();
  console.log("Full Chain:", fullChain)

  const blockHash1 = fullChain[1].hash
  //const blockHash2 = fullChain[2].hash
  //const blockHash3 = fullChain[3].hash
//
  const block1 = controller.getBlock(blockHash1);
  console.log("Block 1 is :", block1);

  console.log("Data: ", block1.data)
//
  //const block2 = controller.getBlock(blockHash2);
  //console.log("Block 2 is :", block2);
//
  //const block3 = controller.getBlock(blockHash3);
  //console.log("Block 3 is :", block3);
//
  //// Query the mempool
  //console.log('Mempool:');
  //console.log(controller.queryMempool());
//
  //const transactionToFind = block1.data[4].hash;
//
  //console.log("Transaction to find: ", transactionToFind);
//
  //console.log(controller.getTransaction(transactionToFind));
  console.log("Wallet Balances:");
  for (const wallet of wallets) {
    const balanceKey = controller.getBalance(wallet.publicKey);
    const balanceClass = controller.getBalance(wallet);
    //console.log(wallet)
    //console.log(wallet.publicKey, "Using key Balance:", balanceKey);
    //console.log(wallet.publicKey, "Using class Balance:", balanceClass)
  }
}


testController();
