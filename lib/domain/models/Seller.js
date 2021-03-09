const Sequelize = require('sequelize');
const BaseModel = require('./BaseModel.js');

const DT = Sequelize.DataTypes;

class Seller extends BaseModel {
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
    companyName: {
      type: DT.STRING,
      allowNull: false,
      unique: true,
    },
    businessNumber: {
      type: DT.STRING,
      allowNull: false,
      unique: true,
    },
  };

  static initRelations(models) {
    this.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
    });
  }

}
module.exports = Seller;