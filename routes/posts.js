const express = require('express');
const jwtMiddleware = require('../middleware/jwt');
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/posts');

const router = express.Router();

router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/', jwtMiddleware, createPost);
router.put('/:id', jwtMiddleware, updatePost);
router.delete('/:id', jwtMiddleware, deletePost);

module.exports = router;
