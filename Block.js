const crypto = require("./hash");
const GENESIS_DATA = require(".genesisBlock");

class Block {
	constructor({timestam, data, nonce, hash, lastHash }) {
		this.timestamp = timestamp;
		this.data = data;
		this.nonce = nonce;
		this.hash = hash;
		this.lastHash = lastHash;
	}

	static genesis() {
		return new this(GENESIS_DATA);
	}
	
	static mineBlock({lastBlock, data}) {
		const timestamp = Date.now();
		const lastHash = lastBlock.hash;
		const nonce = lastBlock.nonce++;
		return new this({
			timestamp,
			lastHash,
			nonce,
			data,
			hash: crypto(timestamp, lastHash, data, nonce),
		});
	}
}

module.exports = Block;
