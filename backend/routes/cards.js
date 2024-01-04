const router = require('express').Router();
const {
  validationCreateCard, validationDeleteCard, LikeCard,
} = require('../middlewares/validation');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', validationCreateCard, createCard);
router.delete('/:cardId', validationDeleteCard, deleteCard);
router.put('/:cardId/likes', LikeCard, likeCard);
router.delete('/:cardId/likes', LikeCard, dislikeCard);

module.exports = router;
