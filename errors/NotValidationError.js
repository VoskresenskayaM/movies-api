const { notValidation } = require('../utils');

class NotValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = notValidation;
  }
}

module.exports = NotValidationError;
