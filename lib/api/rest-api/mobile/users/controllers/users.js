const {makeServiceRunner} = require('../../../../../use-cases/serviceUtils');
const BaseUsersCreate = require('../../../../../use-cases/services/users/base/BaseUsersCreate');

const create =
  makeServiceRunner(
    BaseUsersCreate,
    (req) => ({...req.body}),
    (req) => (req.session)
  )

module.exports = {
  create,
}