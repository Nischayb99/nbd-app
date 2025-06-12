const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const getFrontendUrl = require('../utils/getFrontendUrl');

// Auth routes
router.post('/signup', authController.signup);
router.get("/verify-email", authController.verifyEmail);
router.post('/login', authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

// Google login start
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google callback
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }), // static string
  (req, res) => {
    const jwt = require('jsonwebtoken');
    const config = require('../config');
    const getFrontendUrl = require('../utils/getFrontendUrl');
    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: config.jwt.expiresIn }
    );
    res.cookie(
      config.jwt.cookieName,
      token,
      config.jwt.cookieOptions
    );
    // Yahan req available hai!
    res.redirect(`${getFrontendUrl(req)}/profile`);
  }
);


router.get('/logout', authController.logout); // Now public
router.get('/me', protect, authController.getMe);
router.put('/update-profile', protect, authController.updateProfile);

module.exports = router;