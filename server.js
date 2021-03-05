require('dotenv').config();

const domainModel = require('./lib/domain');
const dbConfig = require('./lib/config/dbConfig');

const mobileApi = require('./lib/api/rest-api/app');
const appConfig = require('./lib/config/appConfig');

async function server() {
  mobileApi.start({appPort: appConfig.port});
  await domainModel.initAllModels(dbConfig);
}

require('./lib/domain');

server().catch((error) => {
  console.error(error);
  process.exit(1);
});