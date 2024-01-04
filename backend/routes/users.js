const router = require('express').Router();
const {
  validationGetUser, validationUserInfo, validationUserAvatar,
} = require('../middlewares/validation');
const {
  getUsers, getCurrentUser, updateUserDescription, updateUserAvatar, getMyUser,
} = require('../controllers/users');

router.get('/me', getMyUser);
router.get('/', getUsers);
router.get('/:userId', validationGetUser, getCurrentUser);
router.patch('/me', validationUserInfo, updateUserDescription);
router.patch('/me/avatar', validationUserAvatar, updateUserAvatar);

module.exports = router;
