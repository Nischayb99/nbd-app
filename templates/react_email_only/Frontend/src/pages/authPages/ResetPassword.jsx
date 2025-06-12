import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const token = new URLSearchParams(useLocation().search).get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    const data = await res.json();
    if (data.success) {
      showNotification("success", "Password reset successful! You can now login.");
      navigate("/login");
    } else {
      showNotification("error", data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b141a]">
      <form onSubmit={handleSubmit} className="bg-[#202c33] p-8 rounded-xl shadow-xl text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Reset Password</h2>
        <input
          type="password"
          placeholder="Enter new password"
          className="w-full px-4 py-2 rounded-lg bg-[#2a3942] text-white border border-[#334155] mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-semibold"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}