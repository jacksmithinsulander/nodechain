const Mining = require("./Mining");
const Hash = require("./Hash");
const GENESIS_DATA = require("./genesisBlock");

const hashInstance = new Hash();
const mining = new Mining();

class Block {
	constructor({ timestamp, data, nonce, index, hash, lastHash }) {
		this.timestamp = timestamp;
		this.data = data;
		this.nonce = nonce;
		this.index = index;
		this.hash = hash;
		this.lastHash = lastHash;
	}

	static genesis() {
		return new this(GENESIS_DATA);
	}

	static async mineBlock({ lastBlock, mempool }) {
		const lastHash = lastBlock.hash;
		let index = lastBlock.index + 1;

		const minedBlock = await mining
			.chooseTransaction(mempool, lastHash, index)
			.then(returnData => {
				const hash = returnData.hash;
				const timestamp = returnData.timestamp;
				const nonce = returnData.nonce;

				return new this({
					timestamp,
					lastHash,
					nonce,
					index,
					data,
					hash,
				});
			});

		console.log("Mined Block:", minedBlock);
		return minedBlock;
	}
}

module.exports = Block;

module.exports = Block;