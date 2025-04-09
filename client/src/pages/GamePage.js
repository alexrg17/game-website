import React, { useContext, useEffect, useState } from "react";
import "../styles/GamePage.scss";
import { AuthContext } from "../context/AuthContext";

function GamePage() {
  // Destructure user from AuthContext
  const { user } = useContext(AuthContext);
  const [gameLoading, setGameLoading] = useState(true);
  const [gameError, setGameError] = useState(false);

  // Safely extract the username (or default to an empty string)
  const username = user?.username || "";

  // Use window.location.origin for absolute path
  const gamePath = `${window.location.origin}/BuildDb/index.html?userId=${username}`;

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

  return (
    <div className="game-page">
      <div className="game-container">
        <h1 className="game-header">Play the Game</h1>

        {gameLoading && <div className="game-loading">Loading game...</div>}

        {gameError && (
          <div className="game-error">
            Failed to load the game. Please refresh the page or try again later.
          </div>
        )}

        <iframe
          title="WebGL Game"
          src={gamePath}
          width="100%"
          height="700px"
          style={{
            border: "none",
            display: gameLoading ? "none" : "block",
          }}
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        ></iframe>
      </div>
    </div>
  );
}

export default GamePage;
