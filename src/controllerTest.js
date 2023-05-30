const Controller = require('./models/Controller');

async function testController() {
  const controller = new Controller();

  // Create 10 wallets
  const wallets = [];
  for (let i = 0; i < 10; i++) {
    const wallet = await controller.createWallet();
    wallets.push(wallet);
  }

  // Send random transactions between wallets
for (let i = 0; i < 15; i++) {
  const sender = wallets[Math.floor(Math.random() * wallets.length)];
  let recipient = wallets[Math.floor(Math.random() * wallets.length)];
  while (recipient === sender) {
    recipient = wallets[Math.floor(Math.random() * wallets.length)];
  }
  const amount = Math.floor(Math.random() * 6) + 1;
  const gasFee = Math.floor(Math.random() * 2) + 1;
  console.log("Sending:", amount, "Gasfee:", gasFee);

  await controller.transaction(sender, recipient, amount, gasFee);
}

  console.log(controller.queryMempool())

  // Mine blocks
  for (let i = 0; i < 3; i++) {
    await controller.addBlock();
  }

  // Get the latest block
  const latestBlock = controller.getLatestBlock();
  console.log('Latest Block:', latestBlock);

  // Query the mempool
  console.log('Mempool:');
  controller.queryMempool();
}

testController();
