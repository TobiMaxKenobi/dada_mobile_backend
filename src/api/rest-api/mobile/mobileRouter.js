const express = require('express');

const mainRouter = express();

mainRouter
  .use('/users', require('./users/usersRouter'));

module.exports = mainRouter;