const openpgp = require("openpgp");

class Wallet {
	async generateKeyPair(userName, password) {
		const { privateKey, publicKey, revocationCertificate } = await openpgp.
			generateKey({
				type: "ecc",
				curve: "curve25519",
				userIDs: [{ name: userName }],
				passphrase: password,
				format: "armored"
			});
		console.log(privateKey);
		console.log(publicKey);
		console.log(revocationCertificate);
	}

	async signTransaction() {
	
	}

	async verifySignature() {
	
	}
}

module.exports = Wallet;
