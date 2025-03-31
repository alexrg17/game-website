const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); // Database connection
const authRoutes = require("./routes/authRoutes"); // Authentication routes
const playerScoreRoutes = require("./routes/playerProgressRoutes"); // Player score routes

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware (CORS first for all routes)
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://www.starilumgames.com",
      "https://starilumgames.com",
    ],
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
