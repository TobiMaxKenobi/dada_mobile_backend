const BaseService = require('../../../BaseService');
const {db} = require('../../../../domain');

class BaseUsersCreate extends BaseService {
  static validationRules = {
    email: 'required',
    phone: 'required',
  }

  async execute(data) {
    const {email, phone} = data;

    if (await db.models.BaseUser.findOneByPredicate({email})) {
      throw new Error('User with email exists')
    }

    if (await db.models.BaseUser.findOneByPredicate({phone})) {
      throw new Error('User with phone exists')
    }

    const user = await db.models.BaseUser.save(data);

    return {
      data: user,
    }
  }
}

module.exports = BaseUsersCreate;