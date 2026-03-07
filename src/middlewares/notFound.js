const { httpCodes } = require("@/config/constants");

const notFound = (req, res) => {
	res.error(`Cannot ${req.method} ${req.originalUrl}`, httpCodes.notFound);
};

module.exports = notFound;
