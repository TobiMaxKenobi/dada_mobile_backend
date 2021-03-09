const LIVR = require('livr');
const Exception = require('./Exception');

class ServiceBase {
  constructor(args) {
    this.context = args.context;
  }

  async run(params) {
    console.log(params);
    const cleanParams = await this.validate(params);

    await this._verifyProhibitedParams(cleanParams);

    return this.execute(cleanParams);
  }

  async _verifyProhibitedParams(params) {
    if (this.constructor.prohibitedParams) {
      Object.keys(params).forEach((paramKey) => {
        if (this.constructor.prohibitedParams.indexOf(paramKey) !== -1) {
          throw new Exception({
            code: 'PROHIBITED_PARAMETER_ERROR',
            message: 'Error when verifying parameters',
            fields: paramKey
          });
        }
      })
    }
  }

  async validate(data) {
    const validator = new LIVR.Validator(this.constructor.validationRules).prepare();

    return this._doValidationWithValidator(data, validator);
  }

  async _doValidationWithValidator(data, validator) {
    const result = validator.validate(data);

    if (!result) {
      throw new Exception({
        code: 'FORMAT_ERROR',
        message: 'Error when validating parameters',
        fields: validator.getErrors()
      });
    }

    return result;
  }
}

module.exports = ServiceBase;