const express = require('express');
const bodyParser = require('body-parser');
//const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
const commentsRoutes = require('./routes/comments');
const usersRoutes = require('./routes/users');
const likesRoutes = require('./routes/likes')

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/like',likesRoutes);
app.use('/api/users', usersRoutes);

module.exports = app;
