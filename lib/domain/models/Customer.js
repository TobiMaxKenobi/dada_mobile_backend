const Sequelize = require('sequelize');
const BaseModel = require('./BaseModel.js');
const {Domain} = require('../BaseError');

const DT = Sequelize.DataTypes;

class Customer extends BaseModel {
  static schema = {
    id: {
      type: DT.UUID,
      defaultValue: DT.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DT.UUID,
      primaryKey: true,
      unique: true,
    },
    fullName: {
      type: DT.STRING,
      allowNull: false,
    },
  };

  static initRelations(models) {
    this.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
    });
  }

  static async updateByUserId(userId, data) {
    try {
      return this.update(data, {where: {userId}});
    } catch (error) {
      throw new Domain(error.message, 'Domain', error.fields);
    }
  }

  static async deleteByUserId(userId, params = {}) {
    try {
      return this.destroy({where: {userId}, params});
    } catch (error) {
      throw new Domain(error.message, 'Domain', error.fields);
    }
  }
}
module.exports = Customer;