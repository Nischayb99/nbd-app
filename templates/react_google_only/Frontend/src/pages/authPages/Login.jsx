import { motion } from "framer-motion";

const Login = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col md:flex-row bg-gradient-to-br from-[#0b141a] via-[#181f2a] to-[#232e36] pt-8 md:pt-0">
      {/* Left Side (Welcome) */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 text-white p-12">
        <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">
          Welcome Back!
        </h1>
        <p className="text-lg mb-8 text-primary-100">
          Sign in to continue to{" "}
          <span className="font-bold text-white">NBD APP</span>
        </p>
        <img
          src="/vite.svg"
          alt="vite logo"
          className="w-32 h-32 mb-4 drop-shadow-2xl animate-float"
        />
        <p className="text-primary-100 text-center">
          Secure, modern and Clean Authentication Application.
        </p>
      </div>

      {/* Right Side (Google Login Only) */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-[#202c33] rounded-xl shadow-2xl p-8 border border-primary-900/10">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-2 drop-shadow">
              Login
            </h2>
          </div>
          <div className="flex flex-col space-y-4">
            <div className="w-full gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <a
                  href={import.meta.env.VITE_GOOGLE_AUTH_URL}
                  className="w-full content-center flex items-center justify-center p-2 rounded-lg text-[#1e1e1e] bg-[#f9fafb] hover:bg-[#f0f0f0]/80 transition font-semibold text-[1.2rem]"
                >
                  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                    <path d="M1 1h22v22H1z" fill="none" />
                  </svg>
                  <p className="">Google</p>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
          .animate-float {
            animation: floatY 3s ease-in-out infinite;
          }
          @keyframes floatY {
            0%, 100% { transform: translateY(0);}
            50% { transform: translateY(-18px);}
          }
        `}
      </style>
    </div>
  );
};

export default Login;