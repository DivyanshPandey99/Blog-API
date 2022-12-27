const express = require('express');
const router = express.Router();
const { checkJwt } = require('../middlewares/jwt');
const { likePost, unlikePost } = require('../controllers/like');

router.post('/', checkJwt, likePost);
router.delete('/', checkJwt, unlikePost);

module.exports = router;
