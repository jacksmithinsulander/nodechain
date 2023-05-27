const Hash = require("./Hash");
const GENESIS_DATA = require("./genesisBlock");

const hashInstance = new Hash();

class Block {
	constructor({ timestamp, data, nonce, hash, lastHash }) {
		this.timestamp = timestamp;
		this.data = data;
		this.nonce = nonce;
		this.hash = hash;
		this.lastHash = lastHash;
	}

	static genesis() {
		return new this(GENESIS_DATA);
	}

	static async mineBlock({ lastBlock, data }) {
		const timestamp = Date.now();
		const lastHash = lastBlock.hash;
		let nonce = lastBlock.nonce + 1;
		let hash = await hashInstance.generateHash(timestamp, lastHash, data, nonce);

		const minedBlock = new this({
			timestamp,
			lastHash,
			nonce,
			data,
			hash,
		});

		console.log("Mined Block:", minedBlock);
		return minedBlock;
	}
}

module.exports = Block;