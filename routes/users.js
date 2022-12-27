const express = require('express');
const jwtMiddleware = require('../middleware/jwt');
const { getUserById } = require('../controllers/users');

const router = express.Router();

router.get('/:id', jwtMiddleware, getUserById);

module.exports = router;
