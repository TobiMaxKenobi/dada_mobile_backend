const BaseService = require('../../../BaseService');
const CustomersCreate = require('../../../../domain/UOWs/customers/CustomersCreate');

class CustomersCreateManual extends BaseService {
  static validationRules = {
    email: 'required',
    phone: 'required',
    fullName: 'required',
    password: 'required'
  }

  async execute(data) {
    data.userType = 'customer';

    const result = await CustomersCreate.execute(data);

    return {
      data: result,
    }
  }
}

module.exports = CustomersCreateManual;