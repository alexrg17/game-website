const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");

const router = express.Router();

// POST route for registering a user
router.post("/register", registerUser);

// POST route for user login
router.post("/login", loginUser);

module.exports = router;
