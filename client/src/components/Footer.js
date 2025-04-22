import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaTwitter,
  FaDiscord,
  FaShoppingBag,
} from "react-icons/fa";
import StarilumLogo from "../assets/starilum-logo.png";
import "../styles/Footer.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__top">
          <div className="footer__brand">
            <img
              src={StarilumLogo || "/placeholder.svg"}
              alt="Starilum Logo"
              className="footer__logo"
            />
            <p className="footer__tagline">A Rhythmic Rebellion</p>
          </div>

          <div className="footer__links-container">
            <div className="footer__links">
              <h3 className="footer__heading">Navigation</h3>
              <ul className="footer__list">
                <li>
                  <Link to="/" className="footer__link">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/game" className="footer__link">
                    Game
                  </Link>
                </li>
                <li>
                  <Link to="/leaderboard" className="footer__link">
                    Leaderboard
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="footer__link">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="footer__link">
                    Register
                  </Link>
                </li>
              </ul>
            </div>

            <div className="footer__links">
              <h3 className="footer__heading">Resources</h3>
              <ul className="footer__list">
                <li>
                  <a href="#" className="footer__link">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Game Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    News
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer__links">
              <h3 className="footer__heading">Legal</h3>
              <ul className="footer__list">
                <li>
                  <a href="#" className="footer__link">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer__middle">
          <div className="footer__social">
            <h3 className="footer__heading">Connect With Us</h3>
            <div className="footer__social-icons">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
              >
                <FaInstagram />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
              >
                <FaTiktok />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
              >
                <FaYoutube />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
              >
                <FaTwitter />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
              >
                <FaDiscord />
              </a>
            </div>
          </div>

          <div className="footer__cta">
            <a
              href="https://starilum-merch.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__cta-button"
            >
              <FaShoppingBag className="footer__cta-icon" />
              Shop Merch
            </a>
            <a
              href="https://starilum.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__cta-button footer__cta-button--alt"
            >
              Main Website
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} Starilum Games. All rights reserved.
          </p>
          <p className="footer__credit">
            Made with <span className="footer__heart">♥</span> by the Starilum
            Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
