import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-[#0b141a] via-[#181f2a] to-[#232e36] flex flex-col justify-center">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto py-12 px-4 md:py-20 gap-12">
        {/* Left: Welcome & CTA */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-blue-400 to-cyan-400">
              Auth System
            </span>
          </h1>
          <p className="text-lg md:text-xl text-primary-200 mb-8 max-w-xl mx-auto md:mx-0 drop-shadow">
            <span className="font-semibold text-white">
              Open Source Authentication for Modern Apps
            </span>
            <br />
            <span className="text-primary-400">
              Secure, flexible, and production-ready authentication with Email/Password, Google OAuth, JWT, and more.<br />
              Easily integrate in your own projects – just update the <code>.env</code> file!
            </span>
          </p>
          {isAuthenticated ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/features"
                className="focus:ring-2 focus:ring-blue-400 bg-gradient-to-r from-primary-600 to-blue-500 text-white py-3 px-8 rounded-lg font-semibold text-lg shadow-lg hover:scale-105 hover:from-primary-700 hover:to-blue-600 transition-all"
              >
                Explore Features
              </Link>
              <Link
                to="/profile"
                className="focus:ring-2 focus:ring-blue-400 bg-[#202c33] border border-primary-600 text-primary-200 py-3 px-8 rounded-lg font-semibold text-lg hover:bg-primary-700 hover:text-white transition-colors shadow"
              >
                My Profile
              </Link>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/login"
                className="focus:ring-2 focus:ring-blue-400 bg-gradient-to-r from-primary-600 to-blue-500 text-white py-3 px-8 rounded-lg font-semibold text-lg shadow-lg hover:scale-105 hover:from-primary-700 hover:to-blue-600 transition-all"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="focus:ring-2 focus:ring-blue-400 bg-white border border-primary-600 text-primary-600 py-3 px-8 rounded-lg font-semibold text-lg hover:bg-primary-50 hover:text-primary-700 transition-colors shadow"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
        {/* Right: Illustration */}
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="relative">
            <img
              src="/vite.svg"
              alt="Project Logo"
              className="w-64 h-64 md:w-80 md:h-80 drop-shadow-2xl animate-float"
            />
            <div className="absolute -top-6 -right-6 bg-gradient-to-br from-primary-500 to-blue-400 rounded-full w-16 h-16 blur-2xl opacity-40"></div>
            <div className="absolute bottom-0 left-0 bg-gradient-to-tr from-cyan-400 to-primary-500 rounded-full w-10 h-10 blur-xl opacity-30"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Floating animation for logo */}
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

export default Home;