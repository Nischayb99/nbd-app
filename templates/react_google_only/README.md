# NBD APP – Google Auth Only

A modern, open-source authentication system for your apps.  
**Now simplified: Only Google OAuth login is enabled.**  
Built with React (Vite), Node.js, Express, MongoDB, JWT, and Google OAuth.

---

## 🚀 Features

- **Google OAuth login only**
- JWT authentication (HTTP-only cookies)
- Secure, scalable, and ready for deployment
- SPA routing (React Router)
- Environment-based config for easy deployment

---

## 🗂️ Project Structure

```
Auth-System/
  ├── Backend/         # Express API (Google OAuth only)
  └── Frontend/        # React (Vite) app (Google login only)
```

---

## ⚡ Quick Start

### 1. **Clone the repository**

```bash
git clone https://github.com/your-username/Auth-System.git
cd Auth-System
```

### 2. **Install dependencies**

#### Backend:
```bash
cd Backend
npm install
```

#### Frontend:
```bash
cd ../Frontend
npm install
```

---

## ⚙️ Environment Variables

**Google Auth only version: Use these variables in your `.env` files.**

### 🔑 **Sample `.env` file (for both Backend & Frontend)**

```env
# ==== BACKEND ENV ====
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

# Frontend URLs
LOCALHOST_FRONTEND_URL=http://localhost:5173
PRODUCTION_FRONTEND_URL=https://your-frontend-domain.vercel.app

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# ==== FRONTEND ENV ====
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_AUTH_URL=http://localhost:5000/api/auth/google
```

**Note:**  
- Backend ke liye upar ke variables `Backend/.env` me copy karein.  
- Frontend ke liye neeche ke variables `Frontend/.env` me copy karein.  
- Kabhi bhi apne real secrets (`JWT_SECRET`, etc.) public repo me na daalein.

---

## 📝 Important Setup Notes

### **Google OAuth Setup**
1. [Google Cloud Console](https://console.cloud.google.com/apis/credentials) par jaakar OAuth Client ID banayein.
2. "Authorized JavaScript origins" me apne frontend URLs (local aur production) add karein.
3. "Authorized redirect URIs" me backend callback URLs add karein.
4. Client ID aur Secret ko `.env` me dalein.

---

## 🖥️ Running Locally

### 1. **Start Backend**
```bash
cd Backend
npm run dev
```

### 2. **Start Frontend**
```bash
cd ../Frontend
npm run dev
```

- Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🌐 Deployment

### **Frontend (Vercel/Netlify):**
- Netlify par deploy karte waqt, `public/_redirects` file zarur ho:
  ```
  /* /index.html 200
  ```
- Vercel par agar API rewrites chahiye toh `vercel.json` ka use karein.

### **Backend (Render/Heroku):**
- Sabhi backend env variables apne cloud provider ki dashboard par set karein.

---

## 🔑 Environment Variable Reference

| Variable                  | Description                                 |
|---------------------------|---------------------------------------------|
| PORT                      | Backend server port                         |
| NODE_ENV                  | `development` or `production`               |
| MONGO_URI                 | MongoDB connection string                   |
| JWT_SECRET                | JWT signing secret                          |
| JWT_EXPIRES_IN            | JWT expiry (e.g. 7d)                        |
| LOCALHOST_FRONTEND_URL    | Local frontend URL                          |
| PRODUCTION_FRONTEND_URL   | Deployed frontend URL                       |
| GOOGLE_CLIENT_ID          | Google OAuth client ID                      |
| GOOGLE_CLIENT_SECRET      | Google OAuth client secret                  |
| GOOGLE_CALLBACK_URL       | Google OAuth callback URL                   |
| VITE_API_URL              | Frontend → Backend API base URL             |
| VITE_GOOGLE_AUTH_URL      | Frontend → Google OAuth start URL           |

---

## 🧑‍💻 Contributing

- Fork this repo
- Create a new branch
- Make your changes
- Open a pull request!

---

## 📄 License

MIT

---

**Happy Coding! 🚀**