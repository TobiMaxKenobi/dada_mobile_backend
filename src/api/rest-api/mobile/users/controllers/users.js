const {makeServiceRunner, renderPromiseAsJson} = require('../../../../../use-cases/serviceUtils');
const BaseUsersCreate = require('../../../../../use-cases/services/users/base/BaseUsersCreate');

async function create(req, res) {
  // empty context
  const context = {};
  const promise = makeServiceRunner(BaseUsersCreate, req.body, context);
  await renderPromiseAsJson(res, promise);
}

module.exports = {
  create,
}