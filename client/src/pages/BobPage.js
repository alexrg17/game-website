"use client";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import bob from "../assets/Bob.png";
import "../styles/StoryPages.scss";

const BobPage = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="story-page">
      <div className="story-container">
        <h1 className="story-title">Bob</h1>

        <div className="story-hero">
          <img
            src={bob || "/placeholder.svg"}
            alt="Bob Character"
            className="story-image character-image"
          />
        </div>

        <div className="story-content">
          <div className="character-profile">
            <h2>Bob</h2>
            <p className="character-tagline">
              "Bob is the type of guy with cables in his pocket, trying to get
              to work on time."
            </p>

            <div className="character-stats">
              <div className="stat">
                <span className="stat-label">Age:</span>
                <span className="stat-value">42</span>
              </div>
              <div className="stat">
                <span className="stat-label">Occupation:</span>
                <span className="stat-value">Electrician</span>
              </div>
              <div className="stat">
                <span className="stat-label">Special Ability:</span>
                <span className="stat-value">Can fix almost anything</span>
              </div>
            </div>
          </div>

          <h2>Just Your Average Guy</h2>
          <p>
            Bob wasn't particularly unique. Just your average middle class man,
            working to make money for his beloved family. One day while walking
            to his job, he is forced to take a different, more forceful, route,
            after being blocked by an ongoing police chase.
          </p>

          <p>
            While on his way, he must use this electrical knowledge and newfound
            combat skills to get to his work on time.
          </p>

          <p>
            However, someone else seems to have spotted him, and might be able
            to find a use for him…
          </p>

          <h2>Step Into Bob's Shoes</h2>
          <p>
            You can step into Bob's shoes, guided by the cinematic track The
            Rings of Saturn by Alexander Goldscheider. Fix wires and explore a
            world meant to be left unexplored.
          </p>

          <h2>The Question</h2>
          <p>
            Will Bob follow this new path, or will he keep to his normal life…
          </p>

          <p>Keep checking starilumgames.com to find out!</p>

          <div className="story-navigation">
            <h3>Learn More About</h3>
            <div className="character-links">
              <Link to="/story/awakening" className="character-link">
                <span>About Rising Stars</span>
              </Link>
              <Link to="/character/lyra" className="character-link">
                <span>Lyra's Story</span>
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

export default BobPage;
