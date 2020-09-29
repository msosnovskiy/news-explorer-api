const router = require('express').Router();
const usersRouter = require('./users');
const articlesRouter = require('./articles');
const auth = require('../middlewares/auth');
const { createAccountLimiter } = require('../middlewares/limiter');
const { validateAuthentication, validateUserBody } = require('../middlewares/validator');
const checkPassword = require('../middlewares/checkPassword');
const { login, createUser } = require('../controllers/users');

router.post('/signin', validateAuthentication, checkPassword, login);
router.post('/signup', createAccountLimiter, validateUserBody, checkPassword, createUser);
router.use('/users', auth, usersRouter);
router.use('/articles', auth, articlesRouter);

module.exports = router;
