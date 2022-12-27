const Like = require('../models/like');

const likePost = async (req, res) => {
  try {
    const { user, post } = req.body;
    const existingLike = await Like.findOne({ where: { user, post } });
    if (existingLike) {
      res.status(400).json({ message: 'Post already liked by this user' });
    } else {
      const like = await Like.create({ user, post });
      res.status(201).json({ message: 'Post liked successfully', like });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const unlikePost = async (req, res) => {
  try {
    const { user, post } = req.body;
    const like = await Like.findOne({ where: { user, post } });
    if (!like) {
      res.status(400).json({ message: 'Post not liked by this user' });
    } else {
      await like.destroy();
      res.json({ message: 'Post unliked successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  likePost,
  unlikePost,
};
