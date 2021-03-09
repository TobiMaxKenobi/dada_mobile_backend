const {makeServiceRunner} = require('../../../../../use-cases/serviceUtils');
const LoginManual = require('../../../../../use-cases/services/auth/LoginManual');
const LoginSns = require('../../../../../use-cases/services/auth/LoginSns');

const loginManual =
  makeServiceRunner(
    LoginManual,
    (req) => ({...req.body}),
    (req) => (req.session)
  )

const loginSns =
  makeServiceRunner(
    LoginSns,
    (req) => ({...req.body}),
    (req) => (req.session)
  )

module.exports = {
  loginManual,
  loginSns,
}