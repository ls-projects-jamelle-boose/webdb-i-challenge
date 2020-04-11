const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const AccountRouter = require('./accounts/account-router');

const server = express();
server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());
server.use('/api/accounts', AccountRouter);

server.get('/', (req, res) => {
  res.send('<H1>DB Helpers with knex</H1>');
});

module.exports = server;
