const Hash = require("./Hash");

const hashInstance = new Hash();

class Mining {
	constructor() {
		this.miningWords = [
			"lfg", "ngmi", "wagmi", "rug", "pump", 
			"dump", "420", "666", "1337", "69",
			"pepe", "doge", "elon", "moon",
			"lambo", "wojak", "ponzi"
		];
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

	async chooseTransaction(mempool, lastHash, index) {
		const mempoolArr = await mempool;
		
		console.log(
			"Mempool : ", mempool, "Last Hash : ", 
			lastHash, "Index : ", index );
		mempoolArr.sort(this.sortingAlgo);
		const data = mempoolArr.slice(0, 5);
		let conditionMet = false;
		let hash, timestamp, nonce;
		let iteration = 1;
		while (!conditionMet) {
			for (let i = 0; i < this.miningWords.length; i++) {
				const pattern = new RegExp(this.miningWords[i], "i");
				 timestamp = Date.now();
				nonce = Math.floor(Math.random() * 100) + 1;
				hash = await hashInstance.
					generateHash(timestamp, lastHash, nonce, index, data);
				console.log("Iteration: ", iteration);
				console.log("Tested Hash: ", hash);
				if (pattern.test(hash)) {
					conditionMet = true;
					break;
				}
			}
			iteration++;
		}
		const returnData = {
			hash: hash,
			timestamp: timestamp,
			nonce: nonce,
			data: data
		}
		
		return returnData;
	}
}

module.exports = Mining;