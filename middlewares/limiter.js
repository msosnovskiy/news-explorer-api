const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: ({ message: 'Отправлено слишком много запросов, повторите попытку позже' }),
});

const createAccountLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  message: ({ message: 'Отправлено слишком много запросов, повторите попытку позже' }),
});

module.exports = { apiLimiter, createAccountLimiter };
