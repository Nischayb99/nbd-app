const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config');

/**
 * Middleware to protect routes that require authentication
 * Verifies the JWT token from cookies and attaches the user to the request
 */
exports.protect = async (req, res, next) => {
  try {
    // Get token from cookie
    const token = req.cookies[config.jwt.cookieName];

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized',
      });
    }

    // Verify token (no fallback, only env var)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized',
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized',
    });
  }
};