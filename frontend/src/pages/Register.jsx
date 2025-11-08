import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_API || "";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");

    if (token) {
      // If a user is already logged in, redirect them
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/member");
      }
    }
  }, [navigate]);

  // [CODE FROM sattei/saeif/SAEIF-88d4c16d015f1ccaef88c51bcd1c5f45d5008407/frontend/src/pages/Register.jsx]

  // ... [imports and component start] ...

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // 1. Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // 2. Send request to the backend API
      const response = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle errors from the server (e.g., "User already exists")
        throw new Error(data.error || "Failed to register");
      }

      // --- FIX: Removed automatic login ---
      // 3. (Optional) If registration is successful, log the user in
      // sessionStorage.setItem("token", data.token);
      // sessionStorage.setItem("role", data.role);
      // sessionStorage.setItem("userId", data.userId);
      // --- END FIX ---

      // 4. Redirect to the login page
      // You could also add a success message here before redirecting
      // alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  // ... [rest of the component and export] ...

  return (
    <div className="container mx-auto p-4 max-w-md">
      {" "}
      {/* Basic container */}
      <h1 className="text-3xl font-bold mb-6">Register</h1>
      <form onSubmit={handleSubmit}>
        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        {/* Confirm Password Field */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
