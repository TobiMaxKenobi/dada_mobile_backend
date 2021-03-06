const express = require('express');
const middlewares = require('./middlewares');
const adminRouter = require('./admin/router');
const mobileRouter = require('./mobile/mobileRouter');

const app = express();

app.use(middlewares.json);
app.use(middlewares.urlencoded);
app.use(middlewares.cors);
app.use(middlewares.session);
app.use(middlewares.auth);

app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/mobile', mobileRouter);

app.use(middlewares.error);


function start({ appPort }) {
  const server = app.listen(appPort, () => {
    const { port, address } = server.address();

    console.info(`[DadaMobileApi] STARTING AT PORT [${port}] ADDRESS [${address}]`);
  });
}

module.exports = {
  app,
  start,
};