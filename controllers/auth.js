const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const signup = async (req, res) => {
  try {
    const { username, password, name } = req.body;
    const user = await User.create({
      username,
      password: bcrypt.hashSync(password, 10),
      name,
    });
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  signup,
  login
}
