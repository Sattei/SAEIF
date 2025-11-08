import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const token = sessionStorage.getItem("token");
      const role = sessionStorage.getItem("role");

      if (!token) {
        setIsAllowed(false);
      } else if (requiredRole && role !== requiredRole) {
        setIsAllowed(false);
      } else {
        setIsAllowed(true);
      }

      setIsLoading(false);
    }, 100); // short delay to ensure sessionStorage updates

    return () => clearTimeout(timer);
  }, [requiredRole]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Checking authorization...
      </div>
    );
  }

  if (!sessionStorage.getItem("token")) {
    return <Navigate to="/login" replace />;
  }

  const role = sessionStorage.getItem("role");
  if (requiredRole && role !== requiredRole) {
    return <Navigate to={role === "admin" ? "/admin" : "/member"} replace />;
  }

  return children;
};

export default ProtectedRoute;
