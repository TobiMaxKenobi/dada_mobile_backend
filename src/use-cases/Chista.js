const serviceUtils = require('./serviceUtils');

class Chista {
  constructor({
    defaultParamsBuilder = () => ({}),
    defaultContextBuilder = req => cloneDeep(req.session && req.session.context ? req.session.context : {}),
  }) {
    this.defaultParamsBuilder  = defaultParamsBuilder;
    this.defaultContextBuilder = defaultContextBuilder;
  }

  runService(serviceClass, { context = {}, params = {}}) {
    return serviceUtils.runService(serviceClass, { context, params });
  }

  makeServiceRunner(
    serviceClass,
    paramsBuilder  = this.defaultParamsBuilder,
    contextBuilder = this.defaultContextBuilder,
  ) {
    return serviceUtils.makeServiceRunner(serviceClass, paramsBuilder, contextBuilder);
  }

  renderPromiseAsJson(req, res, promise) {
    return serviceUtils.renderPromiseAsJson(req, res, promise);
  }
}

/* istanbul ignore next */
function cloneDeep(data) {
  return JSON.parse(JSON.stringify(data));
}

module.exports = Chista;