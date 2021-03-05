const BaseService = require('../../../BaseService');
const {db} = require('../../../../domain');

class BaseUsersCreate extends BaseService {
  async validate() {

  }

  async execute(data) {
    const user = await db.models.BaseUser.save(data);

    return {
      data: user,
    }
  }
}

module.exports = BaseUsersCreate;