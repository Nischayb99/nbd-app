import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    setIsMobileMenuOpen(false);
  };

  // Helper for active link styling
  const isActive = (path) =>
    location.pathname === path
      ? "bg-primary-500 text-white shadow-md"
      : "hover:bg-primary-400 hover:text-white";

  return (
    <nav className="bg-gradient-to-r from-[#5e91ff] via-pink-600 to-[#fddede]  text-black sticky top-0 z-30 shadow-3xl ">
      <div className="max-w-8xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center justify-between w-full">
            {/* Logo */}
            <div>
              <Link
                to="/"
                className="ml-4 flex items-center gap-2 text-2xl font-extrabold tracking-tight group"
              >
                <span className="bg-gradient-to-r from-[#bb4747] via-[#ff34ff] to-[#fff] bg-clip-text text-transparent group-hover:from-primary-100 group-hover:to-blue-400 transition-colors">
                  NBD APP
                </span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-2">
              <Link
                to="/"
                className={`px-4 py-2 rounded transition font-semibold ${isActive(
                  "/"
                )}`}
              >
                Home
              </Link>
              {isAuthenticated && (
                <>
                  <Link
                    to="/features"
                    className={`px-4 py-2 rounded transition font-semibold ${isActive(
                      "/features"
                    )}`}
                  >
                    Features
                  </Link>
                  <Link
                    to="/pricing"
                    className={`px-4 py-2 rounded transition font-semibold ${isActive(
                      "/pricing"
                    )}`}
                  >
                    Pricing
                  </Link>
                  <Link
                    to="/about"
                    className={`px-4 py-2 rounded transition font-semibold ${isActive(
                      "/about"
                    )}`}
                  >
                    About
                  </Link>
                </>
              )}
              {!isAuthenticated && (
                <>
                  <Link
                    to="/login"
                    className={`px-4 py-2 rounded transition font-semibold ${isActive(
                      "/login"
                    )}`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="ml-2 px-4 py-2 rounded bg-gradient-to-r from-blue-400 to-cyan-400 text-primary-900 font-bold shadow hover:from-blue-500 hover:to-cyan-500 transition"
                  >
                    Sign Up
                  </Link>
                </>
              )}
              {isAuthenticated && (
                <>
                  <Link
                    to="/profile"
                    className="p-2 rounded-full transition font-semibold hover:bg-primary-200 mx-4"
                  >
                    <img
                      src={user?.avatar || "/df-avatar.png"}
                      alt={user?.username}
                      className="w-8 h-8 rounded-full border-2 border-[#2b2b2b] "
                    />
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-primary-500 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-7 w-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden w-2/3 absolute right-4 top-16 bg-[#e96bff] shadow-lg rounded-md z-50">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link
              to="/"
              className={`block px-4 py-2 rounded font-semibold transition ${isActive(
                "/"
              )}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/features"
                  className={`block px-4 py-2 rounded font-semibold transition ${isActive(
                    "/features"
                  )}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  to="/pricing"
                  className={`block px-4 py-2 rounded font-semibold transition ${isActive(
                    "/pricing"
                  )}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  to="/about"
                  className={`block px-4 py-2 rounded font-semibold transition ${isActive(
                    "/about"
                  )}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center gap-3 p-2 rounded-full transition font-semibold hover:bg-primary-300 hover:text-white mx-9"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <img
                    src={user?.avatar || "/df-avatar.png"}
                    alt={user?.username}
                    className="w-8 h-8 rounded-full border-2 border-[#2b2b2b] "
                  />
                  <span className="text-base font-semibold hover:text-white">
                    {user?.username}
                  </span>
                </Link>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className={`block px-4 py-2 rounded font-semibold transition ${isActive(
                    "/login"
                  )}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-4 py-2 rounded bg-gradient-to-r from-blue-400 to-cyan-400 text-primary-900 font-bold shadow hover:from-blue-500 hover:to-cyan-500 transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
