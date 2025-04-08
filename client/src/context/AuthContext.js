import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Correct import for jwt-decode

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // State to check if authentication state is loaded

  // Check localStorage and initialize the state on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          email: decoded.email,
          userId: decoded.userId,
          username: decoded.username,
        });
        setIsAuthenticated(true); // Set user as authenticated
      } catch (error) {
        console.error("Token decoding error:", error);
        localStorage.removeItem("token");
        setIsAuthenticated(false); // Set authentication state to false if token is invalid
        setUser(null);
      }
    } else {
      setIsAuthenticated(false); // Set as not authenticated if no token
      setUser(null);
    }
    setLoading(false); // Once finished checking, set loading to false
  }, []); // Empty dependency array means it only runs once on page load

  // Add login function
  const login = (token) => {
    localStorage.setItem("token", token);
    try {
      const decoded = jwtDecode(token);
      setUser({
        email: decoded.email,
        userId: decoded.userId,
        username: decoded.username,
      });
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Token decoding error during login:", error);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        login, // Add login function to context
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
