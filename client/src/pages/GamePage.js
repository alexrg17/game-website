import React from "react";
import "../styles/GamePage.scss"; // Import the SCSS for styling

function GamePage() {
  return (
    <div className="game-page">
      <div className="game-container">
        <h1 className="game-header">Play the Game</h1>
        <iframe
          title="WebGL Game"
          src={`${process.env.PUBLIC_URL}/BuildDB/index.html`} // Ensure this path matches your folder structure
          width="100%"
          height="700px"
          style={{ border: "none" }}
        ></iframe>
      </div>
    </div>
  );
}

export default GamePage;
