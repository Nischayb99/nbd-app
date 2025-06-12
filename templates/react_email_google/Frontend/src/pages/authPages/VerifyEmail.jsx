import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

const VerifyEmail = () => {
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link.");
      return;
    }
    fetch(`/api/auth/verify-email?token=${token}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStatus("success");
          setMessage("Email verified successfully! You can now log in.");
        } else {
          setStatus("error");
          setMessage(data.message || "Verification failed.");
        }
      })
      .catch(() => {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      });
  }, [location.search]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b141a]">
      <div className="bg-[#202c33] p-8 rounded-xl shadow-xl text-center">
        {status === "loading" && (
          <div className="text-primary-200">Verifying your email...</div>
        )}
        {status !== "loading" && (
          <>
            <h2 className="text-2xl font-bold text-white mb-4">
              {status === "success" ? "Verified!" : "Verification Failed"}
            </h2>
            <p className="text-primary-200 mb-4">{message}</p>
            <Link to="/login" className="text-primary-400 hover:underline font-semibold">
              Go to Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;