const { httpCodes } = require("@/config/constants");

const responseFormat = (_, res, next) => {
	res.success = (data, status = httpCodes.ok) => {
		res.status(status).json({
			status: "success",
			data,
		});
	};

	res.error = (error, status = httpCodes.internalServerError) => {
		res.status(status).json({
			status: "error",
			error,
		});
	};

	res.notFound = () => {
		res.error("Resource not Found", httpCodes.notFound);
	};

	res.unauthorized = () => {
		res.error("Unauthorized", httpCodes.unauthorized);
	};

	next();
};

module.exports = responseFormat;
