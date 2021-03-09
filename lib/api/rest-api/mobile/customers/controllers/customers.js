const {makeServiceRunner} = require('../../../../../use-cases/serviceUtils');
const CustomersCreateSns = require('../../../../../use-cases/services/users/customers/CustomersCreateSns');
const CustomersCreateManual = require('../../../../../use-cases/services/users/customers/CustomersCreateManual');
const CustomersShow = require('../../../../../use-cases/services/users/customers/CustomersShow');
const CustomersList = require('../../../../../use-cases/services/users/customers/CustomersList');

const createManual =
  makeServiceRunner(
    CustomersCreateManual,
    (req) => ({...req.body}),
    (req) => (req.session)
  )

const createSns =
  makeServiceRunner(
    CustomersCreateSns,
    (req) => ({...req.body}),
    (req) => (req.session)
  )

const show =
  makeServiceRunner(
    CustomersShow,
    (req) => ({id: req.params.customerId}),
    (req) => (req.session)
  )

const list =
  makeServiceRunner(
    CustomersList,
    (req) => ({}),
    (req) => (req.session)
  )

module.exports = {
  createManual,
  createSns,
  show,
  list,
}