const { isExist } = require('../utils');

class isExistError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = isExist;
  }
}

module.exports = isExistError;
