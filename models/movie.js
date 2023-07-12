const mongoose = require('mongoose');
const validator = require('validator');

const { movieCreateYear, movieNameRu, movieNameEn } = require('../utils');

const movieShema = mongoose.Schema({

  country: {
    type: String,
    required: true,
  },

  director: {
    type: String,
    required: true,
  },

  duration: {
    type: Number,
    required: true,
  },

  year: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        /* const reg = /^20[0-1][0-9]$|^202[0-3]$|^19[0-9]{2}$/; */
        return movieCreateYear.test(v);
      },
      message: 'Год создания фильма не может быть раньше 1900 и позже 2023',
    },
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'Тут должна быть ссылка',
    },
  },

  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'Тут должна быть ссылка',
    },
  },

  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'Тут должна быть ссылка',
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  /* movieId: {
    type: Number,
    required: true,
  }, */

  nameRU: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        /* const reg = /^[?!,.а-яА-ЯёЁ0-9\s]+$/; */
        return movieNameRu.test(v);
      },
      message: 'Название фильма должно быть на русском языке',
    },
  },

  nameEN: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        /* const reg = /^[?!,.a-zA-Z0-9\s]+$/; */
        return movieNameEn.test(v);
      },
      message: 'Название фильма должно быть на английском языке',
    },
  },
});

module.exports = mongoose.model('movie', movieShema);
