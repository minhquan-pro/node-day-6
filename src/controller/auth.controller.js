const authService = require("@/services/auth.service");

const register = async (req, res) => {
	const { email, password } = req.body;
	const userAgent = req.headers["user-agent"];

	const [error, data] = await authService.handleRegister(email, password, userAgent);
	if (error) {
		res.error(error);
		return;
	}

	res.success(data);
};

const login = async (req, res) => {
	const { email, password } = req.body;
	const [error, data] = await authService.handleLogin(email, password);

	if (error) {
		res.error(error);
		return;
	}

	res.success(data);
};

const refreshToken = async (req, res) => {
	const [error, data] = await authService.handleRefreshToken(req.body.refresh_token, req.headers["user-agent"]);

	if (error) {
		return res.unauthorized();
	}

	res.success(data);
};

module.exports = { register, login, refreshToken };
