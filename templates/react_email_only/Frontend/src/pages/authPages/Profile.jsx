import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { IoPersonAddOutline } from "react-icons/io5";
import { TbUserEdit } from "react-icons/tb";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { BsChatLeftText } from "react-icons/bs";
import { useNotification } from "../../context/NotificationContext";
import Footer from "../../components/Footer";

function Profile() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  

  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col bg-gradient-to-br from-[#0b141a] via-[#181f2a] to-[#232e36] pt-8 md:pt-0">
      <div className="w-full max-w-4xl mx-auto flex-1 px-4 py-8">
        {/* User Profile Section */}
        <div className="bg-[#202c33] border-t border-[#2a3942] shadow-lg rounded-xl overflow-hidden mb-10">
          <div className="bg-gradient-to-r from-primary-600 to-blue-500 text-white p-6 rounded-t-xl">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <img
                  src={user?.avatar || "/df-avatar.png"}
                  alt={user?.username}
                  className="w-10 h-10 rounded-full border-2 border-primary-200 object-cover"
                />
                Profile
              </h1>
              <div className="space-x-4 flex items-center">
                <button
                  onClick={() => navigate("/edit-profile")}
                  className="focus:ring-2 focus:ring-blue-400 flex items-center gap-2 px-4 py-2 bg-primary-700 hover:bg-primary-800 text-white rounded-md transition-colors shadow"
                >
                  <TbUserEdit /> Edit Profile
                </button>
                <button
                  onClick={logout}
                  className="focus:ring-2 focus:ring-blue-400 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors shadow"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col items-center">
                <img
                  src={user?.avatar || "/df-avatar.png"}
                  alt={user?.username}
                  className="w-32 h-32 rounded-full border-4 border-primary-200 mb-4 object-cover shadow-lg"
                />
                <h2 className="text-2xl font-bold text-white mb-1">
                  {user?.username}
                </h2>
                <p className="text-primary-200">{user?.email}</p>
                {user?.bio && (
                  <p className="text-primary-300 mt-2 text-center">{user.bio}</p>
                )}
              </div>

              <div className="bg-[#232e36] p-4 rounded-lg flex flex-col justify-center">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Account Info
                </h3>
                <div className="space-y-3">
                  <p className="text-white">
                    <span className="font-medium">Member Since:</span>{" "}
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                  <p className="text-white">
                    <span className="font-medium">Status:</span>{" "}
                    <span className="text-green-500">Active</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;