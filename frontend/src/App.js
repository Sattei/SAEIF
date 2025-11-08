import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Media from "./pages/Media";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Donate from "./pages/Donate";
import Login from "./pages/Login";
import AdminLogin from "./pages/adminlogin";
import Membership from "./pages/Membership";
import ArticleDetails from "./pages/ArticleDetails";
import AdminPanel from "./pages/AdminPanel";
import Payment from "./pages/Payment";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import UserPage from "./pages/UserPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/media" element={<Media />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/blog/:id" element={<ArticleDetails />} />

        {/* Protected routes */}
        <Route
          path="/member"
          element={
            <ProtectedRoute requiredRole="member">
              <UserPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
