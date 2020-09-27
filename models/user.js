const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Указан неверный адрес почтового ящика',
    },
    required: [true, 'Почта - обязательное поле для заполнения'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Пароль - обязательное поле для заполения'],
    select: false,
    minlength: [8, 'Минимальное количество символов - 8'],
  },
  name: {
    type: String,
    required: [true, 'Имя - обязательное поле для заполения'],
    minlength: [2, 'Минимальное количество символов - 2'],
    maxlength: [30, 'Максимальное количество символов - 30'],
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
