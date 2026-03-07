require("dotenv").config();
require("module-alias/register");
require("@/config/database");

const rootRoute = require("@/routes");
const responseFormat = require("@/middlewares/responseFormat");
const notFound = require("@/middlewares/notFound");
const errorHandler = require("@/middlewares/errorHandle");

const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(responseFormat);

app.use("/api", rootRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
