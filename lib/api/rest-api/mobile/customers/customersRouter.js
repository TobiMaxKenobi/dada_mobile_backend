const express = require('express');
const customersController = require('./controllers/customers');

const customersRouter = express();

customersRouter
  .post('/manual', customersController.createManual)
  .post('/sns', customersController.createSns)
  .get('/:customerId', customersController.show)
  .get('/', customersController.list);

module.exports = customersRouter;