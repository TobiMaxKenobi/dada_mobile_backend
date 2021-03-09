const Sequelize = require('sequelize');
const {Domain} = require('../BaseError');

class BaseModel extends Sequelize.Model {
  static init(sequelize, options = {}) {
    super.init(this.schema, {...options, sequelize});
  }

  static initRelationsAndHooks(sequelize) {
    if (this.initRelations) {
      this.initRelations(sequelize.models);
    }

    if (this.initHooks) this.initHooks();
  }

  static async getAll(params = {}) {
    return this.findAll(params);
  }

  static async findById(id, params = {}) {
    console.log(id, params)
    const entity = await this.findByPk(id, params);

    if (!entity) {
      throw new Domain(`No such ${this.name} with id:${id}`, 'Domain');
    }

    return entity;
  }

  static async findOneByPredicate(predicate) {
    const entity = await this.findOne({where: predicate});

    if (!entity) {
      throw new Domain(`No such ${this.name} with ${predicate}`, 'Domain');
    }

    return entity;
  }

  static async save(data, params) {
    try {
      return this.create(data, params);
    } catch (error) {
      throw new Domain(error.message, 'Domain', error.fields);
    }
  }

  static async deleteById(id, params = {}) {
    try {
      return this.destroy({where: {id}, params});
    } catch (error) {
      throw new Domain(error.message, 'Domain', error.fields);
    }
  }
}

module.exports = BaseModel;