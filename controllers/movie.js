const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const NotValidationError = require('../errors/NotValidationError');
const NoRightsError = require('../errors/NotRightsError');

const { created, ok } = require('../utils');

module.exports.getAllMovies = (req, res, next) => {
  Movie.find({})
    .populate(['owner'])
    .then((movies) => {
      if (!movies) {
        throw new NotFoundError('Фильмы не найдены');
      }
      res.send(
        {
          data: movies,
        },
      );
    })
    .catch(next);
};

module.exports.getAllUserMovies = (req, res, next) => {
  Movie.find({})
    .populate(['owner'])
    .then((movies) => {
      if (!movies) {
        throw new NotFoundError('Фильмы не найдены');
      }

      const userMovies = movies.filter((m) => m.owner._id.toString() === req.user._id);

      if (!userMovies) {
        throw new NotFoundError('Вы не сохранил ни одного фильма.');
      }
      res.send(
        {
          data: userMovies,
        },
      );
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image,
    trailer, nameRU, nameEN, thumbnail,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink: trailer,
    nameRU,
    nameEN,
    thumbnail,
    owner: req.user._id,
  })
    .then((movie) => {
      movie
        .populate('owner')
        .then(() => res.status(created).send(movie));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new NotValidationError('Некорректные данные фильма'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const movieId = req.params._id;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм с таким id не найден');
      }
      return movie.owner._id.toString();
    })
    .then((movieUserId) => {
      if (!movieUserId) {
        throw new NotFoundError('Не найден пользователь, создавший фильм');
      } else if (movieUserId !== req.user._id) {
        throw new NoRightsError('Вы можете удалять фильмы только сохраненные Вами');
      } else {
        return Movie.findByIdAndDelete(movieId)
          .then((movie) => {
            if (!movie) {
              throw new NotFoundError('Фильм с таким id не найден');
            }
            res.status(ok).send(movie);
          });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new NotValidationError('Некорректные данные фильма'));
      } else {
        next(err);
      }
    });
};
