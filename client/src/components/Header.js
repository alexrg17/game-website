import React, { useState, useContext } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa"; // Using FaUserCircle for a larger profile icon
import RockstarLogo from "../assets/rockstar-logo.svg";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import "../styles/Header.scss";

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useContext(AuthContext);
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

  return (
    <header className="header">
      {/* Logo Section */}
      <img src={RockstarLogo} alt="Rockstar Logo" className="header__logo" />

      {/* Navigation Section */}
      <nav className="header__nav" role="navigation">
        <ul className="header__nav-list">
          <li>
            <button type="button" className="header__nav-button">
              Games
            </button>
          </li>
          <li>
            <button type="button" className="header__nav-button">
              Store
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
              onClick={toggleDropdown}
            >
              <FaUserCircle />
            </button>
            {dropdownOpen && (
              <div
                className="header__dropdown"
                onClick={(e) => e.stopPropagation()}
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
