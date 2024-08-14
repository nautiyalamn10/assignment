const jwt = require('jsonwebtoken');

exports.isAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden', error: 'Invalid token' });
      }
      if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden', error: 'Insufficient privileges' });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: 'Unauthorized', error: 'No token provided' });
  }
};