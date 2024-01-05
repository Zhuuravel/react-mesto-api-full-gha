const router = require('express').Router();
const {
  validationSignup, validationSignin,
} = require('../middlewares/validation');
const {
  createUser, login,
} = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const userRoutes = require('./users');
const cardRoutes = require('./cards');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signup', validationSignup, createUser);
router.post('/signin', validationSignin, login);

router.use(auth);

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

module.exports = router;
