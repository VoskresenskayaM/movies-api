const { celebrate, Joi } = require('celebrate');
const {
  regLink, movieNameRu, movieNameEn, regEmail, regPassword,
} = require('../utils');

module.exports.signupValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().pattern(regEmail),
    password: Joi.string().required().pattern(regPassword),
  }),
});

module.exports.signinValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(regEmail),
    password: Joi.string().required().pattern(regPassword),
  }),
});

module.exports.updateCurrentUserValidator = celebrate({
  body: Joi.object().keys(
    {
      name: Joi.string().required().min(1).max(100),
      email: Joi.string().required().pattern(regEmail),
    },
  ),
});

module.exports.createMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(1).max(100),
    director: Joi.string().required().min(1).max(100),
    duration: Joi.string().required(),
    year: Joi.number().required().min(1900).max(2023),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regLink),
    trailer: Joi.string().required().pattern(regLink),
    thumbnail: Joi.string().required().pattern(regLink),
    nameRU: Joi.string().required().pattern(movieNameRu),
    nameEN: Joi.string().required().pattern(movieNameEn),
  }),
});

module.exports.deleteMovieById = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
});
