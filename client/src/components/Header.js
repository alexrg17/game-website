import React, { useState, useContext } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa"; // Using FaUserCircle for a larger profile icon
import RockstarLogo from "../assets/rockstar-logo.svg";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import "../styles/Header.scss";

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout, loading } = useContext(AuthContext); // Destructure loading
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdownOpen((prev) => !prev); // Toggle the dropdown state
  };

  const handleLogout = (e) => {
    e.stopPropagation();
    logout(); // Log the user out
    navigate("/login"); // Redirect to login page
  };

  const goToGame = () => {
    navigate("/game"); // On click, navigate to the game page
  };

  const goToLeaderboard = () => {
    navigate("/leaderboard"); // On click, navigate to the leaderboard page
  };

  const goToHome = () => {
    navigate("/"); // On click, navigate to the homepage
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state until authentication is confirmed
  }

  return (
    <header className="header">
      {/* Logo Section */}
      <img
        src={RockstarLogo}
        alt="Rockstar Logo"
        className="header__logo"
        onClick={goToHome} // On click, navigate to the homepage
        style={{ cursor: "pointer" }} // Change cursor to pointer to indicate it's clickable
      />

      {/* Navigation Section */}
      <nav className="header__nav" role="navigation">
        <ul className="header__nav-list">
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
              onClick={goToLeaderboard} // On click, navigate to the leaderboard page
            >
              Leaderboard
            </button>
          </li>
          <li>
            <button type="button" className="header__nav-button">
              Help
            </button>
          </li>
        </ul>
      </nav>

      {/* Icons Section */}
      <div className="header__icons">
        <button
          type="button"
          aria-label="Search"
          className="header__icon-button"
        >
          <FaSearch />
        </button>
        {isAuthenticated ? (
          <div className="header__profile">
            <button
              type="button"
              aria-label="Profile"
              className="header__icon-button"
              onClick={toggleDropdown} // Show/Hide dropdown when clicked
            >
              <FaUserCircle />
            </button>
            {dropdownOpen && (
              <div
                className="header__dropdown"
                onClick={(e) => e.stopPropagation()} // Prevent click from closing dropdown immediately
              >
                <p>{user ? user.username || user.email : "User"}</p>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            aria-label="Profile"
            className="header__icon-button"
            onClick={() => navigate("/login")} // Redirect to login page if user is not authenticated
          >
            <FaUserCircle />
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
