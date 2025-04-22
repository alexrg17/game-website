"use client";

import { useState, useEffect } from "react";
import { FaShoppingBag, FaTimes, FaGift } from "react-icons/fa";
import "../styles/PromoBanner.scss";

const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the banner was previously dismissed
    const bannerDismissed = localStorage.getItem("promoBannerDismissed");
    const dismissedTime = Number.parseInt(bannerDismissed || "0", 10);
    const currentTime = new Date().getTime();

    // Show banner if it was never dismissed or was dismissed more than 24 hours ago
    if (!bannerDismissed || currentTime - dismissedTime > 24 * 60 * 60 * 1000) {
      setIsVisible(true);
    }
  }, []);

  const dismissBanner = () => {
    setIsVisible(false);
    // Store the time when the banner was dismissed
    localStorage.setItem(
      "promoBannerDismissed",
      new Date().getTime().toString()
    );
  };

  if (!isVisible) return null;

  return (
    <div className="promo-banner">
      <div className="promo-banner__container">
        <div className="promo-banner__icon">
          <FaGift />
        </div>
        <p className="promo-banner__text">
          <span className="promo-banner__highlight">NEW RELEASE:</span> Limited
          Edition Starilum Vinyl Soundtrack -
          <span className="promo-banner__discount"> 20% OFF</span> with code{" "}
          <span className="promo-banner__code">RHYTHM20</span>
        </p>
        <a
          href="https://starilum-merch.com"
          target="_blank"
          rel="noopener noreferrer"
          className="promo-banner__button"
        >
          <FaShoppingBag className="promo-banner__button-icon" />
          <span>Shop Now</span>
        </a>
        <button
          className="promo-banner__close"
          onClick={dismissBanner}
          aria-label="Close promotion banner"
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default PromoBanner;
