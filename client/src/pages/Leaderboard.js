import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../styles/Leaderboard.scss";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("cinematic"); // Default to cinematic

  // A ref to store the interval ID so we can clear it on unmount
  const intervalRef = useRef(null);

  // Function to fetch the leaderboard data
  const fetchLeaderboard = async (level) => {
    try {
      setLoading(true);
      setError("");

      const endpoint = `${process.env.REACT_APP_API_URL}/api/playerScore/leaderboard/${level}`;

      const response = await axios.get(endpoint);
      setLeaderboard(response.data.leaderboard || response.data);
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
      setError("Failed to load leaderboard.");
    } finally {
      setLoading(false);
    }
  };

  // Add this handler for the dropdown
  const handleLevelChange = (e) => {
    setSelectedLevel(e.target.value);
  };

  // Get the appropriate score based on the selected level
  const getScoreForLevel = (record) => {
    switch (selectedLevel) {
      case "cinematic":
        return record.cinematicScore || 0;
      case "electric":
        return record.electricScore || 0;
      case "rock":
        return record.rockScore || 0;
      default:
        return record.cinematicScore || 0; // Default to cinematic if something goes wrong
    }
  };

  useEffect(() => {
    // Fetch when the component mounts or selected level changes
    fetchLeaderboard(selectedLevel);

    // Set up an interval to fetch data every 60 seconds
    intervalRef.current = setInterval(() => {
      fetchLeaderboard(selectedLevel);
    }, 60000);

    // Cleanup: clear the interval when the component unmounts
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [selectedLevel]); // Make sure to re-fetch when selectedLevel changes

  if (loading) {
    return (
      <div className="leaderboard">
        <h2>Leaderboard</h2>
        <div className="leaderboard__loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="leaderboard">
        <h2>Leaderboard</h2>
        <div className="leaderboard__error">{error}</div>
      </div>
    );
  }

  // Render the leaderboard data
  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>

      {/* Level selector dropdown */}
      <div className="leaderboard__level-selector">
        <label htmlFor="level-select">Select Level:</label>
        <select
          id="level-select"
          value={selectedLevel}
          onChange={handleLevelChange}
          className="leaderboard__level-select"
        >
          <option value="cinematic">Cinematic</option>
          <option value="electric">Electric</option>
          <option value="rock">Rock</option>
        </select>
      </div>

      {leaderboard.length === 0 ? (
        <div className="leaderboard__empty">No scores available yet.</div>
      ) : (
        <ul className="leaderboard__list">
          {leaderboard.map((record, index) => (
            <li key={record._id} className="leaderboard__item">
              <span className="leaderboard__rank">{index + 1}.</span>
              <span className="leaderboard__username">
                {record.userId?.username || "Unknown"}
              </span>
              <span className="leaderboard__score">
                {getScoreForLevel(record)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Leaderboard;
