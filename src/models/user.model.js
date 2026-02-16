// ODM library for defining MongoDB schemas/models. (Hinglish: MongoDB schemas/models define karne ki ODM library.)
const mongoose = require("mongoose");

// User schema stores account identity, credentials, and authorization role. (Hinglish: account identity, credentials aur authorization role store karta hai.)
const userSchema = new mongoose.Schema({
  // Unique username for login/display. (Hinglish: login/display ke liye unique username.)
  username: {
    type: String,
    required: true,
    unique: true,
  },
  // Unique email for login/communication. (Hinglish: login/communication ke liye unique email.)
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // Hashed password (never plain text). (Hinglish: hashed password, plain text kabhi nahi.)
  password: {
    type: String,
    required: true,
  },
  // Access role used by auth middleware (listener vs artist). (Hinglish: auth middleware me use hone wala role, listener ya artist.)
  role: {
    type: String,
    enum: ["user", "artist"],
    default: "user",
  },
});

// Create model bound to "user" collection. (Hinglish: "user" collection se bound model banao.)
const userModel = mongoose.model("user", userSchema);

// Export model for auth and relation population. (Hinglish: auth aur relation population ke liye model export karo.)
module.exports = userModel;
