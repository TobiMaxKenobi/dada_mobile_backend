const Sequelize = require('sequelize');
const BaseError = require('../BaseError');

class BaseModel extends Sequelize.Model {
  static init(sequelize, options = {}) {
    super.init(this.schema, { ...options, sequelize });
  }

  static initRelationsAndHooks() {
    if (this.initRelations) this.initRelations();
    if (this.initHooks) this.initHooks();
  }

  static async findById(id) {
    const entity = await this.findOne({ where: { id } });

    if (!entity) {
      throw new BaseError({
        message : `There is no ${this.name} with id = "${id}"`,
        field   : 'id'
      });
    }

    return entity;
  }

  static async save(data) {
    try {
      return await this.create(data);
    } catch (error) {
      throw new BaseError({
        message : error.message,
        field   : 'Domain',
        parent  : BaseError
      });
    }
  }
}

module.exports = BaseModel;