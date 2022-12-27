const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const db = require('../config/database');
const Post = require('./post');
const Comment = require('./comment');
const Like = require('./like');

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
  },
});


User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });
User.belongsToMany(Post, { through: Like, as: 'likedPosts' });
Post.belongsToMany(User, { through: Like, as: 'likedBy' });

module.exports = User;
