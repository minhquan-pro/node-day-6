const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authModel = require("@/models/auth.model");
const authConfig = require("@/config/auth");
const randomString = require("@/utils/randomString");
const saltRounds = 10;

class AuthService {
	async handleRegister(email, password, userAgent) {
		const hash = await bcrypt.hash(password, saltRounds);
		const result = await authModel.register(email, hash);

		const user = { id: result.insertId };
		const userTokens = await this.generateUserToken(user, userAgent);

		return [null, userTokens];
	}

	async handleLogin(email, password) {
		const user = await authModel.findUserByEmail(email);
		if (!user) {
			return [true, null];
		}

		const isValid = await bcrypt.compare(password, user.password);
		if (!isValid) {
			return [true, null];
		}

		const userTokens = await this.generateUserToken(user, userAgent);
		return [null, userTokens];
	}

	async generateAccessToken(user) {
		const expireAt = Math.floor(Date.now() / 1000 + authConfig.accessTokenTTL);
		const token = jwt.sign(
			{
				sub: user.id,
				exp: expireAt,
			},
			authConfig.jwtSecret,
		);

		return token;
	}

	async generateRefreshToken(user, userAgent) {
		let token, existed;

		do {
			token = randomString();
			const isExists = await authModel.isTokenExists(token);
			existed = isExists;
		} while (existed);

		const expiresAt = new Date();
		expiresAt.setDate(expiresAt.getDate() + authConfig.refreshTokenTTL);

		await authModel.refreshToken(token, user, userAgent, expiresAt);

		return token;
	}

	async handleRefreshToken(token, userAgent) {
		const refreshToken = await authModel.handleRefreshToken(token);

		if (!refreshToken) {
			return [true, null];
		}

		const user = { id: refreshToken.userId };
		const userTokens = await this.generateUserToken(user, userAgent);

		await authModel.updatedRefreshToken(refreshToken);

		return [null, userTokens];
	}

	async generateUserToken(user, userAgent) {
		const accessToken = await this.generateAccessToken(user);
		const refreshToken = await this.generateRefreshToken(user, userAgent);
		const accessTokenTtl = Math.floor(Date.now() / 1000 + authConfig.accessTokenTTL);

		return {
			accessToken,
			refreshToken,
			accessTokenTtl,
		};
	}
}

module.exports = new AuthService();
