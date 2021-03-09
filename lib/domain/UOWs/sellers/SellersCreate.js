const {db} = require('../../index');

class SellersCreate {
  async execute(data) {
    const transaction = await db.sequelize.transaction();

    try {
      const user = await db.models.BaseUser.save(data, {transaction});

      const customer = await db.models.Seller.save(
        {
          userId: user.id,
          ...data
        }, {transaction});

      await transaction.commit();

      return {user, customer};
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = new SellersCreate();