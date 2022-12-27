const jwt = require('jsonwebtoken');

const checkJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: 'Unauthorized' });
  } else {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  }
};

module.exports = {
  checkJwt,
};
