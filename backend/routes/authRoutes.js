const express = require("express");
const {
  registerUser,
  loginUser,
  forgotPassword,
  verifyResetToken,
  resetPassword,
  checkEmailExists, // Add this import
} = require("../controllers/userController");

const router = express.Router();

// POST route for registering a user
router.post("/register", registerUser);

// POST route for user login
router.post("/login", loginUser);

// Email check route
router.post("/check-email", checkEmailExists); // Add this new route

// Password reset routes
router.post("/forgot-password", forgotPassword);
router.get("/verify-reset-token/:token", verifyResetToken);
router.post("/reset-password", resetPassword);

module.exports = router;
