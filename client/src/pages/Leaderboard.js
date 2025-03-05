import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Header from "../components/Header"; // Import the Header component
import "../styles/Leaderboard.scss";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // A ref to store the interval ID so we can clear it on unmount
  const intervalRef = useRef(null);

  // Function to fetch the leaderboard data
  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(
        "http://localhost:5001/api/playerScore/leaderboard"
      );
      setLeaderboard(response.data);
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
      setError("Failed to load leaderboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch when the component mounts
    fetchLeaderboard();

    // Set up an interval to fetch data every 30 seconds (adjust as needed)
    intervalRef.current = setInterval(() => {
      fetchLeaderboard();
    }, 60000);

    // Cleanup: clear the interval when the component unmounts
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Render states
  if (loading) {
    return (
      <>
        <Header /> {/* Include the Header component */}
        <div className="leaderboard">
          <h2>Leaderboard</h2>
          <div className="leaderboard__loading">Loading...</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header /> {/* Include the Header component */}
        <div className="leaderboard">
          <h2>Leaderboard</h2>
          <div className="leaderboard__error">{error}</div>
        </div>
      </>
    );
  }

  // Render the leaderboard data
  return (
    <>
      <Header /> {/* Include the Header component */}
      <div className="leaderboard">
        <h2>Leaderboard</h2>
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
                <span className="leaderboard__score">{record.highScore}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Leaderboard;
