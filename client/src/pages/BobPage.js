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
        <h1 className="story-title">Discovering Rhythm</h1>

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
              "Sometimes the most revolutionary act is simply remembering."
            </p>

            <div className="character-stats">
              <div className="stat">
                <span className="stat-label">Age:</span>
                <span className="stat-value">42</span>
              </div>
              <div className="stat">
                <span className="stat-label">Occupation:</span>
                <span className="stat-value">Factory Worker</span>
              </div>
              <div className="stat">
                <span className="stat-label">Special Ability:</span>
                <span className="stat-value">Rhythm Recognition</span>
              </div>
            </div>
          </div>

          <h2>The Man Who Remembered</h2>
          <p>
            Bob wasn't always just a number in Silton's vast workforce. Born
            just before the music ban, he has faint childhood memories of his
            mother humming melodies while she worked—memories he's suppressed
            for decades to avoid trouble with the authorities.
          </p>

          <p>
            Working in Factory Block 7, Bob's life follows a predictable
            pattern: wake up, commute, work, commute, sleep. The HCA approves of
            such routines—predictable citizens are controllable citizens. But
            beneath Bob's compliant exterior lies a mind that occasionally
            wanders to questions about why certain sounds make him feel things
            he can't explain.
          </p>

          <h2>The Awakening</h2>
          <p>
            It all changed during a routine maintenance cycle when Machine 34B
            malfunctioned, producing a steady, rhythmic pattern that wasn't
            immediately detected by the factory's sound monitoring system. For
            three minutes and forty-two seconds, Bob stood transfixed as the
            machine inadvertently created what would have once been called a
            "beat."
          </p>

          <p>
            That night, Bob couldn't sleep. The pattern repeated in his mind,
            and his fingers tapped it out unconsciously on his bedside table.
            Something had awakened in him—a recognition that there was more to
            sound than the regulated noise he'd been permitted to hear for
            decades.
          </p>

          <h2>The Search</h2>
          <p>
            Risking everything, Bob began to seek out others who might remember
            music or have access to it. His search led him through Silton's
            underground networks, where whispers of resistance occasionally
            surfaced. It was during one of these explorations that he
            accidentally triggered one of Jett's sensors, leading to their
            fateful meeting.
          </p>

          <p>
            Bob's greatest strength is his ordinary nature—no one suspects the
            quiet factory worker of harboring revolutionary thoughts. As he
            joins forces with Lyra and Jett, he discovers that his ability to
            recognize and reproduce rhythmic patterns is extraordinary in a
            world where such skills have been systematically eliminated.
          </p>

          <p>
            Despite his initial reluctance to become involved in anything that
            might disrupt his safe, predictable life, Bob finds himself drawn
            deeper into the rebellion. The rhythm awakened something in him that
            he can't ignore—a connection to his past, to his humanity, and to a
            future where sound might once again be free.
          </p>

          <div className="story-navigation">
            <h3>Learn More About</h3>
            <div className="character-links">
              <Link to="/story/awakening" className="character-link">
                <span>The Awakening</span>
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
