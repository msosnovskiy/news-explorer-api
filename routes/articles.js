const router = require('express').Router();
const { getArticles, createArticles, removeArticles } = require('../controllers/articles');
const { validateArticlesBody, validateArticlesParams } = require('../middlewares/validator');

router.get('/', getArticles);
router.post('/', validateArticlesBody, createArticles);
router.delete('/:articleId', validateArticlesParams, removeArticles);

module.exports = router;
