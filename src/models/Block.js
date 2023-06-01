const Mining = require("./Mining");
const GENESIS_DATA = require("./genesisBlock");

const mining = new Mining();

class Block {
	constructor({ 
		timestamp, data, nonce, index, hash, 
		lastHash, signature, miner, miningReward
	}) {
		this.timestamp = timestamp;
		this.data = data;
		this.nonce = nonce;
		this.index = index;
		this.hash = hash;
		this.lastHash = lastHash;
		this.signature = signature;
		this.miner = miner;
		this.miningReward = miningReward;
	}
	
	static genesis() {
		return new this(GENESIS_DATA);
	}

	static async mineBlock( lastBlock, mempool, wallet ) {
		const lastHash = lastBlock.hash;
		//console.log("Miner Wallet, logged from block.js: ", wallet)
		let index = lastBlock.index + 1;
		//console.log("From Block: ", mempool)

		const minedBlock = await mining
			.chooseTransaction(wallet, mempool, lastHash, index)
			.then(returnData => {
				const hash = returnData.hash;
				const timestamp = returnData.timestamp;
				const nonce = returnData.nonce;
				const data = returnData.data;
				const signature = returnData.signature;
				const miner = returnData.miner;
				const miningReward = returnData.miningReward;

				return new this({
					timestamp,
					lastHash,
					nonce,
					index,
					data,
					hash,
					signature,
					miner,
					miningReward,
				});
			});

		//console.log("Mined Block:", minedBlock);
		return minedBlock;
	}
}

module.exports = Block;
