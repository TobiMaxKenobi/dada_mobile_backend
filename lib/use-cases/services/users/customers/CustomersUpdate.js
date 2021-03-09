const BaseService = require('../../../BaseService');
const {db} = require('../../../../domain');

class CustomersUpdate extends BaseService {
  static validationRules = {
    'id': 'required',
    'fullName': 'string'
  }

  static prohibitedParams = [
    'userId',
    'createdAt',
    'updatedAt'
  ]

  async execute(data) {
    const {id: userId} = data;
    const result = await db.models.Customer.updateByUserId(userId, data);

    return {
      data: result,
    }
  }
}

module.exports = CustomersUpdate;