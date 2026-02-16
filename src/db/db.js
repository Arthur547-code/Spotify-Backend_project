// ODM library to communicate with MongoDB. (Hinglish: MongoDB se baat karne ke liye ODM library.)
const mongoose = require("mongoose");

// Initializes MongoDB connection used by the entire app. (Hinglish: puri app me use hone wala MongoDB connection init karta hai.)
async function connectDB() {
  try {
    // Connect using URI from environment configuration. (Hinglish: env config wali URI use karke connect karo.)
    await mongoose.connect(process.env.MONGO_URI);
    // Log successful DB bootstrap. (Hinglish: DB bootstrap success ka log dikhao.)
    console.log("Database connected successfully");
  } catch (error) {
    // Log connection error for debugging startup issues. (Hinglish: startup issue debug karne ke liye connection error log karo.)
    console.error("Database connection error:", error);
  }
}

// Export connection function for server startup. (Hinglish: server startup ke liye connection function export karo.)
module.exports = connectDB;
