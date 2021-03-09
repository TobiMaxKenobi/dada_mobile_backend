class BaseError extends Error {
  constructor(message, field, details) {
    super(message);
    this.message = message;
    this.field = field;
    this.details = details;
    Error.captureStackTrace(this);
  }
}

class NotUnique extends BaseError { }

class Domain extends BaseError { }

module.exports = BaseError;
module.exports = {NotUnique, Domain};