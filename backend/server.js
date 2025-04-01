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

// Add debugging middleware to log all incoming requests
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  console.log(`Origin: ${req.headers.origin}`);
  console.log(`Headers:`, req.headers);
  next();
});

app.use(
  cors({
    origin: function (origin, callback) {
      console.log("Request origin:", origin);
      console.log(
        "Allowed origins:",
        allowedOrigins.map((o) => (o instanceof RegExp ? o.toString() : o))
      );

      // For development/testing, allow requests with no origin
      if (!origin) {
        console.log("No origin, allowing request");
        return callback(null, true);
      }

      // Check if the origin matches any allowed origins
      const isAllowed = allowedOrigins.some((allowed) => {
        const isMatch =
          allowed instanceof RegExp ? allowed.test(origin) : allowed === origin;
        console.log(
          `Testing ${origin} against ${
            allowed instanceof RegExp ? allowed.toString() : allowed
          }: ${isMatch}`
        );
        return isMatch;
      });

      if (isAllowed) {
        console.log(`Origin ${origin} is allowed`);
        callback(null, true);
      } else {
        console.log(`Origin ${origin} is NOT allowed by CORS`);
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);
console.log("CORS middleware applied with debugging");

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
  console.log(
    `CORS allowed origins:`,
    allowedOrigins.map((o) => (o instanceof RegExp ? o.toString() : o))
  );
});
