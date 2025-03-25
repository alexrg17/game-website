const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // Remove useNewUrlParser and useUnifiedTopology
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Stop the server if the database connection fails
  }
};

module.exports = connectDB;
