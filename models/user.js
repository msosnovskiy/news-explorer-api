const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Указан неверный адрес почтового ящика',
    },
    required: [true, 'Email является обязательным для заполения'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Пароль является обязательным для заполения'],
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Имя является обязательным полем для заполения'],
    minlength: [2, 'минимальное количество символов - 2'],
    maxlength: [30, 'максимальное количество символов - 30'],
  },
});

module.exports = mongoose.model('user', userSchema);
