const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); // Database connection
const authRoutes = require("./routes/authRoutes"); // Authentication routes
const playerScoreRoutes = require("./routes/playerProgressRoutes"); // Player score routes

dotenv.config(); // Load environment variables from .env file

const app = express();
// Use the port provided by Render or Railway in the environment variable
const PORT = process.env.PORT || 5001;

// Add debugging middleware to log all incoming requests
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  console.log(`Origin: ${req.headers.origin}`);
  console.log(`Headers:`, req.headers);
  next();
});

// Allow all origins
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);
console.log("CORS middleware applied with origin: '*'");

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error("Error occurred:", err);
  res.status(500).json({ error: err.message });
});

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
