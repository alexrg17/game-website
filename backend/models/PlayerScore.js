const mongoose = require("mongoose");

const playerScoreSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // One record per user
    },
    // Level-specific scores
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
    // New time fields (storing milliseconds)
    cinematicTime: {
      type: Number,
      default: null,
    },
    electricTime: {
      type: Number,
      default: null,
    },
    rockTime: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PlayerScore", playerScoreSchema);
