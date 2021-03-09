const express = require('express');

const mainRouter = express();

mainRouter
  .use('/auth', require('./auth/authRouter'))
  .use('/customers', require('./customers/customersRouter'))
  .use('/users', require('./users/usersRouter'));

module.exports = mainRouter;