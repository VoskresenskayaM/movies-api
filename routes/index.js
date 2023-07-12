const router = require('express').Router();
const { createUser, login } = require('../controllers/user');
const { notFound } = require('../controllers/notFound');
const auth = require('../middlewares/auth');

const userRouter = require('./users');
const moviesRouter = require('./movies');

const { signupValidator, signinValidator } = require('../middlewares/validator');

router.post('/signup', signupValidator, createUser);
router.post('/signin', signinValidator, login);

router.use(auth);
router.use('/users', userRouter);
router.use('/movies', moviesRouter);
router.use('/*', notFound);
module.exports = router;
