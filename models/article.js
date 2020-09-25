const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, 'Это поле является обязательным для заполения'],
  },
  title: {
    type: String,
    required: [true, 'Это поле является обязательным для заполения'],
  },
  text: {
    type: String,
    required: [true, 'Это поле является обязательным для заполения'],
  },
  date: {
    type: Date,
    required: [true, 'Это поле является обязательным для заполения'],
  },
  source: {
    type: String,
    required: [true, 'Это поле является обязательным для заполения'],
  },
  link: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Передана некорректная ссылка на статью',
    },
    required: [true, 'Это поле является обязательным для заполения'],
  },
  image: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Передана некорректная ссылка на изображение',
    },
    required: [true, 'Это поле является обязательным для заполения'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'это поле является обязательным для заполения'],
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
