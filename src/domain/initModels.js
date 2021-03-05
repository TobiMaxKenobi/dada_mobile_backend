const Sequelize = require('sequelize');
const BaseUser = require('./models/BaseUser');

const db = {};

async function initAllModels(dbConfig) {
  const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
      host: dbConfig.host,
      dialect: dbConfig.dialect,
      operatorsAliases: 0,
      pool: {
        max: dbConfig.max,
        min: dbConfig.min,
        acquire: dbConfig.acquire,
        idle: dbConfig.idle,
      },
    },
  );

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  const models = {
    BaseUser,
  };

  Object.values(models).forEach(model => model.init(sequelize));
  Object.values(models).forEach(model => model.initRelationsAndHooks(sequelize));

  db.sequelize = sequelize;
  db.models = models;

  db.sequelize.sync({
    alter: true,
    force: true,
  })
}
module.exports = {
  initAllModels,
  db,
}
