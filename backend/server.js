const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); // Database connection
const authRoutes = require("./routes/authRoutes"); // Authentication routes
const playerScoreRoutes = require("./routes/playerProgressRoutes"); // Player score routes

dotenv.config(); // Load environment variables from .env file

const app = express();
// Use the port provided by Render in the environment variable
const PORT = process.env.PORT || 5001;

const allowedOrigins = [
  "http://localhost:3000",
  "https://www.starilumgames.com",
  "https://starilumgames.com",
  /\.vercel\.app$/,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (
        !origin ||
        allowedOrigins.some((allowed) =>
          allowed instanceof RegExp
            ? allowed.test(new URL(origin).hostname)
            : allowed === origin
        )
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
console.log("CORS middleware applied");

// Connect to the database
connectDB();

// Middleware
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use("/api/auth", authRoutes); // Use auth routes under /api/auth
app.use("/api/playerScore", playerScoreRoutes); // Use player score routes under /api/playerScore

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
