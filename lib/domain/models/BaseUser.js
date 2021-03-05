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
    passwordHash: {
      type: DT.STRING
    },
    salt: {
      type: DT.STRING
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
    // todo relations go here
  }

  /**
   * Implementation of findById method
   */
  // static async findById(id, options = {}) {
  //   return await super.findById(id);
  // }

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