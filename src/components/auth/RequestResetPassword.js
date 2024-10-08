import React, { useState } from "react";
import api from "../../utils/api";
import { useToast } from "../../context/ToastContext";
import Loader from "../common/Loader";
import { CgClose } from "react-icons/cg";

const RequestResetPassword = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { showToast } = useToast();
  const [showLoader, setShowLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoader(true);
    try {
      const response = await api.post("/auth/reset-password/request", {
        email,
      });
      setMessage(response.data.message);
      showToast("Reset link sent! Check your email.", "success", 3000);
      setShowLoader(false);
      onClose(); // Close the modal after successful request
    } catch (error) {
      showToast(error.response.data.message, "warning", 3000);
      console.log(error.response.data.message);
      setShowLoader(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between text-2xl font-bold mb-4">
        <h2>Request Password Reset</h2>
        <CgClose onClick={onClose} />
      </div>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full p-2 border rounded mb-2"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Send Reset Link
        </button>
      </form>
      {showLoader && <Loader />}
      {message && <p>{message}</p>}
    </div>
  );
};

export default RequestResetPassword;
