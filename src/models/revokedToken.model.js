const pool = require("@/config/database");

class RevokedToken {
	async addTokenToBlacklist(token, expiresAt) {
		const query = `insert into revoked_tokens (token, expires_at) values (?, ?)`;
		const [rows] = await pool.query(query, [token, expiresAt]);
		return rows;
	}

	async isTokenRevoked(token) {
		const query = "select count(*) as count from revoked_tokens where token = ?";
		const [rows] = await pool.query(query, [token]);
		return rows[0].count > 0;
	}
}

module.exports = new RevokedToken();
