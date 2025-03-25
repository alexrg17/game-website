const express = require("express");
const mongoose = require("mongoose");
const PlayerScore = require("../models/PlayerScore");
const User = require("../models/User"); // Import the User model for lookup
const router = express.Router();

router.post("/update", async (req, res) => {
  let { userId, score } = req.body;

  console.log(
    "Received update request with userId:",
    userId,
    "and score:",
    score
  );

  if (score == null || !userId) {
    return res
      .status(400)
      .json({ message: "User ID (or username) and score are required" });
  }

  // Use a separate variable for the valid user ID
  let validUserId = userId;

  // If userId is not a valid ObjectId, assume it's a username and look up the user
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    try {
      console.log(
        `Provided userId "${userId}" is not a valid ObjectId. Looking up by username...`
      );
      const user = await User.findOne({ username: userId });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Invalid user: no user found with that username" });
      }
      validUserId = user._id; // Set validUserId to the user's _id
      console.log("Converted username to ObjectId:", validUserId);
    } catch (err) {
      console.error("Error finding user by username:", err);
      return res.status(500).json({ message: "Server error" });
    }
  }

  try {
    // Use validUserId in your query
    let record = await PlayerScore.findOne({ userId: validUserId });

    if (record) {
      // Update only if the new score is higher
      if (score > record.highScore) {
        record.highScore = score;
        await record.save();
        console.log("Updated record:", record);
      }
    } else {
      // Create a new record if none exists
      record = new PlayerScore({ userId: validUserId, highScore: score });
      await record.save();
      console.log("Created new record:", record);
    }

    res.status(200).json({ message: "Score updated successfully", record });
  } catch (error) {
    console.error("Error updating score:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/leaderboard", async (req, res) => {
  try {
    // Retrieve the top 5 players sorted by highScore descending and populate username from User
    const leaderboard = await PlayerScore.find()
      .sort({ highScore: -1 })
      .limit(5)
      .populate("userId", "username");
    res.status(200).json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
