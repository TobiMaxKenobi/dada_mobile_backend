const BaseService = require('../../BaseService');
const {db} = require('../../../domain');
const jwtTokenHelper = require('../../helpers/jwtTokenHelper');

class LoginSns extends BaseService {
  static validationRules = {
    snsToken: 'required',
    snsType: 'required',
  }

  async execute(data) {
    const user = await db.models.BaseUser.findOneByPredicate(data);

    const token = jwtTokenHelper.createApiToken({
      id: user.id,
      userType: user.userType,
    })

    return {
      data: token,
    }
  }
}

module.exports = LoginSns;