import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Adjust the path as needed

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { role } = useAuth(); // Get the user info from context

  // Check if the user is authorized
  const isAuthorized = role && allowedRoles.includes(role);

  return isAuthorized ? element : <Navigate to="/unauthorized" replace />;
};

export default ProtectedRoute;
