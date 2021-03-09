const BaseService = require('../../../BaseService');
const CustomersDelete = require('../../../../domain/UOWs/customers/CustomersDelete');

class CustomersShowMe extends BaseService {
  static validationRules = {
    id: 'required',
  }

  async execute(data) {
    const result = await CustomersDelete.execute(data);

    return {
      data: result,
    }
  }
}

module.exports = CustomersShowMe;