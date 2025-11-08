import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // Make sure Link is imported
import { FaGoogle, FaLinkedin } from "react-icons/fa";

const API = process.env.REACT_APP_API || "";

const Login = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loginMethod, setLoginMethod] = useState("email"); // 'email' or 'phone'
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");

    if (token) {
      // Redirect if already logged in
      if (role === "admin") {
        navigate("/admin");
        window.location.reload();
      } else {
        navigate("/member");
        window.location.reload();
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    console.log("Connecting to API at:", API);

    try {
      if (!API) {
        throw new Error(
          "API endpoint is not configured. (Check .env file for REACT_APP_API)"
        );
      }

      const body =
        loginMethod === "email"
          ? { email: emailOrPhone, password }
          : { phone: emailOrPhone, password };

      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      // Save credentials
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("role", data.role);
      sessionStorage.setItem("userId", data.userId);

      // Redirect
      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/member");
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-darkblue to-primary">
      <section
        id="login-section"
        className="py-20 px-4 min-h-screen flex items-center justify-center bg-gray-50"
      >
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Member Login
              </h2>
              <p className="text-gray-600">
                Access your exclusive member dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Login Method Tabs */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => {
                    setLoginMethod("email");
                    setEmailOrPhone("");
                    setPassword("");
                  }}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${
                    loginMethod === "email"
                      ? "bg-white text-accent shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Email
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLoginMethod("phone");
                    setEmailOrPhone("");
                    setPassword("");
                  }}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${
                    loginMethod === "phone"
                      ? "bg-white text-accent shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Phone
                </button>
              </div>

              {/* Input Fields */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {loginMethod === "email" ? "Email Address" : "Phone Number"}
                </label>
                <input
                  type={loginMethod === "email" ? "email" : "tel"}
                  placeholder={
                    loginMethod === "email"
                      ? "your.email@example.com"
                      : "Enter 10-digit phone number"
                  }
                  value={emailOrPhone}
                  onChange={(e) => {
                    if (loginMethod === "phone") {
                      // Only numeric input up to 10 digits
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10);
                      setEmailOrPhone(value);
                    } else {
                      setEmailOrPhone(e.target.value);
                    }
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition"
                  required
                />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-gray-300 text-accent focus:ring-accent"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Remember me
                  </span>
                </label>

                {/* --- MODIFICATION HERE --- */}
                {/* Changed <button> to <Link> and added 'to' prop */}
                <Link
                  to="/forgot-password"
                  className="text-sm text-accent hover:text-accent/80 transition"
                >
                  Forgot password?
                </Link>
                {/* --- END MODIFICATION --- */}
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent text-white py-3 px-6 rounded-lg font-semibold hover:bg-accent/90 transition disabled:opacity-50"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>

              {/* Social Login */}
              <div className="text-center">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <button
                    type="button"
                    className="flex items-center justify-center space-x-2 bg-white border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 transition"
                  >
                    <FaGoogle className="text-red-500" />
                    <span className="text-sm">Google</span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center space-x-2 bg-white border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 transition"
                  >
                    <FaLinkedin className="text-blue-600" />
                    <span className="text-sm">LinkedIn</span>
                  </button>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-accent hover:text-accent/80 font-medium"
                  >
                    Sign up now
                  </Link>
                </p>
              </div>

              <div className="text-center mt-4">
                <Link
                  to="/admin-login"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Admin Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
