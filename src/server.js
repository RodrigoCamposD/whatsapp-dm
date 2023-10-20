const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const apiRoutes = require("./routes/apiRoutes");

const server = express();
server.use(helmet());
if (process.env.ORIGIN) server.use(cors({ origin: process.env.ORIGIN }));
server.use(express.json({ limit: "10kb" }));
server.use(compression());
server.use(apiRoutes);

module.exports = server;
