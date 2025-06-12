const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config');
const crypto = require("crypto");
const getFrontendUrl = require('../utils/getFrontendUrl');
const { sendVerificationEmail, sendResetPasswordEmail } = require("../utils/sendEmail");

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
 * @Description    Register a new user
 * @Route   POST /api/auth/signup
 * @Access  Public
 */
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists (case-insensitive)
    const userExists = await User.findOne({
      $or: [
        { email: new RegExp(`^${email}$`, 'i') },
        { username: new RegExp(`^${username}$`, 'i') }
      ]
    });

    if (userExists) {
      console.error('Signup error: Duplicate user');
      return res.status(400).json({
        success: false,
        message: 'Email or username already exists',
      });
    }

    // Generate verification token
    const emailVerificationToken = crypto.randomBytes(32).toString("hex");
    const emailVerificationExpires = Date.now() + 1000 * 60 * 60 * 24; // 24 hours

    // Create new user with verification fields
    const user = await User.create({
      username,
      email,
      password,
      isVerified: false,
      emailVerificationToken,
      emailVerificationExpires,
    });

    // Send verification email
    const verifyLink = `${getFrontendUrl(req)}/verify-email?token=${emailVerificationToken}`;
    await sendVerificationEmail(email, verifyLink);

    res.status(201).json({
      success: true,
      message: "Signup successful! Please check your email to verify your account.",
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Registration failed',
    });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired token." });
    }

    user.isVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    res.json({ success: true, message: "Email verified successfully!" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(200).json({ success: true, message: "If that email exists, a reset link has been sent." });

  const token = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 1000 * 60 * 60; // 1 hour
  await user.save();

  const resetLink = `${getFrontendUrl(req)}/reset-password?token=${token}`;
  await sendResetPasswordEmail(email, resetLink);

  res.json({ success: true, message: "If that email exists, a reset link has been sent." });
};

exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user) return res.status(400).json({ success: false, message: "Invalid or expired token." });

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.json({ success: true, message: "Password reset successful!" });
};

/**
 * @Description    Login user
 * @Route   POST /api/auth/login
 * @Access  Public
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials', // Generic message
      });
    }

    // Find user by email and explicitly select password field
    const user = await User.findOne({ email }).select('+password');

    // Check if user exists and password is correct
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials', // Generic message
      });
    }

    // Check if email is verified
    if (!user.isVerified) {
      return res.status(403).json({ success: false, message: "Please verify your email before logging in." });
    }

    // Generate JWT token and send as cookie
    const token = generateToken(user);
    sendTokenCookie(res, token);

    // Send user data (without password)
    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed', // Generic message
    });
  }
};

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
