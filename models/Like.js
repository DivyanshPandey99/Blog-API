const Sequelize = require('sequelize');
const db = require('../config/database');
const User = require('./user');
const Post = require('./post');

const Like = db.define('like', {});

Like.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Like.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
User.belongsToMany(Post, { through: Like, as: 'likedPosts' });
Post.belongsToMany(User, { through: Like, as: 'likedBy' });

module.exports = Like;
