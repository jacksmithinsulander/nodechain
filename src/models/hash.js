const bcrypt = require("bcrypt");

const createHash = async (...args) => {
	const hash = await bcrypt.hash(args.sort().join(' '), 10)
	console.log({
		args,
		hash
	});
};

module.exports = createHash;
