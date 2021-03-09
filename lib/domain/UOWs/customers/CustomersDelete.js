const {db} = require('../../index');

class CustomersDelete {
  async execute(data) {
    const {id: userId} = data;

    const transaction = await db.sequelize.transaction();

    try {
      await db.models.BaseUser.deleteById(userId, {transaction});

      await db.models.Customer.deleteByUserId(
        userId, {transaction});

      await transaction.commit();

      return 1;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = new CustomersDelete();