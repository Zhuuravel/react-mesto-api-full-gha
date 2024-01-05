require('dotenv').config();
const mongoose = require('mongoose').default;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const {
  STATUS_CREATED,
  STATUS_OK,
} = require('../errors/errors');
const User = require('../models/users');

const { CastError, ValidationError } = mongoose.Error;
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const ConflictingRequest = require('../errors/ConflictingRequest');

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      throw err;
    }
    User.create({
      name, about, avatar, email, password: hash,
    }).then(() => res.status(STATUS_CREATED).send({
      name, about, avatar, email,
    }))
      .catch((error) => {
        if (error instanceof ValidationError) {
          next(new BadRequest('Переданы некорректные данные при создании пользователя'));
        } else if (error.code === 11000) {
          next(new ConflictingRequest('Пользователь уже существует'));
        } else {
          next(error);
        }
      });
  });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV !== 'production' ? JWT_SECRET : 'secret', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
      });
      return res.status(STATUS_OK).send({ token });
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequest('Переданы некорректные данные при входе пользователя'));
      } next(err);
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(STATUS_OK).send(users))
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        next(new NotFound(`Пользователь по id: ${req.params.userId} не найден`));
      } return res.status(STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequest('Переданы некорректные данные'));
      } next(err);
    });
};

module.exports.getMyUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        next(new NotFound(`Пользователь по id: ${req.params.userId} не найден`));
      } return res.status(STATUS_OK).send(user);
    })
    .catch(next);
};

module.exports.updateUserDescription = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => res.status(STATUS_OK).send(user))
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequest('Переданы некорректные данные'));
      } next(err);
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => res.status(STATUS_OK).send(user))
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequest('Переданы некорректные данные'));
      } next(err);
    });
};
