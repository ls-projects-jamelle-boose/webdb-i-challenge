const express = require("express");

// const db = require('./data/dbConfig.js');

const AccountRouter = require("./accounts/account-router");

const server = express();

server.use(express.json());

server.use("/api/accounts", AccountRouter);

server.get("/", (req, res) => {
  res.send("<H1>DB Helpers with knex</H1>");
});

module.exports = server;
