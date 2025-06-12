import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Signup() {
  const {
    signup,
    isAuthenticated,
    clearError,
    signupSuccess,
    setSignupSuccess,
  } = useAuth();
  const { showNotification } = useNotification();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setFormErrors({});
    clearError();
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.username) errors.username = "Username is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";
    if (formData.password.length < 6)
      errors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    clearError();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    const result = await signup(formData);

    setIsSubmitting(false);

    if (result && result.success) {
      // Show verification message, do not auto-login
      setSignupSuccess(true);
      return;
    } else if (result && result.error) {
      showNotification("error", result.error);
    }
    // If signup fails, error will be shown via Notification below
  };

  if (signupSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b141a]">
        <div className="bg-[#202c33] p-8 rounded-xl shadow-xl text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Check your email!
          </h2>
          <p className="text-primary-200 mb-4">
            We’ve sent a verification link to your email address.
            <br />
            Please verify your email to activate your account.
          </p>
          <Link
            to="/login"
            className="text-primary-400 hover:underline font-semibold"
            onClick={() => setSignupSuccess(false)}
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-65px)] flex flex-col  justify-between md:flex-row bg-gradient-to-br from-[#0b141a] via-[#181f2a] to-[#232e36] pt-8 md:pt-0">
      {/* Left Side (Welcome/Brand) */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 text-white p-12">
        <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">
          Join NBD APP!
        </h1>
        <p className="text-lg mb-8 text-primary-100">
          Create your account to NBD APP.
        </p>
        <img
          src="/vite.svg"
          alt="vite Logo"
          className="w-32 h-32 mb-4 drop-shadow-2xl animate-float"
        />
        <p className="text-primary-100 text-center">
          Secure, modern clean experience.
        </p>
      </div>

      {/* Right Side (Form) */}

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-[#202c33] rounded-xl shadow-2xl p-8 border border-primary-900/10">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-2 drop-shadow">
              Sign Up
            </h2>
            <p className="text-primary-200">
              Create your account to get started
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-primary-200 mb-1"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Choose a unique username"
                className="w-full px-4 py-2 rounded-lg bg-[#2a3942] text-white border border-[#334155] focus:outline-none focus:ring-2 focus:ring-primary-600 transition"
                value={formData.username}
                onChange={handleChange}
                required
                autoComplete="username"
              />
              {formErrors.username && (
                <div className="text-red-500 text-xs mt-1">
                  {formErrors.username}
                </div>
              )}
            </div>
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
                placeholder="your@email.com"
                className="w-full px-4 py-2 rounded-lg bg-[#2a3942] text-white border border-[#334155] focus:outline-none focus:ring-2 focus:ring-primary-600 transition"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
              {formErrors.email && (
                <div className="text-red-500 text-xs mt-1">
                  {formErrors.email}
                </div>
              )}
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
                placeholder="Create a password"
                className="w-full px-4 py-2 rounded-lg bg-[#2a3942] text-white border border-[#334155] focus:outline-none focus:ring-2 focus:ring-primary-600 transition"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
              {formErrors.password && (
                <div className="text-red-500 text-xs mt-1">
                  {formErrors.password}
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-primary-200 mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Re-enter your password"
                className="w-full px-4 py-2 rounded-lg bg-[#2a3942] text-white border border-[#334155] focus:outline-none focus:ring-2 focus:ring-primary-600 transition"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
              {formErrors.confirmPassword && (
                <div className="text-red-500 text-xs mt-1">
                  {formErrors.confirmPassword}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="focus:ring-2 focus:ring-blue-400 w-full py-3 rounded-lg bg-gradient-to-r from-primary-600 to-blue-500 hover:from-primary-700 hover:to-blue-600 text-white font-semibold transition disabled:opacity-60 shadow-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-primary-200">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary-400 hover:underline font-semibold"
              >
                Login
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
}

export default Signup;
