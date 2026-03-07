const express = require("express");
const router = express.Router();
const fs = require("fs");

const postFix = ".route.js";
fs.readdirSync(__dirname)
	.filter((fileName) => fileName.endsWith(postFix))
	.forEach((fileName) => {
		const resource = fileName.replace(postFix, "");
		router.use(`/${resource}`, require(`./${fileName}`));
	});

module.exports = router;
