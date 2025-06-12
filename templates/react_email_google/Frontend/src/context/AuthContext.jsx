import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/api";
import { useNotification } from "./NotificationContext";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const { user } = await authService.getCurrentUser();
        setUser(user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
        setIsInitialized(true);
      }
    };

    checkUserLoggedIn();
  }, []);

  const signup = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const result = await authService.signup(userData);
      if (result.success) {
        setSignupSuccess(true);
        showNotification(
          "success",
          "Signup successful! Please check your email to verify your account."
        );
        return { success: true };
      } else {
        setError(result.message);
        return { success: false, error: result.message };
      }
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      const result = await authService.login(credentials);
      if (result.user) {
        setUser(result.user);
        showNotification("success", "Login successfully");
        navigate("/");
        return { success: true };
      } else {
        setError(result.message);
        return { success: false, error: result.message };
      }
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
      setUser(null);
      showNotification("success", "Logged out successfully");
      navigate("/");
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  // This function is used to update the user profile information
  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      const { user: updatedUser } = await authService.updateProfile(userData);
      setUser(updatedUser);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    signup,
    login,
    logout,
    updateProfile,
    clearError,
    isAuthenticated: !!user,
    isInitialized,
    signupSuccess,
    setSignupSuccess,
  };

  if (!isInitialized) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
