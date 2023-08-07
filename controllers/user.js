const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const NotValidationError = require('../errors/NotValidationError');
const IsExistError = require('../errors/IsExistError');
const {
  created, ok, isExists,
} = require('../utils');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) {
        throw new NotFoundError('Пользователи не найдены');
      }
      res.status(ok).send(users);
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send(
        {
          data: {
            _id: user._id,
            name: user.name,
            email: user.email,
          },
        },
      );
    })
    .catch((err) => {
      if (err instanceof mongoose.CastError) {
        next(new NotValidationError('Некорректный id пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports.updateCurrentUser = (req, res, next) => {
  console.log(req.user._id);
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      res.send({
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new NotValidationError('Некорректные данные пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      if (user) {
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
          { expiresIn: '7d' },
        );
        res.status(ok).send({ token });
      }
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    })
      .then((user) => res.status(created).send({
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      }))
      .catch((err) => {
        if (err.code === isExists) {
          next(new IsExistError('Пользователь c таким email уже существует'));
        } else if (err.name === 'ValidationError') {
          next(new NotValidationError('Некорректные данные пользователя'));
        } else {
          next(err);
        }
      }));
};
