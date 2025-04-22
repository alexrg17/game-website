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
        <h1 className="story-title">Sound of Resistance</h1>

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
              "Music isn't just sound—it's the language of freedom."
            </p>

            <div className="character-stats">
              <div className="stat">
                <span className="stat-label">Age:</span>
                <span className="stat-value">26</span>
              </div>
              <div className="stat">
                <span className="stat-label">Occupation:</span>
                <span className="stat-value">Sound Engineer</span>
              </div>
              <div className="stat">
                <span className="stat-label">Special Ability:</span>
                <span className="stat-value">
                  Composition & Sound Manipulation
                </span>
              </div>
            </div>
          </div>

          <h2>The Prodigy</h2>
          <p>
            Lyra was born into a world without music, but her grandmother—who
            remembered the time before the ban—secretly passed down musical
            knowledge through stories disguised as fairy tales. As a child, Lyra
            showed an uncanny ability to understand sound patterns, which led
            her grandmother to risk everything by teaching her about rhythm and
            melody.
          </p>

          <p>
            When Lyra was twelve, her grandmother was taken away by HCA agents.
            The official report stated she had been spreading "dangerous
            misinformation" to children. Lyra never saw her again, but the
            musical knowledge they had shared became her most precious
            possession.
          </p>

          <h2>The Infiltrator</h2>
          <p>
            Recognizing her exceptional talent with sound technology, the
            government recruited Lyra to work as a sound engineer for the HCA.
            Her job involves monitoring and adjusting the ambient noise
            generators that fill public spaces with "safe" sound patterns
            designed to prevent any accidental emergence of rhythm.
          </p>

          <p>
            What her employers don't know is that Lyra has been using her access
            to government sound technology to study how music works and how it
            affects the human brain. By day, she maintains the systems that
            suppress musical expression; by night, she composes pieces that she
            believes could awaken the dormant musical awareness in Silton's
            citizens.
          </p>

          <h2>The Composer</h2>
          <p>
            Using modified equipment smuggled from her workplace, Lyra has
            created a hidden studio in her apartment where she composes and
            records music. Her compositions combine the traditional elements her
            grandmother taught her with innovative sounds that might bypass the
            government's detection algorithms.
          </p>

          <p>
            Lyra's greatest challenge has been finding a way to share her music
            without being caught. She's developed a network of trusted friends
            who help distribute her compositions through modified personal audio
            devices that disguise the musical patterns as approved ambient
            noise.
          </p>

          <p>
            When she meets Bob and Jett, Lyra realizes that her compositions
            could be more than just a personal rebellion—they could be the
            catalyst for a movement that might finally break the government's
            control over sound. With her insider knowledge of the HCA's systems
            and her unique ability to create music that resonates with people
            who have never consciously heard it before, Lyra becomes the
            creative heart of the resistance.
          </p>

          <div className="story-navigation">
            <h3>Learn More About</h3>
            <div className="character-links">
              <Link to="/story/awakening" className="character-link">
                <span>The Awakening</span>
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
