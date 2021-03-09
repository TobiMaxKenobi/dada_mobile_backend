const BaseService = require('../../../BaseService');
const {db} = require('../../../../domain');

class CustomersShow extends BaseService {
  static validationRules = {
    id: 'required',
  }

  async execute(data) {
    const {id} = data;
    const result = await db.models.Customer.findById(id);

    return {
      data: result,
    }
  }
}

module.exports = CustomersShow;