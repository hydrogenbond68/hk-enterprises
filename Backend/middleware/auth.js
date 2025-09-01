const jwt = require('jsonwebtoken');

module.exports = (requiredRole) => (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send('Access denied');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    if (requiredRole && decoded.role !== requiredRole) return res.status(403).send('Forbidden');
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};