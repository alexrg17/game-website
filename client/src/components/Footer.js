import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaFacebookF,
  FaLinkedinIn,
  FaSpotify,
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
                  <Link to="/help" className="footer__link">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/guide" className="footer__link">
                    Game Guide
                  </Link>
                </li>
                <li>
                  <Link to="/community" className="footer__link">
                    Community
                  </Link>
                </li>
                <li>
                  <Link to="/news" className="footer__link">
                    News
                  </Link>
                </li>
              </ul>
            </div>

            <div className="footer__links">
              <h3 className="footer__heading">Legal</h3>
              <ul className="footer__list">
                <li>
                  <Link to="/privacy" className="footer__link">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="footer__link">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/cookies" className="footer__link">
                    Cookie Policy
                  </Link>
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
                href="https://www.linkedin.com/in/dorajeangillespie"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://www.instagram.com/starilum?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.tiktok.com/@starilum?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="TikTok"
              >
                <FaTiktok />
              </a>
              <a
                href="https://www.youtube.com/@Starilum"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
              <a
                href="https://www.facebook.com/dorajeancreation/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://open.spotify.com/show/1R5lflTeKvCvvADoN0NgIg?si=4ae1c5175dfa4803"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="Spotify Podcast"
              >
                <FaSpotify />
              </a>
            </div>
          </div>

          <div className="footer__cta">
            <a
              href="https://www.starilum.com/store"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__cta-button"
            >
              <FaShoppingBag className="footer__cta-icon" />
              Shop Merch
            </a>
            <a
              href="https://open.spotify.com/artist/6APT7qiw4UwmQAaIuRLwGq?si=b1DReolfRxOFqrpzTifxCg"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__cta-button footer__cta-button--alt"
            >
              Listen on Spotify
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
