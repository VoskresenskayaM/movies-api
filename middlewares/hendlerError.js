const { serverError } = require('../utils');

const handlerError = (err, req, res, next) => {
  const statusCode = err.statusCode || serverError;

  const message = statusCode === serverError ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
};

module.exports = handlerError;
