const Blockchain = require("./models/Blockchain");

const blockchain = new Blockchain();

async function testBlockchain() {
  // Add blocks to the blockchain
  await blockchain.addBlock({ data: "Block 1" });
  await blockchain.addBlock({ data: "Block 2" });
  await blockchain.addBlock({ data: "Block 3" });

  // Print the blockchain
  console.log("Blockchain:", blockchain.chain);

  // Validate the blockchain
  const isValid = await Blockchain.isValid(blockchain.chain);
  console.log("Is Blockchain Valid?", isValid);

  // Modify the blockchain to test replaceChain method
  const newChain = [...blockchain.chain];
  newChain[1].data = "Modified Block";
  await blockchain.replaceChain(newChain);

  // Print the modified blockchain
  console.log("Modified Blockchain:", blockchain.chain);

  // Validate the modified blockchain
  const isModifiedValid = await Blockchain.isValid(blockchain.chain);
  console.log("Is Modified Blockchain Valid?", isModifiedValid);
}

testBlockchain();