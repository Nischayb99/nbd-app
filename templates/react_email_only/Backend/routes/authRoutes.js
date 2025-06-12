const express = require('express');
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
router.get('/logout', authController.logout); // Now public
router.get('/me', protect, authController.getMe);
router.put('/update-profile', protect, authController.updateProfile);

module.exports = router;