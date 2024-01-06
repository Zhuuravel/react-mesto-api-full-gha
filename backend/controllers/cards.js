const mongoose = require('mongoose').default;
const Card = require('../models/cards');
const {
  STATUS_CREATED,
  STATUS_OK,
} = require('../errors/errors');
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const Forbidden = require('../errors/Forbidden');

const { CastError, ValidationError } = mongoose.Error;

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.status(STATUS_OK).send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner : req.user._id})
    .then((card) => {
      Card.findById(card._id)
        .populate('owner')
        .then((cards) => res.status(STATUS_CREATED).send(cards));
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequest('Некорректные данные при создании карточки'));
      } next(err);
    });
};

module.exports.deleteCard = (req, res, next) => Card.findById(req.params.cardId)
  // eslint-disable-next-line consistent-return
  .then((card) => {
    const userId = req.user._id;
    if (!card) {
      return next(new NotFound(`Карточка с указанным id: ${req.params.cardId} не найдена`));
    } if (!card.owner.equals(userId)) {
      return next(new Forbidden('Попытка удалить чужую карточку!'));
    } Card.deleteOne(card)
      .then(() => res.status(STATUS_OK).send(card));
  })
  .catch((err) => {
    if (err instanceof ValidationError) {
      next(new BadRequest('Некорректные данные при создании карточки'));
    } next(err);
  });

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
// eslint-disable-next-line consistent-return
).then((card) => {
  if (card) {
    console.log(card)
    return res.status(STATUS_OK).send({ data : card });
  } next(new NotFound(`Карточка с указанным id: ${req.params.cardId} не найдена`));
})
  .catch((err) => {
    if (err instanceof CastError) {
      next(new BadRequest('Переданы некорректные данные для постановки лайка'));
    } next(err);
  });

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
// eslint-disable-next-line consistent-return
).then((card) => {
  if (card) {
    return res.status(STATUS_OK).send({ data : card });
  } next(new NotFound(`Карточка с указанным id: ${req.params.cardId} не найдена`));
}).catch((err) => {
  if (err instanceof CastError) {
    next(new BadRequest('Переданы некорректные данные для постановки лайка'));
  } next(err);
});
