"use client";

import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Correct import for jwt-decode

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGuest, setIsGuest] = useState(false); // Add guest mode state
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // State to check if authentication state is loaded

  // Check localStorage and initialize the state on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    // Check if user is in guest mode
    const guestMode = localStorage.getItem("guestMode") === "true";

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          email: decoded.email,
          userId: decoded.userId,
          username: decoded.username,
        });
        setIsAuthenticated(true); // Set user as authenticated
        setIsGuest(false); // Not a guest if authenticated
      } catch (error) {
        console.error("Token decoding error:", error);
        localStorage.removeItem("token");
        setIsAuthenticated(false); // Set authentication state to false if token is invalid
        setUser(null);

        // Check if we should restore guest mode
        if (guestMode) {
          setIsGuest(true);
        }
      }
    } else {
      setIsAuthenticated(false); // Set as not authenticated if no token
      setUser(null);

      // Check if we should restore guest mode
      if (guestMode) {
        setIsGuest(true);
      }
    }
    setLoading(false); // Once finished checking, set loading to false
  }, []); // Empty dependency array means it only runs once on page load

  // Add login function
  const login = (token) => {
    localStorage.setItem("token", token);
    // Clear guest mode when logging in
    localStorage.removeItem("guestMode");
    setIsGuest(false);

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
    // Also clear guest mode when logging out
    localStorage.removeItem("guestMode");
    setIsAuthenticated(false);
    setIsGuest(false);
    setUser(null);
  };

  // Add function to enable guest mode
  const enableGuestMode = () => {
    localStorage.setItem("guestMode", "true");
    setIsGuest(true);
    setIsAuthenticated(false);
    setUser(null);
  };

  // Add function to disable guest mode
  const disableGuestMode = () => {
    localStorage.removeItem("guestMode");
    setIsGuest(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        isGuest,
        setIsGuest,
        enableGuestMode,
        disableGuestMode,
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
