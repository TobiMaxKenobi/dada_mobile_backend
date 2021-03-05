const LIVR = require('livr');
const Exception = require('./Exception');

class ServiceBase {
  constructor(args) {
    this.context = args.context;
  }

  async run(params) {
    const cleanParams = await this.validate(params);

    return this.execute(cleanParams);
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