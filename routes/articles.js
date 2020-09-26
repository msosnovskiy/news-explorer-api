const router = require('express').Router();
const { getArticles, createArticles, removeArticles } = require('../controllers/articles');

router.get('/', getArticles);
router.post('/', createArticles);
router.delete('/:articleId', removeArticles);

module.exports = router;
