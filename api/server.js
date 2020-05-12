const express = require("express");
const carRouter = require("../routers/carRouter");

const server = express();

server.use(express.json());
server.use('/api/cars', carRouter);

module.exports = server;