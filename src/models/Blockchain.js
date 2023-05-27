const Block = require("./Block");
const crypto = require("./hash");

class Blockchain {
	constructor() {
		this.chain = [Block.genesis()];
	}

	async addBlock({ data }) {
		const lastBlock = this.chain[this.chain.length - 1];
		const addedBlock = await Block.mineBlock({ lastBlock, data });
		this.chain.push(addedBlock);
		return addedBlock;
	}

	replaceChain(chain) {
		if (chain.length <= this.chain.length) return;
		if (!Blockchain.isValid(chain)) return;
		this.chain = chain;
	}

	static isValid(chain) {
		if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
			return false;
		}

		for (let i = 1; i < chain.length; i++) {
			const { timestamp, data, nonce, hash, lastHash } = chain[i];
			const prevHash = chain[i - 1].hash;
			if (lastHash !== prevHash) return false;
			const validHash = crypto(timestamp, lastHash, data, nonce);
			if (hash !== validHash) return false;
		}
		return true;
	}
}

module.exports = Blockchain;
