const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, 'keyword - обязательное поле для заполения'],
  },
  title: {
    type: String,
    required: [true, 'title - обязательное поле для заполения'],
  },
  text: {
    type: String,
    required: [true, 'text - обязательное поле для заполения'],
  },
  date: {
    type: String,
    required: [true, 'date - обязательное поле для заполения'],
  },
  source: {
    type: String,
    required: [true, 'source - обязательное поле для заполения'],
  },
  link: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Поле link должно быть валидным url-адресом',
    },
    required: [true, 'link - обязательное поле для заполения'],
  },
  image: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Поле image должно быть валидным url-адресом',
    },
    required: [true, 'image - обязательное поле для заполения'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
