const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Поле email должно быть валидным email-адресом',
    },
    required: [true, 'email - обязательное поле для заполнения'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'password - обязательное поле для заполения'],
    select: false,
    minlength: [8, 'Минимальная длина поля password - 8 символов'],
  },
  name: {
    type: String,
    required: [true, 'name - обязательное поле для заполения'],
    minlength: [2, 'Минимальная длина поля name - 2 символа'],
    maxlength: [30, 'Максимальное длина поля name - 30 символов'],
  },
});

userSchema.statics.findUserByCredentials = function checkCredentials(email, password) {
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
