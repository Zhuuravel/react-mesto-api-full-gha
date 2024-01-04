const { celebrate, Joi } = require('celebrate');
const { urlValid } = require('../utils/validation');

module.exports.validationSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(urlValid),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validationSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validationGetUser = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).alphanum().required(),
  }),
});

module.exports.validationUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

module.exports.validationUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(urlValid).required(),
  }),
});

module.exports.validationCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(urlValid),
  }),
});

module.exports.validationDeleteCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).alphanum().required(),
  }),
});

module.exports.LikeCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).alphanum().required(),
  }),
});
