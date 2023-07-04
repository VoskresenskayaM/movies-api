const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const IncorrectDataError = require('../errors/IncorrectDataError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new IncorrectDataError('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new IncorrectDataError('Необходима авторизация');
  }
  req.user = payload;
  next();
};
