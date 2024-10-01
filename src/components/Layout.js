import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiUsers, FiHome, FiUser, FiLogOut } from "react-icons/fi"; // Icons from react-icons

const Layout = ({ children }) => {
  const { role, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to toggle sidebar

  const handleLogout = () => {
    logout(); // Call logout from context
    navigate("/"); // Redirect to login page
  };

  // Toggle sidebar open/close
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-200 p-4 flex flex-col justify-between 
        ${isSidebarOpen ? "w-64" : "w-20"} transition-all duration-300`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between mb-6">
          <h3
            className={`font-bold text-xl ${
              isSidebarOpen ? "block" : "hidden"
            } transition-opacity duration-300`}
          >
            Admissions
          </h3>
          <button onClick={toggleSidebar} className="p-2">
            <FiMenu size={24} />
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="flex flex-col space-y-4">
          <Link to="/dashboard" className="flex items-center space-x-4">
            <FiHome size={24} />
            {isSidebarOpen && <span className="text-lg">Dashboard</span>}
          </Link>

          {role === "admin" && (
            <Link to="/users" className="flex items-center space-x-4">
              <FiUsers size={24} />
              {isSidebarOpen && <span className="text-lg">Users</span>}
            </Link>
          )}

          <Link to="/students" className="flex items-center space-x-4">
            <FiUser size={24} />
            {isSidebarOpen && <span className="text-lg">Students</span>}
          </Link>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-6 p-2 bg-red-500 text-white rounded w-full"
        >
          <div className="flex items-center justify-center space-x-4">
            <span>
              <FiLogOut size={24} />
            </span>
            {isSidebarOpen && <span>Logout</span>}
          </div>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">{children}</div>
    </div>
  );
};

export default Layout;
