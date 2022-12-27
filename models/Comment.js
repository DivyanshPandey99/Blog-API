const Sequelize = require('sequelize');
const db = require('../config/database');
const User = require('./user');
const Post = require('./post');

const Comment = db.define('comment', {
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  postId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'posts',
      key: 'id',
    },
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
  },
});

Comment.belongsTo(User, { foreignKey: 'userId', as: 'author' });
Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });
User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });

module.exports = Comment;
