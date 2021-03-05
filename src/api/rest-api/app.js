const express = require('express');
const middlewares = require('./middlewares');
const adminRouter = require('./admin/router');
const mobileRouter = require('./mobile/mobileRouter');

// Init app
const app = express();

app.use(middlewares.json);
app.use(middlewares.urlencoded);
app.use(middlewares.cors);
app.use(middlewares.auth);

app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/mobile', mobileRouter);

function start({ appPort }) {
  const server = app.listen(appPort, () => {
    const { port, address } = server.address();

    console.info(`[RestApiApp] STARTING AT PORT [${port}] ADDRESS [${address}]`);
  });
}

module.exports = {
  app,
  start,
};