import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const { role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call logout from context
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-200 flex flex-col justify-between p-4">
        <div>
          <h3 className="font-bold text-xl mb-4">Sidebar</h3>

          <Link to="/dashboard" className="block mb-2">
            Dashboard
          </Link>
          {role === "admin" && (
            <Link to="/users" className="block mb-2">
              User
            </Link>
          )}
          <Link to="/students" className="block mb-2">
            Students
          </Link>
        </div>
        <button
          onClick={handleLogout}
          className="mt-4 p-2 bg-red-500 text-white rounded w-full"
        >
          Logout
        </button>
      </div>
      <div className="w-3/4 p-6 overflow-auto">{children}</div>
    </div>
  );
};

export default Layout;
