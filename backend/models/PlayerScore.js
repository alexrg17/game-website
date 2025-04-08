const mongoose = require("mongoose");

const playerScoreSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // One record per user
    },
    // Keep original highScore for backward compatibility
    highScore: {
      type: Number,
      default: 0,
    },
    // Add level-specific scores
    cinematicScore: {
      type: Number,
      default: 0,
    },
    electricScore: {
      type: Number,
      default: 0,
    },
    rockScore: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PlayerScore", playerScoreSchema);
