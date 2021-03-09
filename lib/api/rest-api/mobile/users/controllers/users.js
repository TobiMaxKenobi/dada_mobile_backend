const {makeServiceRunner} = require('../../../../../use-cases/serviceUtils');
const CustomersShowMe = require('../../../../../use-cases/services/users/customers/CustomersShowUser');
const CustomersUpdate = require('../../../../../use-cases/services/users/customers/CustomersUpdate');
const CustomersDelete = require('../../../../../use-cases/services/users/customers/CustomersDelete');
const SellersShowMe = require('../../../../../use-cases/services/users/sellers/SellersShowUser');
const SellersUpdate = require('../../../../../use-cases/services/users/sellers/SellersUpdate');
const SellersDelete = require('../../../../../use-cases/services/users/sellers/SellersDelete');

const show = (req, res) => {
  let service;
  if (req.user.userType === 'customer') {
    service = CustomersShowMe;
  } else if (req.user.userType === 'seller') {
    service = SellersShowMe;
  }

  return makeServiceRunner(
    service,
    (req) => ({id: req.user.id}),
    (req) => (req.session)
  )(req, res)
};

const update = (req, res) => {
  let service;
  if (req.user.userType === 'customer') {
    service = CustomersUpdate;
  } else if (req.user.userType === 'seller') {
    service = SellersUpdate;
  }

  return makeServiceRunner(
    service,
    (req) => ({id: req.user.id, ...req.body}),
    (req) => (req.session)
  )(req, res)
};

const remove = (req, res) => {
  let service;
  if (req.user.userType === 'customer') {
    service = CustomersDelete;
  } else if (req.user.userType === 'seller') {
    service = SellersDelete;
  }

  return makeServiceRunner(
    service,
    (req) => ({id: req.user.id}),
    (req) => (req.session)
  )(req, res)
};


module.exports = {
  show,
  update,
  remove
}