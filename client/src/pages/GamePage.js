"use client";

import { useContext, useEffect, useState, useRef } from "react";
import "../styles/GamePage.scss";
import { AuthContext } from "../context/AuthContext";
import {
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaCompress,
  FaQuestionCircle,
  FaUserSecret,
} from "react-icons/fa";

function GamePage() {
  // Destructure user and isGuest from AuthContext
  const { user, isGuest } = useContext(AuthContext);
  const [gameLoading, setGameLoading] = useState(true);
  const [gameError, setGameError] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef(null);

  // Safely extract the username (or default to an empty string)
  const username = user?.username || (isGuest ? "guest" : "");

  // Use window.location.origin for absolute path
  // Add a guest parameter if in guest mode
  const gamePath = `${
    window.location.origin
  }/BuildDb/index.html?userId=${username}${isGuest ? "&guest=true" : ""}`;

  useEffect(() => {
    console.log("Game iframe source:", gamePath);
  }, [gamePath]);

  useEffect(() => {
    console.log(
      `Checking file at: ${window.location.origin}/BuildDb/index.html`
    );
    fetch(`${window.location.origin}/BuildDb/index.html`)
      .then((response) => {
        console.log("Game file status:", response.status);
        if (response.status === 200) {
          console.log("Game file found successfully!");
        } else {
          console.error(`Game file returned status: ${response.status}`);
          setGameError(true);
        }
      })
      .catch((err) => {
        console.error("Error checking game file:", err);
        setGameError(true);
      });
  }, []);

  const handleIframeLoad = () => {
    setGameLoading(false);
  };

  const handleIframeError = () => {
    setGameError(true);
    setGameLoading(false);
    console.error("Error loading game iframe");
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // In a real implementation, you would send a message to the iframe to mute/unmute
    // This is a placeholder for demonstration
    if (iframeRef.current) {
      try {
        iframeRef.current.contentWindow.postMessage(
          { action: "toggleMute" },
          "*"
        );
      } catch (e) {
        console.log("Could not send mute command to iframe");
      }
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    // In a real implementation, you would handle fullscreen mode
    // This is a placeholder for demonstration
    if (iframeRef.current) {
      if (!isFullscreen) {
        if (iframeRef.current.requestFullscreen) {
          iframeRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    }
  };

  const showHelp = () => {
    alert(
      "Game Controls:\n\nUse arrow keys to move\nSpace to jump\nEnter to interact\n\nCollect musical notes and avoid the silence enforcers!"
    );
  };

  return (
    <div className="game-page">
      {/* Guest Mode Banner - only show if in guest mode */}
      {isGuest === true && (
        <div className="game-page__guest-banner">
          <FaUserSecret className="game-page__guest-icon" />
          <span>Playing as Guest</span>
          <div className="game-page__guest-message">
            Your progress won't be saved. <a href="/login">Login or Register</a>{" "}
            to save scores and compete on leaderboards!
          </div>
        </div>
      )}

      <div className="game-container">
        <h1 className="game-header">Starilum: A Rhythmic Rebellion</h1>

        <p className="game-description">
          Welcome to the world of Starilum, where music is forbidden and your
          mission is to bring rhythm back to a world of silence. Play as Bob,
          Lyra, or Jett and navigate through the city of Silton, collecting
          musical notes and avoiding the silence enforcers.
        </p>

        {gameLoading && <div className="game-loading">Loading game</div>}

        {gameError && (
          <div className="game-error">
            Failed to load the game. Please refresh the page or try again later.
          </div>
        )}

        <div className="game-frame-container">
          <iframe
            ref={iframeRef}
            title="Starilum Game"
            src={gamePath}
            width="100%"
            height="700px"
            style={{
              display: gameLoading ? "none" : "block",
            }}
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            allow="fullscreen"
          ></iframe>
        </div>

        {!gameLoading && !gameError && (
          <div className="game-controls">
            <button className="game-control-button" onClick={toggleMute}>
              {isMuted ? (
                <>
                  <FaVolumeMute /> Unmute
                </>
              ) : (
                <>
                  <FaVolumeUp /> Mute
                </>
              )}
            </button>
            <button className="game-control-button" onClick={toggleFullscreen}>
              {isFullscreen ? (
                <>
                  <FaCompress /> Exit Fullscreen
                </>
              ) : (
                <>
                  <FaExpand /> Fullscreen
                </>
              )}
            </button>
            <button className="game-control-button" onClick={showHelp}>
              <FaQuestionCircle /> Help
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default GamePage;
