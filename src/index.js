import React from "react";
import ReactDOM from "react-dom/client"; // Update import to use 'react-dom/client'
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

// Create a root for the application
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the application using the new createRoot API
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
