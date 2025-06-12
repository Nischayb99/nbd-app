const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config');

/**
 * Middleware to protect routes that require authentication.
 * Verifies the JWT token from cookies and attaches the user to the request.
 */
exports.protect = async (req, res, next) => {
  try {
    const token = req.cookies[config.jwt.cookieName];
    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Not authorized' });
  }
};