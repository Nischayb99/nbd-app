const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config');
const crypto = require("crypto");
const getFrontendUrl = require('../utils/getFrontendUrl');

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

/**
 * Generate a JWT token for the user
 * @param {Object} user - User object with id 
 * @returns {String} JWT token
 */
const generateToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not set in environment variables');
  }
  return jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: config.jwt.expiresIn }
  );
};

/**
 * Set JWT token in HTTP-only cookie
 * @param {Object} res - Express response object
 * @param {String} token - JWT token
 */
const sendTokenCookie = (res, token) => {
  res.cookie(
    config.jwt.cookieName,
    token,
    config.jwt.cookieOptions
  );
};


// Google Strategy Setup
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    let user = await User.findOne({ email: profile.emails[0].value });
    if (!user) {
      user = await User.create({
        username: profile.displayName,
        email: profile.emails[0].value,
        isVerified: true,
        password: Math.random().toString(36), // random password
      });
    }
    return done(null, user);
  }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

/**
 * @Description    Logout user
 * @Route   GET /api/auth/logout
 * @Access  Private
 */
exports.logout = async (req, res) => {
  try {
    // Clear the auth cookie with same options as set
    res.clearCookie(config.jwt.cookieName, config.jwt.cookieOptions);

    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Logout failed', // Generic message
    });
  }
};

/**
 * @Description    Get current logged in user profile
 * @Route   GET /api/auth/me
 * @Access  Private
 */
exports.getMe = async (req, res) => {
  try {
    // User is already attached to req by the protect middleware
    // Remove sensitive fields if any
    const { password, ...safeUser } = req.user._doc || req.user;
    res.status(200).json({
      success: true,
      user: safeUser,
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get user data', // Generic message
    });
  }
};

/**
 * @Description    Update user profile
 * @Route   PUT /api/auth/update
 * @Access  Private
 */
exports.updateProfile = async (req, res) => {
  try {
    const { username, email, avatar, bio } = req.body;
    const userId = req.user._id;

    // Check if username or email already exists for another user
    const existingUser = await User.findOne({
      $and: [
        { _id: { $ne: userId } },
        {
          $or: [
            { username: new RegExp(`^${username}$`, 'i') },
            { email: new RegExp(`^${email}$`, 'i') }
          ]
        }
      ]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Username or email already taken'
      });
    }

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        username,
        email,
        avatar,
        bio
      },
      { new: true, select: '-password' }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile'
    });
  }
};
