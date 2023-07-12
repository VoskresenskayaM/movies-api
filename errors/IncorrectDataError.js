const { incorrectData } = require('../utils');

class IncorrectDataError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = incorrectData;
  }
}

module.exports = IncorrectDataError;
