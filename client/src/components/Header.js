import React, { useState, useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import StarilumLogo from "../assets/starilum-logo.png"; // Updated import for Starilum logo
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Header.scss";

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout, loading } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = (e) => {
    e.stopPropagation();
    logout();
    navigate("/login");
  };

  const goToGame = () => {
    navigate("/game");
  };

  const goToLeaderboard = () => {
    navigate("/leaderboard");
  };

  const goToHome = () => {
    navigate("/");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <header className="header">
      <img
        src={StarilumLogo} // Updated to use Starilum logo
        alt="Starilum Logo"
        className="header__logo"
        onClick={goToHome}
        style={{ cursor: "pointer" }}
      />

      <nav className="header__nav" role="navigation">
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
          {/* Help button temporarily disabled
          <li>
            <button type="button" className="header__nav-button">
              Help
            </button>
          </li>
          */}
        </ul>
      </nav>

      <div className="header__icons">
        {/* Search button temporarily disabled
        <button
          type="button"
          aria-label="Search"
          className="header__icon-button"
        >
          <FaSearch />
        </button>
        */}
        {isAuthenticated ? (
          <div className="header__profile">
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
            {dropdownOpen && (
              <div
                className="header__dropdown"
                onClick={(e) => e.stopPropagation()}
              >
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
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
