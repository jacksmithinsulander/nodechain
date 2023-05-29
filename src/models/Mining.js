class Mining {
	constructor() {
		this.miningWords = ["lfg", "ngmi", "wagmi", "420", "666", "1337"];
	}

	sortingAlgo(a, b) {
		const valueA = a.gasFee;
		const valueB = b.gasFee;
		if (valueA < valueB) {
			return 1;
		}
		if (valueA > valueB) {
			return -1;
		}
		return 0;
	}

	async chooseTransaction(mempool, lastHash) {
		const mempoolArr = mempool.printMempool();
		mempoolArr.sort(this.sortingAlgo);
		const data = mempoolArr.slice(0, 5);
		let conditionMet = false;
		let hash;
		while (!conditionMet) {
			for (let i = 0; i < this.miningWords.length; i++) {
				const pattern = new RegExp(this.miningWords[i], "i");
				let timestamp = Date.now();
				let nonce = Math.floor(Math.random() * 100) + 1;
				hash = await hashInstance.
					generateHash(timestamp, lastHash, data, nonce);
				if (pattern.test(hash)) {
					conditionMet = true;
					break;
				}
			}
		}
		return hash;
	}
}

module.exports = Mining;