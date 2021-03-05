const bodyParser = require('body-parser');
const cors = require('cors');
const {passportMiddleware} = require('./auth');
const session = require('express-session')

module.exports = {
  json: bodyParser.json({ limit  : 1024 * 1024,
    verify: (req, res, buf) => {
      try {
        JSON.parse(buf);
      } catch (e) {
        res.send({
          status: 0,
          error: {
            code: 'BROKEN_JSON',
            message: 'Please, verify your json'
          }
        });
        throw new Error('BROKEN_JSON');
      }
    } }),
  urlencoded: bodyParser.urlencoded({ extended: true }),
  cors: cors({ origin: '*' }),
  session: session({
    secret: 'session secret',
    saveUninitialized: true,
    resave: true,
  }),
  auth: passportMiddleware,
};