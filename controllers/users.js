const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.getUser = (req, res) => {
  User.findById({ _id: req.user._id }, { _id: false, email: true, name: true })
    .then((user) => res.send(user))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.createUser = (req, res) => {
  const {
    email, password, name,
  } = req.body;
  if (!password) {
    res.status(400).send({ message: 'Пароль является обязательным для заполения' });
  } else {
    bcrypt.hash(req.body.password, 10)
      .then((hash) => User.create({
        email,
        password: hash,
        name,
      }))
      .then(() => res.send({
        email, name,
      }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          res.status(400).send({ message: err.message });
          return;
        }
        if (err.name === 'MongoError' || err.code === 11000) {
          res.status(409).send({ message: 'Указанный email уже занят' });
        } else res.status(500).send({ message: 'На сервере произошла ошибка' });
      });
  }
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({ token: jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret-key', { expiresIn: '7d' }) });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};
