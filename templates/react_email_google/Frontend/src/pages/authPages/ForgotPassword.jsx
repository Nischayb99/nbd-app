import { useState } from "react";
import { useNotification } from "../../context/NotificationContext";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { showNotification } = useNotification();
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (data.success) {
      setSent(true);
      showNotification("success", data.message);
    } else {
      showNotification("error", data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b141a]">
      <form onSubmit={handleSubmit} className="bg-[#202c33] p-8 rounded-xl shadow-xl text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Forgot Password</h2>
        {sent ? (
          <p className="text-primary-200">If that email exists, a reset link has been sent.</p>
        ) : (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg bg-[#2a3942] text-white border border-[#334155] mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-semibold"
            >
              Send Reset Link
            </button>
          </>
        )}
      </form>
    </div>
  );
}