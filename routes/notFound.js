const router = require('express').Router();

const { notFound } = require('../controllers/notFound');

router.use('/*', notFound);

module.exports = router;
