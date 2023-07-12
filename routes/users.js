const router = require('express').Router();
const { getCurrentUser, updateCurrentUser, getAllUsers } = require('../controllers/user');
const { updateCurrentUserValidator } = require('../middlewares/validator');

router.get('/me', getCurrentUser);
router.patch('/me', updateCurrentUserValidator, updateCurrentUser);
router.get('/', getAllUsers);

module.exports = router;
