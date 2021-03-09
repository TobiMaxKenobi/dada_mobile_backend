const crypto = require('crypto');
const Sequelize = require('sequelize');
const BaseModel = require('./BaseModel.js');

const DT = Sequelize.DataTypes;

const SALT_LENGTH = 16;
const KEY_LENGTH  = 64;
const STRING_LENGTH = 10;

class User extends BaseModel {
  static schema = {
    id: {
      type: DT.UUID,
      defaultValue: DT.UUIDV4,
      primaryKey: true
    },
    userType: {
      type: DT.ENUM('customer', 'seller'),
      allowNull: false,
    },
    email: {
      type: DT.STRING,
      allowNull: false,
      unique: true
    },
    phone: {
      type: DT.STRING,
      allowNull: false,
      unique: true
    },
    snsToken: {
      type: DT.STRING,
      allowNull: true,
      unique: true,
    },
    snsType: {
      type: DT.STRING,
      allowNull: true,
      defaultValue: null,
    },
    passwordHash: {
      type: DT.STRING,
      allowNull: true,
    },
    salt: {
      type: DT.STRING,
      allowNull: true,
    },
    password: {
      type : DT.VIRTUAL,
      set(password) {
        const salt = this._generateSalt();
        this.setDataValue('salt', salt);
        this.setDataValue('passwordHash', this._hashPassword(password, salt));
      }
    }
  };

  static initRelations(models) {
    this.hasOne(models.Seller, {
      foreignKey: 'userId',
      targetKey: 'id',
      onUpdate: 'CASCADE',
    });
    this.hasOne(models.Customer, {
      foreignKey: 'userId',
      targetKey: 'id',
      onUpdate: 'CASCADE',
    });
  }

  checkPassword(plain) {
    const hash = this._hashPassword(plain, this.salt);

    return hash === this.passwordHash;
  }

  _generateSalt() {
    const salt = crypto.randomBytes(SALT_LENGTH);

    return salt.toString('hex');
  }

  _hashPassword(password, salt) {
    const hash = crypto.scryptSync(password, salt, KEY_LENGTH);

    return hash.toString('hex');
  }
}
module.exports = User;