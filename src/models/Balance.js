class Balance {
	constructor() {
		this.balances = new Map();
	}

	updateBalance(walletAddr, newBal) {
		this.balances.set(walletAddr, newBal);
	}

	checkWalletBalance(walletAddr) {
		return this.balances.get(walletAddr);
	}
}

module.exports = Balance;