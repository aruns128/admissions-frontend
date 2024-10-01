import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => Cookies.get("token"));
  const [role, setRole] = useState(() => Cookies.get("role"));

  const login = (newToken, userRole) => {
    setToken(newToken);
    setRole(userRole);
    Cookies.set("token", newToken); // Store token in cookie
    Cookies.set("role", userRole); // Store role in cookie
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    Cookies.remove("token"); // Remove token from cookie
    Cookies.remove("role"); // Remove role from cookie
  };

  useEffect(() => {
    const storedToken = Cookies.get("token");
    const storedRole = Cookies.get("role");
    if (storedToken && storedRole) {
      setToken(storedToken);
      setRole(storedRole);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
