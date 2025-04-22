"use client";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import rockstar1 from "../assets/AllTogether1.png";
import "../styles/StoryPages.scss";

const AwakeningPage = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="story-page">
      <div className="story-container">
        <h1 className="story-title">The Awakening Begins</h1>

        <div className="story-hero">
          <img
            src={rockstar1 || "/placeholder.svg"}
            alt="The Awakening Begins"
            className="story-image"
          />
        </div>

        <div className="story-content">
          <h2>A World Without Music</h2>
          <p>
            In the sprawling metropolis of Silton, music has been outlawed for
            over two decades. The government, known as the Harmony Control
            Authority (HCA), has systematically removed all traces of rhythm and
            melody from society, claiming that music causes social unrest and
            emotional instability.
          </p>

          <p>
            Citizens live in a world of carefully regulated sound—ambient noise
            generators fill public spaces with white noise, and personal audio
            devices are strictly monitored. Children are taught from birth that
            music is dangerous, a relic of a chaotic past that nearly destroyed
            civilization.
          </p>

          <h2>The Unlikely Heroes</h2>
          <p>
            Bob, a middle-aged factory worker who has lived most of his life
            under the music ban, has almost forgotten what music feels like. His
            monotonous existence is disrupted when a malfunction in his
            workplace causes a machine to produce a rhythmic pattern that
            awakens something deep within him.
          </p>

          <p>
            Lyra, a young sound engineer working for the government, has
            secretly been composing music in her apartment using modified
            equipment. Her compositions are inspired by fragments of melodies
            passed down by her grandmother, who lived before the ban.
          </p>

          <p>
            Jett, a reclusive tech genius, has been developing underground
            technology to detect and preserve musical frequencies that
            occasionally break through the government's sound dampening systems.
            His network of hidden sensors throughout the city has been
            collecting these fragments for years.
          </p>

          <h2>The Spark of Rebellion</h2>
          <p>
            When Bob's accidental encounter with rhythm leads him to seek out
            others who might remember music, he stumbles upon one of Jett's
            sensors. This chance encounter brings the three strangers together,
            forming an unlikely alliance that will challenge the foundations of
            Silton's silent regime.
          </p>

          <p>
            Together, they discover that music isn't just entertainment—it's a
            fundamental human need that connects people across barriers of
            language, status, and ideology. As they begin to share their
            knowledge and skills, they realize they have the power to ignite a
            revolution that could restore rhythm to their world.
          </p>

          <p>
            But the HCA has ears everywhere, and powerful technology to track
            down any unauthorized sound patterns. As our heroes begin their
            journey to bring music back to Silton, they must navigate a
            dangerous landscape of government agents, surveillance technology,
            and a population that has been conditioned to fear the very thing
            that might set them free.
          </p>

          <div className="story-navigation">
            <h3>Meet the Characters</h3>
            <div className="character-links">
              <Link to="/character/bob" className="character-link">
                <span>Bob's Story</span>
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

export default AwakeningPage;
