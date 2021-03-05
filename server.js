require('dotenv').config();

const domainModel = require('./src/domain');
const dbConfig = require('./src/config/dbConfig');

const mobileApi = require('./src/api/rest-api/app');
const appConfig = require('./src/config/appConfig');

async function server() {
  mobileApi.start({appPort: appConfig.port});
  await domainModel.initAllModels(dbConfig);
}

require('./src/domain');

server().catch((error) => {
  console.error(error);
  process.exit(1);
});