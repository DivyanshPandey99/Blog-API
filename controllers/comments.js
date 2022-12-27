const Comment = require('../models/comment');

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByPk(id);
    if (!comment) {
      res.status(404).json({ message: 'Comment not found' });
    } else {
      res.json(comment);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createComment = async (req, res) => {
  try {
    const { content, post } = req.body;
    const comment = await Comment.create({ content, post });
    res.status(201).json({ message: 'Comment created successfully', comment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const comment = await Comment.findByPk(id);
    if (!comment) {
      res.status(404).json({ message: 'Comment not found' });
    } else {
      await comment.update({ content });
      res.json({ message: 'Comment updated successfully', comment });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const deleteComment = async (req, res) => {
    try {
      const { id } = req.params;
      const comment = await Comment.findByPk(id);
      if (!comment) {
        res.status(404).json({ message: 'Comment not found' });
      } else {
        await comment.destroy();
        res.json({ message: 'Comment deleted successfully' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports = {
    getAllComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment
  }