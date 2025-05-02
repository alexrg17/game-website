"use client";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import lyra from "../assets/Lyra.png";
import "../styles/StoryPages.scss";

const LyraPage = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="story-page">
      <div className="story-container">
        <h1 className="story-title">Lyra</h1>

        <div className="story-hero">
          <img
            src={lyra || "/placeholder.svg"}
            alt="Lyra Character"
            className="story-image character-image"
          />
        </div>

        <div className="story-content">
          <div className="character-profile">
            <h2>Lyra</h2>
            <p className="character-tagline">
              "An athletic young woman, who loves to spread music to the world."
            </p>

            <div className="character-stats">
              <div className="stat">
                <span className="stat-label">Age:</span>
                <span className="stat-value">26</span>
              </div>
              <div className="stat">
                <span className="stat-label">Occupation:</span>
                <span className="stat-value">Rouge Music Composer</span>
              </div>
              <div className="stat">
                <span className="stat-label">Special Ability:</span>
                <span className="stat-value">
                  Music Composition & Athletic Abilities
                </span>
              </div>
            </div>
          </div>

          <h2>Spreading the Joy</h2>
          <p>
            Lyra was a rising music star before the music ban was put into law.
            Still determined to spread her music, she learned how to defend
            herself, and continued to spread music to those who need it.
          </p>

          <p>
            Teaming up with a fellow music lover, named Jett, they work together
            to continue to compose and spread joy.
          </p>

          <h2>On This Day</h2>
          <p>
            On this day, Lyra has been spotted by the city police force, and is
            being chased, however using her athletic skills, such as walljumping
            and sliding, she gets away so she can continue to spread music.
          </p>

          <p>
            However during this run, she spots someone in the back alleyways,
            and gets an idea….
          </p>

          <h2>It's Up To You</h2>
          <p>
            You can play as Lyra in Rising Stars, and feel the rush of the track
            High On Life, as you run, jump, and beat your personal best score.
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
              <Link to="/character/jett" className="character-link">
                <span>Jett's Story</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LyraPage;
