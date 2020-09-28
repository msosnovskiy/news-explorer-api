const rateLimit = require('express-rate-limit');

module.exports.apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: ({ message: 'С этого IP-адреса отправлено слишком много запросов, повторите попытку позже' }),
});

module.exports.createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: ({ message: 'Отправлено слишком много запросов на создание учетной записи. Повторите попытку через час' }),
});
