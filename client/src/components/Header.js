"use client";

import { useState, useContext, useEffect, useRef } from "react";
import { FaUserCircle, FaBars, FaTimes, FaUserSecret } from "react-icons/fa";
import StarilumLogo from "../assets/starilum-logo.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Header.scss";

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, isGuest, user, logout, loading } =
    useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdownOpen((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const handleLogout = (e) => {
    e.stopPropagation();
    logout();
    setDropdownOpen(false);
    navigate("/login");
  };

  const goToGame = () => {
    setMobileMenuOpen(false);
    navigate("/game");
  };

  const goToLeaderboard = () => {
    setMobileMenuOpen(false);
    navigate("/leaderboard");
  };

  const goToHome = () => {
    setMobileMenuOpen(false);
    navigate("/");
  };

  const goToLogin = () => {
    setMobileMenuOpen(false);
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".header");
      if (window.scrollY > 50) {
        header.style.background = "rgba(10, 10, 10, 0.95)";
        header.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.8)";
      } else {
        header.style.background =
          "linear-gradient(to bottom, #0a0a0a, #1a1a1a)";
        header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.8)";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (loading) {
    return <div className="header">Loading...</div>;
  }

  return (
    <header className="header">
      <img
        src={StarilumLogo || "/placeholder.svg"}
        alt="Starilum Logo"
        className="header__logo"
        onClick={goToHome}
        style={{ cursor: "pointer" }}
      />

      <button
        className="header__mobile-toggle"
        onClick={toggleMobileMenu}
        aria-label="Toggle navigation menu"
      >
        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <nav
        className={`header__nav ${mobileMenuOpen ? "active" : ""}`}
        role="navigation"
      >
        <ul className="header__nav-list">
          <li>
            <button
              type="button"
              className="header__nav-button"
              onClick={goToHome}
            >
              Home
            </button>
          </li>
          <li>
            <button
              type="button"
              className="header__nav-button"
              onClick={goToGame}
            >
              Game
            </button>
          </li>
          <li>
            <button
              type="button"
              className="header__nav-button"
              onClick={goToLeaderboard}
            >
              Leaderboard
            </button>
          </li>
        </ul>
      </nav>

      <div className="header__icons">
        {isAuthenticated ? (
          <div className="header__profile" ref={profileRef}>
            <button
              type="button"
              aria-label="Profile"
              className="header__icon-button"
              onClick={toggleDropdown}
            >
              <FaUserCircle />
            </button>
            <span className="header__username">
              {user ? user.username : "User"}
            </span>
            <div
              className={`header__dropdown ${dropdownOpen ? "active" : ""}`}
              ref={dropdownRef}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        ) : isGuest ? (
          <div
            className="header__profile header__profile--guest"
            ref={profileRef}
          >
            <button
              type="button"
              aria-label="Guest Profile"
              className="header__icon-button"
              onClick={toggleDropdown}
            >
              <FaUserSecret />
            </button>
            <span className="header__username header__username--guest">
              Guest
            </span>
            <div
              className={`header__dropdown ${dropdownOpen ? "active" : ""}`}
              ref={dropdownRef}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={goToLogin}>Login / Register</button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            aria-label="Profile"
            className="header__icon-button"
            onClick={() => navigate("/login")}
          >
            <FaUserCircle />
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
