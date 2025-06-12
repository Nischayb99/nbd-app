# nbd-app 🚀

**nbd-app** is a powerful CLI tool that scaffolds production-ready, full-stack authentication starter projects. Get up and running in seconds with React, Node.js, Express, Tailwind CSS, and multiple authentication providers.

[![npm version](https://badge.fury.io/js/nbd-app.svg)](https://badge.fury.io/js/nbd-app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Features

- 🎯 **Multiple Auth Options**: Email verification, Google OAuth, and more
- ⚡ **Lightning Fast**: Vite + React for blazing fast development
- 🎨 **Beautiful UI**: Pre-configured Tailwind CSS styling
- 🔒 **Production Ready**: Security best practices built-in
- 🛠️ **Full Stack**: Complete frontend + backend setup
- 📱 **Responsive**: Mobile-first design approach
- 🚀 **Zero Config**: Works out of the box

## 🚀 Quick Start

**Run directly (recommended):**
```bash
npx nbd-app@latest
```

**❌ Don't install globally** _(to always get the latest version)_

## 🎯 Interactive Setup

The CLI will guide you through:

1. **Project Name** - Your project folder name
2. **Package Name** - NPM package name
3. **Language** - JavaScript (TypeScript coming soon)
4. **Framework** - React JS (Next.js coming soon)
5. **Auth Template** - Choose your authentication setup

## 📋 Available Templates

### 🔐 Authentication Options
- **Email + Google** - Complete auth with email verification and Google OAuth
- **Email Only** - Traditional email/password with verification
- **Google Only** - Simple Google OAuth login

### 🔮 Coming Soon
- Facebook, GitHub, Twitter OAuth
- TypeScript support
- Next.js templates
- Database integrations (MongoDB, PostgreSQL)

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Super fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **JWT** - JSON Web Tokens for auth
- **Bcrypt** - Password hashing
- **Nodemailer** - Email service

## 📁 Project Structure

```
your-project/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.jsx
│   ├── public/
│   └── package.json
├── backend/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   ├── controllers/
│   └── server.js
├── .env.example
└── README.md
```

## 🚀 Getting Started

After creating your project:

```bash
# Navigate to your project
cd your-project-name

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your credentials

# Start development servers
npm run dev
```

## 🔧 Configuration

### Environment Variables
```env
# Database
DATABASE_URL=your_database_url

# JWT
JWT_SECRET=your_jwt_secret

# Email Service
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password

# Google OAuth (if using Google auth)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## 📚 Documentation

### Authentication Flow
1. **Email Verification** - Users receive verification emails
2. **Secure Login** - JWT tokens with refresh mechanism
3. **Protected Routes** - Frontend and backend route protection
4. **Password Reset** - Secure password reset flow

### API Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify/:token` - Email verification
- `POST /api/auth/forgot-password` - Password reset
- `GET /api/auth/google` - Google OAuth

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Add Templates** - Create new authentication templates
2. **Report Bugs** - Open issues for any problems
3. **Feature Requests** - Suggest new features
4. **Documentation** - Improve our docs

### Adding New Templates
```bash
# Create a new template folder
templates/
├── react_facebook_auth/
│   ├── frontend/
│   ├── backend/
│   └── README.md
```

## 📊 Roadmap

- [ ] TypeScript support
- [ ] Next.js templates
- [ ] Vue.js support
- [ ] Database integrations
- [ ] Docker support
- [ ] Testing setup
- [ ] CI/CD templates

## 🐛 Issues & Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/Nischayb99/nbd-app/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/Nischayb99/nbd-app/discussions)
- 📧 **Email**: nischayb99@gmail.com

## 📜 License

[MIT](./LICENSE) © [Nischay Bandodiya](https://github.com/Nischayb99)

## 🙏 Acknowledgments

- Thanks to all contributors
- Inspired by create-react-app and similar tools
- Built with ❤️ for the developer community

---

<div align="center">

**⭐ Star this repo if it helped you!**

Made with ❤️ by [Nischay Bandodiya](https://github.com/Nischayb99)

</div>