const authService = require("@/services/auth.service");

const register = async (req, res) => {
	const { email, password } = req.body;
	const userAgent = req.headers["user-agent"];

	const result = await authService.handleRegister(email, password, userAgent);
	res.success(result);
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

const refreshToken = () => {};

module.exports = { register, login, refreshToken };
