const { celebrate, Joi } = require('celebrate');
// const { celebrate, Joi, errors } = require('celebrate');
// const { ObjectId } = require('mongoose').Types;
const validator = require('validator');

module.exports.validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Поле email должно быть валидным email-адресом')
      .messages({
        'string.empty': 'Поле email не должен быть пустым',
        'any.required': 'email - обязательное поле для заполнения',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'string.min': 'Минимальная длина поля password - 8 символов',
        'string.empty': 'Поле password не должен быть пустым',
        'any.required': 'password - обязательное поле для заполения',
      }),
  }),
});

module.exports.validateUserBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Поле email должно быть валидным email-адресом')
      .messages({
        'string.empty': 'Поле email не должен быть пустым',
        'any.required': 'email - обязательное поле для заполнения',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'string.min': 'Минимальная длина поля password - 8 символов',
        'string.empty': 'Поле password не должен быть пустым',
        'any.required': 'password - обязательное поле для заполения',
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля name - 2 символа',
        'string.max': 'Максимальная длина поля name - 30 символов',
        'string.empty': 'Поле name не должен быть пустым',
        'any.required': 'name - обязательное поле для заполения',
      }),
  }),
});

module.exports.validateArticlesBody = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required()
      .messages({
        'string.empty': 'Поле keyword не должен быть пустым',
        'any.required': 'keyword - обязательное поле для заполения',
      }),
    title: Joi.string().required()
      .messages({
        'string.empty': 'Поле title не должен быть пустым',
        'any.required': 'title - обязательное поле для заполения',
      }),
    text: Joi.string().required()
      .messages({
        'string.empty': 'Поле text не должен быть пустым',
        'any.required': 'text - обязательное поле для заполения',
      }),
    date: Joi.string().required()
      .messages({
        'string.empty': 'Поле date не должен быть пустым',
        'any.required': 'date - обязательное поле для заполения',
      }),
    source: Joi.string().required()
      .messages({
        'string.empty': 'Поле source не должен быть пустым',
        'any.required': 'source - обязательное поле для заполения',
      }),
    link: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле link должно быть валидным url-адресом');
    })
      .messages({
        'string.empty': 'Поле link не должен быть пустым',
        'any.required': 'link - обязательное поле для заполения',
      }),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле image должно быть валидным url-адресом');
    })
      .messages({
        'string.empty': 'Поле image не должен быть пустым',
        'any.required': 'image - обязательное поле для заполения',
      }),
  }),
});
