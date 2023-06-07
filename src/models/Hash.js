const bcrypt = require("bcrypt");

class Hash {
    async generateHash(...args) {
        const hash = await bcrypt.hash(args.sort().join(' '), 10);
        return hash;
    }

    async verifyHash(a, b) {
        const hashMatch = await bcrypt.compare(a.sort().join(' '), b);
        return hashMatch;
    }
}

module.exports = Hash;