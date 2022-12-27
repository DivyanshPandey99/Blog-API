const Sequelize = require('sequelize');
const db = require('../config/database');
const User = require('./user');
const Comment = require('./comment');
const Like = require('./like');

const Post = db.define('post', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  category: {
    type: Sequelize.STRING,
  },
  keywords: {
    type: Sequelize.STRING,
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
  },
});

Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });
Post.belongsTo(User, { foreignKey: 'userId', as: 'author' });
Post.belongsToMany(User, { through: Like, as: 'likedBy' });
User.belongsToMany(Post, { through: Like, as: 'likedPosts' });

module.exports = Post;
