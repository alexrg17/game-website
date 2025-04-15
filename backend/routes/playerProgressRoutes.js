const express = require("express");
const mongoose = require("mongoose");
const PlayerScore = require("../models/PlayerScore");
const User = require("../models/User"); // Import the User model for lookup
const router = express.Router();

router.post("/update", async (req, res) => {
  let { userId, score, level, time } = req.body; // Add time parameter

  console.log(
    "Received update request with userId:",
    userId,
    "score:",
    score,
    "level:",
    level,
    "time:",
    time
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

        // Handle time update (only if provided and better than current)
        if (time != null) {
          console.log(
            `Checking cinematic time: current=${record.cinematicTime}, new=${time}`
          );
          if (
            record.cinematicTime === null ||
            Number(time) < record.cinematicTime
          ) {
            // Add Number()
            record.cinematicTime = Number(time); // Add Number()
            updated = true;
            console.log(`Updated cinematic time to ${time}`);
          }
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

        // Handle time update (only if provided and better than current)
        if (time != null) {
          console.log(
            `Checking electric time: current=${record.electricTime}, new=${time}`
          );
          if (
            record.electricTime === null ||
            Number(time) < record.electricTime
          ) {
            // Add Number()
            record.electricTime = Number(time); // Add Number()
            updated = true;
            console.log(`Updated electric time to ${time}`);
          }
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

        // Handle time update (only if provided and better than current)
        if (time != null) {
          console.log(
            `Checking rock time: current=${record.rockTime}, new=${time}`
          );
          if (record.rockTime === null || Number(time) < record.rockTime) {
            // Add Number()
            record.rockTime = Number(time); // Add Number()
            updated = true;
            console.log(`Updated rock time to ${time}`);
          }
        }
      }

      if (updated) {
        await record.save();
        console.log("UPDATED RECORD:", record);
        return res
          .status(200)
          .json({ message: "Score updated successfully", record });
      } else {
        console.log("No update needed, current scores/times are better");
        return res.status(200).json({ message: "No update needed", record });
      }
    } else {
      console.log("No existing record found, creating new one");

      // Create new record with level-specific scores and times
      const newRecord = new PlayerScore({
        userId: validUserId,
        cinematicScore: level === "cinematic" ? score : 0,
        electricScore: level === "electric" ? score : 0,
        rockScore: level === "rock" ? score : 0,
        cinematicTime:
          level === "cinematic" && time != null ? Number(time) : null, // Add Number()
        electricTime:
          level === "electric" && time != null ? Number(time) : null, // Add Number()
        rockTime: level === "rock" && time != null ? Number(time) : null, // Add Number()
      });

      console.log("Time value type:", typeof time);
      console.log("Time after Number conversion:", Number(time));
      console.log("Record before save:", {
        cinematicTime: level === "cinematic" ? Number(time) : null,
        electricTime: level === "electric" ? Number(time) : null,
        rockTime: level === "rock" ? Number(time) : null,
      });

      await newRecord.save();

      console.log("Saved record with fields:", Object.keys(newRecord._doc));
      console.log("Time values in saved record:", {
        cinematicTime: newRecord.cinematicTime,
        electricTime: newRecord.electricTime,
        rockTime: newRecord.rockTime,
      });

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

// Replace the standard leaderboard route to always require a level
router.get("/leaderboard", async (req, res) => {
  // Redirect to the default cinematic level leaderboard
  console.log("Redirecting to default cinematic leaderboard");
  return res.redirect("/api/playerScore/leaderboard/cinematic");
});

router.get("/leaderboard/:level", async (req, res) => {
  try {
    const level = req.params.level.toLowerCase();

    // Validate level parameter
    if (!["cinematic", "electric", "rock"].includes(level)) {
      return res.status(400).json({
        message: "Invalid level. Must be 'cinematic', 'electric', or 'rock'",
      });
    }

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
    }

    // Build sort object
    const sortObj = {};
    sortObj[sortField] = -1; // Sort in descending order

    // Fetch leaderboard data (make sure to select time fields)
    const leaderboard = await PlayerScore.find({})
      .sort(sortObj)
      .limit(20)
      .populate("userId", "username");

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
