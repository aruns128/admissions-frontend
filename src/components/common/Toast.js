import React from "react";
import { IoClose } from "react-icons/io5";

const Toast = ({ message, type, onClose }) => {
  const typeStyles = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
  };

  return (
    <div
      className={`fixed top-5 right-5 p-2 rounded shadow-lg text-white transition-opacity duration-300 flex items-center ${typeStyles[type]}`}
    >
      <span className="flex-1">{message}</span>
      <button className="ml-2" onClick={onClose} aria-label="Close toast">
        <IoClose />
      </button>
    </div>
  );
};

export default Toast;
