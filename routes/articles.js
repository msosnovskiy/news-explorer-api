const router = require('express').Router();
const { getArticles, createArticles, removeArticles } = require('../controllers/articles');
const { validateArticlesBody } = require('../middlewares/validator');

router.get('/', getArticles);
router.post('/', validateArticlesBody, createArticles);
router.delete('/:articleId', removeArticles);

module.exports = router;
