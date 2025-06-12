import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";

const Login = () => {
  const { login, isAuthenticated, loading, error, clearError } = useAuth();
  const { showNotification } = useNotification();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    if (!formData.email || !formData.password) {
      showNotification("error", "Please fill in all fields.");
      return;
    }

    try {
      const result = await login(formData);

      if (result.success) {
        showNotification("success", "Login successfully");
        navigate("/");
      } else {
        showNotification(
          "error",
          result.error || "Login failed. Please try again."
        );
      }
    } catch (error) {
      showNotification(
        "error",
        error.message || "An unexpected error occurred. Please try again."
      );
    }
  };

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

      {/* Right Side (Form) */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-[#202c33] rounded-xl shadow-2xl p-8 border border-primary-900/10">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-2 drop-shadow">
              Login
            </h2>
            <p className="text-primary-200">
              Enter your credentials to access your account
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-primary-200 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 rounded-lg bg-[#2a3942] text-white border border-[#334155] focus:outline-none focus:ring-2 focus:ring-primary-600 transition"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-primary-200 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-2 rounded-lg bg-[#2a3942] text-white border border-[#334155] focus:outline-none focus:ring-2 focus:ring-primary-600 transition"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
              />
            </div>
            {error && (
              <div className="text-red-500 text-xs text-center">{error}</div>
            )}
            <button
              type="submit"
              className="focus:ring-2 focus:ring-blue-400 w-full py-3 rounded-lg bg-gradient-to-r from-primary-600 to-blue-500 hover:from-primary-700 hover:to-blue-600 text-white font-semibold transition disabled:opacity-60 shadow-lg"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-primary-200">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-primary-400 hover:underline font-semibold"
              >
                Sign Up
              </Link>
            </p>
            <p className="text-primary-200 mt-2">
              <Link
                to="/forgot-password"
                className="text-primary-400 hover:underline font-semibold"
              >
                Forgot Password?
              </Link>
            </p>
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