const express = require('express');
const usersControllers = require('./controllers/users');
const {mobileJwtMiddleware} = require('../../middlewares/auth');

const usersRouter = express();

usersRouter
  .get(
    '/',
    mobileJwtMiddleware,
    usersControllers.show
  )
  .put(
    '/',
    mobileJwtMiddleware,
    usersControllers.update
  )
  .delete(
    '/',
    mobileJwtMiddleware,
    usersControllers.remove
  );

module.exports = usersRouter;