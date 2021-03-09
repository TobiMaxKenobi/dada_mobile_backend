const BaseService = require('../../BaseService');
const {db} = require('../../../domain');
const jwtTokenHelper = require('../../helpers/jwtTokenHelper');

class LoginManual extends BaseService {
  static validationRules = {
    email: 'required',
    password: 'required',
  }

  async execute(data) {
    const {email} = data;
    const user = await db.models.BaseUser.findOneByPredicate({email});

    if (!user.checkPassword(data.password)) {
      throw new Error('Invalid password')
    }

    const token = jwtTokenHelper.createApiToken({
      id: user.id,
      userType: user.userType,
    })

    return {
      data: token,
    }
  }
}

module.exports = LoginManual;