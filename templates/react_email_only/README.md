# NBD APP – Auth System

A modern, open-source authentication system for your apps.  
Built with React (Vite), Node.js, Express, MongoDB and JWT.  
**Easy to set up, easy to customize, production-ready.**

---

## 🚀 Features

- Email/password signup & login
- JWT authentication (HTTP-only cookies)
- Email verification & password reset
- Secure, scalable, and ready for deployment
- SPA routing (React Router)
- Environment-based config for easy deployment

---

## 🗂️ Project Structure

```
Auth-System/
  ├── Backend/         # Express API
  └── Frontend/        # React (Vite) app
```

---

## ⚡ Quick Start

### **Install dependencies**

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

**Is project ko chalane ke liye aapko ek hi `.env` file ki sample yahan di gayi hai.  
Aap isko `env.example` naam se project root me bana sakte hain, ya backend/frontend ke liye alag-alag copy kar sakte hain.**

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

# Email (for verification & reset)
APP_NAME=your_application_name
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_gmail_app_password

# ==== FRONTEND ENV ====
VITE_API_URL=http://localhost:5000/api
```

**Note:**  
- Backend ke liye upar ke variables `Backend/.env` me copy karein.  
- Frontend ke liye neeche ke variables `Frontend/.env` me copy karein.  
- Kabhi bhi apne real secrets (`EMAIL_PASS`, `JWT_SECRET`, etc.) public repo me na daalein.

---

## 📝 Important Setup Notes

### **Gmail App Password Setup**
1. Apne Gmail account me 2-Step Verification enable karein.
2. [App Passwords](https://myaccount.google.com/apppasswords) se ek password generate karein.
3. Us password ko `EMAIL_PASS` me dalein.

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
| EMAIL_USER                | Gmail address for sending emails            |
| EMAIL_PASS                | Gmail App Password (not your real password) |
| VITE_API_URL (Backend)    | Frontend → Backend API base URL             |


---

## 🧑‍💻 Contributing

- Fork this repo
- Create a new branch
- Make your changes
- Open a pull request!

---

**Happy Coding! 🚀**