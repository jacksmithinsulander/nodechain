const Blockchain = require("./models/Blockchain");

const blockchain = new Blockchain();

async function mineBlocks() {
  for (let i = 0; i < 10; i++) {
    let testData = "test number " + i.toString();
    await blockchain.addBlock({ data: testData });
  }
}

mineBlocks();