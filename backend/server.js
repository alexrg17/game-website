const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); // Database connection
const authRoutes = require("./routes/authRoutes"); // Authentication routes
const playerScoreRoutes = require("./routes/playerProgressRoutes"); // Player score routes

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5001;

// Debug middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  console.log(`Origin: ${req.headers.origin}`);
  next();
});

// Updated CORS configuration with allowed origins
app.use(
  cors({
    origin: [
      "https://game-website-340o836yg-alexs-projects-eb26cfd9.vercel.app",
      "https://starilumgames.com",
      "http://localhost:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);
console.log("CORS middleware applied with allowed origins");

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error occurred:", err);
  res.status(500).json({ error: err.message });
});

// Connect to the database
connectDB();

// Middleware for parsing JSON requests
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/playerScore", playerScoreRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
