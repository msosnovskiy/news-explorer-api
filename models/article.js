const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, 'Ключевое слово - обязательное поле для заполения'],
  },
  title: {
    type: String,
    required: [true, 'Заголовок - обязательное поле для заполения'],
  },
  text: {
    type: String,
    required: [true, 'Текст статьи - обязательное поле для заполения'],
  },
  date: {
    type: String,
    required: [true, 'Дата - обязательное поле для заполения'],
  },
  source: {
    type: String,
    required: [true, 'Источник - обязательное поле для заполения'],
  },
  link: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Передана некорректная ссылка на статью',
    },
    required: [true, 'Сылка на статью - обязательное поле для заполения'],
  },
  image: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Передана некорректная ссылка на изображение',
    },
    required: [true, 'Ссылка на иллюстрацию - обязательное поле для заполения'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
