import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const API = process.env.REACT_APP_API || "";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Pre-fill email if passed from ForgotPassword page
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      if (!API) {
        throw new Error(
          "API endpoint is not configured. (Check .env file for REACT_APP_API)"
        );
      }

      const res = await fetch(`${API}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to reset password.");
      }

      setMessage(data.message);

      // On success, show message and redirect to login
      setTimeout(() => {
        navigate("/login");
      }, 3000); // 3-second delay
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-darkblue to-primary">
      <section
        id="reset-password-section"
        className="py-20 px-4 min-h-screen flex items-center justify-center bg-gray-50"
      >
        <div className="container mx-auto max-w-lg">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Reset Password
              </h2>
              <p className="text-gray-600">
                Enter your email, reset code, and new password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reset Code (OTP)
                </label>
                <input
                  type="text"
                  placeholder="Enter the 6-digit code from your email"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {message && (
                <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg">
                  {message} (Redirecting to login...)
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent text-white py-3 px-6 rounded-lg font-semibold hover:bg-accent/90 transition disabled:opacity-50"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>

              <div className="text-center">
                <p className="text-gray-600">
                  Remembered your password?{" "}
                  <Link
                    to="/login"
                    className="text-accent hover:text-accent/80 font-medium"
                  >
                    Back to Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPassword;
