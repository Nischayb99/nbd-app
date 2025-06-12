module.exports = {
  jwt: {
    secret: process.env.JWT_SECRET, // No fallback!
    expiresIn: '7d',
    cookieName: 'token',
    cookieOptions: {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    },
  },
  bcrypt: {
    saltRounds: 10, // Add this for password hashing
  },
  // ...other config
};