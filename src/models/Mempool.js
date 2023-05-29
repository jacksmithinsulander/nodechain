class Mempool {
	constructor() {
		this.mempoolArr = [];
	}

	addToMempool(...transactions) {
		this.mempoolArr.push(...transactions);
	}

	removeFromMempool(transactionHash) {
		const index = this.mempoolArr.findIndex(
			transaction => transaction.hash === transactionHash
		);
		if (index !== -1) {
			this.mempoolArr.splice(index, 1);
		}
		console.log(this.mempoolArr);
	}

	printMempool() {
		console.log(this.mempoolArr);
		return this.mempoolArr;
	}
}