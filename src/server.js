const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const apiRoutes = require("./routes/apiRoutes");

const server = express();
server.use(helmet());
// server.use(cors({ origin: "http://127.0.0.1" }));
server.use(express.json({ limit: "10kb" }));
server.use(compression());

server.use("/api/v1/webhooks", apiRoutes);

server.all("*", (req, res) =>
  res.status(404).json({
    success: false,
    message: `Rota ${req.originalUrl} não encontrada no servidor!`,
  })
);

module.exports = server;
