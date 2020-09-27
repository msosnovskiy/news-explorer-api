const express = require('express');
require('dotenv').config();
const helmet = require('helmet');
// const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const users = require('./routes/users');
const articles = require('./routes/articles');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const checkPassword = require('./middlewares/checkPassword');
const { validateAuthentication, validateUserBody } = require('./middlewares/validator');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;
const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/news-explorer', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(requestLogger);

app.post('/signin', validateAuthentication, checkPassword, login);
app.post('/signup', validateUserBody, checkPassword, createUser);
app.use('/users', auth, users);
app.use('/articles', auth, articles);

app.use(() => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
