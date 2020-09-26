const Article = require('../models/article');

module.exports.getArticles = (req, res) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send(articles))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.createArticles = (req, res) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => res.send({ data: article }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.removeArticles = (req, res) => {
  Article.findOne({ _id: req.params.articleId, owner: req.user._id })
    .orFail()
    .then(async (article) => {
      await Article.findByIdAndDelete({ _id: req.params.articleId });
      res.send({ data: article });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Передан некорректный идентификатор статьи' });
        return;
      }
      if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'У вас нет статьи для удаления' });
      } else res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};
