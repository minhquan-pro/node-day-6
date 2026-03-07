function isProduction() {
	return process.env.NODE.ENV === "production";
}

module.exports = isProduction;
