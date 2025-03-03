import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Using named import per our fix

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      try {
        const decoded = jwtDecode(token);
        // Updated to include username along with email and userId
        setUser({
          email: decoded.email,
          userId: decoded.userId,
          username: decoded.username,
        });
      } catch (error) {
        console.error("Token decoding error:", error);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUser(null);
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, logout, setIsAuthenticated, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
