const crypto = require("node:crypto");

const randomString = (sizes = 32) => {
	return crypto.randomBytes(sizes).toString("hex");
};

module.exports = randomString;
