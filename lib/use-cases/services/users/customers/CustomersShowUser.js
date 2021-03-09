const BaseService = require('../../../BaseService');
const {db} = require('../../../../domain');

class CustomersShowUser extends BaseService {
  static validationRules = {
    id: 'required',
  }

  async execute(data) {
    const {id} = data;
    const result = await db.models.BaseUser.findById(id, {include: db.models.Customer})

    return {
      data: result,
    }
  }
}

module.exports = CustomersShowUser;