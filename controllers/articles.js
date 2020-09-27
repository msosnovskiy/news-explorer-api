const Article = require('../models/article');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

module.exports.createArticles = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => res.send({ data: article }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(err.message);
      } else next(err);
    })
    .catch(next);
};

module.exports.removeArticles = (req, res, next) => {
  Article.findOne({ _id: req.params.articleId, owner: req.user._id })
    .orFail()
    .then(async (article) => {
      await Article.findByIdAndDelete({ _id: req.params.articleId });
      res.send({ data: article });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Передан некорректный идентификатор статьи');
      }
      if (err.name === 'DocumentNotFoundError') {
        throw new NotFoundError('У вас нет статьи для удаления с указанным идентификатором');
      } else next(err);
    })
    .catch(next);
};
