const BaseService = require('../../../BaseService');
const {db} = require('../../../../domain');

class CustomersList extends BaseService {
  static validationRules = {

  }

  async execute(data) {
    const result = await db.models.Customer.getAll(data);

    return {
      data: result,
    }
  }
}

module.exports = CustomersList;