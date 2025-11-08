import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  // Not logged in → send to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but wrong role → redirect
  if (requiredRole && role !== requiredRole) {
    return <Navigate to={role === "admin" ? "/admin" : "/user"} replace />;
  }

  // Authorized → render page
  return children;
};

export default ProtectedRoute;
