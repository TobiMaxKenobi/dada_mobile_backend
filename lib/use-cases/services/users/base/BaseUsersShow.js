const {BaseUser} = require('../../../../domain');

class BaseUsersShow {
  static validationRules = {

  }

  async execute(data) {
    const {id} = data;
    const user = BaseUser.findById(id);

    return {
      data: user,
    }
  }
}

module.exports = new BaseUsersShow();