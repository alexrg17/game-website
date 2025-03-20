import React, { useContext, useEffect } from "react";
import "../styles/GamePage.scss";
import { AuthContext } from "../context/AuthContext";

function GamePage() {
  // Destructure user from AuthContext
  const { user } = useContext(AuthContext);

  // Safely extract the username (or default to an empty string)
  const username = user?.username || "";

  // Log the iframe source or the username whenever it changes
  useEffect(() => {
    console.log(
      "iframe src:",
      `${process.env.PUBLIC_URL}/BuildDB/index.html?userId=${username}`
    );
  }, [username]);

  return (
    <div className="game-page">
      <div className="game-container">
        <h1 className="game-header">Play the Game</h1>
        <iframe
          title="WebGL Game"
          src={`${process.env.PUBLIC_URL}/BuildDB/index.html?userId=${username}`}
          width="100%"
          height="700px"
          style={{ border: "none" }}
        ></iframe>
      </div>
    </div>
  );
}

export default GamePage;
