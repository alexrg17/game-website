import React from "react";
import { FaSearch, FaUser } from "react-icons/fa"; // Import search and profile icons
import RockstarLogo from "../assets/rockstar-logo.svg"; // Updated path for the logo
import "../styles/Header.scss"; // Updated path for the SCSS file

function Header() {
  return (
    <header className="header">
      {/* Logo Section */}
      <img src={RockstarLogo} alt="Rockstar Logo" className="header__logo" />

      {/* Navigation Section */}
      <nav className="header__nav" role="navigation">
        <ul className="header__nav-list">
          <li>
            <button
              type="button"
              className="header__nav-button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Games
            </button>
          </li>
          <li>
            <button
              type="button"
              className="header__nav-button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Store
            </button>
          </li>
          <li>
            <button
              type="button"
              className="header__nav-button"
              aria-haspopup="true"
              aria-expanded="false"
            >
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
        <button
          type="button"
          aria-label="Profile"
          className="header__icon-button"
        >
          <FaUser />
        </button>
      </div>
    </header>
  );
}

export default Header;
