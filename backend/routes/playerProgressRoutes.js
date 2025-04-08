const express = require("express");
const mongoose = require("mongoose");
const PlayerScore = require("../models/PlayerScore");
const User = require("../models/User"); // Import the User model for lookup
const router = express.Router();

router.post("/update", async (req, res) => {
  let { userId, score, level } = req.body;

  console.log(
    "Received update request with userId:",
    userId,
    "score:",
    score,
    "level:",
    level
  );

  if (score == null || !userId || !level) {
    return res
      .status(400)
      .json({ message: "User ID, score, and level are required" });
  }

  // Normalize level string
  level = level?.toLowerCase();
  console.log("Normalized level:", level);

  // Validate level
  if (!["cinematic", "electric", "rock"].includes(level)) {
    console.log("Invalid level detected:", level);
    return res.status(400).json({
      message: "Invalid level. Must be 'cinematic', 'electric', or 'rock'",
    });
  }

  // User validation code
  let validUserId = userId;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    try {
      console.log(`Looking up username: "${userId}"`);
      const user = await User.findOne({ username: userId });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Invalid user: no user found with that username" });
      }
      validUserId = user._id;
      console.log("Converted username to ObjectId:", validUserId);
    } catch (err) {
      console.error("Error finding user by username:", err);
      return res.status(500).json({ message: "Server error" });
    }
  }

  try {
    console.log("Looking for existing record with userId:", validUserId);
    let record = await PlayerScore.findOne({ userId: validUserId });
    let updated = false;

    if (record) {
      console.log("Found existing record:", record);

      // Update level-specific score if the new score is higher
      if (level === "cinematic") {
        console.log(
          `Checking cinematic score: current=${record.cinematicScore}, new=${score}`
        );
        if (score > record.cinematicScore) {
          record.cinematicScore = score;
          updated = true;
          console.log(`Updated cinematic score to ${score}`);
        }
      } else if (level === "electric") {
        console.log(
          `Checking electric score: current=${record.electricScore}, new=${score}`
        );
        if (score > record.electricScore) {
          record.electricScore = score;
          updated = true;
          console.log(`Updated electric score to ${score}`);
        }
      } else if (level === "rock") {
        console.log(
          `Checking rock score: current=${record.rockScore}, new=${score}`
        );
        if (score > record.rockScore) {
          record.rockScore = score;
          updated = true;
          console.log(`Updated rock score to ${score}`);
        }
      }

      // Update overall highScore if needed
      if (score > record.highScore) {
        record.highScore = score;
        updated = true;
        console.log(`Updated overall high score to ${score}`);
      }

      if (updated) {
        await record.save();
        console.log("UPDATED RECORD:", record);
        return res
          .status(200)
          .json({ message: "Score updated successfully", record });
      } else {
        console.log("No update needed, current scores are higher");
        return res.status(200).json({ message: "No update needed", record });
      }
    } else {
      console.log("No existing record found, creating new one");

      // Create new record with all fields explicitly set
      const newRecord = new PlayerScore({
        userId: validUserId,
        highScore: score,
        cinematicScore: level === "cinematic" ? score : 0,
        electricScore: level === "electric" ? score : 0,
        rockScore: level === "rock" ? score : 0,
      });

      await newRecord.save();
      console.log("NEW RECORD CREATED:", newRecord);
      return res
        .status(201)
        .json({ message: "New score record created", record: newRecord });
    }
  } catch (error) {
    console.error("Error updating score:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/leaderboard", async (req, res) => {
  try {
    // Retrieve the top 50 players sorted by highScore descending and populate username from User
    const leaderboard = await PlayerScore.find()
      .sort({ highScore: -1 })
      .limit(50)
      .populate("userId", "username");
    res.status(200).json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/leaderboard/:level?", async (req, res) => {
  try {
    const level = req.params.level ? req.params.level.toLowerCase() : "overall";

    // Determine which field to sort by
    let sortField;
    switch (level) {
      case "cinematic":
        sortField = "cinematicScore";
        break;
      case "electric":
        sortField = "electricScore";
        break;
      case "rock":
        sortField = "rockScore";
        break;
      default:
        sortField = "highScore"; // Default for 'overall'
    }

    console.log(
      `Fetching leaderboard for level: ${level}, sorting by: ${sortField}`
    );

    // Build sort object
    const sortObj = {};
    sortObj[sortField] = -1; // Sort in descending order

    // Fetch leaderboard data
    const leaderboard = await PlayerScore.find({})
      .sort(sortObj)
      .limit(20)
      .populate("userId", "username");

    console.log(`Found ${leaderboard.length} leaderboard entries`);

    return res.status(200).json({
      level,
      leaderboard,
    });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
