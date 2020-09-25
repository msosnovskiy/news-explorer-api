const router = require('express').Router();
const { getArticles, createArticles } = require('../controllers/articles');

router.get('/', getArticles);
router.post('/', createArticles);

module.exports = router;
