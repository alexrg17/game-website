"use client";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaGamepad, FaTrophy, FaSave } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext"; // Add AuthContext import
import "../styles/GuestPlayModal.scss";

const GuestPlayModal = ({ onContinueAsGuest }) => {
  const navigate = useNavigate();
  const { enableGuestMode } = useContext(AuthContext);

  const handleGuestPlay = () => {
    enableGuestMode();
    onContinueAsGuest();
  };

  return (
    <div className="guest-play-modal-overlay">
      <div className="guest-play-modal">
        <h2 className="guest-play-modal__title">Ready to Play?</h2>

        <div className="guest-play-modal__content">
          <div className="guest-play-modal__options">
            <div className="guest-play-modal__option">
              <div className="guest-play-modal__option-header">
                <FaUserCircle className="guest-play-modal__icon guest-play-modal__icon--account" />
                <h3>Login or Register</h3>
              </div>
              <ul className="guest-play-modal__benefits">
                <li>
                  <FaSave /> Save your progress
                </li>
                <li>
                  <FaTrophy /> Compete on leaderboards
                </li>
                <li>
                  <FaGamepad /> Access all game levels
                </li>
              </ul>
              <button
                className="guest-play-modal__button guest-play-modal__button--primary"
                onClick={() => navigate("/login")}
              >
                Login / Register
              </button>
            </div>

            <div className="guest-play-modal__divider">
              <span>OR</span>
            </div>

            <div className="guest-play-modal__option">
              <div className="guest-play-modal__option-header">
                <FaGamepad className="guest-play-modal__icon guest-play-modal__icon--guest" />
                <h3>Play as Guest</h3>
              </div>
              <ul className="guest-play-modal__limitations">
                <li>Play immediately</li>
                <li>No saved progress</li>
                <li>Can't compete on leaderboards</li>
              </ul>
              <button
                className="guest-play-modal__button guest-play-modal__button--secondary"
                onClick={handleGuestPlay}
              >
                Continue as Guest
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestPlayModal;
