const UserToken = require("../models/UserToken.js")
const jwt = require("jsonwebtoken");

const verifyRefreshToken = (refreshToken) => {
	const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;
	return new Promise(async (resolve, reject) => {
		const doc = await UserToken.findOne({ token: refreshToken });
		if (!doc)
		return reject({ error: true, message: "Invalid refresh token" });
		const uid = doc.userId
		jwt.verify(refreshToken, privateKey, (err, tokenDetails) => {
			if (err)
				return reject({ error: true, message: "Invalid refresh token" });
			resolve({
				tokenDetails,
				uid,
				error: false,
				message: "Valid refresh token",
			});
		});
	});
};

module.exports = verifyRefreshToken;
