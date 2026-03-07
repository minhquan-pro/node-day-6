const isProduction = require("@/utils/isProduction");

const errorHandle = (err, req, res, _) => {
	if (isProduction()) {
		res.error("Server error.");
	}

	res.error(err ?? "Server Error");
};

module.exports = errorHandle;
