class Exception extends Error {
  constructor(data) {
    super();
    if (!data.code) throw new Error('CODE_REQUIRED');
    if (!data.message) throw new Error('CODE_REQUIRED');
    if (!data.fields) throw new Error('FIELDS_REQUIRED');

    this.code = data.code;
    this.message = data.message;
    this.fields = data.fields;
  }
}

module.exports = Exception;