import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../utils/api";
import { useToast } from "../../context/ToastContext";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import eye icons

const ResetPassword = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get("token"); // Extract the token from the query string
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password
  const [message, setMessage] = useState("");
  const [passwordMatchMessage, setPasswordMatchMessage] = useState(""); // State for password match message
  const { showToast } = useToast();
  const [showPassword, setShowPassword] = useState(false); // State for showing password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for showing confirm password
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      showToast("Passwords do not match", "warning", 3000);
      return;
    }

    try {
      const response = await api.post("/auth/reset-password", {
        token,
        password: newPassword,
      });
      setMessage(response.data.message);
      showToast("Password has been reset successfully!", "success", 3000);
      navigate("/");
    } catch (error) {
      showToast(error.response.data.message, "warning", 3000);
      console.log(error.response.data.message);
    }
  };

  const handlePasswordChange = (password) => {
    setNewPassword(password);
    if (password && confirmPassword) {
      if (password === confirmPassword) {
        setPasswordMatchMessage("Passwords match!");
      } else {
        setPasswordMatchMessage("Passwords do not match!");
      }
    }
  };

  const handleConfirmPasswordChange = (password) => {
    setConfirmPassword(password);
    if (password && confirmPassword) {
      if (newPassword === password) {
        setPasswordMatchMessage("Passwords match!");
      } else {
        setPasswordMatchMessage("Passwords do not match!");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
        <form onSubmit={handleSubmit} className="mb-4">
          {/* New Password Field */}
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => handlePasswordChange(e.target.value)}
              placeholder="Enter new password"
              className="w-full p-2 border rounded mb-2"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          {/* Confirm Password Field */}
          <div className="relative mb-4">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => handleConfirmPasswordChange(e.target.value)}
              placeholder="Confirm new password"
              className="w-full p-2 border rounded mb-2"
              required
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          {/* Password Match Message */}
          {passwordMatchMessage && (
            <p
              className={`text-sm text-center ${
                passwordMatchMessage === "Passwords match!"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {passwordMatchMessage}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Reset Password
          </button>
        </form>
        {message && <p className="text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
