"use client";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import jett from "../assets/Jett.png";
import "../styles/StoryPages.scss";

const JettPage = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="story-page">
      <div className="story-container">
        <h1 className="story-title">Jett</h1>

        <div className="story-hero">
          <img
            src={jett || "/placeholder.svg"}
            alt="Jett Character"
            className="story-image character-image"
          />
        </div>

        <div className="story-content">
          <div className="character-profile">
            <h2>Jett</h2>
            <p className="character-tagline">"Jett helps Lyra do her work."</p>

            <div className="character-stats">
              <div className="stat">
                <span className="stat-label">Age:</span>
                <span className="stat-value">24</span>
              </div>
              <div className="stat">
                <span className="stat-label">Occupation:</span>
                <span className="stat-value">Lyra's Assistant</span>
              </div>
              <div className="stat">
                <span className="stat-label">Special Ability:</span>
                <span className="stat-value">Combat and Stealth</span>
              </div>
            </div>
          </div>

          <h2>Working In The Shadows</h2>
          <p>
            Jett keeps himself hidden, only coming out when he has work to do.
            He is incharge of sourcing whatever Lyra needs to do her work. In
            return he gets free copies of her music. On this day, he is breaking
            into a warehouse, to steal a disc for Lyra so she can burn her music
            onto it.
          </p>

          <h2>A Tragic Past</h2>
          <p>
            As a young child, Jett looked up to his parents, who were popular
            musicians. However, after the new music laws were brought in, he
            lost them to the city, and had to learn how to fend for himself,
            learning how to fight and sneak around.
          </p>

          <p>
            He hopes that by helping Lyra he is continuing the legacy of his
            parents.
          </p>

          <h2>The Rise And Fall</h2>
          <p>
            Fight back in Rising Stars, as you play as Jett. His level is
            accompanied by The Cabaret by Time UK, and energizing track which
            will put you in the mood to fight and escape!
          </p>

          <div className="story-navigation">
            <h3>Learn More About</h3>
            <div className="character-links">
              <Link to="/story/awakening" className="character-link">
                <span>About Rising Stars</span>
              </Link>
              <Link to="/character/bob" className="character-link">
                <span>Bob's Story</span>
              </Link>
              <Link to="/character/lyra" className="character-link">
                <span>Lyra's Story</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JettPage;
