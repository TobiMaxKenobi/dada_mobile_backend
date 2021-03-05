const Exception = require('./Exception');

async function runService(serviceClass, { params = {}, context = {} }) {
  console.log('here 3');
  const startTime = Date.now();
  try {


    return result;
  } catch (error) {
    const type = error instanceof Exception ? 'info' : 'error';

    throw error;
  }
}


async function makeServiceRunner(serviceClass, params, context) {
  return new serviceClass(context).run(params);
}


async function renderPromiseAsJson(res, promise) {
  try {
    const data = await promise;

    data.status = 1;

    return res.send(data);
  } catch (error) {
    res.status(500).send({
      status : 500,
      error  : {
        code    : 'SERVER_ERROR',
        message : error.message
      }
    });
  }
}


module.exports = {
  makeServiceRunner,
  runService,
  renderPromiseAsJson
};