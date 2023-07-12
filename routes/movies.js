const router = require('express').Router();
const {
  getAllUserMovies, createMovie, deleteMovie, getAllMovies,
} = require('../controllers/movie');

const { createMovieValidator, deleteMovieById } = require('../middlewares/validator');

router.get('/', getAllUserMovies);
router.get('/all', getAllMovies);
router.post('/', createMovieValidator, createMovie);
router.delete('/:_id', deleteMovieById, deleteMovie);

module.exports = router;
