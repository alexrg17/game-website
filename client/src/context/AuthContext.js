"use client";

import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Correct import for jwt-decode

export const AuthContext = createContext({
  isAuthenticated: false,
  isGuest: false,
  user: null,
  setIsAuthenticated: () => {},
  setIsGuest: () => {},
  setUser: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGuest, setIsGuest] = useState(false); // Add guest mode state
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // State to check if authentication state is loaded

  // Check localStorage and initialize the state on app load
  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
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
        } else {
          setIsGuest(false);
        }
      }
    } else {
      setIsAuthenticated(false); // Set as not authenticated if no token
      setUser(null);

      // Check if we should restore guest mode
      if (guestMode) {
        setIsGuest(true);
      } else {
        setIsGuest(false);
      }
    }
    setLoading(false); // Once finished checking, set loading to false
  }, []); // Empty dependency array means it only runs once on page load

  // Add login function
  const login = (token) => {
    // Store token
    localStorage.setItem("token", token);

    // Clear guest mode when logging in
    localStorage.removeItem("guestMode");
    setIsGuest(false);

    // Set authenticated state
    setIsAuthenticated(true);
    try {
      const decoded = jwtDecode(token);
      setUser({
        email: decoded.email,
        userId: decoded.userId,
        username: decoded.username,
      });
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
    console.log("Guest mode enabled"); // Add logging for debugging
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
        isGuest,
        user,
        setIsAuthenticated,
        setIsGuest,
        setUser,
        login,
        logout,
        loading,
        enableGuestMode, // Add this
        disableGuestMode, // Add this
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
