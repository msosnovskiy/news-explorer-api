const BadRequestError = require('../errors/BadRequestError');

const checkPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password || !password.trim() || password.length < 8) {
    throw new BadRequestError('Пароль обязателен для заполнения и не должен быть меньше 8 символов');
  } else {
    next();
  }
};

module.exports = checkPassword;
