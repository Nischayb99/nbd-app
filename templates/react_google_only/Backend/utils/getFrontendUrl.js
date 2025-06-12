function getFrontendUrl(req) {
  // 1. Try to detect from Origin header
  const origin = req.headers.origin || '';
  if (origin.includes('localhost')) {
    return process.env.LOCALHOST_FRONTEND_URL;
  }
  if (origin && origin.includes('vercel.app')) {
    return process.env.PRODUCTION_FRONTEND_URL;
  }

  // 2. Try to detect from Referer header (for some OAuth/callback flows)
  const referer = req.headers.referer || '';
  if (referer.includes('localhost')) {
    return process.env.LOCALHOST_FRONTEND_URL;
  }
  if (referer.includes('vercel.app')) {
    return process.env.PRODUCTION_FRONTEND_URL;
  }

  // 3. Special case: Google OAuth callback (no origin/referer)
  // If callback URL is localhost, use local frontend
  if (
    (process.env.GOOGLE_CALLBACK_URL && process.env.GOOGLE_CALLBACK_URL.includes('localhost')) ||
    process.env.NODE_ENV === 'development'
  ) {
    return process.env.LOCALHOST_FRONTEND_URL;
  }

  // 4. Default: Production
  return process.env.PRODUCTION_FRONTEND_URL;
}
module.exports = getFrontendUrl;