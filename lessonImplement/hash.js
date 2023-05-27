const crypto = require("crypto");

const createHash = (...args) => {
	const hash = crypto.createHash("sha256");
	hash.update(args.sort().join(' '));
	return hash.digest("hex");
}

module.exports = createHash
