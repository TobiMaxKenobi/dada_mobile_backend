const express = require('express');
const authController = require('./controllers/auth');

const authRouter = express();

authRouter
  .use('/login/manual', authController.loginManual)
  .use('/login/sns', authController.loginSns);

module.exports = authRouter;