import React, { createContext, useState, useContext, useCallback } from "react";
import Toast from "../components/common/Toast";

// Create a context for the toast
const ToastContext = createContext();

// Create a provider for the toast context
export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "",
    duration: 3000,
  });

  const showToast = useCallback((message, type = "info", duration = 3000) => {
    setToast({ show: true, message, type, duration });

    setTimeout(() => {
      setToast((prevToast) => ({ ...prevToast, show: false })); // Use functional update to ensure the latest state is used
    }, duration);
  }, []);

  const closeToast = () => {
    setToast((prevToast) => ({ ...prevToast, show: false })); // Use functional update for closing as well
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={closeToast}
        />
      )}
    </ToastContext.Provider>
  );
};

// Custom hook to use the toast context
export const useToast = () => useContext(ToastContext);
