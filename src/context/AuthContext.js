import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null); // Add role state

  const login = (newToken, userRole) => {
    setToken(newToken);
    setRole(userRole); // Set the user role
  };

  const logout = () => {
    setToken(null);
    setRole(null); // Clear the role on logout
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
