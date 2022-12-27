const express = require('express');
const jwtMiddleware = require('../middleware/jwt');
const {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
} = require('../controllers/comments');

const router = express.Router();

router.get('/', getAllComments);
router.get('/:id', getCommentById);
router.post('/', jwtMiddleware, createComment);
router.put('/:id', jwtMiddleware, updateComment);
router.delete('/:id', jwtMiddleware, deleteComment);

module.exports = router;
