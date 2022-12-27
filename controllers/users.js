const Comment = require('../models/comment');
const Like = require('../models/like');
const Post = require('../models/post');
const User = require('../models/user');

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      include: [
        {
          model : Post,
          as : 'posts'
        },
        {
          model : Comment,
          as : 'comments'
        },
        {
          model: Like,
          as : 'likes',
        }
      ],
    });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUserById,
};
