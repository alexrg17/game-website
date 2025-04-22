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
        <h1 className="story-title">Behind the Beat</h1>

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
            <p className="character-tagline">
              "In a world of silence, technology can amplify the whispers of
              revolution."
            </p>

            <div className="character-stats">
              <div className="stat">
                <span className="stat-label">Age:</span>
                <span className="stat-value">31</span>
              </div>
              <div className="stat">
                <span className="stat-label">Occupation:</span>
                <span className="stat-value">Tech Specialist</span>
              </div>
              <div className="stat">
                <span className="stat-label">Special Ability:</span>
                <span className="stat-value">
                  Sound Technology & Network Infrastructure
                </span>
              </div>
            </div>
          </div>

          <h2>The Shadow</h2>
          <p>
            Jett grew up in the shadows of Silton's towering tech districts,
            where his parents worked as maintenance technicians for the city's
            vast network infrastructure. From an early age, he showed an uncanny
            ability to understand and manipulate technology, often repurposing
            discarded equipment into new devices that his parents couldn't
            identify.
          </p>

          <p>
            When Jett was sixteen, his parents were arrested for possessing an
            antique device that was later identified as a music player. Though
            they claimed they had no idea what the device was for, they were
            sentenced to "re-education" in a remote facility. Jett never saw
            them again, and the experience left him with a deep distrust of
            authority and a determination to uncover the truth about music.
          </p>

          <h2>The Technician</h2>
          <p>
            After his parents' disappearance, Jett went underground, using his
            technical skills to survive. He became known in certain circles as
            someone who could fix or modify almost any piece of technology. This
            reputation eventually led him to a secret group of academics who
            were studying pre-ban culture, including music.
          </p>

          <p>
            Working with these academics, Jett developed a network of sensors
            designed to detect and record any sounds that matched the
            mathematical patterns of music. These sensors, disguised as ordinary
            maintenance equipment, were placed throughout Silton, creating what
            Jett called the "Resonance Network."
          </p>

          <h2>The Architect</h2>
          <p>
            Over the years, Jett's Resonance Network has collected thousands of
            sound fragments—brief moments when someone hummed a tune, when
            machinery accidentally produced a rhythm, or when the wind through
            the city's architecture created melodic patterns. Using advanced
            algorithms, Jett has been piecing these fragments together, trying
            to reconstruct what music might have sounded like.
          </p>

          <p>
            When Bob accidentally triggers one of his sensors, Jett is initially
            suspicious. But after meeting Bob and later Lyra, he realizes that
            his technical knowledge combined with their unique abilities could
            create something powerful. Jett becomes the architect of the
            resistance's infrastructure, developing secure communication methods
            and devices that can play Lyra's compositions without being detected
            by the HCA.
          </p>

          <p>
            Though he rarely speaks about it, Jett's ultimate goal is to hack
            into the city's central sound system and broadcast music to everyone
            in Silton simultaneously—a moment of awakening that he believes
            would shatter the government's control forever. With Bob and Lyra by
            his side, this dream might finally be within reach.
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
