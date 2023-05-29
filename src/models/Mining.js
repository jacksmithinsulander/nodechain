class Mining {
	constructor() {
		this.miningWords = [
			"lfg", "ngmi", "wagmi", "420", "666", "1337"
		]:
	}

	const sortingAlgo = (a, b) = {
		const valueA = a.gasFee;
		const valueB = b.gasFee;
		if (valueA < valueB) {
			return 1;
		}
		if (valueA > valueB) {
			return -1;
		}
		return 0
	}

	chooseTransaction(mempool) {
		const mempoolArr = mempool.printMempool();
		mempoolArr.sort(sortingAlgo);
		const choosenTransactions = mempoolArr.slice(0, 5);

	}
}

module.exports = Mining;
