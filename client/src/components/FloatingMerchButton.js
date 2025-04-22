"use client";

import { useState, useEffect } from "react";
import { FaShoppingBag } from "react-icons/fa";
import "../styles/FloatingMerchButton.scss";

const FloatingMerchButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when user scrolls down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <a
      href="https://starilum-merch.com"
      target="_blank"
      rel="noopener noreferrer"
      className={`floating-merch-button ${isVisible ? "visible" : ""}`}
      aria-label="Shop Merchandise"
    >
      <FaShoppingBag className="floating-merch-icon" />
      <span className="floating-merch-text">Shop Merch</span>
    </a>
  );
};

export default FloatingMerchButton;
