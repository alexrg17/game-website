"use client";

import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import GuestPlayModal from "./GuestPlayModal";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isGuest, enableGuestMode, loading } =
    useContext(AuthContext);
  const [showGuestModal, setShowGuestModal] = useState(
    !isAuthenticated && !isGuest
  );

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner if you have one
  }

  // If authenticated or already in guest mode, show the protected content
  if (isAuthenticated || isGuest === true) {
    return children;
  }

  // If not authenticated and not in guest mode, show the guest play modal
  if (showGuestModal) {
    return (
      <GuestPlayModal
        onContinueAsGuest={() => {
          enableGuestMode();
          setShowGuestModal(false);
        }}
      />
    );
  }

  // This should never be reached with the current logic, but keeping as a fallback
  return <Navigate to="/login" />;
};

export default ProtectedRoute;
