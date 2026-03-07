const pool = require("@/config/database");

class AuthModel {
	async register(email, password) {
		const query = "insert into users (email, password) values (?, ?)";
		const [rows] = await pool.query(query, [email, password]);
		return rows;
	}

	async findUserByEmail(email) {
		const query = "select * from users where email = ?";
		const [rows] = await pool.query(query, [email]);
		return rows[0];
	}

	async isTokenExists(token) {
		const [rows] = await pool.query("select count(*) as count from refresh_token where token = ?", [token]);
		return rows[0].count > 0;
	}

	async refreshToken(token, user, userAgent, expiresAt) {
		const [rows] = await pool.query(
			"insert into refresh_token (token, userId, userAgent, expires_at) values (?, ?, ?, ?)",
			[token, user.id, userAgent, expiresAt],
		);
		return rows;
	}
}

module.exports = new AuthModel();
