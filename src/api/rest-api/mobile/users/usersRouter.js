const express = require('express');
const usersControllers = require('./controllers/users');

const usersRouter = express();

usersRouter
  .post('/', usersControllers.create);

module.exports = usersRouter;