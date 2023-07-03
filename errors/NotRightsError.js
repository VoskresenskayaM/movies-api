const { noRights } = require('../utils');

class NoRightsError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = noRights;
  }
}

module.exports = NoRightsError;