const Exception = require('./Exception');

function makeServiceRunner(serviceClass, paramsBuilder, contextBuilder) {
  return async function serviceRunner(req, res) {
    const resultPromise = runService(serviceClass, {
      params: paramsBuilder(req, res),
      context: contextBuilder(req, res)
    });

    return renderPromiseAsJson(res, resultPromise);
  };
}

async function runService(serviceClass, {params, context}) {
  try {
    const result = new serviceClass(context).run(params);

    return result;
  } catch (error) {
    const type = error instanceof Exception ? 'info' : 'error';

    throw error;
  }
}

async function renderPromiseAsJson(res, promise) {
  try {
    const data = await promise;

    data.status = 1;

    return res.send(data);
  } catch (error) {
    res.status(500).send({
      status : 500,
      error: {
        code: error.code,
        message: error.message,
        ...error
      },
    });
  }
}


module.exports = {
  makeServiceRunner,
  runService,
  renderPromiseAsJson
};